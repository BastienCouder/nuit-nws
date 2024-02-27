import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import themeColors from "@/constants/Colors";
import QRCodeScanner from "@/components/ScanLogin";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const checkAuthentication = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        router.replace("/modal");
      }
    };

    checkAuthentication();
  }, [router]);

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleQRCodeScan = () => {
    setIsScanning(true);
  };

  return (
    <View style={styles.container}>
      {isScanning ? (
        <>
          <Pressable onPress={handleStopScan}>
            <Image
              source={require("@/assets/images/logo-layout.svg")}
              style={{ marginTop: 20 }}
            />
          </Pressable>
          <QRCodeScanner onDone={() => setIsScanning(false)} />
        </>
      ) : (
        <>
          <Image
            source={require("@/assets/images/logo.svg")}
            style={{
              width: 250,
              height: 255,
              objectFit: "contain",
              marginTop: -80,
            }}
          />
          <View
            style={{ backgroundColor: "blue", borderRadius: 10, width: "80%" }}
          >
            <Pressable
              onPress={handleQRCodeScan}
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
                  textAlign: "center",
                  color: themeColors.text,
                }}
              >
                Connexion
              </Text>
            </Pressable>
          </View>
          <View
            style={{ backgroundColor: "blue", borderRadius: 10, width: "80%" }}
          >
            {/* <Pressable
              onPress={handleLogin}
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
                  textAlign: "center",
                  color: themeColors.text,
                }}
              >
                Connexion
              </Text>
            </Pressable> */}
          </View>
          <Text
            style={[
              {
                fontFamily: "FugazOne",
                color: themeColors.primary,
                fontSize: 33,
              },
            ]}
          >
            La nuit de la NWS
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeColors.background,
    gap: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: themeColors.primary,
  },
  button: {
    backgroundColor: themeColors.secondary,
    borderRadius: 10,
    paddingVertical: 20,
  },
});
