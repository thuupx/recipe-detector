"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { predictRecipe } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { compressImage } from "@/lib/image";
import { RecipeSettingsResponse } from "@/types";

import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { LoadingSpinner } from "./loading";

type AcceptedFile = File & { preview: string };

type ImageUploadProps = {
  setSettings: (settings: RecipeSettingsResponse | null) => void;
};

export function ImageUpload({ setSettings }: ImageUploadProps) {
  const [file, setFile] = useState<AcceptedFile>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const currentFile = acceptedFiles[0];
      const resizedImage = await compressImage(currentFile, 512);
      const imageFile = new File([resizedImage], currentFile.name, {
        type: currentFile.type,
      });

      setFile(
        Object.assign(imageFile, {
          preview: URL.createObjectURL(imageFile),
        })
      );
    },
  });

  useEffect(() => {
    return () => {
      if (!file) {
        return;
      }

      URL.revokeObjectURL(file.preview);
      setSettings(null);
    };
  }, [file, setSettings]);

  return (
    <Card className="mx-4">
      <CardHeader
        {...getRootProps({
          className: "flex flex-col items-center hover:cursor-pointer",
        })}
      >
        <Upload size={64} />
        <Input {...getInputProps()} />
        <p className="text-xl">
          Drag and drop image here, or click to select an image
        </p>
        <aside className="flex flex-wrap gap-2">
          {file && (
            <Image
              src={file.preview}
              alt={file.name}
              width={256}
              height={256}
            />
          )}
        </aside>
      </CardHeader>
      <CardFooter>
        {file && (
          <Button
            className="m-auto"
            onClick={async () => {
              try {
                setIsLoading(true);
                const settings = await predictRecipe(file);
                setSettings(settings);
              } catch (error) {
                console.error(error);
                toast({
                  title: "Error",
                  description: "Failed to predict recipe",
                  variant: "destructive",
                });
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {isLoading ? <LoadingSpinner size={24} /> : "Predict"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
