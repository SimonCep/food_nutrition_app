import React, { useState } from "react";
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

import { ExerciseFormProps } from "@/types";
import { lightColorsDiary, darkColorsDiary } from "@/constants/Colors";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [isCustomExercise, setIsCustomExercise] = useState(false);

  const predefinedExercises = ["Running", "Walking", "Swimming", "Cycling"];

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
          {isCustomExercise ? (
            <TextInput
              value={exercise}
              onChangeText={setExercise}
              placeholder={t("EXCFRMtitle")}
              placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
              className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
            />
          ) : (
            <View className="mb-2">
              <View className={`border-b ${colors.inputBorder}`}>
                <Picker
                  selectedValue={exercise}
                  onValueChange={(value) => {
                    if (value === "custom") {
                      setIsCustomExercise(true);
                      setExercise("");
                    } else {
                      setExercise(value);
                    }
                  }}
                  style={{
                    color: colors.primaryText.split("-")[1],
                    backgroundColor: colors.unitBackground,
                  }}
                >
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
            </View>
          )}
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
    </ImageBackground>
  );
};

export default ExerciseForm;
