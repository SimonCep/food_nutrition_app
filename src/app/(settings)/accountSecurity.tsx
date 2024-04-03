import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";

import ChangeEmailSection from "@/components/ChangeEmailSection";
import ChangePasswordSection from "@/components/ChangePasswordSection";
import { darkColorsAuth, lightColorsAuth } from "@/constants/Colors";

const AccountSecurityScreen = () => {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsAuth : lightColorsAuth;

  return (
    <View className={`p-5 ${colors.background} flex-1`}>
      <ChangeEmailSection />
      <ChangePasswordSection />
    </View>
  );
};

export default AccountSecurityScreen;
