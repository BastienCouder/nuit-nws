import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeColors from "@/constants/Colors";
import { useAuth } from "@/context/auth";
import { User } from "@/types";

export default function TabOneScreen() {
  const { signOut } = useAuth();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUserDetailsFromStorage = async () => {
    setLoading(true);
    try {
      const storedUserDetails = await AsyncStorage.getItem("userDetails");
      if (storedUserDetails) {
        setUserDetails(JSON.parse(storedUserDetails));
      } else {
        setUserDetails(null);
        setError("Aucun détail d'utilisateur trouvé.");
      }
    } catch (err) {
      setError("Erreur lors de la récupération des détails de l'utilisateur.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadUserDetailsFromStorage();
  }, [setLoading]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={themeColors.primary} />
      ) : error ? (
        <Text
          style={{
            color: themeColors.primary,
            fontFamily: "FiraSans",
            paddingHorizontal: 20,
          }}
        >
          Erreur: {error}
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
          <View style={styles.score}>
            <Text
              style={{
                fontFamily: "FugazOne",
                fontSize: 25,
                color: themeColors.background,
              }}
            >
              Score
            </Text>
            <Text
              style={{
                fontFamily: "FugazOne",
                fontSize: 20,
                color: themeColors.background,
              }}
            >
              {userDetails.score} {userDetails.score > 1 ? "points" : "point"}
            </Text>
          </View>
        </View>
      ) : (
        <Text
          style={{
            color: themeColors.primary,
            fontFamily: "FiraSans",
            paddingHorizontal: 20,
          }}
        >
          Aucun détail d'utilisateur trouvé.
        </Text>
      )}
      <Pressable onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
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
  scoreTitle: {
    textTransform: "uppercase",
    fontSize: 25,
    color: themeColors.background,
  },
  points: {
    fontSize: 20,
    color: themeColors.background,
  },
  button: {
    padding: 5,
    borderColor: themeColors.primary,
    borderWidth: 2,
    marginTop: 20,
    borderRadius: 5,
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: "FugazOne",
    fontSize: 20,
    textAlign: "center",
    color: themeColors.primary,
  },
});
