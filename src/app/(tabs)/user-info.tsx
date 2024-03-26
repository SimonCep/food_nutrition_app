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

export default function UserInfoTab() {
  const user = {
    name: "User name",
    profilePicture: require("../../assets/images/profilePicture.png"),
    otherData: "Plan/description/etc.",
  };

  const handleEditProfile = () => {
    // Handle edit profile action here
  };

  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/sign-in");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/backgroundImage2.png")}
      className="bg-white flex-1 justify-center resize-y"
    >
      <ScrollView>
        <View className="flex-grow items-center justify-center">
          <View className="items-center mt-20 mb-5">
            <View className="w-32 h-32 rounded-full mb-4 shadow-lg bg-white border-4 border-white">
              <Image
                source={user.profilePicture}
                className="w-32 h-32 rounded-full"
              />
            </View>
            <Text className="text-lg font-bold mb-2">{user.name}</Text>
            <Text>{user.otherData}</Text>
          </View>

          <View className="justify-center m-10 w-screen p-5">
            <TouchableOpacity className="py-4 px-6 bg-yellow-200 rounded-xl border-2 border-black mb-4">
              <Text>Profile Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-4 px-6 bg-yellow-200 rounded-xl border-2 border-black mb-4">
              <Text>Account Security</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-4 px-6 bg-yellow-200 rounded-xl border-2 border-black mb-4">
              <Text>Privacy Settings</Text>
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