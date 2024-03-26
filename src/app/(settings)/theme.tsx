import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Stack } from "expo-router";

export default function Theme() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Stack.Screen
        options={{ title: "Theme Settings", headerTitleAlign: "center" }}
      />
      <Text className="text-black dark:text-white text-2xl font-bold mb-8">
        Theme
      </Text>
      <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
        <Text className="text-black dark:text-white mr-4 text-lg">
          {colorScheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch
          value={colorScheme === 'dark'}
          onValueChange={toggleColorScheme}
          trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
          thumbColor={colorScheme === 'dark' ? '#f59e0b' : '#f3f4f6'}
          ios_backgroundColor="#d1d5db"
        />
      </View>
    </View>
  );
}