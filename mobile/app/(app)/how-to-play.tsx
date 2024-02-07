import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native'; // Import Pressable
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

const HowToPlayScreen = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingTop:40,
      backgroundColor: themeColors.background,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: "FugazOne",
    },
    description: {
      fontSize: 20,
      fontFamily: "FugazOne",
      padding: 50,
    },
    separator: {
      height: 1,
      width: '80%',
    },
    intent: {
      fontSize: 32,
      fontFamily: "FugazOne",
      padding: 50,
    },
    buttonText: {
      fontFamily: "FugazOne",
      fontSize: 32,
      textAlign: "center",
      marginLeft: 40,
      marginRight: 40,
      padding: 10, // Ajout du padding
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
