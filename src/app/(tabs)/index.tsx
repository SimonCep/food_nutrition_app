import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

import { useAuth } from "@/providers/AuthProvider";

const HomePage = () => {
  const router = useRouter();
  const { session, loading } = useAuth();
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/(auth)/sign-in");
    }
  }, [loading, session, router]);

  if (loading) {
    // Render loading state
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      </View>
    );
  }

  const handleDiaryPress = () => {
    router.push("./diary");
  };

  const handleProfilePress = () => {
    router.push("./userInfo");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/gradientBackground.png")}
      className="flex-1 items-center justify-center"
    >
      <View className="flex-1 items-center justify-center px-5">
        <Image
          source={require("../../assets/images/icon.png")}
          className="mb-5 h-24 w-24"
        />
        <Text className="mb-2 text-4xl font-bold text-black">Eathy</Text>
        <Text className="mb-7 text-xl text-black">
          Track your calories and health
        </Text>
        <TouchableOpacity
          className="mb-4 rounded-full bg-white/50 px-7 py-4"
          onPress={handleDiaryPress}
        >
          <Text className="text-center text-xl font-bold text-black">
            Diary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-full bg-white/50 px-7 py-4"
          onPress={handleProfilePress}
        >
          <Text className="text-center text-xl font-bold text-black">
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomePage;
