import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useColorScheme } from "nativewind";

import { FoodNutritionFormProps } from "@/types";
import { lightColorsDiary, darkColorsDiary } from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from 'react-i18next';

const FoodNutritionForm: React.FC<FoodNutritionFormProps> = ({
  brand,
  setBrand,
  foodName,
  setFoodName,
  measurementUnit,
  setMeasurementUnit,
  servingSize,
  setServingSize,
  calories,
  setCalories,
  fat,
  setFat,
  saturatedFat,
  setSaturatedFat,
  polyunsaturatedFat,
  setPolyunsaturatedFat,
  monounsaturatedFat,
  setMonounsaturatedFat,
  transFat,
  setTransFat,
  cholesterol,
  setCholesterol,
  sodium,
  setSodium,
  potassium,
  setPotassium,
  carbohydrates,
  setCarbohydrates,
  fiber,
  setFiber,
  sugar,
  setSugar,
  addedSugars,
  setAddedSugars,
  sugarAlcohols,
  setSugarAlcohols,
  protein,
  setProtein,
  vitaminA,
  setVitaminA,
  vitaminC,
  setVitaminC,
  vitaminD,
  setVitaminD,
  calcium,
  setCalcium,
  iron,
  setIron,
  onSubmit,
  onCancel,
  isLoading,
  validationErrors,
  isEditing,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;

  const getFieldError = (field: string) => {
    return validationErrors?.inner.find((error) => error.path === field)
      ?.message;
  };

  return (
    
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1 resize-y justify-center bg-white dark:bg-black"
      >
      <View className={`items-center justify-center p-6`}>
        <Text className={`mb-6 text-center text-2xl font-bold ${colors.text}`}>
          {isEditing ? t('FOODFRMediting') : t('FOODFRMadding')}
        </Text>
        <View
          className={`w-full max-w-md rounded-lg p-4 shadow-md ${colors.primaryBackground}`}
        >
          <TextInput
            value={brand ?? ""}
            onChangeText={setBrand}
            placeholder={t('FOODFRMbrand')}
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={foodName}
            onChangeText={setFoodName}
            placeholder={t('FOODFRMdesc')}
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          {getFieldError("foodName") && (
            <Text className={`mb-2 ${colors.errorText}`}>
              {getFieldError("foodName")}
            </Text>
          )}
          <TextInput
            value={measurementUnit}
            onChangeText={setMeasurementUnit}
            placeholder={t('FOODFRMuntis')}
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          {getFieldError("measurementUnit") && (
            <Text className={`mb-2 ${colors.errorText}`}>
              {getFieldError("measurementUnit")}
            </Text>
          )}
          <TextInput
            value={servingSize > 0 ? servingSize.toString() : ""}
            onChangeText={(text) => setServingSize(parseInt(text) || 0)}
            placeholder={t('FOODFRMserving')}
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          {getFieldError("servingSize") && (
            <Text className={`mb-2 ${colors.errorText}`}>
              {getFieldError("servingSize")}
            </Text>
          )}
          <TextInput
            value={calories > 0 ? calories.toString() : ""}
            onChangeText={(text) => setCalories(parseInt(text) || 0)}
            placeholder={t('FOODFRMcals')}
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          {getFieldError("calories") && (
            <Text className={`mb-2 ${colors.errorText}`}>
              {getFieldError("calories")}
            </Text>
          )}
          <TextInput
            value={fat != null && fat > 0 ? fat.toString() : ""}
            onChangeText={(text) => setFat(parseInt(text) || 0)}
            placeholder="Total Fat (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={
              saturatedFat != null && saturatedFat > 0
                ? saturatedFat.toString()
                : ""
            }
            onChangeText={(text) => setSaturatedFat(parseInt(text) || 0)}
            placeholder="Saturated Fat (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={
              polyunsaturatedFat != null && polyunsaturatedFat > 0
                ? polyunsaturatedFat.toString()
                : ""
            }
            onChangeText={(text) => setPolyunsaturatedFat(parseInt(text) || 0)}
            placeholder="Polyunsaturated Fat (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={
              monounsaturatedFat != null && monounsaturatedFat > 0
                ? monounsaturatedFat.toString()
                : ""
            }
            onChangeText={(text) => setMonounsaturatedFat(parseInt(text) || 0)}
            placeholder="Monounsaturated Fat (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={transFat != null && transFat > 0 ? transFat.toString() : ""}
            onChangeText={(text) => setTransFat(parseInt(text) || 0)}
            placeholder="Trans Fat (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={
              cholesterol != null && cholesterol > 0
                ? cholesterol.toString()
                : ""
            }
            onChangeText={(text) => setCholesterol(parseInt(text) || 0)}
            placeholder="Cholesterol (mg) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={sodium != null && sodium > 0 ? sodium.toString() : ""}
            onChangeText={(text) => setSodium(parseInt(text) || 0)}
            placeholder="Sodium (mg) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={
              potassium != null && potassium > 0 ? potassium.toString() : ""
            }
            onChangeText={(text) => setPotassium(parseInt(text) || 0)}
            placeholder="Potassium (mg) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={
              carbohydrates != null && carbohydrates > 0
                ? carbohydrates.toString()
                : ""
            }
            onChangeText={(text) => setCarbohydrates(parseInt(text) || 0)}
            placeholder="Total Carbohydrates (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={fiber != null && fiber > 0 ? fiber.toString() : ""}
            onChangeText={(text) => setFiber(parseInt(text) || 0)}
            placeholder="Dietary Fiber (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={sugar != null && sugar > 0 ? sugar.toString() : ""}
            onChangeText={(text) => setSugar(parseInt(text) || 0)}
            placeholder="Sugars (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={
              addedSugars != null && addedSugars > 0
                ? addedSugars.toString()
                : ""
            }
            onChangeText={(text) => setAddedSugars(parseInt(text) || 0)}
            placeholder="Added Sugars (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={
              sugarAlcohols != null && sugarAlcohols > 0
                ? sugarAlcohols.toString()
                : ""
            }
            onChangeText={(text) => setSugarAlcohols(parseInt(text) || 0)}
            placeholder="Sugar Alcohols (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={protein != null && protein > 0 ? protein.toString() : ""}
            onChangeText={(text) => setProtein(parseInt(text) || 0)}
            placeholder="Protein (g) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={vitaminA != null && vitaminA > 0 ? vitaminA.toString() : ""}
            onChangeText={(text) => setVitaminA(parseInt(text) || 0)}
            placeholder="Vitamin A (%) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={vitaminC != null && vitaminC > 0 ? vitaminC.toString() : ""}
            onChangeText={(text) => setVitaminC(parseInt(text) || 0)}
            placeholder="Vitamin C (%) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={vitaminD != null && vitaminD > 0 ? vitaminD.toString() : ""}
            onChangeText={(text) => setVitaminD(parseInt(text) || 0)}
            placeholder="Vitamin D (%) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={calcium != null && calcium > 0 ? calcium.toString() : ""}
            onChangeText={(text) => setCalcium(parseInt(text) || 0)}
            placeholder="Calcium (%) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
          <TextInput
            value={iron != null && iron > 0 ? iron.toString() : ""}
            onChangeText={(text) => setIron(parseInt(text) || 0)}
            placeholder="Iron (%) (Optional)"
            placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
            keyboardType="numeric"
            className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
          />
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
                {isEditing ? t('FOODFRMsave') : t('FOODFRMadd')}
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
              {t('FOODFRMcancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default FoodNutritionForm;
