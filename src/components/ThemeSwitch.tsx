import React from "react";
import { View, Text, Switch } from "react-native";

interface ThemeSwitchProps {
  colorScheme: "light" | "dark" | undefined;
  toggleColorScheme: () => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  colorScheme,
  toggleColorScheme,
}) => {
  return (
    <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
      <Text className="text-black dark:text-white mr-4 text-lg">
        {colorScheme === "dark" ? "Dark Mode" : "Light Mode"}
      </Text>
      <Switch
        value={colorScheme === "dark"}
        onValueChange={toggleColorScheme}
        trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
        thumbColor={colorScheme === "dark" ? "#f59e0b" : "#f3f4f6"}
        ios_backgroundColor="#d1d5db"
      />
    </View>
  );
};

export default ThemeSwitch;
