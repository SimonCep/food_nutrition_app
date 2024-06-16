import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import axios from "axios";
import { useColorScheme } from "nativewind";
import { darkColorsDashboard, lightColorsDashboard } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { fetchPersonalData } from "@/api/personalDataService";
import { usePersonalDataContext } from "@/providers/PersonalDataProvider";
import { useAuth } from "@/providers/AuthProvider";
import { Food, FoodData } from "@/types";
import { useDiaryContext } from "@/providers/DiaryProvider";
import { addFoodNutrition } from "@/api/nutritionService";

const CheckFood = () => {
  const [food, setFood] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [userHealthProblem, setUserHealthProblem] = useState("noneSelected");
  const [healthProblems, setHealthProblems] = useState<
    { label: string; value: string }[]
  >([]);
  const { session } = useAuth();
  const { shouldRefreshPersonalData } = usePersonalDataContext();
  const { foodUpdated, setFoodUpdated, refreshCalories, refreshFood } =
    useDiaryContext();

  const handleAddToDiary = async () => {
    if (selectedFood) {
      const formattedDate = new Date().toISOString();
      const success = await addFoodNutrition(
        session?.user?.id ?? "",
        "",
        selectedFood.label,
        formattedDate,
        selectedFood.nutrients.SERVING_UNIT?.label ?? "pcs",
        selectedFood.nutrients.SERVING_QUANTITY?.quantity ?? 1,
        selectedFood.nutrients.ENERC_KCAL?.quantity ?? 1,
        selectedFood.nutrients.FAT?.quantity ?? 0,
        selectedFood.nutrients.FASAT?.quantity ?? 0,
        selectedFood.nutrients.FAPU?.quantity ?? 0,
        selectedFood.nutrients.FAMS?.quantity ?? 0,
        selectedFood.nutrients.FATRN?.quantity ?? 0,
        selectedFood.nutrients.CHOLE?.quantity ?? 0,
        selectedFood.nutrients.NA?.quantity ?? 0,
        selectedFood.nutrients.K?.quantity ?? 0,
        selectedFood.nutrients.CHOCDF?.quantity ?? 0,
        selectedFood.nutrients.FIBTG?.quantity ?? 0,
        selectedFood.nutrients.SUGAR?.quantity ?? 0,
        selectedFood.nutrients.SUGAR_added?.quantity ?? 0,
        selectedFood.nutrients.SUGAR_alcohol?.quantity ?? 0,
        selectedFood.nutrients.PROCNT?.quantity ?? 0,
        selectedFood.nutrients.VITA_RAE?.quantity ?? 0,
        selectedFood.nutrients.VITC?.quantity ?? 0,
        selectedFood.nutrients.VITD?.quantity ?? 0,
        selectedFood.nutrients.CA?.quantity ?? 0,
        selectedFood.nutrients.FE?.quantity ?? 0,
      );

      if (success) {
        Alert.alert("Success", "Food added to diary!");
        setFoodUpdated(true);
        refreshCalories();
        refreshFood();
      } else {
        Alert.alert("Error", "Failed to add food to diary. Please try again.");
      }
    }
  };

  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsDashboard : lightColorsDashboard;

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        const personalData = await fetchPersonalData(session.user.id);
        if (personalData) {
          const formattedHealthIssues = personalData.health_issues.map(
            (issue) => {
              switch (issue) {
                case "heartDisease":
                  return { label: "Heart Disease", value: "heartDisease" };
                case "thyroidGlandDisorders":
                  return {
                    label: "Thyroid Gland Disorders",
                    value: "thyroidGlandDisorders",
                  };
                case "lactoseIntolerance":
                  return {
                    label: "Lactose Intolerance",
                    value: "lactoseIntolerance",
                  };
                case "celiacDisease":
                  return { label: "Celiac Disease", value: "celiacDisease" };
                case "hypertension":
                  return { label: "Hypertension", value: "hypertension" };
                case "diabetes":
                  return { label: "Diabetes", value: "diabetes" };
                case "kidneyDisease":
                  return { label: "Kidney Disease", value: "kidneyDisease" };
                case "noneSelected":
                  return { label: "None Selected", value: "noneSelected" };
                default:
                  return { label: issue, value: issue };
              }
            },
          );

          setHealthProblems(formattedHealthIssues);
        }
      }
    };

    fetchData();
  }, [session?.user?.id, shouldRefreshPersonalData]);

  useEffect(() => {
    if (food.length > 0) {
      fetchSuggestions(food);
    } else {
      setSuggestions([]);
    }
  }, [food]);

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get("https://api.edamam.com/auto-complete", {
        params: {
          q: query,
          app_id: "52252ff4",
          app_key: "9244bf41bbb1fae2c54ef5c5fc75ad38",
        },
      });

      const data = response.data;
      if (data && data.length > 0) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkFood = async () => {
    if (food.trim() === "") {
      setFeedback("Please enter a food name.");
      setSelectedFood(null);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.edamam.com/api/food-database/v2/parser",
        {
          params: {
            app_id: "52252ff4",
            app_key: "9244bf41bbb1fae2c54ef5c5fc75ad38",
            ingr: food,
          },
        },
      );

      const foodData: FoodData = response.data;
      if (foodData.hints.length > 0) {
        const selected = foodData.hints[0].food;
        setSelectedFood(selected);
        await fetchNutrientData(selected.foodId); // Await the nutrient data fetch
      } else {
        setFeedback("No data found for this food.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNutrientData = async (foodId: string) => {
    try {
      const response = await axios.post(
        "https://api.edamam.com/api/food-database/v2/nutrients",
        {
          ingredients: [
            {
              quantity: 1,
              measureURI: `http://www.edamam.com/ontologies/edamam.owl#Measure_unit`,
              foodId: foodId,
            },
          ],
        },
        {
          params: {
            app_id: "52252ff4",
            app_key: "9244bf41bbb1fae2c54ef5c5fc75ad38",
          },
        },
      );

      const nutrientData = response.data;
      setSelectedFood((prevFood) => {
        if (prevFood) {
          return {
            ...prevFood,
            nutrients: nutrientData.totalNutrients,
          };
        }
        return null;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateSelectedFoodNutrients = (nutrientData: any) => {
    if (selectedFood) {
      const updatedFood = {
        ...selectedFood,
        nutrients: nutrientData.totalNutrients,
      };
      setSelectedFood(updatedFood);
    }
  };

  const selectSuggestion = (item: string) => {
    setFood(item);
    setSuggestions([]);
    checkFood(); // Call checkFood directly
  };

  const renderSuggestions = () => {
    return (
      <FlatList
        data={suggestions}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectSuggestion(item)}>
            <Text style={styles.suggestionItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const healthProblemThresholds: {
    [key: string]: {
      [nutrient: string]: { harmfulHigh: number; beneficialHigh: number };
    };
  } = {
    noneSelected: {},
    heartDisease: {
      NA: { harmfulHigh: 1500, beneficialHigh: 1000 },
      FAT: { harmfulHigh: 30, beneficialHigh: 20 },
      FASAT: { harmfulHigh: 15, beneficialHigh: 10 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    thyroidGlandDisorders: {
      IODINE: { harmfulHigh: 600, beneficialHigh: 400 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    lactoseIntolerance: {
      CHOCDF: { harmfulHigh: 30, beneficialHigh: 20 },
      SUGAR: { harmfulHigh: 10, beneficialHigh: 5 },
      NA: { harmfulHigh: 1500, beneficialHigh: 1000 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    celiacDisease: {
      CHOCDF: { harmfulHigh: 30, beneficialHigh: 20 },
      SUGAR: { harmfulHigh: 10, beneficialHigh: 5 },
      NA: { harmfulHigh: 1500, beneficialHigh: 1000 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    hypertension: {
      NA: { harmfulHigh: 2300, beneficialHigh: 1500 },
      FAT: { harmfulHigh: 30, beneficialHigh: 20 },
      FASAT: { harmfulHigh: 15, beneficialHigh: 10 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    diabetes: {
      ENERC_KCAL: { harmfulHigh: 700, beneficialHigh: 500 },
      CHOCDF: { harmfulHigh: 70, beneficialHigh: 50 },
      SUGAR: { harmfulHigh: 50, beneficialHigh: 30 },
      FAT: { harmfulHigh: 30, beneficialHigh: 20 },
      FASAT: { harmfulHigh: 15, beneficialHigh: 10 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
    kidneyDisease: {
      NA: { harmfulHigh: 2300, beneficialHigh: 1500 },
      MG: { harmfulHigh: 400, beneficialHigh: 200 },
      K: { harmfulHigh: 3000, beneficialHigh: 2000 },
      P: { harmfulHigh: 1000, beneficialHigh: 800 },
      VITA_RAE: { harmfulHigh: 300, beneficialHigh: 150 },
      VITB12: { harmfulHigh: 10, beneficialHigh: 5 },
      ZN: { harmfulHigh: 20, beneficialHigh: 10 },
      FE: { harmfulHigh: 20, beneficialHigh: 10 },
    },
  };

  const getNutrientStyle = (
    nutrientKey: string,
    nutrientValue: number | undefined,
    healthProblem: string,
  ) => {
    const thresholds = healthProblemThresholds[healthProblem];
    if (!thresholds) {
      return styles.nutrient; // If no thresholds are found for the given health problem, return the default style
    }

    const threshold = thresholds[nutrientKey];
    if (nutrientValue !== undefined && threshold !== undefined) {
      if (nutrientValue <= threshold.beneficialHigh) {
        return styles.nutrientBeneficial;
      } else if (nutrientValue <= threshold.harmfulHigh) {
        return styles.nutrientHarmful;
      } else {
        return styles.nutrientVeryHarmful;
      }
    }
    return styles.nutrient;
  };

  return (
    <View className={`container flex-1 p-10 ${colors.background}`}>
      <Text className={`${colors.buttonText} mb-5 text-center text-2xl`}>
        Check food nutrition
      </Text>
      <View className="flex">
        <TextInput
          style={styles.input}
          placeholder="Enter the name of the food"
          value={food}
          onChangeText={setFood}
        />
        {suggestions.length > 0 && renderSuggestions()}
      </View>

      {feedback !== "" && <Text style={styles.feedback}>{feedback}</Text>}

      <TouchableOpacity
        className={`${colors.buttonBackground} rounded-full border-2 ${colors.buttonBorder} mb-2 mt-4 px-4 py-2`}
        onPress={() => setIsModalVisible(true)}
      >
        <Text className={`${colors.buttonText} text-center font-bold`}>
          Select Health Issue
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            {healthProblems.map((problem) => (
              <TouchableOpacity
                key={problem.value}
                style={styles.modalItem}
                onPress={() => {
                  setUserHealthProblem(problem.value);
                  setIsModalVisible(false);
                }}
              >
                <Text>{problem.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      {selectedFood && (
        <View style={styles.foodDetails}>
          <Text style={styles.subheader}>Nutrients:</Text>
          <Text
            style={getNutrientStyle(
              "ENERC_KCAL",
              selectedFood.nutrients.ENERC_KCAL?.quantity,
              userHealthProblem,
            )}
          >
            Calories:{" "}
            {Math.round(selectedFood.nutrients.ENERC_KCAL?.quantity || 0)} kcal
          </Text>
          <Text
            style={getNutrientStyle(
              "CHOCDF",
              selectedFood.nutrients.CHOCDF?.quantity,
              userHealthProblem,
            )}
          >
            Carbs: {Math.round(selectedFood.nutrients.CHOCDF?.quantity || 0)} g
          </Text>
          <Text
            style={getNutrientStyle(
              "FAT",
              selectedFood.nutrients.FAT?.quantity,
              userHealthProblem,
            )}
          >
            Fat: {Math.round(selectedFood.nutrients.FAT?.quantity || 0)} g
          </Text>
          <Text
            style={getNutrientStyle(
              "FASAT",
              selectedFood.nutrients.FASAT?.quantity,
              userHealthProblem,
            )}
          >
            Saturated Fat:{" "}
            {Math.round(selectedFood.nutrients.FASAT?.quantity || 0)} g
          </Text>
          <Text
            style={getNutrientStyle(
              "FATRN",
              selectedFood.nutrients.FATRN?.quantity,
              userHealthProblem,
            )}
          >
            Trans Fat: {Math.round(selectedFood.nutrients.FATRN?.quantity || 0)}{" "}
            g
          </Text>
          <Text
            style={getNutrientStyle(
              "PROCNT",
              selectedFood.nutrients.PROCNT?.quantity,
              userHealthProblem,
            )}
          >
            Protein: {Math.round(selectedFood.nutrients.PROCNT?.quantity || 0)}{" "}
            g
          </Text>
          <Text
            style={getNutrientStyle(
              "SUGAR",
              selectedFood.nutrients.SUGAR?.quantity,
              userHealthProblem,
            )}
          >
            Sugar: {Math.round(selectedFood.nutrients.SUGAR?.quantity || 0)} g
          </Text>
          <Text
            style={getNutrientStyle(
              "MG",
              selectedFood.nutrients.MG?.quantity,
              userHealthProblem,
            )}
          >
            Magnesium: {Math.round(selectedFood.nutrients.MG?.quantity || 0)} mg
          </Text>
          <Text
            style={getNutrientStyle(
              "NA",
              selectedFood.nutrients.NA?.quantity,
              userHealthProblem,
            )}
          >
            Sodium: {Math.round(selectedFood.nutrients.NA?.quantity || 0)} mg
          </Text>
          <Text
            style={getNutrientStyle(
              "VITA_RAE",
              selectedFood.nutrients.VITA_RAE?.quantity,
              userHealthProblem,
            )}
          >
            Vitamin A:{" "}
            {Math.round(selectedFood.nutrients.VITA_RAE?.quantity || 0)} μg
          </Text>
          <Text
            style={getNutrientStyle(
              "VITB12",
              selectedFood.nutrients.VITB12?.quantity,
              userHealthProblem,
            )}
          >
            Vitamin B12:{" "}
            {Math.round(selectedFood.nutrients.VITB12?.quantity || 0)} μg
          </Text>
          <Text
            style={getNutrientStyle(
              "ZN",
              selectedFood.nutrients.ZN?.quantity,
              userHealthProblem,
            )}
          >
            Zinc: {Math.round(selectedFood.nutrients.ZN?.quantity || 0)} mg
          </Text>
          <Text
            style={getNutrientStyle(
              "FE",
              selectedFood.nutrients.FE?.quantity,
              userHealthProblem,
            )}
          >
            Iron: {Math.round(selectedFood.nutrients.FE?.quantity || 0)} mg
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={handleAddToDiary}
        className={`${colors.buttonBackground} rounded-full border-2 ${colors.buttonBorder} mb-5 mt-4 px-4 py-2`}
      >
        <Text className={`${colors.buttonText} text-center font-bold`}>
          Add to Diary
        </Text>
      </TouchableOpacity>

      <View className="border border-gray-400 p-5">
        <Text className={`${colors.buttonText} text-center `}>
          You can also check food nutritrion by specific disease needs
        </Text>
        <Text className={`text- text-center text-green-500`}>
          Nutrients that could be dangerous in high amounts
        </Text>
        <Text className={`text- text-center text-[orange]`}>
          High amount of potentially dangerous nutrient
        </Text>
        <Text className={`text- text-center text-red-500`}>
          Exceeded amount of potentially dangerous nutrients
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nutrient: {
    color: "black",
  },
  nutrientExceeded: {
    color: "red",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  autocompleteContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  suggestionItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  foodDetails: {
    marginBottom: 0,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  subheader: {
    fontSize: 20,
    marginTop: 0,
  },
  ingredient: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },
  feedback: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  nutrientVeryGood: {
    color: "green",
  },
  nutrientAvoid: {
    color: "orange",
  },
  nutrientVeryBad: {
    color: "red",
  },
  dropdownButton: {
    height: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  dropdownText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "70%",
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  nutrientBeneficial: {
    color: "green",
  },
  nutrientHarmful: {
    color: "orange",
  },
  nutrientVeryHarmful: {
    color: "red",
  },
});

export default CheckFood;
