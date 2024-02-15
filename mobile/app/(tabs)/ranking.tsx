import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import themeColors from "@/constants/Colors";
import { Rank } from "@/types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";
import { fetchRanks } from "@/features/RankSlice";
import { useLoadAuthState } from "@/hook/useUserDetailsFromStorage";

export default function TabRankingScreen() {
  const dispatch = useAppDispatch();
  const {
    ranks,
    loading: loadingRank,
    error,
  } = useAppSelector((state: RootState) => state.ranks);

  const { user: userDetails, loading: loadingUserDetails } = useAppSelector(
    (state: RootState) => state.auth
  );
console.log(userDetails);

  React.useEffect(() => {
    dispatch(fetchRanks());
  }, [dispatch]);

  useLoadAuthState();

  const isLoading = loadingRank || loadingUserDetails;

  const userRank = ranks.find((rank: Rank) => rank.user.id === userDetails?.id);
console.log(userDetails?.id);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("@/assets/images/rank.svg")}
          style={{ width: 80, height: 80, resizeMode: "contain" }}
        />
        <Text
          style={{
            fontFamily: "FugazOne",
            fontSize: 25,
            color: themeColors.text,
          }}
        >
          Classement
        </Text>

        {isLoading ? (
          <ActivityIndicator size="large" color={themeColors.primary} />
        ) : error ? (
          <Text style={styles.error}>Erreur: {error}</Text>
        ) : (
          <View style={{ gap: 20 }}>
            <FlatList
              data={ranks.slice(0, 3)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.rankingItem}>
                  <Text style={styles.rankingTextPosition}>
                    {item.position}
                  </Text>

                  <Text style={styles.rankingTextName}>
                    {item.user.nom} {item.user.prenom}
                  </Text>
                </View>
              )}
            />
            <View style={styles.rankingYourItem}>
              <Text style={styles.rankingTextPosition}>
                {userRank?.position}
              </Text>
              <Text style={styles.rankingTextYourName}>vous</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
    color: themeColors.text,
    backgroundColor: themeColors.background,
    paddingBottom: 55,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 5,
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
  rankingItem: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: themeColors.primary,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 20,
  },
  rankingYourItem: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 5,
    flexDirection: "row",
    gap: 20,
    backgroundColor: themeColors.secondary,
  },
  rankingTextPosition: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "FugazOne",
    fontSize: 18,
    color: themeColors.text,
  },
  rankingTextName: {
    fontFamily: "FiraSans",
    fontSize: 18,
    color: themeColors.text,
  },
  userRanking: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: themeColors.primary,
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  rankingTextYourName: {
    fontFamily: "FugazOne",
    fontSize: 18,
    color: themeColors.text,
  },
  userRankingText: {
    fontFamily: "FiraSans",
    fontSize: 18,
    color: themeColors.primary,
  },
});