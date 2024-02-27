"use server";
import { API_URL } from "@/lib/utils";

interface CommonPointSelectionResponse {
  commonContents: string[];
  scoreUpdate: number;
}

interface ErrorResponse {
  error: string;
}

export const compareUserSelections = async (
  userId1: number,
  userId2: number
): Promise<CommonPointSelectionResponse | null> => {
  try {
    const response = await fetch(
      `${API_URL}/selectUser/compare/${userId1}/${userId2}`
    );
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(
        errorData.error || "Erreur lors de la comparaison des sélections."
      );
    }
    const result: CommonPointSelectionResponse = await response.json();
    console.log("Comparaison réussie:", result);
    return result;
  } catch (error: any) {
    console.error("Erreur lors de la comparaison des sélections:", error);
    return null;
  }
};
