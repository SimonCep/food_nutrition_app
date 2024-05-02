import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { useColorScheme } from "nativewind";

import ExerciseSection from "@/components/exercise/ExerciseSection";
import WaterSection from "@/components/water/WaterSection";
import FoodSection from "@/components/foodNutrition/FoodNutritionSection";
import DatePicker from "@/components/DatePicker";
import { useAuth } from "@/providers/AuthProvider";
import { darkColorsDiary, lightColorsDiary } from "@/constants/Colors";

const Diary = () => {
  const { session } = useAuth();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderFoodSection = () => (
    <FoodSection userId={session?.user?.id ?? ""} selectedDate={selectedDate} />
  );

  const renderExerciseSection = () => (
    <ExerciseSection
      userId={session?.user?.id ?? ""}
      selectedDate={selectedDate}
    />
  );

  const renderWaterSection = () => (
    <WaterSection
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
        ListEmptyComponent={
          session?.user && (
            <>
              {renderFoodSection()}
              {renderExerciseSection()}
              {renderWaterSection()}
            </>
          )
        }
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={() => "diary"}
      />
    </View>
  );
};

export default Diary;
