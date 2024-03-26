import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="theme" options={{ title: 'Theme' }} />
    </Stack>
  );
}