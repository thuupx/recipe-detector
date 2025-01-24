"use client";
import { Github, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ImageUpload } from "@/components/image-upload";
import { RecipeSettings } from "@/components/recipe-settings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RecipeSettingsResponse, SensorModel } from "@/types";

export default function Home() {
  const [settings, setSettings] = useState<RecipeSettingsResponse | null>(null);
  const [sensorModel, setSensorModel] = useState<SensorModel | undefined>();

  const handleSensorModelChange = (value: string) => {
    setSensorModel(value as SensorModel);
  };

  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <header className="relative py-4 md:py-8 flex items-center justify-between">
        <div className="flex-1" />
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
          <div className="w-full md:w-auto">
            <Label
              htmlFor="sensor-model"
              className="block text-sm font-medium text-gray-700"
            >
              Select Sensor Model
            </Label>
            <Select value={sensorModel} onValueChange={handleSensorModelChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sensor Model" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SensorModel).map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ImageUpload setSettings={setSettings} sensorModel={sensorModel} />
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
