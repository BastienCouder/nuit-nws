import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { RootState } from "@/app/store";
import { useAppDispatch, useAppSelector } from "@/hook/useHooks";
import Colors from "@/constants/Colors";
import { fetchRankings } from "@/features/rank/getRankingThunk";
import { loadUserDetails } from "@/features/user/userSlice";
import { Rank } from "@/types";

export default function TabRankingScreen() {
  const rankingState = useAppSelector((state: RootState) => state.ranking);
  const userState = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === "dark" ? "dark" : "light"];

  React.useEffect(() => {
    if (rankingState.status === "idle") {
      dispatch(fetchRankings());
    }
    if (userState.status === "idle") {
      dispatch(loadUserDetails());
    }
  }, [dispatch, rankingState.status, userState.status]);

  const userRanking = React.useMemo(
    () =>
      rankingState.rankings.find(
        (rank:Rank) => rank.userId === userState.userDetails?.id
      ),
    [rankingState.rankings, userState.userDetails]
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center", // Centrer horizontalement
      justifyContent: "flex-start",
      paddingTop: 40,
      backgroundColor: themeColors.background,
    },
    rankingItem: {
      paddingHorizontal: 20,
      paddingVertical: 10, // Espacement vertical entre les éléments
      borderColor: themeColors.primary,
      borderWidth: 1,
      borderRadius: 5,
      marginVertical: 5, // Espacement vertical entre les éléments de la liste
      alignItems: "center",
      justifyContent: "center",
    },
    rankingText: {
      fontFamily: "FiraSans",
      fontSize: 18,
      color: themeColors.primary,
    },
    userRanking: {
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
      borderColor: themeColors.primary,
      borderWidth: 1,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      width: "90%", // Ajuster la largeur pour bien centrer
    },
    userRankingText: {
      fontFamily: "FiraSans",
      fontSize: 18,
      color: themeColors.primary,
    },
  });

  let content;

  if (rankingState.status === "loading" || userState.status === "loading") {
    content = <ActivityIndicator size="large" color={themeColors.primary} />;
  } else if (
    rankingState.status === "failed" ||
    userState.status === "failed"
  ) {
    content = (
      <Text
        style={{
          color: themeColors.primary,
          fontFamily: "FiraSans",
          paddingHorizontal: 20,
        }}
      >
        Erreur lors du chargement : {rankingState.error || userState.error}
      </Text>
    );
  } else if (
    rankingState.status === "succeeded" &&
    userState.status === "succeeded"
  ) {
    if (rankingState.rankings && rankingState.rankings.length > 0) {
      // Afficher la liste si les classements sont chargés
      content = (
        <View>
          <FlatList
            data={rankingState.rankings.slice(0, 3)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.rankingItem}>
                <Text style={styles.rankingText}>
                  {item.position} {item.user.nom} {item.user.prenom}
                </Text>
              </View>
            )}
          />
          {userRanking && userState.userDetails && (
            <View style={styles.userRanking}>
              <Text style={styles.userRankingText}>
                {userRanking.position} {userState.userDetails.nom}
                {userState.userDetails.prenom}
              </Text>
            </View>
          )}
        </View>
      );
    } else {
      // Afficher un message si aucun classement n'est disponible
      content = (
        <Text
          style={{
            color: themeColors.primary,
            fontFamily: "FiraSans",
            paddingHorizontal: 20,
          }}
        >
          Aucun classement pour le moment.
        </Text>
      );
    }
  }

  return <View style={styles.container}>{content}</View>;
}
