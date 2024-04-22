import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useColorScheme } from "nativewind";

import { ExerciseFormProps } from "@/types";
import { lightColorsDiary, darkColorsDiary } from "@/constants/Colors";

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
}) => {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;

  const getFieldError = (field: string) => {
    return validationErrors?.inner.find((error) => error.path === field)
      ?.message;
  };

  return (
    <View
      className={`flex-1 items-center justify-center p-6 ${colors.background}`}
    >
      <Text className={`mb-6 text-center text-2xl font-bold ${colors.text}`}>
        {isEditing ? "Edit Exercise" : "Add Exercise"}
      </Text>
      <View
        className={`w-full max-w-md rounded-lg p-4 shadow-md ${colors.primaryBackground}`}
      >
        <TextInput
          value={exercise}
          onChangeText={setExercise}
          placeholder="Exercise"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("exercise") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("exercise")}
          </Text>
        )}
        <TextInput
          value={duration > 0 ? duration.toString() : ""}
          onChangeText={(text) => setDuration(parseInt(text) || 0)}
          placeholder="Duration (in minutes)"
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
          placeholder="Calories Burned"
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
              {isEditing ? "Save" : "Add"}
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
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExerciseForm;
