import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import themeColors from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchAndUpdateUserData } from "@/features/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const refreshUserData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        dispatch(fetchAndUpdateUserData(Number(userId)));
      }
    };

    refreshUserData();
  }, [dispatch]);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={themeColors.primary} />
      ) : error ? (
        <Text style={styles.error}>Erreur: {error}</Text>
      ) : (
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
      )}
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
