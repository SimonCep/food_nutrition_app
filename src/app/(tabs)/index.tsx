import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { useColorScheme } from "nativewind";

export default function HomePage() {
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
    <ImageBackground
      source={require("../../assets/images/gradientBackground.png")}
      className="flex-1 items-center justify-center"
    >
      <View className="flex-1 items-center justify-center px-5">
        <Image
          source={require("../../assets/images/icon.png")}
          className="w-24 h-24 mb-5"
        />
        <Text className="text-4xl font-bold text-black mb-2">Eathy</Text>
        <Text className="text-xl text-black mb-7">
          Track your calories and health
        </Text>
        <TouchableOpacity className="bg-white/50 py-4 px-7 rounded-full mb-4">
          <Link href="./diary">
            <Text className="text-xl text-black font-bold text-center">
              Diary
            </Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white/50 py-4 px-7 rounded-full">
          <Link href="./user-info">
            <Text className="text-xl text-black font-bold text-center">
              Profile
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
