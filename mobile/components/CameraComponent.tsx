import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface CameraComponentProps {
  handleBarCodeScanned?: (scanResult: any) => void; // Ajustez selon le type approprié
}

const CameraComponent: React.FC<CameraComponentProps> = ({ handleBarCodeScanned }) => {
  // Utilisation directe de RNCamera.Constants pour accéder à Type et FlashMode
  // const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);

  // const toggleCameraType = () => {
  //   setCameraType((prevCameraType: any) =>
  //     prevCameraType === RNCamera.Constants.Type.back
  //       ? RNCamera.Constants.Type.front
  //       : RNCamera.Constants.Type.back,
  //   );
  // };



  return (
    <View style={styles.container}>
      {/* <RNCamera
        style={styles.camera}
        type={cameraType}
        flashMode={RNCamera.Constants.FlashMode.auto}
        onBarCodeRead={handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
        </View>
      </RNCamera> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flex: 0,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default CameraComponent;
