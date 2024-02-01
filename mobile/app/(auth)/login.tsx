import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/auth';
import QRCodeScanner from '@/components/QRCodeScanner'; // Assurez-vous que le chemin est correct

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [isScanning, setIsScanning] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {
        isScanning ? (
          <QRCodeScanner onDone={() => setIsScanning(false)}  onStopScan={handleStopScan}/>
          
        ) : (
          <>
            <Button title="Sign in" onPress={handleSignIn}></Button>
            <Button title="Scan QR Code" onPress={handleQRCodeScan}></Button>
          </>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
