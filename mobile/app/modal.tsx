import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import { Link } from "expo-router";
import themeColors from "@/constants/Colors";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/logo-help.svg")} style={{width:320,height:80,objectFit:"contain"}}/>
      <Text style={styles.description}>
        <Text>1. Rencontrez des participants</Text>
        <Text>2. Scannez leur QR Code</Text>
        <Text>
          3. Discutez et trouvez jusqu’à 3 points communs dans la liste
        </Text>
        <Text>4. Remportez le plus de points !</Text>
      </Text>
      <Text style={styles.intent}>
        <Text>Scannez</Text>
        <Text>Trouvez</Text>
        <Text>Gagnez !</Text>
      </Text>
      <Link href={"/"} asChild>
        <Pressable>
          <Text style={styles.buttonText}>C'est parti !</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: themeColors.background,
    gap: 40,
  },
  description: {
    fontSize: 20,
    display: "flex",
    gap: 20,
    flexDirection: "column",
    fontFamily: "FugazOne",
    paddingHorizontal: 20,
    color: themeColors.text,
  },
  intent: {
    display: "flex",
    flexDirection: "column",
    fontSize: 28,
    fontFamily: "FugazOne",
    textAlign: "center",
    color: themeColors.text,
  },
  buttonText: {
    color: themeColors.text,
    fontFamily: "FugazOne",
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: themeColors.secondary,
    borderRadius: 10,
    width:"100%",
    overflow: "hidden",
  },
});
