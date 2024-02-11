import { Stack } from "expo-router";

export default function AppEntry() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="how-to-play" options={{ headerShown: false , presentation: "card"}} />
    </Stack>
  );
}
