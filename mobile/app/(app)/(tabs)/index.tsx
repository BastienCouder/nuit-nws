import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/context/auth";
import Colors from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/hook/useHooks";
import { loadUserDetails } from "@/features/user/userSlice";
import React from "react";
import { Link } from "expo-router";

export default function TabOneScreen() {
  const { signOut } = useAuth();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === "dark" ? "dark" : "light"];

  const { userDetails, status, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadUserDetails());
  }, [dispatch]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop:40,
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

  let content;

  if (status === "loading") {
    content = <ActivityIndicator size="large" color={themeColors.primary} />;
  } else if (error) {
    content = (
      <Text
        style={{
          color: themeColors.primary,
          fontFamily: "FiraSans",
          paddingHorizontal: 20,
        }}
      >
        Erreur: {error}
      </Text>
    );
  } else if (userDetails) {
    content = (
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
          <Text style={styles.scoreTitle}>Score</Text>
          <Text style={styles.points}>
            {userDetails.score} {userDetails.score > 1 ? "points" : "point"}
          </Text>
        </View>
      </View>
    );
  } else {
    content = (
      <Text
        style={{
          color: themeColors.primary,
          fontFamily: "FiraSans",
          paddingHorizontal: 20,
        }}
      >
        Aucun détail d'utilisateur trouvé.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {content}
      <Pressable onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </Pressable>
    </View>
  );
}
