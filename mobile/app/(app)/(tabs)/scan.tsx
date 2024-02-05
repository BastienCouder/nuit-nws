import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function TabScanScreen() {
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
    backgroundColor:themeColors.background

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
