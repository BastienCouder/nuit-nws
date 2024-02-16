import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Html5Qrcode } from 'html5-qrcode';
import themeColors from '@/constants/Colors';

interface CameraComponentProps {
  handleBarCodeScanned?: ({ type, data }: { type: string; data: string; }) => Promise<void>;
}

export default function CameraComponent({ handleBarCodeScanned }:CameraComponentProps)  {
  const qrScannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let html5QrcodeScanner: Html5Qrcode;

    const initializeScanner = async () => {
      if (qrScannerRef.current) {
        html5QrcodeScanner = new Html5Qrcode(qrScannerRef.current.id);

        const config = {
          fps: 40,
          qrbox: { width: 250, height: 250 },
        };
        const cameraConfig = {
          facingMode: "environment",
        };

        const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
          console.log(`QR Code detected: ${decodedText}`, decodedResult);
          handleBarCodeScanned && handleBarCodeScanned({ type: decodedResult.result.format, data: decodedText });
        };

        const qrCodeErrorCallback = (errorMessage: string) => {
          console.log(`QR Code scanning error: ${errorMessage}`);
        };

        try {
          await html5QrcodeScanner.start(cameraConfig, config, qrCodeSuccessCallback, qrCodeErrorCallback);
        } catch (err) {
          console.log(`Unable to start QR Scanning: ${err}`);
        }
      }
    };

    setTimeout(() => {
      initializeScanner();
    }, 500); 

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.stop().then(() => {
          console.log("QR Scanning stopped.");
        }).catch(err => console.log(`Unable to stop QR Scanning: ${err}`));
      }
    };
  }, [handleBarCodeScanned]);

  return (
    <View style={styles.container}>
      <div id="qr-reader" ref={qrScannerRef} style={{ width: '250px', height: '280px' }}></div>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: themeColors.background,
  },
});

