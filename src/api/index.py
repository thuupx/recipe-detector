import os
import uuid

from flask import Flask, request
from server.detector import FujifilmRecipeDetector

detector = FujifilmRecipeDetector()

# create and configure the app
app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY="dev",
    DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass


@app.post("/api/predict")
def predict():
    image = request.files["image"].read()
    image_path = uuid.uuid4().hex + ".jpg"

    with open(image_path, "wb") as f:
        f.write(image)

    result = detector.predict(image_path)
    os.remove(image_path)
    print(result)
    return result


if __name__ == "__main__":
    app.run()
