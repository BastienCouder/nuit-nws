// UserScreen.tsx
import React from 'react';
import { View, Text,StyleSheet, useColorScheme } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';

const UserScreen: React.FC<any> = () => {
  const { userId } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:themeColors.background
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
     color:themeColors.primary
  
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
  

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User ID: {userId}</Text>
    </View>
  );
};

export default UserScreen;
