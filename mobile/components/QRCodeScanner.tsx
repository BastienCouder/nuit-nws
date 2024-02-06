import { useAuth } from '@/context/auth';
import { API_URL } from '@env';
import { Camera, CameraType } from 'expo-camera';
import { useCallback, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface QRCodeScannerProps {
  onDone: () => void;
  onStopScan: () => void;
}

export default function QrCodeScanner({onDone,
  onStopScan}:QRCodeScannerProps) {
    const { signInWithToken } = useAuth();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  interface BarCodeEvent {
    type: string;
    data: string;
  }
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


  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={onStopScan}>
        <Text>Stop Scanning</Text>
      </TouchableOpacity>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    height:120
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
