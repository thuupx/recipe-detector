"use client";
import { ImageUpload } from "@/components/image-upload";
import { RecipeSettings } from "@/components/recipe-settings";
import { RecipeSettingsResponse } from "@/types";
import { Github, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [settings, setSettings] = useState<RecipeSettingsResponse | null>(null);

  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <header className="relative py-4 md:py-8 flex items-center justify-between">
        <div className="flex-1" /> {/* Spacer */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold max-w-2xl">
          Fujifilm Recipe Detector using AI
        </h1>
        <div className="flex-1 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:bg-muted/50"
          >
            <Link
              href="https://github.com/thuupx/recipe-detector"
              target="_blank"
              className="rounded-full"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow py-8 md:py-12">
        <div className="flex flex-col items-center md:items-start md:flex-row justify-center gap-8 md:gap-12 w-full max-w-6xl mx-auto">
          <ImageUpload setSettings={setSettings} />
          <RecipeSettings settings={settings} />
        </div>
      </main>

      <footer className="py-8 md:py-12 mt-auto">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm md:text-base text-muted-foreground text-center">
            Built with{" "}
            <Heart className="inline-block w-4 h-4 text-red-500 animate-pulse" />{" "}
            by{" "}
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link
                href="https://www.linkedin.com/in/thu-px"
                target="_blank"
                className="font-semibold hover:text-primary"
              >
                PXT
              </Link>
            </Button>
          </p>
        </div>
      </footer>
    </div>
  );
}
