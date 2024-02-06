import { Stack } from "expo-router";
import { Provider } from 'react-redux';
import { store } from '@/app/store';

export default function AppEntry() {
  return (
    <Provider store={store}>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="how-to-play" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "card" }} />
      <Stack.Screen
          name="[userId]"
          options={{ headerShown: false}}
        />
    </Stack>
    </Provider>
  );
}
