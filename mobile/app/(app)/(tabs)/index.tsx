import { ActivityIndicator, Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/auth';
import { useUserDetails } from '@/app/hook/useUserData';

export default function TabOneScreen() {
  const { signOut } = useAuth()
  const { userDetails, loading } = useUserDetails();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!userDetails) {
    return <Text>Aucun utilisateur trouvé.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nom : {userDetails.nom}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Sign out" color={"orange"} onPress={signOut}></Button>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
