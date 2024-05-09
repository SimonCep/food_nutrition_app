import React, { useState } from "react";
import { SectionList, View, SectionListRenderItemInfo, ImageBackground } from "react-native";
import { useColorScheme } from "nativewind";

import ExerciseSection from "@/components/exercise/ExerciseSection";
import WaterSection from "@/components/water/WaterSection";
import FoodSection from "@/components/foodNutrition/FoodNutritionSection";
import DatePicker from "@/components/DatePicker";
import { useAuth } from "@/providers/AuthProvider";
import { darkColorsDiary, lightColorsDiary } from "@/constants/Colors";
import { SectionData } from "@/types";

const Diary = () => {
  const { session } = useAuth();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const sections: SectionData[] = [
    {
      data: [{}],
      renderItem: () => (
        <FoodSection
          userId={session?.user?.id ?? ""}
          selectedDate={selectedDate}
        />
      ),
    },
    {
      data: [{}],
      renderItem: () => (
        <ExerciseSection
          userId={session?.user?.id ?? ""}
          selectedDate={selectedDate}
        />
      ),
    },
    {
      data: [{}],
      renderItem: () => (
        <WaterSection
          userId={session?.user?.id ?? ""}
          selectedDate={selectedDate}
        />
      ),
    },
  ];

  const renderSectionItem = ({
    section,
  }: SectionListRenderItemInfo<{}, SectionData>) => {
    return section.renderItem();
  };

  return (
    <ImageBackground
      source={colorScheme === 'dark' ? require("../../assets/images/AnimatedDark.gif") : require("../../assets/images/AnimatedLight.gif")}
      className={`flex-1 resize-y justify-center ${colors.text} bg-white dark:bg-black`}
    >
      <View className={`flex-1 ${colors.background}`}>
        <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
        {session?.user && (
          <SectionList
            sections={sections}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderSectionItem}
            stickySectionHeadersEnabled={false}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default Diary;
