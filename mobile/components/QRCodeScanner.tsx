import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Alert,
  View,
  TouchableOpacity,
  Button,
  Text,
  useColorScheme,
  Platform,
} from "react-native";

import { CameraView, useCameraPermissions, CameraType } from "expo-camera/next";
import { useAuth } from "@/context/auth";
import Colors from "@/constants/Colors";
import { API_URL } from "@env";

interface QRCodeScannerProps {
  onDone: () => void;
  onStopScan: () => void;
}

interface BarCodeEvent {
  type: string;
  data: string;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  onDone,
  onStopScan,
}) => {
  const { signInWithToken } = useAuth();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === "dark" ? "dark" : "light"];

  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, [permission, requestPermission]);

  const handleBarCodeScanned = useCallback(
    async ({ type, data }: BarCodeEvent) => {
      if (isAuthenticated) return;
      try {
        const response = await fetch(`${API_URL}}/auth/login/qr`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qrToken: data }),
        });

        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }

        const { token, user } = await response.json();

        setIsAuthenticated(true);
        signInWithToken(token, user);
        onDone();
      } catch (error) {
        console.error("Error during connection:", error);
        Alert.alert("Error", "Connection problem. Please try again.");
        onDone();
      }
    },
    [signInWithToken, onDone]
  );

  if (!permission?.granted) {
    return (
      <View>
        <Text>Requesting for camera permission...</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
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
    },
    camera: {
      width: 250,
      height: 250,
      alignSelf: "center",
      borderRadius: 20,
      marginTop: 20,
    },
    buttonContainer: {
      margin: 20,
    },
    info: {
      fontSize: 30,
      textAlign: "center",
      color: themeColors.text,
      paddingHorizontal: 20,
    },
  });

  // const cameraContent = Platform.select({
  //   ios: (
  //     <CameraView
  //       style={styles.camera}
  //       type={facing}
  //       onBarcodeScanned={handleBarCodeScanned}
  //     />
  //   ),
  //   android: (
  //     <CameraView
  //       style={styles.camera}
  //       type={facing}
  //       onBarcodeScanned={handleBarCodeScanned}
  //     />
  //   ),
  //   default: (
  //     <Text
  //       style={{
  //         fontFamily: "FiraSans",
  //         fontSize: 15,
  //         color: themeColors.primary,
  //         textAlign:"center",
  //         marginVertical:10
  //       }}
  //     >
  //       La caméra n'est pas disponible sur cette plateforme.
  //     </Text>
  //   ),
  // });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onStopScan}>
        <Text>Stop Scanning</Text>
      </TouchableOpacity>
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
        <CameraView
        style={styles.camera}
        type={facing}
        onBarcodeScanned={handleBarCodeScanned}
      />
      </View>
      <Text style={[styles.info, { fontFamily: "FiraSansBold" }]}>
        Scannez votre QR Code pour participer{" "}
      </Text>
    </View>
  );
};

export default QRCodeScanner;