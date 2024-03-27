import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack, useSegments } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuth();
  const segments = useSegments();

  if (session && segments[0] !== "(auth)") {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{ title: "Sign In", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ title: "Sign Up", headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
