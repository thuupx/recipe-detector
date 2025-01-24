"use server";

import { RecipeSettingsResponse, SensorModel } from "@/types";

export async function predictRecipe(imageFile: File, sensorModel?: SensorModel) {
  const formData = new FormData();
  formData.append("image", imageFile);
  if (sensorModel) {
    formData.append("sensor_model", sensorModel);
  }
  const data = formData;

  const res = await fetch(`${process.env.API_URL}/api/predict`, {
    method: "POST",
    body: data,
  });

  return res.json() as Promise<RecipeSettingsResponse>;
}
