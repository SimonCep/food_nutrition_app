import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useColorScheme } from "nativewind";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { FoodNutritionFormProps, Tables } from "@/types";
import { lightColorsDiary, darkColorsDiary } from "@/constants/Colors";
import { fetchFoodNutrition } from "@/api/nutritionService";
import FoodHistoryModal from "@/components/foodNutrition/FoodHistoryModal";

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
  userId,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [showOptional, setShowOptional] = useState(false);

  const predifinedMeasurementUnits = ["g", "ml", "pcs"];

  const [previousFoodEntries, setPreviousFoodEntries] = useState<
    Tables<"nutrition">[]
  >([]);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);

  useEffect(() => {
    const fetchPreviousFoodEntries = async () => {
      try {
        const foodEntries = await fetchFoodNutrition(userId);
        setPreviousFoodEntries(foodEntries);
      } catch (error) {
        console.error("Error fetching previous food entries:", error);
      }
    };

    fetchPreviousFoodEntries();
  }, [userId]);

  const handleSelectFromHistory = (selectedFoodEntry: Tables<"nutrition">) => {
    // Required values
    setFoodName(selectedFoodEntry.food_name);
    setServingSize(selectedFoodEntry.serving_size);
    setMeasurementUnit(selectedFoodEntry.measurement_unit);
    setCalories(selectedFoodEntry.calories);
    // Optional values
    setBrand(selectedFoodEntry.brand);
    setCarbohydrates(selectedFoodEntry.carbohydrates);
    setProtein(selectedFoodEntry.protein);
    setFat(selectedFoodEntry.fat);
    setSaturatedFat(selectedFoodEntry.saturated_fat);
    setPolyunsaturatedFat(selectedFoodEntry.polyunsaturated_fat);
    setMonounsaturatedFat(selectedFoodEntry.monounsaturated_fat);
    setTransFat(selectedFoodEntry.trans_fat);
    setCholesterol(selectedFoodEntry.cholesterol);
    setSodium(selectedFoodEntry.sodium);
    setPotassium(selectedFoodEntry.potassium);
    setFiber(selectedFoodEntry.fiber);
    setSugar(selectedFoodEntry.sugar);
    setAddedSugars(selectedFoodEntry.added_sugars);
    setSugarAlcohols(selectedFoodEntry.sugar_alcohols);
    setVitaminA(selectedFoodEntry.vitamin_a);
    setVitaminC(selectedFoodEntry.vitamin_c);
    setVitaminD(selectedFoodEntry.vitamin_d);
    setCalcium(selectedFoodEntry.calcium);
    setIron(selectedFoodEntry.iron);
    setIsHistoryModalVisible(false);
  };

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
        <View className={`flex-1 items-center justify-center p-6`}>
          <Text
            className={`mb-6 text-center text-2xl font-bold ${colors.text}`}
          >
            {isEditing ? t("FOODFRMediting") : t("FOODFRMadding")}
          </Text>
          <View
            className={`w-full max-w-md rounded-lg p-4 shadow-md ${colors.primaryBackground}`}
          >
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-1">
                <TextInput
                  value={foodName}
                  onChangeText={setFoodName}
                  placeholder={t("FOODFRMdesc")}
                  placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
                  className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
                />
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
                  {t("History")}
                </Text>
              </TouchableOpacity>
            </View>
            {getFieldError("foodName") && (
              <Text className={`mb-2 ${colors.errorText}`}>
                {getFieldError("foodName")}
              </Text>
            )}
            <TextInput
              value={servingSize > 0 ? servingSize.toString() : ""}
              onChangeText={(text) => setServingSize(parseInt(text) || 0)}
              placeholder={t("FOODFRMserving")}
              placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
              keyboardType="numeric"
              className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
            />
            {getFieldError("servingSize") && (
              <Text className={`mb-2 ${colors.errorText}`}>
                {getFieldError("servingSize")}
              </Text>
            )}
            <View className="mb-2">
              <View className={`border-b ${colors.inputBorder}`}>
                <Picker
                  selectedValue={measurementUnit}
                  onValueChange={setMeasurementUnit}
                  style={{
                    color: colors.primaryText.split("-")[1],
                    backgroundColor: colors.unitBackground,
                  }}
                >
                  {predifinedMeasurementUnits.map((unit) => (
                    <Picker.Item key={unit} label={unit} value={unit} />
                  ))}
                </Picker>
              </View>
            </View>
            {getFieldError("measurementUnit") && (
              <Text className={`mb-2 ${colors.errorText}`}>
                {getFieldError("measurementUnit")}
              </Text>
            )}
            <TextInput
              value={calories > 0 ? calories.toString() : ""}
              onChangeText={(text) => setCalories(parseInt(text) || 0)}
              placeholder={t("FOODFRMcals")}
              placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
              keyboardType="numeric"
              className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
            />
            {getFieldError("calories") && (
              <Text className={`mb-2 ${colors.errorText}`}>
                {getFieldError("calories")}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => setShowOptional(!showOptional)}
              className={`mb-2 flex-row items-center justify-between rounded-lg p-2`}
            >
              <Text className={`text-lg font-bold ${colors.text}`}>
                {t("OptionalFields")}
              </Text>
              <Ionicons
                name={showOptional ? "chevron-up" : "chevron-down"}
                size={24}
                color={colors.text.split("-")[1]}
              />
            </TouchableOpacity>
            {showOptional && (
              <>
                <TextInput
                  value={brand ?? ""}
                  onChangeText={setBrand}
                  placeholder={t("FOODFRMbrand")}
                  placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
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
                  value={fat != null && fat > 0 ? fat.toString() : ""}
                  onChangeText={(text) => setFat(parseInt(text) || 0)}
                  placeholder="Total Fat (g) (Optional)"
                  placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
                  keyboardType="numeric"
                  className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
                />
                <TextInput
                  value={
                    protein != null && protein > 0 ? protein.toString() : ""
                  }
                  onChangeText={(text) => setProtein(parseInt(text) || 0)}
                  placeholder="Protein (g) (Optional)"
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
                  onChangeText={(text) =>
                    setPolyunsaturatedFat(parseInt(text) || 0)
                  }
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
                  onChangeText={(text) =>
                    setMonounsaturatedFat(parseInt(text) || 0)
                  }
                  placeholder="Monounsaturated Fat (g) (Optional)"
                  placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
                  keyboardType="numeric"
                  className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
                />
                <TextInput
                  value={
                    transFat != null && transFat > 0 ? transFat.toString() : ""
                  }
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
                    potassium != null && potassium > 0
                      ? potassium.toString()
                      : ""
                  }
                  onChangeText={(text) => setPotassium(parseInt(text) || 0)}
                  placeholder="Potassium (mg) (Optional)"
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
                  value={
                    vitaminA != null && vitaminA > 0 ? vitaminA.toString() : ""
                  }
                  onChangeText={(text) => setVitaminA(parseInt(text) || 0)}
                  placeholder="Vitamin A (%) (Optional)"
                  placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
                  keyboardType="numeric"
                  className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
                />
                <TextInput
                  value={
                    vitaminC != null && vitaminC > 0 ? vitaminC.toString() : ""
                  }
                  onChangeText={(text) => setVitaminC(parseInt(text) || 0)}
                  placeholder="Vitamin C (%) (Optional)"
                  placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
                  keyboardType="numeric"
                  className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
                />
                <TextInput
                  value={
                    vitaminD != null && vitaminD > 0 ? vitaminD.toString() : ""
                  }
                  onChangeText={(text) => setVitaminD(parseInt(text) || 0)}
                  placeholder="Vitamin D (%) (Optional)"
                  placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
                  keyboardType="numeric"
                  className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.text}`}
                />
                <TextInput
                  value={
                    calcium != null && calcium > 0 ? calcium.toString() : ""
                  }
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
              </>
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
                  {isEditing ? t("FOODFRMsave") : t("FOODFRMadd")}
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
                {t("FOODFRMcancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <FoodHistoryModal
        isVisible={isHistoryModalVisible}
        onClose={() => setIsHistoryModalVisible(false)}
        onSelect={handleSelectFromHistory}
        previousFoodEntries={previousFoodEntries}
      />
    </ScrollView>
  );
};

export default FoodNutritionForm;
