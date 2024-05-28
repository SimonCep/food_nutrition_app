import React, { useEffect, useState } from "react";
import {
  SectionList,
  View,
  SectionListRenderItemInfo,
  Text,
  ImageBackground,
} from "react-native";
import { useColorScheme } from "nativewind";

import ExerciseSection from "@/components/exercise/ExerciseSection";
import WaterSection from "@/components/water/WaterSection";
import FoodSection from "@/components/foodNutrition/FoodNutritionSection";
import DatePicker from "@/components/DatePicker";
import { useAuth } from "@/providers/AuthProvider";
import { darkColorsDiary, lightColorsDiary } from "@/constants/Colors";
import { SectionData } from "@/types";
import {
  calculateNetCalories,
  calculateTotalFoodCalories,
  calculateTotalExerciseCalories,
} from "@/utils/calorieUtils";
import { calculateTotalWaterConsumption } from "@/utils/waterUtils";
import { useDiaryContext } from "@/providers/DiaryProvider";
import { useTranslation } from 'react-i18next';

const Diary = () => {
  const { t } = useTranslation();

  const { session } = useAuth();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalFoodCalories, setTotalFoodCalories] = useState(0);
  const [totalExerciseCalories, setTotalExerciseCalories] = useState(0);
  const [netCalories, setNetCalories] = useState(0);
  const [totalWaterConsumption, setTotalWaterConsumption] = useState(0);

  const { shouldRefreshCalories, shouldRefreshWater } = useDiaryContext();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          const foodCalories = await calculateTotalFoodCalories(
            session.user.id,
            selectedDate,
          );
          setTotalFoodCalories(foodCalories);

          const exerciseCalories = await calculateTotalExerciseCalories(
            session.user.id,
            selectedDate,
          );
          setTotalExerciseCalories(exerciseCalories);

          const net = await calculateNetCalories(session.user.id, selectedDate);
          setNetCalories(net);

          const waterConsumption = await calculateTotalWaterConsumption(
            session.user.id,
            selectedDate,
          );
          setTotalWaterConsumption(waterConsumption);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    void fetchData();
  }, [
    session?.user?.id,
    selectedDate,
    shouldRefreshCalories,
    shouldRefreshWater,
  ]);

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
        <WaterSection
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
  ];

  const renderSectionItem = ({
    section,
  }: SectionListRenderItemInfo<{}, SectionData>) => {
    return section.renderItem();
  };

  return (
    <ImageBackground
      source={
        colorScheme === "dark"
          ? require("../../assets/images/AnimatedDark.gif")
          : require("../../assets/images/AnimatedLight.gif")
      }
      className={`flex-1 resize-y justify-center ${colors.text} bg-white dark:bg-black`}
    >
      <View className={`flex-1 ${colors.background}`}>
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <View className="flex-col items-center justify-between px-6 py-4">
          <Text className={`text-lg font-bold ${colors.primaryText}`}>
            {t('DIARYNetcal')} {netCalories}
          </Text>
          <View className="flex-row">
            <Text className={`text-base ${colors.secondaryText}`}>
              {t('DIARYFood')} {totalFoodCalories}
            </Text>
            <Text className={`text-base ${colors.secondaryText} ml-4`}>
              {t('DIARYExer')} {totalExerciseCalories}
            </Text>
            <Text className={`text-base ${colors.secondaryText} ml-4`}>
              {t('DIARYWater')} {totalWaterConsumption.toFixed(2)} l
            </Text>
          </View>
        </View>
        {session?.user?.id && (
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
