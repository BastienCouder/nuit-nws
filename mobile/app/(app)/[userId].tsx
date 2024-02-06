import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import * as React from "react";
import { View, Text } from "@/components/Themed";
import { useAppDispatch, useAppSelector } from "@/hook/useHooks";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { fetchUserById } from "@/features/user/getUserByIdThunk";

export default function UserScreen() {
  const { userId }: any = useLocalSearchParams();
  const { userDetails, status, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === "dark" ? "dark" : "light"];

  React.useEffect(() => {
    if (status === "idle" && userId) {
      dispatch(fetchUserById(userId));
    }
    console.log(userDetails);
  }, [status, dispatch, userId]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
    },
    points: {
      fontSize: 20,
    },
    button: {
      backgroundColor: themeColors.secondary,
      borderRadius: 10,
      paddingVertical: 12,
      width: "80%",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  let content;

  if (status === "loading") {
    content = <ActivityIndicator size="large" color={themeColors.primary} />;
  } else if (status === "failed") {
    content = (
      <Text
        style={{
          color: themeColors.primary,
          fontFamily: "FiraSans",
          paddingHorizontal: 20,
        }}
      >
        Erreur lors du chargement des détails de l'utilisateur : {error}
      </Text>
    );
  } else if (status === "succeeded" && userDetails) {
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
        <Pressable
          onPress={null}
          style={({ pressed }) => [
            styles.button,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: "FugazOne",
              fontSize: 20,
              color: themeColors.text,
            }}
          >
            Valider
          </Text>
        </Pressable>
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

  return <View style={styles.container}>{content}</View>;
}
