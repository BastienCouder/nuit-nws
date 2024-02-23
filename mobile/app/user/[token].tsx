import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import themeColors from "@/constants/Colors";
import {
  compareUserSelections,
  submitCommonPointsSelections,
} from "@/features/commonPointsSelection";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { fetchUserDetails } from "@/features/UserSlice";
import { fetchCommonPoints } from "@/features/CommonPointsSlice";
import { Route, useFocusEffect } from "expo-router";

interface tokenProps {
  route: any;
}
export default function UserScreen({ route }: tokenProps) {
  const { token } = route.params;

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const {
    userDetails,
    loading: userDetailsLoading,
    error: userDetailsError,
  } = useAppSelector((state: RootState) => state.user);

  useFocusEffect(() => {
    if (token) {
      dispatch(fetchUserDetails(String(token)));
    }
  });

  const {
    commonPoints,
    loading: commonPointsLoading,
    error: commonPointsError,
  } = useAppSelector((state: RootState) => state.commonPoints);

  React.useEffect(() => {
    dispatch(fetchCommonPoints());
  }, [dispatch]);

  const [selectedValues, setSelectedValues] = React.useState<number[]>([]);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const isLoading = userDetailsLoading || commonPointsLoading;
  const error = userDetailsError || commonPointsError;

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
      Alert.alert("Erreur", "Informations manquantes pour la soumission.");
      return;
    }

    try {
      const response = await submitCommonPointsSelections(
        userDetails.id,
        selectedValues
      );
      if (!response.ok) {
        throw new Error("La soumission des sélections a échoué.");
      }

      if (user) {
        await compareUserSelections(user.id, userDetails.id);
      }
      Alert.alert("Succès", "Sélections soumises avec succès.");
    } catch (error) {
      console.error("Erreur lors de la soumission: ", error);
      Alert.alert("Erreur", "Problème lors de la soumission des sélections.");
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#04061F",
          paddingTop: 20,
        }}
      >
        <Image source={require("@/assets/images/logo-layout.svg")} />
      </View>
      {isLoading ? (
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

            {isVisible && !isLoading && commonPoints.length > 0 && (
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingRight: 14 }}
                showsVerticalScrollIndicator={false}
              >
                {commonPoints.map((point, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => toggleSelection(point.id)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        selectedValues.includes(point.id)
                          ? styles.checkboxSelected
                          : styles.checkboxUnselected,
                      ]}
                    >
                      {selectedValues.includes(point.id) && (
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
                {selectedValues.map((selectedValueId, index) => {
                  const selectedPoint = commonPoints.find(
                    (point) => point.id === selectedValueId
                  );
                  return (
                    <Text key={index} style={styles.selectedValue}>
                      {selectedPoint?.contenu}
                    </Text>
                  );
                })}
              </View>
            )}

            <Pressable style={styles.button} onPress={handleSubmit}>
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
    paddingBottom: 55,
    backgroundColor: themeColors.background,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 40,
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
    fontFamily: "FiraSansBold",
  },
  toggleButton: {
    padding: 10,
    backgroundColor: themeColors.secondary,
    borderRadius: 5,
  },
  toggleButtonText: {
    fontFamily: "FiraSansBold",
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
    width: "130%",
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
    fontFamily: "FiraSansBold",
  },
});
