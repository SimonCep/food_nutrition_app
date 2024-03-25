import { ActivityIndicator, TouchableOpacity, Text, View } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import EditScreenInfo from "@/components/EditScreenInfo";
import { useColorScheme } from "nativewind";

export default function TabOneScreen() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/sign-in");
    }
  }, [loading, session, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/sign-in");
  };

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

  if (!session) {
    return null;
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
