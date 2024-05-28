import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { useColorScheme } from "nativewind";

import ThemeSwitch from "@/components/ThemeSwitch";
import { useTranslation } from 'react-i18next';

const Theme = () => {
  
  const { t } = useTranslation();
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1 resize-y justify-center bg-white dark:bg-black"
    >
    <View className="flex-1 items-center justify-center">
      <Text className="mb-8 text-2xl font-bold text-black dark:text-white">
      {t('THEME')}
      </Text>
      <ThemeSwitch
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      />
    </View>
    </ImageBackground>
  );
};

export default Theme;
