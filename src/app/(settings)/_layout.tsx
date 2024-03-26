import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="theme"
        options={{ title: "Theme Settings", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="about"
        options={{ title: "About us", headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
