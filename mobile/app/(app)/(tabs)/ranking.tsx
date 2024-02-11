import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import themeColors from "@/constants/Colors";
import { Rank, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabRankingScreen() {
  const [dataRank, setDataRank] = useState<Rank[]>([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const resp = await fetch("https://nuit-nws.bastiencouder.com/rank");
      const data = await resp.json();
      setDataRank(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchData();
    loadUserDetailsFromStorage();
  }, [setLoading]);

  const userRank = dataRank.find((rank) => rank.user.id === userDetails?.id);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Image
          source={require("@/assets/images/rank.svg")}
          style={{width:80, height: 80,objectFit:"contain" }}
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

        {loading ? (
          <ActivityIndicator size="large" color={themeColors.primary} />
        ) : dataRank.length > 0 && userDetails && userRank ? (
          <View style={{ gap: 20 }}>
            <FlatList
              data={dataRank.slice(0, 3)}
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
                {userRank.position}
              </Text>
              <Text style={styles.rankingTextYourName}>vous</Text>
            </View>
          </View>
        ) : (
          <Text style={{ color: themeColors.primary, paddingHorizontal: 20 }}>
            Aucun classement pour le moment.
          </Text>
        )}
      </View>
      <Image
          source={require("@/assets/images/podium.svg")}
          style={{ marginTop: 20 }}
        />
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
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap:5,
    width: "80%",
    borderColor: themeColors.primary,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: themeColors.background,
    maxWidth: 450,
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
