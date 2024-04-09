import React, { useState } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { useColorScheme } from "nativewind";

import ExerciseSection from "@/components/ExerciseSection";
import { useAuth } from "@/providers/AuthProvider";
import { darkColorsExercise, lightColorsExercise } from "@/constants/Colors";

const Diary = () => {
  const { session } = useAuth();
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsExercise : lightColorsExercise;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (direction: number) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + direction);
      return newDate;
    });
  };

  const renderExerciseSection = () => (
    <ExerciseSection
      userId={session?.user?.id ?? ""}
      selectedDate={selectedDate}
    />
  );

  return (
    <View className={`flex-1 ${colors.background}`}>
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity onPress={() => handleDateChange(-1)}>
          <Text className={`${colors.primaryText} text-xl font-bold`}>
            {"<"}
          </Text>
        </TouchableOpacity>
        <Text className={`${colors.primaryText} text-xl font-bold`}>
          {selectedDate.toLocaleDateString()}
        </Text>
        <TouchableOpacity onPress={() => handleDateChange(1)}>
          <Text className={`${colors.primaryText} text-xl font-bold`}>
            {">"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={session?.user && renderExerciseSection()}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={() => "diary"}
      />
    </View>
  );
};

export default Diary;
