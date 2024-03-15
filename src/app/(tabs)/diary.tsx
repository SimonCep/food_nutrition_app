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
    <View className="flex-1 p-6 bg-gray-100">

      <View className="bg-white p-4 rounded-lg shadow-md">
        <Text className="text-xl font-bold mb-2">Exercise</Text>
        <View className="border-b border-gray-300 mb-4" />
        <TouchableOpacity
          onPress={() => setIsFormVisible(true)}
          className="bg-yellow-400 py-2 px-4 rounded-full border-2 border-black mb-4"
        >
          <Text className="text-black font-bold text-center">Add Exercise</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isFormVisible} animationType="slide">
        <View className="flex-1 p-6 bg-gray-100">
          <Text className="text-2xl font-bold mb-6 text-center text-black">Add Exercise</Text>
          <View className="bg-white p-4 rounded-lg shadow-md">
            <TextInput
              value={exercise}
              onChangeText={setExercise}
              placeholder="Exercise"
              className="border-b border-gray-300 p-2 mb-4 text-lg"
            />
            <TextInput
              value={duration}
              onChangeText={setDuration}
              placeholder="Duration"
              className="border-b border-gray-300 p-2 mb-4 text-lg"
            />
            <TextInput
              value={calories}
              onChangeText={setCalories}
              placeholder="Calories Burned"
              className="border-b border-gray-300 p-2 mb-6 text-lg"
            />
            <TouchableOpacity
              onPress={handleAddExercise}
              className="bg-yellow-400 py-3 rounded-full border-2 border-black mb-4"
            >
              <Text className="text-black font-bold text-lg text-center">Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsFormVisible(false)}
              className="bg-gray-300 py-3 px-6 rounded-full"
            >
              <Text className="text-gray-700 font-bold text-lg text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}