import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import themeColors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { API_URL } from "@/lib/utils";
import { User } from "@/types";

export default function TabOneScreen() {
  const [user, setUser] = useState<User>();

  const loadUserDetails = async () => {
    try {
      const user = await AsyncStorage.getItem("userDetails");
      if (user) {
        const userDetails: User = JSON.parse(user);
        const response = await fetch(`${API_URL}/user/${userDetails.qrToken}`);
        if (!response.ok) {
          throw new Error("Erreur réseau");
        }
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données : ", error);
    }
  };
  loadUserDetails();

  const router = useRouter();

  React.useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        router.replace("/(auth)/login");
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profil</Text>
        <View style={styles.details}>
          <Text style={styles.detailItem}>{user?.prenom}</Text>
          <Text style={styles.detailItem}>{user?.nom}</Text>
          <Text style={styles.detailItem}>{user?.entreprise}</Text>
          <Text style={styles.detailItem}>{user?.poste}</Text>
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
            {user?.score} {user && user?.score > 1 ? "points" : "point"}
          </Text>
        </View>
      </View>

      {/* <Pressable style={styles.button} onPress={() => dispatch(logout())}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </Pressable> */}
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
    paddingBottom: 55,
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
  error: {
    color: themeColors.primary,
    fontFamily: "FiraSans",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "FugazOne",
    fontSize: 25,
    color: themeColors.text,
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
