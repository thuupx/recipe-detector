"use client";
import { ImageUpload } from "@/components/image-upload";
import { RecipeSettings } from "@/components/recipe-settings";
import { RecipeSettingsResponse } from "@/types";
import { Github, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [settings, setSettings] = useState<RecipeSettingsResponse | null>(null);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center font-bold md:text-5xl py-8">
        Fujifilm Recipe Detector using AI
      </h1>
      <div className="flex flex-col items-start md:flex-row justify-center gap-4 w-full">
        <ImageUpload setSettings={setSettings} />
        <RecipeSettings settings={settings} />
      </div>
      <footer className="container flex flex-col items-center justify-center gap-4 py-16">
        <p className="text-sm text-muted-foreground text-center">
          <Link
            className="flex items-center gap-1"
            target="_blank"
            href="https://github.com/thuupx/recipe-detector"
          >
            <span>
              Send a star on <Github size={16} className="inline-block" />
            </span>
          </Link>
          Built with{" "}
          <span className="font-semibold">
            <Heart size={16} className="inline-block" />
          </span>{" "}
          by{" "}
          <span className="font-semibold">
            <Link target="_blank" href="https://www.linkedin.com/in/thu-px">
              PXT
            </Link>
          </span>
        </p>
      </footer>
    </div>
  );
}
