import numpy as np
import tensorflow as tf
import os

from server.logger import logger
from server.constants import numeric_fields, mappings, films_by_sensor
from server.constants import SensorModel, ignored_fields_by_sensor

SENSOR_FILM_SIMULATIONS = films_by_sensor

# Get the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

# Define paths relative to project root
SERVICE_ACCOUNT_PATH = os.path.join(PROJECT_ROOT, "service-account.json")
MODEL_PATH = os.path.join(SCRIPT_DIR, "film_model.keras")


class FujifilmRecipeDetector:
    def __init__(self):
        """Initialize the detector with model and mappings."""
        self.download_model_if_not_exist()
        self.model = tf.keras.models.load_model(MODEL_PATH, compile=False)

        self.mappings = mappings

    def download_model_if_not_exist(self):
        """Download model from Firebase Storage if it does not exist."""
        if not os.path.exists(MODEL_PATH):
            try:
                import firebase_admin
                from firebase_admin import credentials, storage
                import requests.exceptions
                import logging

                logging.info(
                    f"Checking service account file at: {SERVICE_ACCOUNT_PATH}"
                )
                if not os.path.exists(SERVICE_ACCOUNT_PATH):
                    raise FileNotFoundError(
                        f"Service account file not found at {SERVICE_ACCOUNT_PATH}"
                    )

                logging.info("Loading credentials from service account file...")
                cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)

                # Check if Firebase is already initialized
                if not firebase_admin._apps:
                    logging.info("Initializing Firebase app...")
                    firebase_admin.initialize_app(
                        cred, {"storageBucket": "vortex-ai-13f4.firebasestorage.app"}
                    )
                else:
                    logging.info("Firebase app already initialized")

                logging.info("Getting storage bucket...")
                bucket = storage.bucket()
                blob = bucket.blob("vortex-models/film_model.keras")

                logging.info("Starting model download...")
                try:
                    blob.download_to_filename(MODEL_PATH)
                    logging.info("Model downloaded successfully")
                except requests.exceptions.RequestException as e:
                    logging.error(f"Network error during download: {str(e)}")
                    raise
                except Exception as e:
                    logging.error(f"Error downloading model: {str(e)}")
                    raise

            except FileNotFoundError as e:
                logging.error(str(e))
                raise
            except Exception as e:
                logging.error(f"Unexpected error: {str(e)}")
                raise

    def _denormalize_numeric(self, field, value):
        """Denormalize numeric values from model output."""
        if field not in numeric_fields:
            return value

        field_info = numeric_fields[field]
        min_val, max_val = field_info["range"]
        denorm_value = field_info["denormalize"](value)

        # Clamp to valid range
        return max(min_val, min(max_val, denorm_value))

    def _format_numeric_value(self, field, value):
        """Format numeric values for human-readable output."""
        if field not in numeric_fields:
            return str(value)

        return numeric_fields[field]["format"](value)

    def preprocess_image(self, image_path):
        """Preprocess image for model input.

        Args:
            image_path (str): Path to the input image

        Returns:
            numpy.ndarray: Preprocessed image ready for model input

        Raises:
            FileNotFoundError: If image file doesn't exist
            ValueError: If image cannot be processed
        """
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image not found at {image_path}")

        try:
            img = tf.keras.utils.load_img(
                image_path,
                color_mode="rgb",
                target_size=(224, 224),
                interpolation="bicubic",
                keep_aspect_ratio=False,
            )
            img = tf.keras.utils.img_to_array(img) / 255
            img = np.expand_dims(img, axis=0)
            return img

        except Exception as e:
            raise ValueError(f"Error processing image: {str(e)}")

    def predict(self, image_path, sensor_model: SensorModel, top_k=5):
        """Predict Fujifilm recipe from image."""
        # Preprocess image
        img = self.preprocess_image(image_path)

        # Get model predictions
        predictions = self.model.predict({"image": img}, verbose=0)

        # Convert predictions to dictionary if needed
        if not isinstance(predictions, dict):
            output_names = [output.name.split("/")[0] for output in self.model.outputs]
            predictions = dict(zip(output_names, predictions))

        results = {}

        if sensor_model is not None:
            detected_sensor = sensor_model.value
        else:
            # Get sensor prediction first to filter film simulations
            sensor_predictions = predictions.get("sensor", None)
            if sensor_predictions is not None:
                temperature = 1
                sensor_predictions = sensor_predictions[0]
                sensor_predictions = tf.nn.softmax(
                    sensor_predictions / temperature
                ).numpy()
                sensor_idx = np.argmax(sensor_predictions)
                reverse_sensor_mapping = {
                    v: k for k, v in self.mappings["sensor"]["indices"].items()
                }
                detected_sensor = reverse_sensor_mapping.get(sensor_idx)

        supported_films = (
            SENSOR_FILM_SIMULATIONS.get(detected_sensor, None)
            if detected_sensor
            else None
        )

        # Process categorical fields (including film_simulation)
        for field, field_predictions in predictions.items():
            if field in numeric_fields:
                continue

            field_predictions = field_predictions[0]  # Get first batch item

            # Apply softmax with temperature scaling to reduce overconfidence
            if len(field_predictions.shape) > 0:
                temperature = 1
                field_predictions = field_predictions / temperature  # Scale logits
                field_predictions = tf.nn.softmax(field_predictions).numpy()

            # Filter film simulations based on sensor compatibility
            if field == "film_simulation" and supported_films:
                reverse_mapping = {
                    v: k for k, v in self.mappings[field]["indices"].items()
                }
                # Zero out probabilities for unsupported film simulations
                for idx in range(len(field_predictions)):
                    if idx in reverse_mapping:
                        film_sim = reverse_mapping[idx]
                        if film_sim not in supported_films:
                            field_predictions[idx] = 0
                # Renormalize probabilities
                if field_predictions.sum() > 0:
                    field_predictions = field_predictions / field_predictions.sum()

            # Get top k predictions
            top_indices = np.argsort(field_predictions)[-top_k:][::-1]

            # Create list of predictions
            field_results = []
            reverse_mapping = {v: k for k, v in self.mappings[field]["indices"].items()}
            ignored_fields = ignored_fields_by_sensor.get(sensor_model, [])

            for idx in top_indices:
                if idx in reverse_mapping:
                    value = reverse_mapping[idx]
                    if value and field not in ignored_fields:
                        prob = float(field_predictions[idx])
                        if prob > 0.001:
                            field_results.append({"value": value, "probability": prob})

            results[field] = field_results

        # Process numeric outputs
        for field in numeric_fields:
            if field not in predictions:
                logger.warning(f"Field {field} not found in predictions")
                continue

            value = float(predictions[field][0][0])
            denormalized_value = self._denormalize_numeric(field, value)
            formatted_value = self._format_numeric_value(field, denormalized_value)

            results[field] = [
                {
                    "value": formatted_value,
                    "raw_value": denormalized_value,
                    "probability": 1.0,
                }
            ]

        return results
