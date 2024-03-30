import React from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";

export default function UserInfoTab() {
  const { profile } = useAuth();
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("../editProfile");
  };

  const handleEditGoals = () => {
    router.push("../editGoals");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/sign-in");
  };

  const handleThemeSettings = () => {
    router.push("../theme");
  };

  const handleAboutUs = () => {
    router.push("../(settings)/about");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/backgroundImage2.png")}
      className="bg-white flex-1 justify-center resize-y"
    >
      <ScrollView>
        <View className="flex-grow items-center justify-center">
          <View className="items-center mt-20 mb-5">
            <View className="w-32 h-32 flex items-center justify-center rounded-full mb-4 shadow-lg bg-white border-4 border-black">
              {profile && profile.avatar_url ? (
                <Image
                  source={{ uri: profile.avatar_url }}
                  className="w-28 h-28 rounded-full"
                />
              ) : (
                <Image
                  source={require("../../assets/images/profilePicture.png")}
                  className="w-28 h-28 rounded-full"
                />
              )}
            </View>
            {profile && profile.username ? (
              <Text className="text-lg font-bold mb-2">{profile.username}</Text>
            ) : (
              <Text className="text-lg font-bold mb-2">Loading...</Text>
            )}
          </View>

          <View className="justify-center m-10 w-screen p-5">
            <TouchableOpacity
              className="py-4 px-6 bg-yellow-200 rounded-xl border-2 border-black mb-4"
              onPress={handleEditProfile}
            >
              <Text>Profile Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-4 px-6 bg-yellow-200 rounded-xl border-2 border-black mb-4"
              onPress={handleEditGoals}
            >
              <Text>Dietary Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-4 px-6 bg-yellow-200 rounded-xl border-2 border-black mb-4">
              <Text>Account Security</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-4 px-6 bg-yellow-200 rounded-xl border-2 border-black mb-4">
              <Text>Privacy Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleThemeSettings}
              className="py-4 px-6 bg-yellow-200 rounded-xl border-2 border-black mb-4"
            >
              <Text>Theme Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAboutUs}
              className="py-4 px-6 bg-yellow-200 rounded-xl border-2 border-black mb-4"
            >
              <Text>About Us</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            className="py-4 px-6 rounded-md w-1/3 mb-10"
          >
            <Text className="text-red-500 text-lg font-bold text-center">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
