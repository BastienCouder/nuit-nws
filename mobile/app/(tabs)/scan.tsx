import { StyleSheet, Text, View } from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";
import themeColors from "@/constants/Colors";
import CameraComponent from "@/components/CameraComponent";

export default function TabScanScreen() {
  const router = useRouter();

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    router.push({
      pathname: "/user/[token]",
      params: { token: data },
    });
  };

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
        <CameraComponent handleBarCodeScanned={handleBarCodeScanned} />
      </View>
      <Text style={styles.info}>Scannez le QR Code d'une personne</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    backgroundColor: themeColors.background,
    paddingBottom: 55,
    paddingTop: 40,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "80%",
    borderColor: themeColors.primary,
    borderWidth: 2,
    borderRadius: 10,
    gap: 20,
    backgroundColor: themeColors.background,
  },
  camera: {
    width: 250,
    height: 250,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 20,
    position: "relative",
  },
  buttonContainer: {
    margin: 20,
  },
  info: {
    fontSize: 25,
    textAlign: "center",
    color: themeColors.text,
    paddingHorizontal: 20,
    fontFamily: "FiraSansBold",
  },
});
