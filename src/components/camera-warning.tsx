import { AlertTriangle } from "lucide-react";

interface CameraWarningProps {
  cameraModel: string;
}

export const CameraWarning = ({ cameraModel }: CameraWarningProps) => {
  return (
    <div className="flex items-center gap-2 p-4 text-sm border rounded-lg bg-yellow-50 border-yellow-200 text-yellow-800">
      <AlertTriangle className="w-4 h-4" />
      <div>
        <p>
          Detected camera model: <span className="font-medium">{cameraModel}</span>
        </p>
        <p className="text-xs">
          This tool works best with Fujifilm cameras. Results may be less accurate
          for other camera models.
        </p>
      </div>
    </div>
  );
};
