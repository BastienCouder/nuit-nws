import React, { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import QRCodeScanner from "@/components/QRCodeScanner";
import Colors from "@/constants/Colors";
import { useAuth } from "@/context/auth";

export default function LoginScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === "dark" ? "dark" : "light"];
  const { signIn } = useAuth();
  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleQRCodeScan = () => {
    setIsScanning(true);
  };

  const handleSignIn = () => {
    // Logique pour se connecter sans QR code
    signIn();
  };

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

  return (
    <View style={styles.container}>
      {isScanning ? (
        <QRCodeScanner
          onDone={() => setIsScanning(false)}
          onStopScan={handleStopScan}
        />
      ) : (
        <>
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
                }}
              >
                Connexion
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSignIn}
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
                }}
              >
                Connexion
              </Text>
            </Pressable>
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
