import { categoricalFields, regressionFields } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { FujifilmExifData, RecipeSettingsResponse } from "@/types";
import * as _ from "lodash";
import { Camera, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const formatProbability = (probability: number) => {
  return process.env.NEXT_PUBLIC_ENABLED_PERCENTAGE === "true"
    ? `(${(probability * 100).toFixed(2)}%)`
    : "";
};

const LoadingSkeleton = () => (
  <div className="space-y-2">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="flex items-center justify-between py-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
    ))}
  </div>
);

const ConfidenceLegend = () => (
  <div className="mt-6 pt-6 border-t">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-muted-foreground">
        Confidence Level
      </span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Indicates how confident the AI is about the prediction</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">High</span>
        <span className="text-green-600 dark:text-green-400 font-medium">
          ≥ 80%
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Medium</span>
        <span className="text-yellow-600 dark:text-yellow-400 font-medium">
          50-79%
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Low</span>
        <span className="text-red-600 dark:text-red-400 font-medium">
          &lt; 50%
        </span>
      </div>
    </div>
  </div>
);

const getValueWithExifData = (
  field: string,
  originalValue: string,
  exifData: FujifilmExifData | null,
  settings: RecipeSettingsResponse | null
) => {
  if (_.isEmpty(exifData)) return originalValue;

  if (field === "camera_model" && settings) {
    settings.camera_model = [
      {
        probability: 1,
        value: exifData.Model,
      },
    ];
    return exifData.Model;
  }

  if (field === "white_balance" && settings) {
    const whiteBalance =
      exifData.LightSource !== "Unknown" ? exifData.LightSource : originalValue;

    settings.white_balance = [
      {
        probability: 1,
        value: whiteBalance,
      },
    ];
    return whiteBalance;
  }

  if (field === "iso" && settings) {
    settings.iso = [
      {
        probability: 1,
        value: exifData.ISOSpeedRatings.toString(),
      },
    ];
    return exifData.ISOSpeedRatings.toString();
  }

  return originalValue;
};

const getConfidenceLevel = (probability: number | undefined) => {
  if (!probability) return null;
  if (probability >= 0.8) return "high";
  if (probability >= 0.5) return "medium";
  return "low";
};

export const RecipeSettings = () => {
  const { settings, exifData } = useAppStore();
  const isLoading = settings === null;

  return (
    <div className="w-full md:w-auto">
      <Card className="w-full md:w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Recipe Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="divide-y">
                {categoricalFields.map((field) => {
                  const setting =
                    settings?.[field as keyof RecipeSettingsResponse]?.[0];

                  const updatedValue = getValueWithExifData(
                    field,
                    setting?.value,
                    exifData,
                    settings
                  );

                  if (!updatedValue) return null;

                  const probability = setting?.probability;
                  const confidenceLevel = getConfidenceLevel(probability);

                  return (
                    <div
                      key={field}
                      className="flex items-center justify-between py-3 group hover:bg-muted/50 rounded-sm transition-colors"
                    >
                      <span className="text-sm font-medium text-muted-foreground">
                        {_.startCase(field)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn("text-sm font-semibold", {
                            "text-green-600 dark:text-green-400":
                              confidenceLevel === "high",
                            "text-yellow-600 dark:text-yellow-400":
                              confidenceLevel === "medium",
                            "text-red-600 dark:text-red-400":
                              confidenceLevel === "low",
                          })}
                        >
                          {updatedValue}
                        </span>
                        {probability && (
                          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            {formatProbability(probability)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                {regressionFields.map((field) => {
                  const value =
                    settings?.[field as keyof RecipeSettingsResponse][0].value;
                  return (
                    <div
                      key={field}
                      className="flex items-center justify-between py-3 hover:bg-muted/50 rounded-sm transition-colors"
                    >
                      <span className="text-sm font-medium text-muted-foreground">
                        {_.startCase(field)}
                      </span>
                      <span className="text-sm font-semibold">{value}</span>
                    </div>
                  );
                })}
              </div>
              <ConfidenceLegend />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
