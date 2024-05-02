import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useColorScheme } from "nativewind";

import { FoodNutritionFormProps } from "@/types";
import { lightColorsDiary, darkColorsDiary } from "@/constants/Colors";

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
        {isEditing ? "Edit Food" : "Add Food"}
      </Text>
      <View
        className={`w-full max-w-md rounded-lg p-4 shadow-md ${colors.primaryBackground}`}
      >
        <TextInput
          value={brand ?? ""}
          onChangeText={setBrand}
          placeholder="Brand Name (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("brand") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("brand")}
          </Text>
        )}
        <TextInput
          value={foodName}
          onChangeText={setFoodName}
          placeholder="Description (Required)"
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
          placeholder="Measurement Unit (Required)"
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
          placeholder="Serving Size (Required)"
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
          value={calories?.toString() ?? ""}
          onChangeText={(text) => setCalories(parseInt(text) || 0)}
          placeholder="Calories (Required)"
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
          value={fat?.toString() ?? ""}
          onChangeText={(text) => setFat(parseInt(text) || 0)}
          placeholder="Total Fat (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("fat") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("fat")}
          </Text>
        )}
        <TextInput
          value={saturatedFat?.toString() ?? ""}
          onChangeText={(text) => setSaturatedFat(parseInt(text) || 0)}
          placeholder="Saturated Fat (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("saturatedFat") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("saturatedFat")}
          </Text>
        )}
        <TextInput
          value={polyunsaturatedFat?.toString() ?? ""}
          onChangeText={(text) => setPolyunsaturatedFat(parseInt(text) || 0)}
          placeholder="Polyunsaturated Fat (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("polyunsaturatedFat") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("polyunsaturatedFat")}
          </Text>
        )}
        <TextInput
          value={monounsaturatedFat?.toString() ?? ""}
          onChangeText={(text) => setMonounsaturatedFat(parseInt(text) || 0)}
          placeholder="Monounsaturated Fat (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("monounsaturatedFat") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("monounsaturatedFat")}
          </Text>
        )}
        <TextInput
          value={transFat?.toString() ?? ""}
          onChangeText={(text) => setTransFat(parseInt(text) || 0)}
          placeholder="Trans Fat (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("transFat") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("transFat")}
          </Text>
        )}
        <TextInput
          value={cholesterol?.toString() ?? ""}
          onChangeText={(text) => setCholesterol(parseInt(text) || 0)}
          placeholder="Cholesterol (mg) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("cholesterol") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("cholesterol")}
          </Text>
        )}
        <TextInput
          value={sodium?.toString() ?? ""}
          onChangeText={(text) => setSodium(parseInt(text) || 0)}
          placeholder="Sodium (mg) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("sodium") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("sodium")}
          </Text>
        )}
        <TextInput
          value={potassium?.toString() ?? ""}
          onChangeText={(text) => setPotassium(parseInt(text) || 0)}
          placeholder="Potassium (mg) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("potassium") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("potassium")}
          </Text>
        )}
        <TextInput
          value={carbohydrates?.toString() ?? ""}
          onChangeText={(text) => setCarbohydrates(parseInt(text) || 0)}
          placeholder="Total Carbohydrates (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("carbohydrates") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("carbohydrates")}
          </Text>
        )}
        <TextInput
          value={fiber?.toString() ?? ""}
          onChangeText={(text) => setFiber(parseInt(text) || 0)}
          placeholder="Dietary Fiber (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("fiber") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("fiber")}
          </Text>
        )}
        <TextInput
          value={sugar?.toString() ?? ""}
          onChangeText={(text) => setSugar(parseInt(text) || 0)}
          placeholder="Sugars (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("sugar") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("sugar")}
          </Text>
        )}
        <TextInput
          value={addedSugars?.toString() ?? ""}
          onChangeText={(text) => setAddedSugars(parseInt(text) || 0)}
          placeholder="Added Sugars (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("addedSugars") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("addedSugars")}
          </Text>
        )}
        <TextInput
          value={sugarAlcohols?.toString() ?? ""}
          onChangeText={(text) => setSugarAlcohols(parseInt(text) || 0)}
          placeholder="Sugar Alcohols (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("sugarAlcohols") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("sugarAlcohols")}
          </Text>
        )}
        <TextInput
          value={protein?.toString() ?? ""}
          onChangeText={(text) => setProtein(parseInt(text) || 0)}
          placeholder="Protein (g) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("protein") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("protein")}
          </Text>
        )}
        <TextInput
          value={vitaminA?.toString() ?? ""}
          onChangeText={(text) => setVitaminA(parseInt(text) || 0)}
          placeholder="Vitamin A (%) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("vitaminA") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("vitaminA")}
          </Text>
        )}
        <TextInput
          value={vitaminC?.toString() ?? ""}
          onChangeText={(text) => setVitaminC(parseInt(text) || 0)}
          placeholder="Vitamin C (%) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("vitaminC") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("vitaminC")}
          </Text>
        )}
        <TextInput
          value={vitaminD?.toString() ?? ""}
          onChangeText={(text) => setVitaminD(parseInt(text) || 0)}
          placeholder="Vitamin D (%) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("vitaminD") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("vitaminD")}
          </Text>
        )}
        <TextInput
          value={calcium?.toString() ?? ""}
          onChangeText={(text) => setCalcium(parseInt(text) || 0)}
          placeholder="Calcium (%) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("calcium") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("calcium")}
          </Text>
        )}
        <TextInput
          value={iron?.toString() ?? ""}
          onChangeText={(text) => setIron(parseInt(text) || 0)}
          placeholder="Iron (%) (Optional)"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
        />
        {getFieldError("iron") && (
          <Text className={`mb-2 ${colors.errorText}`}>
            {getFieldError("iron")}
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

export default FoodNutritionForm;
