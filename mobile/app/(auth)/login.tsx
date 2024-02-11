import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "@/context/auth";
import { QRTOKEN } from "@env";
import themeColors from "@/constants/Colors";

export default function LoginScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const { signIn } = useAuth();
  
  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleQRCodeScan = () => {
    setIsScanning(true);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch('https://nuit-nws.bastiencouder.com/auth/login/qr', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrToken: `${QRTOKEN}`}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      
      const data = await response.json();
      const { token, user } = data;
      
      signIn(token, user);
    } catch (error) {
      console.error("Error during connection:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
          source={require("@/assets/images/logo.svg")}
          style={{width:250, height: 255,objectFit:"contain" }}
        />
      {isScanning ? (
        // <QRCodeScanner
        //   onDone={() => setIsScanning(false)}
        //   onStopScan={handleStopScan}
        // />
        <></>
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