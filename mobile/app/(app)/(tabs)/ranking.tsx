import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';
import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { RootState } from '@/app/store';
import { fetchRankings } from '@/features/rank/rankSlice';
import { useAppDispatch, useAppSelector } from '@/hook/useHooks';
import Colors from '@/constants/Colors';

export default function TabRankingScreen() {
  const { rankings, status, error } = useAppSelector((state: RootState) => state.ranking);
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRankings());
    }

  }, [status, dispatch]);
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:themeColors.background,
   
  },
});


let content;

if (status === 'loading') {
  content = <ActivityIndicator size="large" color={themeColors.primary} />; // Afficher un indicateur de chargement
} else if (status === 'failed') {
  content = <Text style={{color:themeColors.primary}}>Erreur lors du chargement des classements : {error}</Text>;
} else if (status === 'succeeded') {
  if (rankings && rankings.length > 0) {
    // Afficher la liste si les classements sont chargés
    content = (
      <FlatList
        data={rankings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={{color:themeColors.primary}}>{item.position}: {item.idUtilisateur.nom} {item.idUtilisateur.prenom} - Score: {item.score}</Text>
          </View>
        )}
      />
    );
  } else {
    // Afficher un message si aucun classement n'est disponible
    content = <Text style={{color:themeColors.primary}}>Aucun classement pour le moment.</Text>;
  }
}

return <View style={styles.container}>{content}</View>;
}

