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

import FoodNutritionForm from "@/components/foodNutrition/FoodNutritionForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { FoodNutrition, FoodNutritionSectionProps, Tables } from "@/types";
import {
  addFoodNutrition,
  deleteFoodNutrition,
  fetchFoodNutrition,
  updateFoodNutrition,
} from "@/api/nutritionService";
import { darkColorsDiary, lightColorsDiary } from "@/constants/Colors";
import { addFoodNutritionValidationSchema } from "@/utils/validationSchemas";
import { longPressGesture, pressGesture } from "@/utils/gestureHandlers";
import { filterFoodNutritionByDate } from "@/utils/foodUtils";
import { useDiaryContext } from "@/providers/DiaryProvider";

const FoodSection: React.FC<FoodNutritionSectionProps> = ({
  userId,
  selectedDate,
}) => {
  const [foods, setFoods] = useState<FoodNutrition[]>([]);
  const [brand, setBrand] = useState<string | null>("");
  const [foodName, setFoodName] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [servingSize, setServingSize] = useState(0);
  const [calories, setCalories] = useState(0);
  const [fat, setFat] = useState<number | null>(0);
  const [saturatedFat, setSaturatedFat] = useState<number | null>(0);
  const [polyunsaturatedFat, setPolyunsaturatedFat] = useState<number | null>(
    0,
  );
  const [monounsaturatedFat, setMonounsaturatedFat] = useState<number | null>(
    0,
  );
  const [transFat, setTransFat] = useState<number | null>(0);
  const [cholesterol, setCholesterol] = useState<number | null>(0);
  const [sodium, setSodium] = useState<number | null>(0);
  const [potassium, setPotassium] = useState<number | null>(0);
  const [carbohydrates, setCarbohydrates] = useState<number | null>(0);
  const [fiber, setFiber] = useState<number | null>(0);
  const [sugar, setSugar] = useState<number | null>(0);
  const [addedSugars, setAddedSugars] = useState<number | null>(0);
  const [sugarAlcohols, setSugarAlcohols] = useState<number | null>(0);
  const [protein, setProtein] = useState<number | null>(0);
  const [vitaminA, setVitaminA] = useState<number | null>(0);
  const [vitaminC, setVitaminC] = useState<number | null>(0);
  const [vitaminD, setVitaminD] = useState<number | null>(0);
  const [calcium, setCalcium] = useState<number | null>(0);
  const [iron, setIron] = useState<number | null>(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [validationErrors, setValidationErrors] =
    useState<Yup.ValidationError | null>(null);
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [holdingFoodId, setHoldingFoodId] = useState<number | null>(null);
  const [editingFood, setEditingFood] = useState<FoodNutrition | null>(null);
  const { foodUpdated, setFoodUpdated } = useDiaryContext();

  useEffect(() => {
    const fetchFoodNutritionData = async () => {
      try {
        const data = await fetchFoodNutrition(userId);
        const filteredNutrition = filterFoodNutritionByDate(data, selectedDate);
        setFoods(filteredNutrition);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoodNutritionData().catch((error) => {
      console.error("Error fetching food data:", error);
    });
  }, [userId, selectedDate, foodUpdated]);

  const handleSaveFood = async () => {
    try {
      setIsLoading(true);
      await addFoodNutritionValidationSchema.validate(
        {
          brand,
          foodName,
          measurementUnit,
          servingSize,
          calories,
          fat,
          saturatedFat,
          polyunsaturatedFat,
          monounsaturatedFat,
          transFat,
          cholesterol,
          sodium,
          potassium,
          carbohydrates,
          fiber,
          sugar,
          addedSugars,
          sugarAlcohols,
          protein,
          vitaminA,
          vitaminC,
          vitaminD,
          calcium,
          iron,
        },
        { abortEarly: false },
      );
      setValidationErrors(null);

      const formattedDate = selectedDate.toISOString();
      let success;
      if (editingFood) {
        success = await updateFoodNutrition(
          editingFood.id,
          brand,
          foodName,
          formattedDate,
          measurementUnit,
          servingSize,
          calories,
          fat,
          saturatedFat,
          polyunsaturatedFat,
          monounsaturatedFat,
          transFat,
          cholesterol,
          sodium,
          potassium,
          carbohydrates,
          fiber,
          sugar,
          addedSugars,
          sugarAlcohols,
          protein,
          vitaminA,
          vitaminC,
          vitaminD,
          calcium,
          iron,
        );
      } else {
        success = await addFoodNutrition(
          userId,
          brand,
          foodName,
          formattedDate,
          measurementUnit,
          servingSize,
          calories,
          fat,
          saturatedFat,
          polyunsaturatedFat,
          monounsaturatedFat,
          transFat,
          cholesterol,
          sodium,
          potassium,
          carbohydrates,
          fiber,
          sugar,
          addedSugars,
          sugarAlcohols,
          protein,
          vitaminA,
          vitaminC,
          vitaminD,
          calcium,
          iron,
        );
      }

      if (success) {
        setBrand("");
        setFoodName("");
        setMeasurementUnit("");
        setServingSize(0);
        setCalories(0);
        setFat(0);
        setSaturatedFat(0);
        setPolyunsaturatedFat(0);
        setMonounsaturatedFat(0);
        setTransFat(0);
        setCholesterol(0);
        setSodium(0);
        setPotassium(0);
        setCarbohydrates(0);
        setFiber(0);
        setSugar(0);
        setAddedSugars(0);
        setSugarAlcohols(0);
        setProtein(0);
        setVitaminA(0);
        setVitaminC(0);
        setVitaminD(0);
        setCalcium(0);
        setIron(0);
        setIsFormVisible(false);
        setEditingFood(null);
        setValidationErrors(null); // Clear validation errors on successful submission
        const data = await fetchFoodNutrition(userId);
        const filteredExercises = filterFoodNutritionByDate(data, selectedDate);
        setFoods(filteredExercises);
        setFoodUpdated(true);
      } else {
        Alert.alert(
          "Error",
          `Failed to ${editingFood ? "update" : "add"} food. Please try again.`,
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors(error);
      } else {
        console.error("Error saving food:", error);
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

  const handleDeleteFood = async () => {
    if (selectedFoodId) {
      try {
        const success = await deleteFoodNutrition(selectedFoodId);
        if (success) {
          const data = await fetchFoodNutrition(userId);
          const filteredExercises = filterFoodNutritionByDate(
            data,
            selectedDate,
          );
          setFoods(filteredExercises);
          setSelectedFoodId(null);
          setIsDeleteModalVisible(false);
          setFoodUpdated(true);
        } else {
          Alert.alert("Error", "Failed to delete food. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting food:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleOpenForm = (food?: FoodNutrition) => {
    if (food) {
      setEditingFood(food);
      setBrand(food.brand);
      setFoodName(food.food_name);
      setMeasurementUnit(food.measurement_unit);
      setServingSize(food.serving_size);
      setCalories(food.calories);
      setFat(food.fat);
      setSaturatedFat(food.saturated_fat);
      setPolyunsaturatedFat(food.polyunsaturated_fat);
      setMonounsaturatedFat(food.monounsaturated_fat);
      setTransFat(food.trans_fat);
      setCholesterol(food.cholesterol);
      setSodium(food.sodium);
      setPotassium(food.potassium);
      setCarbohydrates(food.carbohydrates);
      setFiber(food.fiber);
      setSugar(food.sugar);
      setAddedSugars(food.added_sugars);
      setSugarAlcohols(food.sugar_alcohols);
      setProtein(food.protein);
      setVitaminA(food.vitamin_a);
      setVitaminC(food.vitamin_c);
      setVitaminD(food.vitamin_d);
      setCalcium(food.calcium);
      setIron(food.iron);
    } else {
      setEditingFood(null);
      setBrand("");
      setFoodName("");
      setMeasurementUnit("");
      setServingSize(0);
      setCalories(0);
      setFat(0);
      setSaturatedFat(0);
      setPolyunsaturatedFat(0);
      setMonounsaturatedFat(0);
      setTransFat(0);
      setCholesterol(0);
      setSodium(0);
      setPotassium(0);
      setCarbohydrates(0);
      setFiber(0);
      setSugar(0);
      setAddedSugars(0);
      setSugarAlcohols(0);
      setProtein(0);
      setVitaminA(0);
      setVitaminC(0);
      setVitaminD(0);
      setCalcium(0);
      setIron(0);
    }
    setIsFormVisible(true);
    setValidationErrors(null);
  };

  const handleLongPress = (foodId: number) => {
    setSelectedFoodId(foodId);
    setIsDeleteModalVisible(true);
  };

  const handlePress = (foodId: number) => {
    const food = foods.find((item) => item.id === foodId);
    if (food) {
      setEditingFood(food);
      setBrand(food.brand);
      setFoodName(food.food_name);
      setMeasurementUnit(food.measurement_unit);
      setServingSize(food.serving_size);
      setCalories(food.calories);
      setFat(food.fat);
      setSaturatedFat(food.saturated_fat);
      setPolyunsaturatedFat(food.polyunsaturated_fat);
      setMonounsaturatedFat(food.monounsaturated_fat);
      setTransFat(food.trans_fat);
      setCholesterol(food.cholesterol);
      setSodium(food.sodium);
      setPotassium(food.potassium);
      setCarbohydrates(food.carbohydrates);
      setFiber(food.fiber);
      setSugar(food.sugar);
      setAddedSugars(food.added_sugars);
      setSugarAlcohols(food.sugar_alcohols);
      setProtein(food.protein);
      setVitaminA(food.vitamin_a);
      setVitaminC(food.vitamin_c);
      setVitaminD(food.vitamin_d);
      setCalcium(food.calcium);
      setIron(food.iron);
      setIsFormVisible(true);
    }
    setHoldingFoodId(null);
  };

  const renderFoodItem = ({ item }: { item: Tables<"nutrition"> }) => (
    <GestureDetector
      gesture={longPressGesture(item.id, setHoldingFoodId, handleLongPress)}
    >
      <GestureDetector
        gesture={pressGesture(item.id, setHoldingFoodId, handlePress)}
      >
        <View
          className={`${
            holdingFoodId === item.id
              ? colors.holdingBackground
              : colors.primaryBackground
          } mb-4 rounded-lg p-4 shadow-md`}
        >
          <Text className={`text-lg font-bold ${colors.primaryText}`}>
            {item.food_name}
          </Text>
          <Text className={`${colors.secondaryText}`}>
            {item.serving_size} {item.measurement_unit}
          </Text>
          <Text className={`${colors.secondaryText}`}>
            Calories: {item.calories}
          </Text>
        </View>
      </GestureDetector>
    </GestureDetector>
  );

  return (
    <View className={`p-5 ${colors.background}`}>
      <View className={`${colors.primaryBackground} rounded-lg p-4 shadow-md`}>
        <Text className={`mb-2 text-xl font-bold ${colors.primaryText}`}>
          Food
        </Text>
        <View className={`border-b ${colors.border} mb-4`} />
        <FlatList
          data={foods}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
        <TouchableOpacity
          onPress={() => handleOpenForm()}
          className={`${colors.buttonBackground} rounded-full border-2 px-4 py-2 ${colors.buttonBorder} mb-4`}
        >
          <Text className={`${colors.buttonText} text-center font-bold`}>
            Add Food
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isFormVisible} animationType="slide">
        <FoodNutritionForm
          brand={brand}
          setBrand={setBrand}
          foodName={foodName}
          setFoodName={setFoodName}
          measurementUnit={measurementUnit}
          setMeasurementUnit={setMeasurementUnit}
          servingSize={servingSize}
          setServingSize={setServingSize}
          calories={calories}
          setCalories={setCalories}
          fat={fat}
          setFat={setFat}
          saturatedFat={saturatedFat}
          setSaturatedFat={setSaturatedFat}
          polyunsaturatedFat={polyunsaturatedFat}
          setPolyunsaturatedFat={setPolyunsaturatedFat}
          monounsaturatedFat={monounsaturatedFat}
          setMonounsaturatedFat={setMonounsaturatedFat}
          transFat={transFat}
          setTransFat={setTransFat}
          cholesterol={cholesterol}
          setCholesterol={setCholesterol}
          sodium={sodium}
          setSodium={setSodium}
          potassium={potassium}
          setPotassium={setPotassium}
          carbohydrates={carbohydrates}
          setCarbohydrates={setCarbohydrates}
          fiber={fiber}
          setFiber={setFiber}
          sugar={sugar}
          setSugar={setSugar}
          addedSugars={addedSugars}
          setAddedSugars={setAddedSugars}
          sugarAlcohols={sugarAlcohols}
          setSugarAlcohols={setSugarAlcohols}
          protein={protein}
          setProtein={setProtein}
          vitaminA={vitaminA}
          setVitaminA={setVitaminA}
          vitaminC={vitaminC}
          setVitaminC={setVitaminC}
          vitaminD={vitaminD}
          setVitaminD={setVitaminD}
          calcium={calcium}
          setCalcium={setCalcium}
          iron={iron}
          setIron={setIron}
          onSubmit={handleSaveFood}
          onCancel={handleCancelForm}
          isLoading={isLoading}
          validationErrors={validationErrors}
          isEditing={!!editingFood}
        />
      </Modal>
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onDelete={handleDeleteFood}
        colors={colors}
        recordType={"food"}
      />
    </View>
  );
};

export default FoodSection;
