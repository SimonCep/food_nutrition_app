import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Stack } from "expo-router";
import ThemeSwitch from '@/components/ThemeSwitch';

export default function Theme() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Stack.Screen
        options={{ title: "Theme Settings", headerTitleAlign: "center" }}
      />
      <Text className="text-black dark:text-white text-2xl font-bold mb-8">
        Theme
      </Text>
      <ThemeSwitch
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      />
    </View>
  );
}
