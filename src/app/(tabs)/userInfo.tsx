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
import { useColorScheme } from "nativewind";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { darkColorsUserInfo, lightColorsUserInfo } from "@/constants/Colors";

const UserInfoTab = () => {
  const { profile } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsUserInfo : lightColorsUserInfo;

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
      source={colorScheme === 'dark' ? require("../../assets/images/AnimatedDark.gif") : require("../../assets/images/AnimatedLight.gif")}
      className={`flex-1 resize-y justify-center ${colors.background}`}
    >
      <ScrollView>
        <View className="flex-grow items-center justify-center">
          <View className="mb-5 mt-20 items-center">
            <View
              className={`mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 ${colors.avatarBorder} ${colors.primaryBackground} shadow-lg`}
            >
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
              <Text className={`mb-2 text-lg font-bold ${colors.primaryText}`}>
                {profile.username}
              </Text>
            ) : (
              <Text className={`mb-2 text-lg font-bold ${colors.primaryText}`}>
                Loading...
              </Text>
            )}
          </View>

          <View className="m-10 w-screen justify-center p-5">
            <TouchableOpacity
              className={`mb-4 rounded-xl ${colors.buttonBackground} px-6 py-4 shadow-lg`}
              onPress={handleEditProfile}
            >
              <Text className={colors.buttonText}>Profile Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`mb-4 rounded-xl ${colors.buttonBackground} px-6 py-4 shadow-lg`}
              onPress={handleEditGoals}
            >
              <Text className={colors.buttonText}>Dietary Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAccountSecurity}
              className={`mb-4 rounded-xl ${colors.buttonBackground} px-6 py-4 shadow-lg`}
            >
              <Text className={colors.buttonText}>Account Security</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleThemeSettings}
              className={`mb-4 rounded-xl ${colors.buttonBackground} px-6 py-4 shadow-lg`}
            >
              <Text className={colors.buttonText}>Theme Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAboutUs}
              className={`mb-4 rounded-xl ${colors.buttonBackground} px-6 py-4 shadow-lg`}
            >
              <Text className={colors.buttonText}>About Us</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            className={`w-1/1 mb-10 rounded-full px-6 py-2 border-2 ${colors.buttonBorder} ${colors.logoutButtonBackground}`}
          >
            <Text
              className={`text-center text-lg font-bold ${colors.logoutButtonText}`}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default UserInfoTab;
