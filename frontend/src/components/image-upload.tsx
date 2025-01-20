"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { predictRecipe } from "@/app/actions";
import { RecipeSettingsResponse } from "@/types";
import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

type AcceptedFile = File & { preview: string };

type ImageUploadProps = {
  setSettings: (settings: RecipeSettingsResponse | null) => void;
};

export function ImageUpload({ setSettings }: ImageUploadProps) {
  const [files, setFiles] = useState<AcceptedFile[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <Image src={file.preview} alt={file.name} width={256} height={256} />
    </div>
  ));

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      setSettings(null);
    };
  }, [files, setSettings]);

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
        <aside className="flex flex-wrap gap-2">{thumbs}</aside>
      </CardHeader>
      <CardFooter>
        {files.length > 0 && (
          <Button
            className="m-auto"
            onClick={async () => {
              const settings = await predictRecipe(files[0]);
              setSettings(settings);
            }}
          >
            Predict
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
