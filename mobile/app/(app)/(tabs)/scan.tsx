import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import themeColors from '@/constants/Colors';

export default function TabScanScreen() {

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
     
      <Link
  href={
    {
      pathname: "user/[userId]",
      params: { userId: 4 },
    } as never
  }
>
  <Text >Voir Profil</Text>
</Link>
      </View>
      <Text style={styles.info }>
        Scannez le QR Code d'une personne
      </Text>
    </View>
  );
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    backgroundColor:themeColors.background
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
    position:"relative",
  },
  buttonContainer: {
    margin: 20,
  },
  info: {
    fontSize: 25,
    textAlign: "center",
    color: themeColors.text,
    paddingHorizontal: 20,
    fontFamily:"FiraSansBold"
  },
});


