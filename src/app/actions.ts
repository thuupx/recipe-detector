"use server";

import { RecipeSettingsResponse } from "@/types";

export async function predictRecipe(imageFile: File) {
  const formData = new FormData();
  formData.append("image", imageFile);
  const data = formData;

  const res = await fetch(`${process.env.API_URL}/api/predict`, {
    method: "POST",
    body: data,
  });

  return res.json() as Promise<RecipeSettingsResponse>;
}
