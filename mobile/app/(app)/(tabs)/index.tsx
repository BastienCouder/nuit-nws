import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  ViewStyle,
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

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadUserDetails());
  }, [dispatch]);

  if (!user) {
    return <ActivityIndicator />;
  }

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
  });

  return (
    <View style={styles.container}>
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
          <Text style={[styles.detailItem, { fontFamily: "FiraSans" }]}>
            {user.prenom}
          </Text>
          <Text style={[styles.detailItem, { fontFamily: "FiraSans" }]}>
            {user.nom}
          </Text>
          <Text style={[styles.detailItem, { fontFamily: "FiraSans" }]}>
            {user.entreprise}
          </Text>
          <Text style={[styles.detailItem, { fontFamily: "FiraSans" }]}>
            {user.poste}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.score}>
          <Text
            style={[
              styles.scoreTitle,
              { fontFamily: "FugazOne" },
              { color: themeColors.background },
            ]}
          >
            score
          </Text>
          <Text
            style={[
              styles.points,
              { fontFamily: "FugazOne" },
              { color: themeColors.background },
            ]}
          >
            {user.score} {user.score > 1 ? "points" : "point"}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={signOut}
        style={({ pressed }) => [
          { padding: 5, borderColor: themeColors.primary, borderWidth: 2 ,marginTop:20},
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
      >
        <Text
          style={{
            fontFamily: "FugazOne",
            fontSize: 20,
            textAlign: "center",
            color: themeColors.primary,
          }}
        >
          déconnexion
        </Text>
      </Pressable>
      <Link
        href={{
          pathname: "/[userId]",
          params: { userId: 5 }
        }as never}>
      <Text
          style={{
            fontFamily: "FugazOne",
            fontSize: 20,
            textAlign: "center",
            color: themeColors.primary,
          }}
        >
       userid
        </Text>
      </Link>
    </View>
  );
}
