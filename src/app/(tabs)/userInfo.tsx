import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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
    router.push("../about");
  };

  const handleAccountSecurity = () => {
    router.push("../accountSecurity");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/backgroundImage2.png")}
      className="flex-1 resize-y justify-center bg-white"
    >
      <ScrollView>
        <View className="flex-grow items-center justify-center">
          <View className="mb-5 mt-20 items-center">
            <View className="mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-black bg-white shadow-lg">
              {profile?.avatar_url ? (
                <Image
                  source={{ uri: profile.avatar_url }}
                  className="h-28 w-28 rounded-full"
                />
              ) : (
                <Image
                  source={require("../../assets/images/profilePicture.png")}
                  className="h-28 w-28 rounded-full"
                />
              )}
            </View>
            {profile?.username ? (
              <Text className="mb-2 text-lg font-bold">{profile.username}</Text>
            ) : (
              <Text className="mb-2 text-lg font-bold">Loading...</Text>
            )}
          </View>

          <View className="m-10 w-screen justify-center p-5">
            <TouchableOpacity
              className="mb-4 rounded-xl border-2 border-black bg-yellow-200 px-6 py-4"
              onPress={handleEditProfile}
            >
              <Text>Profile Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-4 rounded-xl border-2 border-black bg-yellow-200 px-6 py-4"
              onPress={handleEditGoals}
            >
              <Text>Dietary Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAccountSecurity}
              className="mb-4 rounded-xl border-2 border-black bg-yellow-200 px-6 py-4"
            >
              <Text>Account Security</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mb-4 rounded-xl border-2 border-black bg-yellow-200 px-6 py-4">
              <Text>Privacy Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleThemeSettings}
              className="mb-4 rounded-xl border-2 border-black bg-yellow-200 px-6 py-4"
            >
              <Text>Theme Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAboutUs}
              className="mb-4 rounded-xl border-2 border-black bg-yellow-200 px-6 py-4"
            >
              <Text>About Us</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            className="mb-10 w-1/3 rounded-md px-6 py-4"
          >
            <Text className="text-center text-lg font-bold text-red-500">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
