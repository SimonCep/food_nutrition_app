import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { useColorScheme } from "nativewind";
import ExerciseForm from "@/components/ExerciseForm";
import { Tables, ExerciseSectionProps } from "@/types";
import { addExercise, fetchExercises } from "@/api/exerciseService";
import { lightColorsExercise, darkColorsExercise } from "@/constants/Colors";

const ExerciseSection: React.FC<ExerciseSectionProps> = ({ userId }) => {
  const [exercises, setExercises] = useState<Tables<"exercises">[]>([]);
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState(0);
  const [calories, setCalories] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsExercise : lightColorsExercise;

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchExercises(userId);
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    })();
  }, [userId]);

  const handleAddExercise = async () => {
    await addExercise(
      exercise,
      duration,
      calories,
      userId,
      setIsLoading,
      async () => {
        setExercise("");
        setDuration(0);
        setCalories(0);
        setIsFormVisible(false);
        const data = await fetchExercises(userId);
        setExercises(data);
      },
    );
  };

  const renderExerciseItem = ({ item }: { item: Tables<"exercises"> }) => (
    <View
      className={`${colors.primaryBackground} p-4 rounded-lg shadow-md mb-4`}
    >
      <Text className={`text-lg font-bold ${colors.primaryText}`}>
        {item.exercise}
      </Text>
      <Text className={`${colors.secondaryText}`}>
        Duration: {item.duration} minutes
      </Text>
      <Text className={`${colors.secondaryText}`}>
        Calories Burned: {item.calories}
      </Text>
    </View>
  );

  return (
    <View className={`p-5 ${colors.background}`}>
      <View className={`${colors.primaryBackground} p-4 rounded-lg shadow-md`}>
        <Text className={`text-xl font-bold mb-2 ${colors.primaryText}`}>
          Exercise
        </Text>
        <View className={`border-b ${colors.border} mb-4`} />
        <FlatList
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
        <TouchableOpacity
          onPress={() => setIsFormVisible(true)}
          className={`${colors.buttonBackground} py-2 px-4 rounded-full border-2 ${colors.buttonBorder} mb-4`}
        >
          <Text className={`${colors.buttonText} font-bold text-center`}>
            Add Exercise
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isFormVisible} animationType="slide">
        <ExerciseForm
          exercise={exercise}
          setExercise={setExercise}
          duration={duration}
          setDuration={setDuration}
          calories={calories}
          setCalories={setCalories}
          onAddExercise={handleAddExercise}
          onCancel={() => setIsFormVisible(false)}
          isLoading={isLoading}
        />
      </Modal>
    </View>
  );
};

export default ExerciseSection;
