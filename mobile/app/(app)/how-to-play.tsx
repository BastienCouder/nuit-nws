import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Import de useRouter depuis expo-router

const HowToPlayScreen = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to Play</Text>
      {/* Texte supplémentaire */}
      <Text style={styles.description}>
        Rencontrez des participants{"\n"}
        Scannez leur QR Code{"\n"}
        Discutez et trouvez jusqu’à 3 points communs dans la liste{"\n"}
        Remportez le plus de points !
      </Text>
      <View style={styles.separator} />
      {/* Texte pressable pour "Scannez Trouvez Gagnez" */}
      <Text style={styles.description}>
        Scannez Trouvez Gagnez
      </Text>
      {/* Bouton "C'est parti !" qui utilise la fonction handleNavigateToIndexScreen */}
    <Link href={"/(app)/(tabs)/"}>
    <Text style={styles.buttonText}>C'est parti !</Text>
    </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 20,
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default HowToPlayScreen;
