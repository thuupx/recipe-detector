"use client";
import { ImageUpload } from "@/components/image-upload";
import { RecipeSettings } from "@/components/recipe-settings";
import { RecipeSettingsResponse } from "@/types";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [settings, setSettings] = useState<RecipeSettingsResponse | null>(null);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center font-bold md:text-5xl py-8">
        Fujifilm Recipe Detector
      </h1>
      <div className="flex flex-col items-start md:flex-row justify-center gap-4 w-full">
        <ImageUpload setSettings={setSettings} />
        <RecipeSettings settings={settings} />
      </div>
      <footer className="container flex flex-col items-center justify-center gap-4 py-16">
        <p className="text-sm text-muted-foreground">
          Built with{" "}
          <span className="font-semibold">
            <Heart size={16} className="inline-block" />
          </span>{" "}
          by <span className="font-semibold">PXT</span>
        </p>
      </footer>
    </div>
  );
}
