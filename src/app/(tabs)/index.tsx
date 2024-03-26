import { ActivityIndicator, Text, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import EditScreenInfo from "@/components/EditScreenInfo";
import { useColorScheme } from "nativewind";

export default function TabOneScreen() {
  const { session, loading } = useAuth();
  const { colorScheme } = useColorScheme();

  if (!loading && !session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-8">
      <Text
        className={`text-4xl font-bold mb-8 text-center ${
          colorScheme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Home
      </Text>
      <View
        className={`p-6 rounded-xl shadow-md ${
          colorScheme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </View>
    </View>
  );
}
