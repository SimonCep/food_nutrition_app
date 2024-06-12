import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";

import { lightColorsDiary, darkColorsDiary } from "@/constants/Colors";
import { ExerciseHistoryModalProps, Tables } from "@/types";

const ExerciseHistoryModal: React.FC<ExerciseHistoryModalProps> = ({
  isVisible,
  onClose,
  onSelect,
  previousExercises,
}) => {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(
    null,
  );

  const renderExerciseItem = ({ item }: { item: Tables<"exercises"> }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedExerciseId(item.id);
        onSelect(item);
      }}
      className={`mb-4 rounded-lg p-4 shadow-md ${
        selectedExerciseId === item.id
          ? colors.holdingBackground
          : colors.primaryBackground
      }`}
    >
      <Text className={`text-lg font-bold ${colors.primaryText}`}>
        {item.exercise}
      </Text>
      <Text className={`${colors.secondaryText}`}>
        Duration: {item.duration} minutes
      </Text>
      <Text className={`${colors.secondaryText}`}>
        Calories: {item.calories}
      </Text>
    </TouchableOpacity>
  );

  const recentExercises = previousExercises.slice(0, 14);

  return (
    <Modal visible={isVisible} animationType="slide">
      <View
        className={`flex-1 ${colorScheme === "dark" ? "bg-black" : "bg-white"}`}
      >
        <View className={`flex-1 p-5`}>
          <View
            className={`${colors.primaryBackground} rounded-lg p-4 shadow-md`}
          >
            <Text className={`mb-2 text-xl font-bold ${colors.primaryText}`}>
              Exercise History
            </Text>
            <View className={`border-b ${colors.border} mb-4`} />
            {recentExercises.length > 0 ? (
              <FlatList
                data={recentExercises}
                renderItem={renderExerciseItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 80 }}
              />
            ) : (
              <Text className={`${colors.secondaryText}`}>
                Exercise history is empty.
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedExerciseId(null);
            onClose();
          }}
          className={`items-center justify-center p-4 ${colors.cancelButtonBackground}`}
        >
          <Text className={`text-lg font-bold ${colors.cancelButtonText}`}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ExerciseHistoryModal;
