import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="pages/TeamsList" />
      <Stack.Screen name="pages/TeamsDetails" />
      <Stack.Screen name="pages/TeamEdit" />
    </Stack>
  );
}
