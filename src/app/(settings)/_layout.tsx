import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="theme" options={{ title: "Theme Settings" }} />
      <Stack.Screen name="about" options={{ title: "About Us" }} />
      <Stack.Screen name="editProfile" options={{ title: "Edit Profile" }} />
      <Stack.Screen
        name="editPersonalData"
        options={{ title: "Edit Personal Data" }}
      />
      <Stack.Screen
        name="accountSecurity"
        options={{ title: "Account Security" }}
      />
    </Stack>
  );
}
