import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import themeColors from "@/constants/Colors";
import { CommonPoint, User } from "@/types";
import TabLayout, { TabBarIcon } from "../_layout";

export default function UserScreen() {
  const { userId } = useLocalSearchParams();
  const [userDetails, setUserDetails] = React.useState<User | null>(null);
  const [commonPoints, setCommonPoints] = React.useState<CommonPoint[]>([]);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  const [completeScrollBarHeight, setCompleteScrollBarHeight] =
    React.useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = React.useState(0);

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight) /
        completeScrollBarHeight
      : visibleScrollBarHeight;

  const [isVisible, setIsVisible] = React.useState<boolean>(false); // État pour gérer la visibilité

  // Modification de toggleSelection pour limiter à 3 sélections
  const toggleSelection = (value: string) => {
    setSelectedValues((currentValues) => {
      const isAlreadySelected = currentValues.includes(value);
      if (isAlreadySelected) {
        return currentValues.filter((item) => item !== value);
      } else {
        // Ajouter la sélection seulement si moins de 3 sont déjà sélectionnés
        return currentValues.length < 3
          ? [...currentValues, value]
          : currentValues;
      }
    });
  };
  const fetchUserDetails = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `https://nuit-nws.bastiencouder.com/user/${userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserDetails(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(`Erreur lors du chargement des détails de l'utilisateur.`);
    }
  };

  const fetchCommonPoints = async () => {
    try {
      const response = await fetch(
        `https://nuit-nws.bastiencouder.com/commonPoint`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCommonPoints(data);
    } catch (error) {
      console.error(error);
      setError(`Erreur lors du chargement des points communs.`);
    }
  };

  React.useEffect(() => {
    fetchUserDetails();
    fetchCommonPoints();
  }, [userId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={themeColors.primary} />
      ) : error ? (
        <Text style={{ color: themeColors.primary, paddingHorizontal: 20 }}>
          Erreur lors du chargement des détails de l'utilisateur : {error}
        </Text>
      ) : userDetails ? (
        <View style={styles.card}>
          <Text
            style={{
              fontFamily: "FugazOne",
              fontSize: 25,
              color: themeColors.text,
            }}
          >
            Profil
          </Text>
          <View style={styles.details}>
            <Text style={styles.detailItem}>{userDetails.prenom}</Text>
            <Text style={styles.detailItem}>{userDetails.nom}</Text>
            <Text style={styles.detailItem}>{userDetails.entreprise}</Text>
            <Text style={styles.detailItem}>{userDetails.poste}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.selectContainer}>
            <Pressable
              style={styles.toggleButton}
              onPress={() => setIsVisible(!isVisible)}
            >
              <Text style={styles.toggleButtonText}>
                {isVisible
                  ? "Masquer les points communs"
                  : "Afficher les points communs"}
              </Text>
            </Pressable>

            {isVisible && !loading && commonPoints.length > 0 && (
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingRight: 14 }}
                showsVerticalScrollIndicator={false}
              >
                {commonPoints.map((point, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => toggleSelection(point.contenu)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        selectedValues.includes(point.contenu)
                          ? styles.checkboxSelected
                          : styles.checkboxUnselected,
                      ]}
                    >
                      {selectedValues.includes(point.contenu) && (
                        <Text style={styles.checkboxIcon}></Text>
                      )}
                    </View>
                    <Text style={styles.optionText}>{point.contenu}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {/* Affichage des sélections en dessous du bouton toggle */}
            {selectedValues.length > 0 && (
              <View style={styles.selectedValuesContainer}>
                {selectedValues.map((value, index) => (
                  <Text key={index} style={styles.selectedValue}>
                    {value}
                  </Text>
                ))}
              </View>
            )}

            <Pressable style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Valider</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Text style={{ color: themeColors.primary, paddingHorizontal: 20 }}>
          Aucun détail d'utilisateur trouvé.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    backgroundColor: themeColors.background,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "80%",
    borderColor: themeColors.primary,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: themeColors.background,
    maxWidth: 450,
  },
  details: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: themeColors.background,
  },
  detailItem: {
    fontSize: 18,
    marginBottom: 5,
    textTransform: "capitalize",
    color: themeColors.text,
  },
  separator: {
    alignSelf: "stretch",
    borderBottomColor: themeColors.primary,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  score: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: themeColors.primary,
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: themeColors.secondary,
  },
  checkboxSelected: {
    backgroundColor: themeColors.secondary,
  },
  checkboxUnselected: {
    backgroundColor: "transparent",
  },
  checkboxIcon: {
    color: "white",
    fontSize: 14,
  },
  selectedValuesContainer: {
    gap: 10,
  },
  selectedValue: {
    backgroundColor: themeColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 12,
    color: themeColors.background,
    fontFamily:"FiraSansBold"
  },
  toggleButton: {
    padding: 10,
    backgroundColor: themeColors.secondary,
    borderRadius: 5,
  },
  toggleButtonText: {
    fontFamily:"FiraSansBold",
    fontSize: 18,
    textAlign: "center",
    color: themeColors.text,
  },
  button: {
    zIndex: 1,
    backgroundColor: themeColors.secondary,
    borderRadius: 10,
    paddingVertical: 12,
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "FugazOne",
    fontSize: 20,
    textAlign: "center",
    color: themeColors.text,
  },
  selectContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  scrollView: {
    top: 50,
    position: "absolute",
    zIndex: 9999,
    maxHeight: 200,
    backgroundColor: themeColors.text,
    borderRadius: 15,
    width:"130%"
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,

  },
  optionText: {
    backgroundColor: "#e2e2e2",
    gap: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flex: 1,
    fontSize: 12,
    fontFamily:"FiraSansBold"
  },
});
