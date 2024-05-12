import React from "react";
import { Switch, Text, View } from "react-native";

import { ThemeSwitchProps } from "@/types";

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  colorScheme,
  toggleColorScheme,
}) => {
  return (
    <View className="flex-row items-center rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
      <Text className="mr-4 text-lg text-black dark:text-white">
        {colorScheme === "dark" ? "Dark Mode" : "Light Mode"}
      </Text>
      <Switch
        value={colorScheme === "dark"}
        onValueChange={toggleColorScheme}
        trackColor={{ false: "#d1d5db", true: "#C7F9CC" }}
        thumbColor={colorScheme === "dark" ? "#38A3A5" : "#f3f4f6"}
        ios_backgroundColor="#d1d5db"
      />
    </View>
  );
};

export default ThemeSwitch;
