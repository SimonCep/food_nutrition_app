import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useColorScheme } from "nativewind";
import ExerciseForm from "@/components/ExerciseForm";
import { ExerciseSectionProps, Tables } from "@/types";
import { addExercise, fetchExercises } from "@/api/exerciseService";
import { darkColorsExercise, lightColorsExercise } from "@/constants/Colors";
import * as Yup from "yup";
import { addExerciseValidationSchema } from "@/utils/validationSchemas";

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
  const [validationErrors, setValidationErrors] =
    useState<Yup.ValidationError | null>(null);

  useEffect(() => {
    fetchExercises(userId)
      .then((data) => setExercises(data))
      .catch((error) => console.error("Error fetching exercises:", error));
  }, [userId]);

  const handleAddExercise = async () => {
    try {
      setIsLoading(true);
      await addExerciseValidationSchema.validate(
        { exercise, duration, calories },
        { abortEarly: false },
      );
      setValidationErrors(null);

      const success = await addExercise(exercise, duration, calories, userId);
      if (success) {
        setExercise("");
        setDuration(0);
        setCalories(0);
        setIsFormVisible(false);
        const data = await fetchExercises(userId);
        setExercises(data);
      } else {
        Alert.alert("Error", "Failed to add exercise. Please try again.");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors(error);
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenForm = () => {
    setIsFormVisible(true);
    setValidationErrors(null); // Reset validation errors when opening the form
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
          onPress={handleOpenForm}
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
          validationErrors={validationErrors}
        />
      </Modal>
    </View>
  );
};

export default ExerciseSection;
