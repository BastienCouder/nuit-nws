"use server";
import { API_URL } from "@/lib/utils";
import { revalidatePath } from "next/cache";

interface CommonPointSelectionResponse {
  commonContents: string[];
  scoreUpdate: number;
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
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Erreur lors de la comparaison des sélections."
      );
    }
    revalidatePath("/");
    const result: CommonPointSelectionResponse = await response.json();
    return result;
  } catch (error: any) {
    console.error("Erreur lors de la comparaison des sélections:", error);
    return null;
  }
};
