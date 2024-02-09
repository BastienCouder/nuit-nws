import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'; // Import Pressable
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

const HowToPlayScreen = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  // Obtenir la largeur de l'écran
  const screenWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingTop: 40,
      backgroundColor: themeColors.background,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: "FugazOne",
      textAlign: 'center', // Centrer le texte
      marginBottom: 20, // Espacement en bas
    },
    description: {
      fontSize: 20,
      fontFamily: "FugazOne",
      padding: 20, // Réduire le padding
      textAlign: 'center', // Centrer le texte
    },
    separator: {
      height: 1,
      width: '80%',
      marginBottom: 20, // Espacement en bas
    },
    intent: {
      fontSize: 32,
      fontFamily: "FugazOne",
      padding: 20, // Réduire le padding
      textAlign: 'center', // Centrer le texte
    },
    buttonText: {
      fontFamily: "FugazOne",
      fontSize: 24, // Réduire la taille du texte
      textAlign: "center",
      paddingHorizontal: screenWidth * 0.1, // Ajuster la largeur du bouton en fonction de la largeur de l'écran
      paddingVertical: 10, // Réduire le padding vertical
      backgroundColor: themeColors.secondary,
      borderRadius: 10,
      overflow: 'hidden',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColors.primary }]}>Comment ça marche ?</Text>
      <Text style={[styles.description, { color: themeColors.text }]}>
        <Text>1. Rencontrez des participants</Text>{"\n"}{"\n"}
        <Text>2. Scannez leur QR Code</Text>{"\n"}{"\n"}
        <Text>3. Discutez et trouvez jusqu’à 3 points communs dans la liste</Text>{"\n"}{"\n"}
        <Text>4. Remportez le plus de points !</Text>
      </Text>
      <View style={[styles.separator, { borderBottomColor: themeColors.primary }]} />
      <Text style={[styles.intent, { color: themeColors.text }]}>
        <Text>Scannez</Text>{"\n"} 
        <Text>Trouvez</Text>{"\n"} 
        <Text>Gagnez !</Text>
      </Text>
      <Link href={"/(app)/(tabs)/"}>
        <Text style={[styles.buttonText, { color: themeColors.text }]}>C'est parti !</Text>
      </Link>
    </View>
  );
}

export default HowToPlayScreen;
