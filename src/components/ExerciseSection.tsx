import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useColorScheme } from "nativewind";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Yup from "yup";
import { runOnJS } from "react-native-reanimated";

import ExerciseForm from "@/components/ExerciseForm";
import { ExerciseSectionProps, Tables, Exercise } from "@/types";
import {
  addExercise,
  fetchExercises,
  deleteExercise,
  updateExercise,
} from "@/api/exerciseService";
import { darkColorsExercise, lightColorsExercise } from "@/constants/Colors";
import { addExerciseValidationSchema } from "@/utils/validationSchemas";

const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  userId,
  selectedDate,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
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
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(
    null,
  );
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [holdingExerciseId, setHoldingExerciseId] = useState<number | null>(
    null,
  );
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const filterExercisesByDate = useCallback(
    (exercises: Exercise[], selectedDate: Date) => {
      return exercises.filter((exercise) => {
        const exerciseDate = new Date(exercise.created_at);
        return (
          exerciseDate.getFullYear() === selectedDate.getFullYear() &&
          exerciseDate.getMonth() === selectedDate.getMonth() &&
          exerciseDate.getDate() === selectedDate.getDate()
        );
      });
    },
    [],
  );

  useEffect(() => {
    fetchExercises(userId)
      .then((data) => {
        const filteredExercises = filterExercisesByDate(data, selectedDate);
        setExercises(filteredExercises);
      })
      .catch((error) => console.error("Error fetching exercises:", error));
  }, [userId, selectedDate, filterExercisesByDate]);

  const handleSaveExercise = async () => {
    try {
      setIsLoading(true);
      await addExerciseValidationSchema.validate(
        { exercise, duration, calories },
        { abortEarly: false },
      );
      setValidationErrors(null);

      const formattedDate = selectedDate.toISOString();
      let success;
      if (editingExercise) {
        success = await updateExercise(
          editingExercise.id,
          exercise,
          duration,
          calories,
          userId,
          formattedDate,
        );
      } else {
        success = await addExercise(
          exercise,
          duration,
          calories,
          userId,
          formattedDate,
        );
      }

      if (success) {
        setExercise("");
        setDuration(0);
        setCalories(0);
        setIsFormVisible(false);
        setEditingExercise(null);
        setValidationErrors(null); // Clear validation errors on successful submission
        const data = await fetchExercises(userId);
        const filteredExercises = filterExercisesByDate(data, selectedDate);
        setExercises(filteredExercises);
      } else {
        Alert.alert(
          "Error",
          `Failed to ${editingExercise ? "update" : "add"} exercise. Please try again.`,
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors(error);
      } else {
        console.error("Error saving exercise:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setValidationErrors(null); // Clear validation errors on form cancel
  };

  const handleDeleteExercise = async () => {
    if (selectedExerciseId) {
      try {
        const success = await deleteExercise(selectedExerciseId);
        if (success) {
          const data = await fetchExercises(userId);
          const filteredExercises = filterExercisesByDate(data, selectedDate);
          setExercises(filteredExercises);
          setSelectedExerciseId(null);
          setIsDeleteModalVisible(false);
        } else {
          Alert.alert("Error", "Failed to delete exercise. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting exercise:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleOpenForm = (exercise?: Exercise) => {
    if (exercise) {
      setEditingExercise(exercise);
      setExercise(exercise.exercise);
      setDuration(exercise.duration);
      setCalories(exercise.calories);
    } else {
      setEditingExercise(null);
      setExercise("");
      setDuration(0);
      setCalories(0);
    }
    setIsFormVisible(true);
    setValidationErrors(null);
  };

  const handleLongPress = (exerciseId: number) => {
    setSelectedExerciseId(exerciseId);
    setIsDeleteModalVisible(true);
  };

  const longPressGesture = (exerciseId: number) =>
    Gesture.LongPress()
      .onStart(() => {
        runOnJS(setHoldingExerciseId)(exerciseId);
        runOnJS(handleLongPress)(exerciseId);
      })
      .onEnd(() => {
        runOnJS(setHoldingExerciseId)(null);
      });

  const handlePress = (exerciseId: number) => {
    const exercise = exercises.find((item) => item.id === exerciseId);
    if (exercise) {
      setEditingExercise(exercise);
      setExercise(exercise.exercise);
      setDuration(exercise.duration);
      setCalories(exercise.calories);
      setIsFormVisible(true);
    }
    setHoldingExerciseId(null);
  };

  const pressGesture = (exerciseId: number) =>
    Gesture.Tap()
      .onStart(() => {
        runOnJS(setHoldingExerciseId)(exerciseId);
      })
      .onEnd(() => {
        runOnJS(handlePress)(exerciseId);
      });

  const renderExerciseItem = ({ item }: { item: Tables<"exercises"> }) => (
    <GestureDetector gesture={longPressGesture(item.id)}>
      <GestureDetector gesture={pressGesture(item.id)}>
        <View
          className={`${
            holdingExerciseId === item.id
              ? colors.holdingBackground
              : colors.primaryBackground
          } mb-4 rounded-lg p-4 shadow-md`}
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
      </GestureDetector>
    </GestureDetector>
  );

  return (
    <View className={`p-5 ${colors.background}`}>
      <View className={`${colors.primaryBackground} rounded-lg p-4 shadow-md`}>
        <Text className={`mb-2 text-xl font-bold ${colors.primaryText}`}>
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
          onPress={() => handleOpenForm()}
          className={`${colors.buttonBackground} rounded-full border-2 px-4 py-2 ${colors.buttonBorder} mb-4`}
        >
          <Text className={`${colors.buttonText} text-center font-bold`}>
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
          onSubmit={handleSaveExercise}
          onCancel={handleCancelForm} // Use handleCancelForm instead of inline function
          isLoading={isLoading}
          validationErrors={validationErrors}
          isEditing={!!editingExercise}
        />
      </Modal>
      <Modal visible={isDeleteModalVisible} animationType="fade" transparent>
        <View className="flex-1 items-center justify-center bg-black/40 px-4">
          <View
            className={`${colors.modalBackground} w-full max-w-md rounded-lg p-6 shadow-md`}
          >
            <Text className={`${colors.modalText} mb-4 text-lg font-bold`}>
              Delete Exercise
            </Text>
            <Text className={`${colors.modalText} mb-4`}>
              Are you sure you want to delete this exercise entry?
            </Text>
            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => setIsDeleteModalVisible(false)}
                className={`${colors.cancelButtonBackground} rounded-full border-2 px-4 py-2 ${colors.cancelButtonBorder} mr-2`}
              >
                <Text className={`${colors.cancelButtonText} font-bold`}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteExercise}
                className={`${colors.deleteButtonBackground} rounded-full border-2 px-4 py-2 ${colors.deleteButtonBorder}`}
              >
                <Text className={`${colors.deleteButtonText} font-bold`}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExerciseSection;
