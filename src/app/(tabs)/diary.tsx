import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';

export default function Diary() {
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddExercise = () => {
    // TODO: Implement exercise adding logic
    setIsFormVisible(false);
  };

  return (
    <View className="flex-1 p-6 bg-gray-100 dark:bg-black">
      <View className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <Text className="text-xl font-bold mb-2 text-black dark:text-white">Exercise</Text>
        <View className="border-b border-gray-300 dark:border-gray-600 mb-4" />
        <TouchableOpacity
          onPress={() => setIsFormVisible(true)}
          className="bg-yellow-400 dark:bg-yellow-600 py-2 px-4 rounded-full border-2 border-black dark:border-white mb-4"
        >
          <Text className="text-black dark:text-white font-bold text-center">Add Exercise</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isFormVisible} animationType="slide">
        <View className="flex-1 p-6 bg-gray-100 dark:bg-black">
          <Text className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Add Exercise</Text>
          <View className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <TextInput
              value={exercise}
              onChangeText={setExercise}
              placeholder="Exercise"
              placeholderTextColor="#6B7280"
              className="border-b border-gray-300 dark:border-gray-600 p-2 mb-4 text-lg text-black dark:text-white"
            />
            <TextInput
              value={duration}
              onChangeText={setDuration}
              placeholder="Duration"
              placeholderTextColor="#6B7280"
              className="border-b border-gray-300 dark:border-gray-600 p-2 mb-4 text-lg text-black dark:text-white"
            />
            <TextInput
              value={calories}
              onChangeText={setCalories}
              placeholder="Calories Burned"
              placeholderTextColor="#6B7280"
              className="border-b border-gray-300 dark:border-gray-600 p-2 mb-6 text-lg text-black dark:text-white"
            />
            <TouchableOpacity
              onPress={handleAddExercise}
              className="bg-yellow-400 dark:bg-yellow-600 py-3 rounded-full border-2 border-black dark:border-white mb-4"
            >
              <Text className="text-black dark:text-white font-bold text-lg text-center">Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsFormVisible(false)}
              className="bg-gray-300 dark:bg-gray-600 py-3 px-6 rounded-full"
            >
              <Text className="text-gray-700 dark:text-gray-200 font-bold text-lg text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}