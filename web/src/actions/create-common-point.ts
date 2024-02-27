"use server";
import { API_URL } from "@/lib/utils";

export async function submitCommonPointsSelections(
  userId: number,
  commonPointsIds: number[]
): Promise<string | null> {
  try {
    const response = await fetch(`${API_URL}/selectUser/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commonPointsIds }),
    });
    const result = await response.json();

    if (!response.ok) {
      return "Erreur lors de la soumissions des sélections.";
    }

    return result;
  } catch (error: any) {
    console.error("Erreur lors de la soumission:", error.message);
    return null;
  }
}
