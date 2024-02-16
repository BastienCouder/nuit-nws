import { API_URL } from "@/lib/utils";
import { Alert } from "react-native";


interface CommonPointSelectionResponse {
  commonContents: string[];
  scoreUpdate: number;
}

interface ErrorResponse {
  error: string;
}

export const submitCommonPointsSelections = async (
  userId: number,
  commonPointsIds: number[]
): Promise<Response> => {
  try {
    const response = await fetch(`${API_URL}/selectUser/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commonPointsIds }),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la soumission des sélections.');
    }

    Alert.alert("Succès", "Les sélections ont été mises à jour avec succès.");
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la soumission:", error.message);
    Alert.alert("Erreur", error.message);
    return error
  }
};

export const compareUserSelections = async (
  userId1: number,
  userId2: number
): Promise<CommonPointSelectionResponse| null> => {
  try {
    const response = await fetch(`${API_URL}/selectUser/compare/${userId1}/${userId2}`);
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la comparaison des sélections.');
    }
    const result: CommonPointSelectionResponse = await response.json();
    console.log("Comparaison réussie:", result);
    return result;
  } catch (error: any) {
    console.error("Erreur lors de la comparaison des sélections:", error);
    Alert.alert("Erreur", error.message);
    return null;
  }
};
