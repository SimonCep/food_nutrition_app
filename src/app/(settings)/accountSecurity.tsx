import React from "react";
import { View, ImageBackground } from "react-native";
import { useColorScheme } from "nativewind";

import ChangeEmailSection from "@/components/accountSecurity/ChangeEmailSection";
import ChangePasswordSection from "@/components/accountSecurity/ChangePasswordSection";
import { darkColorsAuth, lightColorsAuth } from "@/constants/Colors";

const AccountSecurityScreen = () => {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsAuth : lightColorsAuth;

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1 resize-y justify-center bg-white dark:bg-black"
    >
    <View className={`p-5 flex-1`}>
      <ChangeEmailSection />
      <ChangePasswordSection />
    </View>
    </ImageBackground>
  );
};

export default AccountSecurityScreen;
