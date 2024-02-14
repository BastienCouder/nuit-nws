import { useState, useCallback } from "react";
import { StyleSheet, Alert, View, TouchableOpacity, Text } from "react-native";

import CameraComponent from "./CameraComponent";
import themeColors from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { authenticateUser } from "@/features/AuthSlice";

interface QRCodeScannerProps {
  onDone: () => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  onDone,
}) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);

  const handleBarCodeScanned = useCallback(
    async ({ type, data }: { type: string; data: string }) => {
      if (isAuthenticated) return;
      dispatch(authenticateUser(data));
      onDone();
    },
    [dispatch, isAuthenticated, onDone]
  );


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
        {/* <CameraView
        style={styles.camera}
        type={facing}
        onBarcodeScanned={handleBarCodeScanned}
      /> */}
        <CameraComponent handleBarCodeScanned={handleBarCodeScanned}/>
      </View>
      <Text style={styles.info}>
        Scannez votre QR Code pour participer
      </Text>
    </View>
  );
};

export default QRCodeScanner;

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
    marginTop:-60
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap:20,
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
    position: "relative",
  },
  buttonContainer: {
    margin: 20,
  },
  info: {
    fontSize: 30,
    textAlign: "center",
    color: themeColors.text,
    paddingHorizontal: 20,
    fontFamily: "FiraSansBold"
  },
});
