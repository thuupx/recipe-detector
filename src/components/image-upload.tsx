import { cn } from "@/lib/utils";
import { RecipeSettingsResponse, SensorModel } from "@/types";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { compressImage } from "@/lib/image";
import { predictRecipe } from "@/app/actions";


type ImageUploadProps = {
  setSettings: (settings: RecipeSettingsResponse) => void;
  sensorModel?: SensorModel;
};

export const ImageUpload = ({
  setSettings,
  sensorModel,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && sensorModel) {
        const resizedImage = await compressImage(file, 512);
        const imageFile = new File([resizedImage], file.name, {
          type: file.type,
        });
        setPreview(URL.createObjectURL(imageFile));
        setLoading(true);

        try {
          const data = await predictRecipe(imageFile, sensorModel);
          setSettings(data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }
    },
    [setSettings, sensorModel]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".raf"],
    },
    maxFiles: 1,
    multiple: false,
    disabled: !sensorModel,
  });

  return (
    <Card className="w-full md:w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-colors",
            sensorModel &&
              "cursor-pointer hover:border-primary/50 hover:bg-muted/50",
            isDragActive && "border-primary bg-muted/50",
            loading && "opacity-50 cursor-not-allowed",
            !sensorModel && "cursor-not-allowed opacity-50"
          )}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            {preview ? (
              <div className="relative w-full aspect-square">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ) : (
              <Upload
                className={cn(
                  "w-12 h-12 text-muted-foreground",
                  isDragActive && "text-primary"
                )}
              />
            )}
            <Input {...getInputProps()} />
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">
                {isDragActive
                  ? "Drop the image here"
                  : sensorModel
                  ? "Drag and drop image here, or click to select"
                  : "Please select a sensor model first"}
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPG, PNG, WebP and RAF files
              </p>
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing image...
          </div>
        )}
      </CardContent>
    </Card>
  );
};
