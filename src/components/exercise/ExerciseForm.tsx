import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";
import { FontAwesome } from "@expo/vector-icons";

import { ExerciseFormProps, ExerciseType, Tables } from "@/types";
import { lightColorsDiary, darkColorsDiary } from "@/constants/Colors";
import { fetchExercises } from "@/api/exerciseService";
import ExerciseHistoryModal from "@/components/exercise/ExerciseHistoryModal";

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  exercise,
  setExercise,
  duration,
  setDuration,
  calories,
  setCalories,
  onSubmit,
  onCancel,
  isLoading,
  validationErrors,
  isEditing,
  userId,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [isCustomExercise, setIsCustomExercise] = useState(false);

  const predefinedExercises = ["Running", "Walking", "Swimming", "Cycling"];

  const [previousExercises, setPreviousExercises] = useState<
    Tables<"exercises">[]
  >([]);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] =
    useState<Tables<"exercises"> | null>(null);

  const calorieBurnRates: Record<ExerciseType, number> = {
    Running: 10,
    Walking: 5,
    Swimming: 8,
    Cycling: 7,
  };

  useEffect(() => {
    const fetchPreviousExercises = async () => {
      try {
        const exercises = await fetchExercises(userId);
        setPreviousExercises(exercises);
      } catch (error) {
        console.error("Error fetching previous exercises:", error);
      }
    };

    fetchPreviousExercises();
  }, [userId]);

  useEffect(() => {
    if (exercise && duration > 0) {
      const calorieBurnRate = calorieBurnRates[exercise as ExerciseType] || 0;
      const calculatedCalories = duration * calorieBurnRate;
      setCalories(calculatedCalories);
    } else {
      setCalories(0);
    }
  }, [exercise, duration]);

  const handleSelectFromHistory = (selectedExercise: Tables<"exercises">) => {
    setSelectedExercise(selectedExercise);
    setExercise(selectedExercise.exercise);
    setDuration(selectedExercise.duration);
    setCalories(selectedExercise.calories);
    setIsHistoryModalVisible(false);
  };

  const getFieldError = (field: string) => {
    return validationErrors?.inner.find((error) => error.path === field)
      ?.message;
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1 resize-y justify-center bg-white dark:bg-black"
    >
      <View className={`flex-1 items-center justify-center p-6`}>
        <Text className={`mb-6 text-center text-2xl font-bold ${colors.text}`}>
          {isEditing ? t("EXCFRMediting") : t("EXCFRMadding")}
        </Text>
        <View
          className={`w-full max-w-md rounded-lg p-4 shadow-md ${colors.primaryBackground}`}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-1">
              {isCustomExercise ? (
                <TextInput
                  value={exercise}
                  onChangeText={setExercise}
                  placeholder={t("EXCFRMtitle")}
                  placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
                  className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
                />
              ) : (
                <View className={`border-b ${colors.inputBorder}`}>
                  <Picker
                    selectedValue={selectedExercise?.exercise ?? exercise}
                    onValueChange={(value) => {
                      if (value === "custom") {
                        setIsCustomExercise(true);
                        setSelectedExercise(null);
                        setExercise("");
                      } else {
                        setSelectedExercise(null);
                        setExercise(value);
                      }
                    }}
                    style={{
                      color: colors.primaryText.split("-")[1],
                      backgroundColor: colors.unitBackground,
                    }}
                  >
                    <Picker.Item label="Select Exercise" value="" />
                    {predefinedExercises.map((exerciseItem) => (
                      <Picker.Item
                        key={exerciseItem}
                        label={exerciseItem}
                        value={exerciseItem}
                      />
                    ))}
                    <Picker.Item label="Custom" value="custom" />
                  </Picker>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={() => setIsHistoryModalVisible(true)}
              className={`ml-4 flex-row items-center rounded-full px-4 py-2 ${colors.buttonBackground}`}
            >
              <FontAwesome
                name="history"
                size={18}
                color={colors.buttonText.split("-")[1]}
              />
              <Text className={`ml-2 text-sm font-bold ${colors.buttonText}`}>
                History
              </Text>
            </TouchableOpacity>
          </View>
          {getFieldError("exercise") && (
            <Text className={`mb-2 ${colors.errorText}`}>
              {getFieldError("exercise")}
            </Text>
          )}
          <TextInput
            value={duration > 0 ? duration.toString() : ""}
            onChangeText={(text) => setDuration(parseInt(text) || 0)}
            placeholder={t("EXCFRMduration")}
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          {getFieldError("duration") && (
            <Text className={`mb-2 ${colors.errorText}`}>
              {getFieldError("duration")}
            </Text>
          )}
          <TextInput
            value={calories > 0 ? calories.toString() : ""}
            onChangeText={(text) => setCalories(parseInt(text) || 0)}
            placeholder={t("EXCFRMcalsburn")}
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          {getFieldError("calories") && (
            <Text className={`mb-4 ${colors.errorText}`}>
              {getFieldError("calories")}
            </Text>
          )}
          <TouchableOpacity
            onPress={onSubmit}
            disabled={isLoading}
            className={`mb-4 rounded-full border-2 py-3 ${colors.buttonBorder} ${colors.buttonBackground}`}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.buttonText.split("-")[1]} />
            ) : (
              <Text
                className={`text-center text-lg font-bold ${colors.buttonText}`}
              >
                {isEditing ? t("EXCFRMsave") : t("EXCFRMadd")}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCancel}
            className={`rounded-full px-6 py-3 ${colors.cancelButtonBackground}`}
          >
            <Text
              className={`text-center text-lg font-bold ${colors.cancelButtonText}`}
            >
              {t("EXCFRMcancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ExerciseHistoryModal
        isVisible={isHistoryModalVisible}
        onClose={() => setIsHistoryModalVisible(false)}
        onSelect={handleSelectFromHistory}
        previousExercises={previousExercises}
      />
    </ImageBackground>
  );
};

export default ExerciseForm;
