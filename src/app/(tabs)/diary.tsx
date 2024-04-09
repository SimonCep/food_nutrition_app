import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { useColorScheme } from "nativewind";

import ExerciseSection from "@/components/ExerciseSection";
import DatePicker from "@/components/DatePicker";
import { useAuth } from "@/providers/AuthProvider";
import { darkColorsExercise, lightColorsExercise } from "@/constants/Colors";

const Diary = () => {
  const { session } = useAuth();
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsExercise : lightColorsExercise;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderExerciseSection = () => (
    <ExerciseSection
      userId={session?.user?.id ?? ""}
      selectedDate={selectedDate}
    />
  );

  return (
    <View className={`flex-1 ${colors.background}`}>
      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
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
