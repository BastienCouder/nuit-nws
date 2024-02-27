"use server";
import { API_URL } from "@/lib/utils";

interface ErrorResponse {
  error: string;
}

export const submitCommonPointsSelections = async (
  userId: number,
  commonPointsIds: number[]
): Promise<Response> => {
  try {
    const response = await fetch(`${API_URL}/selectUser/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commonPointsIds }),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(
        errorData.error || "Erreur lors de la soumission des sélections."
      );
    }
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la soumission:", error.message);
    return error;
  }
};
