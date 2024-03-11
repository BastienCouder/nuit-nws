"use server";
import { API_URL } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function submitCommonPointsSelections(
  userId: number,
  userSelect: number,
  commonPointsIds: number[]
): Promise<string | null> {
  try {
    const response = await fetch(
      `${API_URL}/selectUser/${userId}/${userSelect}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commonPointsIds }),
      }
    );
    const result = await response.json();

    if (!response.ok) {
      return "Erreur lors de la soumissions des sélections.";
    }
    revalidatePath("/");
    return result;
  } catch (error: any) {
    console.error("Erreur lors de la soumission:", error.message);
    return null;
  }
}
