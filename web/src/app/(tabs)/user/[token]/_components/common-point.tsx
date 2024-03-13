"use client";

import { compareUserSelections } from "@/actions/compare-common-point";
import { submitCommonPointsSelections } from "@/actions/create-common-point";
import FullScreenLoader from "@/components/fullscreen-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommonPoint, User } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CommonPointsProps {
  commonPoints: CommonPoint[];
  userDetails: User;
  user: User;
}
export default function CommonPoints({
  commonPoints,
  userDetails,
  user,
}: CommonPointsProps) {
  const router = useRouter();
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(commonPoints);

  const toggleSelection = (value: number) => {
    setSelectedValues((currentValues) => {
      const isAlreadySelected = currentValues.includes(value);
      if (isAlreadySelected) {
        return currentValues.filter((item) => item !== value);
      } else {
        return currentValues.length < 3
          ? [...currentValues, value]
          : currentValues;
      }
    });
  };

  const handleSubmit = async () => {
    if (!userDetails || selectedValues.length === 0) {
      toast("Informations manquantes pour la soumission.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await submitCommonPointsSelections(
        user.id,
        userDetails.id,
        selectedValues
      );
      if (res === "Erreur lors de la soumissions des sélections.") {
        toast("Vous ne pouvez avoir que 3 points communs au maximum");
        return null;
      }
      await compareUserSelections(user.id, userDetails.id);
      toast("Points communs soumis avec succès");
    } catch (error) {
      toast("Erreur lors de la soumission");

      console.error("Erreur lors de la soumission: ", error);
    } finally {
      setIsLoading(false);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {isLoading && <FullScreenLoader />}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 rounded-lg bg-secondary text-white font-medium mt-4 transition-colors"
      >
        {isVisible
          ? "Masquer les points communs"
          : "Afficher les points communs"}
      </button>
      {isVisible && (
        <ScrollArea className="z-50 w-full mt-4 max-h-40  bg-gray-200 p-1 pr-4  text-background rounded-lg">
          {commonPoints?.length > 0 ? (
            commonPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center p-2 cursor-pointer rounded-lg transition-colors"
                onClick={() => toggleSelection(point.id)}
              >
                <div
                  className={`w-5 h-5 border-2 rounded-sm mr-2 flex items-center justify-center ${
                    selectedValues.includes(point.id)
                      ? "bg-secondary border-secondary border"
                      : "border-secondary"
                  }`}
                ></div>
                <span className="flex-1 text-xs py-1 px-2 rounded-lg bg-gray-300 ">
                  {point.contenu}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-background">
              Aucun point commun trouvé.
            </p>
          )}
        </ScrollArea>
      )}
      {!isVisible && selectedValues.length > 0 && (
        <div className="w-full mt-4">
          <ul className="list-disc pl-5 space-y-2">
            {selectedValues.map((selectedValueId, index) => {
              const selectedPoint = commonPoints.find(
                (point) => point.id === selectedValueId
              );
              return (
                <li key={index} className="text-sm list-none">
                  {selectedPoint?.contenu}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {selectedValues.length > 0 && (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-secondary text-white font-medium mt-4 transition-colors"
        >
          Valider
        </button>
      )}
    </div>
  );
}
