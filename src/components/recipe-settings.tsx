import * as _ from "lodash";

import { Card, CardContent } from "./ui/card";

import { RecipeSettingsResponse } from "@/types";
import { categoricalFields, regressionFields } from "@/lib/constants";

type RecipeSettingsProps = {
  settings: RecipeSettingsResponse | null;
};

const formatProbability = (probability: number) => {
  return process.env.NEXT_PUBLIC_ENABLED_PERCENTAGE === "true"
    ? `(${(probability * 100).toFixed(2)}%)`
    : "";
};

export const RecipeSettings = ({ settings }: RecipeSettingsProps) => {
  return (
    <div className="mx-auto md:mx-0">
      <Card>
        <CardContent>
          <table className="w-80">
            <thead className="text-left ">
              <tr className="border-b w-full">
                <th className="w-1/2">Setting</th>
                <th className="w-1/2">Value</th>
              </tr>
            </thead>
            <tbody>
              {categoricalFields.map((field) => (
                <tr key={field} className="border-b w-full">
                  <td className="font-medium">{_.startCase(field)}</td>
                  <td className="font-semibold">
                    {settings
                      ? `${
                          settings[field as keyof RecipeSettingsResponse][0]
                            .value
                        } ${formatProbability(
                          settings[field as keyof RecipeSettingsResponse][0]
                            .probability
                        )}`
                      : ""}
                  </td>
                </tr>
              ))}
              {regressionFields.map((field) => (
                <tr key={field} className="border-b w-full">
                  <td className="font-medium">{_.startCase(field)}</td>
                  <td className="font-semibold">
                    {settings
                      ? settings[field as keyof RecipeSettingsResponse][0].value
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
