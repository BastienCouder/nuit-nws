import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Alert, View, TouchableOpacity, Button, Text } from "react-native";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera/next";
import { useAuth } from "@/context/auth";

interface QRCodeScannerProps {
  onDone: () => void;
  onStopScan: () => void;
}

interface BarCodeEvent {
  type: string;
  data: string;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onDone, onStopScan }) => {
  const { signInWithToken } = useAuth();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        const response = await fetch("http://172.16.27.141:5000/auth/login/qr", {
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

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} type={facing} onBarcodeScanned={handleBarCodeScanned} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
        </TouchableOpacity>
      </View>
      <Button title="Stop Scanning" onPress={onStopScan} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
  },
  camera: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    borderRadius: 20, 
  },
  buttonContainer: {
    margin: 20,
  },
});

export default QRCodeScanner;
