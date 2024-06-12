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
import { GestureDetector } from "react-native-gesture-handler";
import * as Yup from "yup";

import ExerciseForm from "@/components/exercise/ExerciseForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { Exercise, ExerciseSectionProps, Tables } from "@/types";
import {
  addExercise,
  deleteExercise,
  fetchExercises,
  updateExercise,
} from "@/api/exerciseService";
import { darkColorsDiary, lightColorsDiary } from "@/constants/Colors";
import { addExerciseValidationSchema } from "@/utils/validationSchemas";
import { longPressGesture, pressGesture } from "@/utils/gestureHandlers";
import { filterExercisesByDate } from "@/utils/exerciseUtils";
import { useDiaryContext } from "@/providers/DiaryProvider";
import { useTranslation } from "react-i18next";

const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  userId,
  selectedDate,
}) => {
  const { t } = useTranslation();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState(0);
  const [calories, setCalories] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
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
  const {
    exerciseUpdated,
    setExerciseUpdated,
    refreshCalories,
    refreshExercises,
  } = useDiaryContext();

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const data = await fetchExercises(userId);
        const filteredExercises = filterExercisesByDate(data, selectedDate);
        setExercises(filteredExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExerciseData().catch((error) => {
      console.error("Error fetching exercise data:", error);
    });
  }, [userId, selectedDate, exerciseUpdated]);

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
        setExerciseUpdated(true);
        refreshCalories();
        refreshExercises();
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
          setExerciseUpdated(true);
          refreshCalories();
          refreshExercises();
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

  const renderExerciseItem = ({ item }: { item: Tables<"exercises"> }) => (
    <GestureDetector
      gesture={longPressGesture(item.id, setHoldingExerciseId, handleLongPress)}
    >
      <GestureDetector
        gesture={pressGesture(item.id, setHoldingExerciseId, handlePress)}
      >
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
            {t("EXCSECduration")} {item.duration} {t("EXCSECminutes")}
          </Text>
          <Text className={`${colors.secondaryText}`}>
            {t("EXCSECcalburn")} {item.calories}
          </Text>
        </View>
      </GestureDetector>
    </GestureDetector>
  );

  return (
    <View className={`p-5 ${colors.background}`}>
      <View className={`${colors.primaryBackground} rounded-lg p-4 shadow-md`}>
        <Text className={`mb-2 text-xl font-bold ${colors.primaryText}`}>
          {t("EXCSECexercise")}
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
            {t("EXCSECadd")}
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
          onCancel={handleCancelForm}
          isLoading={isLoading}
          validationErrors={validationErrors}
          isEditing={!!editingExercise}
          userId={userId}
        />
      </Modal>
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onDelete={handleDeleteExercise}
        colors={colors}
        recordType={"exercise"}
      />
    </View>
  );
};

export default ExerciseSection;
