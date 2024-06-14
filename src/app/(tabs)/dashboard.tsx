import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import { BarChart, PieChart, ProgressChart } from "react-native-chart-kit";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

import { darkColorsDashboard, lightColorsDashboard } from "@/constants/Colors";
import { fetchExercises } from "@/api/exerciseService";
import { useAuth } from "@/providers/AuthProvider";
import {
  filterExercisesByDate,
  filterExercisesByWeek,
} from "@/utils/exerciseUtils";
import { useDiaryContext } from "@/providers/DiaryProvider";
import { calculateTotalWaterConsumption } from "@/utils/waterUtils";
import { fetchUserWeight } from "@/api/userWeightService";
import { fetchPersonalData } from "@/api/personalDataService";
import { FoodRecommendations, Tables } from "@/types";
import { fetchFoodNutrition } from "@/api/nutritionService";
import { filterFoodNutritionByDate } from "@/utils/foodUtils";
import { fetchUserHeight } from "@/api/userHeightService";
import { usePersonalDataContext } from "@/providers/PersonalDataProvider";

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsDashboard : lightColorsDashboard;

  const screenWidth = (Dimensions.get("window").width * 10) / 12;

  // https://www.npmjs.com/package/react-native-chart-kit daugiau apie chart`us

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFromOpacity: 0,
    backgroundGradientFrom: "#DCFCE7",
    backgroundGradientToOpacity: 0,
    backgroundGradientTo: "#DCFCE7",
    decimalPlaces: 0,
    color: (opacity = 1) => `${colors.style} ${opacity})`,
    labelColor: (opacity = 1) => `${colors.style} ${opacity})`,
    strokeWidth: 1,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      //line charto taskai
      r: "6",
      strokeWidth: "2",
      //stroke: "#ffa726",
    },
  };

  const chartConfigWater = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientFrom: "#DCFCE7",
    backgroundGradientToOpacity: 0,
    backgroundGradientTo: "#DCFCE7",
    color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const { session } = useAuth();
  const [exerciseData, setExerciseData] = useState<number[]>([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const { shouldRefreshExercises, shouldRefreshWater, shouldRefreshFood } =
    useDiaryContext();
  const [todayWaterConsumption, setTodayWaterConsumption] = useState(0);
  const [recommendedWaterIntake, setRecommendedWaterIntake] = useState(0);
  const { shouldRefreshPersonalData } = usePersonalDataContext();

  const waterConsumptionPercentage =
    recommendedWaterIntake > 0
      ? Math.min(todayWaterConsumption / recommendedWaterIntake, 1)
      : 0;

  const waterConsumptionData = {
    labels: ["Water Consumption"],
    data: [waterConsumptionPercentage],
  };

  const percentageText = `${Math.round(waterConsumptionPercentage * 100)}%`;

  useEffect(() => {
    const fetchWaterData = async () => {
      if (session?.user?.id) {
        try {
          const today = new Date();
          const totalConsumption = await calculateTotalWaterConsumption(
            session.user.id,
            today,
          );
          setTodayWaterConsumption(totalConsumption);

          const userWeight = await fetchUserWeight(session.user.id);
          if (userWeight) {
            const recommendedIntake = (userWeight.weight * 40) / 1000;
            setRecommendedWaterIntake(recommendedIntake);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchWaterData();
  }, [session?.user?.id, shouldRefreshWater, shouldRefreshPersonalData]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      if (session?.user?.id) {
        try {
          const exercises = await fetchExercises(session.user.id);
          const filteredExercises = filterExercisesByWeek(exercises);

          const data = [0, 0, 0, 0, 0, 0, 0];
          let total = 0;

          filteredExercises.forEach((exercise) => {
            const dayIndex = (new Date(exercise.created_at).getDay() + 6) % 7;
            data[dayIndex] += exercise.duration;
            total += exercise.duration;
          });

          setExerciseData(data);
          setTotalMinutes(total);
        } catch (error) {
          console.error("Error fetching exercise data:", error);
        }
      }
    };

    fetchExerciseData();
  }, [session?.user?.id, shouldRefreshExercises]);

  const [nutritionData, setNutritionData] = useState<Tables<"nutrition">[]>([]);
  const [userGoal, setUserGoal] = useState<string | null>(null);
  const [userWeight, setUserWeight] = useState<number | null>(null);
  const [userHeight, setUserHeight] = useState<number | null>(null);
  const [userAge, setUserAge] = useState<number | null>(null);
  const [userGender, setUserGender] = useState<string | null>(null);
  const [exerciseDataCalories, setExerciseDataCalories] = useState<
    Tables<"exercises">[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        const data = await fetchFoodNutrition(session.user.id);
        const today = new Date();
        const filteredData = filterFoodNutritionByDate(data, today);
        setNutritionData(filteredData);

        const weightData = await fetchUserWeight(session.user.id);
        setUserWeight(weightData?.weight ?? null);

        const heightData = await fetchUserHeight(session.user.id);
        setUserHeight(heightData?.height ?? null);

        const personalData = await fetchPersonalData(session.user.id);
        setUserGoal(personalData?.dietary_goals ?? null);
        setUserAge(personalData?.age ?? null);
        setUserGender(personalData?.gender ?? null);

        const exerciseData = await fetchExercises(session.user.id);
        const todayExercises = filterExercisesByDate(exerciseData, today);
        setExerciseDataCalories(todayExercises);
      }
    };

    fetchData();
  }, [
    session?.user?.id,
    shouldRefreshFood,
    shouldRefreshExercises,
    shouldRefreshPersonalData,
  ]);

  const calculateCalorieGoal = () => {
    if (!userWeight || !userHeight || !userAge || !userGender || !userGoal)
      return null;

    let bmr = 0;

    if (userGender === "male") {
      bmr = 10 * userWeight + 6.25 * userHeight - 5 * userAge + 5;
    } else if (userGender === "female") {
      bmr = 10 * userWeight + 6.25 * userHeight - 5 * userAge - 161;
    }

    switch (userGoal) {
      case "loseWeight":
        return bmr * 0.8;
      case "gainWeight":
        return bmr * 1.2;
      case "increaseMuscle":
        return bmr * 1.1;
      case "improveHealth":
        return bmr;
      default:
        return null;
    }
  };

  const calorieGoal = calculateCalorieGoal();

  const calculateMacronutrients = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbohydrates = 0;
    let totalFat = 0;

    nutritionData.forEach((item) => {
      totalCalories += item.calories;
      totalProtein += item.protein ?? 0;
      totalCarbohydrates += item.carbohydrates ?? 0;
      totalFat += item.fat ?? 0;
    });

    const totalExerciseCalories = exerciseDataCalories.reduce(
      (total, exercise) => total + (exercise.calories ?? 0),
      0,
    );

    totalCalories -= totalExerciseCalories;

    return {
      calories: totalCalories,
      protein: totalProtein,
      carbohydrates: totalCarbohydrates,
      fat: totalFat,
    };
  };

  const { calories, protein, carbohydrates, fat } = calculateMacronutrients();

  const pieChartData = [
    {
      name: "Carbohydrates",
      population: carbohydrates,
      color: "#FFFF5F",
      legendFontColor: `${colors.chartLabel}`,
      legendFontSize: 12,
    },
    {
      name: "Protein",
      population: protein,
      color: "#85FF5F",
      legendFontColor: `${colors.chartLabel}`,
      legendFontSize: 12,
    },
    {
      name: "Fat",
      population: fat,
      color: "#5FD6FF",
      legendFontColor: `${colors.chartLabel}`,
      legendFontSize: 12,
    },
  ];

  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
  const healthIssueOptions = [
    { label: "No Health Issues", value: "noneSelected" },
    { label: "Heart disease", value: "heartDisease" },
    { label: "Thyroid gland disorders", value: "thyroidGlandDisorders" },
    { label: "Lactose intolerance", value: "lactoseIntolerance" },
    { label: "Celiac Disease", value: "celiacDisease" },
    { label: "Hypertension (High Blood Pressure)", value: "hypertension" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Kidney Disease", value: "kidneyDisease" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        const personalData = await fetchPersonalData(session.user.id);
        if (personalData) {
          setHealthIssues(personalData.health_issues);
        }
      }
    };

    fetchData();
  }, [session?.user?.id, shouldRefreshPersonalData]);

  const handleIssueChange = (index: number) => {
    setCurrentIssueIndex((prevIndex) => {
      const newIndex = prevIndex + index;
      if (newIndex < 0) {
        return healthIssues.length - 1;
      } else if (newIndex >= healthIssues.length) {
        return 0;
      } else {
        return newIndex;
      }
    });
  };

  if (healthIssues.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.activityIndicatorColor} />
      </View>
    );
  }

  const currentIssueValue = healthIssues[currentIssueIndex];

  const getHealthIssueLabel = (value: string) => {
    const option = healthIssueOptions.find((option) => option.value === value);
    return option ? option.label : "";
  };

  const currentIssueLabel = getHealthIssueLabel(currentIssueValue);

  const showArrows = healthIssues.length > 1;

  const foodRecommendations: FoodRecommendations = {
    noneSelected: {
      moreText:
        "Fruits, vegetables, whole grains, lean proteins (e.g., poultry, fish, legumes), healthy fats (e.g., nuts, seeds, olive oil), low-fat dairy products.",
      lessText:
        "Processed foods, sugary beverages, excessive saturated and trans fats, high-sodium foods.",
      avoidText:
        "There are no strict prohibitions for a generally healthy diet, but it's best to limit processed foods, added sugars, and excessive saturated fats.",
    },
    heartDisease: {
      moreText:
        "Fruits, vegetables, whole grains, lean proteins (e.g., poultry, fish), nuts, seeds, legumes, olive oil.",
      lessText:
        "Saturated and trans fats (e.g., fatty meats, processed foods), high-sodium foods (e.g., canned soups, processed snacks), sugary beverages.",
      avoidText:
        "Trans fats, excessive saturated fats, high-sodium processed foods.",
    },
    thyroidGlandDisorders: {
      moreText:
        "Iodine-rich foods (e.g., iodized salt, seafood), selenium-rich foods (e.g., Brazil nuts, fish), fruits, vegetables, lean proteins.",
      lessText:
        "Goitrogens (e.g., cruciferous vegetables like broccoli, cabbage, kale, if consumed raw in large amounts), excessive soy products.",
      avoidText:
        "There are no strict prohibitions for all cases; dietary adjustments depend on the individual's specific condition and medication.",
    },
    lactoseIntolerance: {
      moreText:
        "Lactose-free dairy products (e.g., lactose-free milk), lactose-free alternatives (e.g., almond milk, soy milk), lactase-treated dairy products, calcium-fortified foods.",
      lessText:
        "Dairy products containing lactose (e.g., milk, cheese, yogurt).",
      avoidText: "Foods containing lactose.",
    },
    celiacDisease: {
      moreText:
        "Naturally gluten-free grains (e.g., rice, quinoa), fruits, vegetables, lean proteins, dairy products, certified gluten-free products.",
      lessText:
        "Gluten-containing grains (e.g., wheat, barley, rye), processed foods with hidden gluten (e.g., sauces, soups, processed meats).",
      avoidText: "Gluten-containing grains and any products made from them.",
    },
    hypertension: {
      moreText:
        "Fruits, vegetables, whole grains, lean proteins, low-fat dairy products, potassium-rich foods.",
      lessText:
        "High-sodium foods (e.g., processed foods, canned soups, salty snacks), excess saturated fats, sugary beverages.",
      avoidText:
        "High-sodium foods, excessive saturated fats, sugary beverages.",
    },
    diabetes: {
      moreText:
        "Complex carbohydrates, fiber-rich foods, lean proteins, healthy fats (e.g., olive oil, nuts, avocado), non-starchy vegetables.",
      lessText:
        "Sugary beverages, refined carbohydrates, processed snacks, high-sugar desserts.",
      avoidText:
        "Foods high in refined sugars, sugary beverages, excessive carbohydrate intake.",
    },
    kidneyDisease: {
      moreText:
        "Low-phosphorus proteins (e.g., poultry, fish, egg whites), fruits, vegetables (in moderation), whole grains, limited dairy products.",
      lessText:
        "High-phosphorus foods (e.g., dairy, nuts, seeds), high-potassium foods (e.g., bananas, oranges, potatoes), excessive sodium.",
      avoidText:
        "High-phosphorus foods, high-potassium foods, excessive sodium.",
    },
  };

  const currentFoodRecommendation =
    foodRecommendations[currentIssueValue] || {};

  const getHealthIssueDescription = (value: string) => {
    switch (value) {
      case "noneSelected":
        return "For individuals without specific health concerns, a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats promotes overall well-being and helps prevent chronic diseases.";
      case "heartDisease":
        return "Conditions affecting the heart's functioning, including coronary artery disease and heart failure. A heart-healthy diet emphasizes fruits, vegetables, lean proteins, and healthy fats while avoiding saturated fats and excess sodium.";
      case "thyroidGlandDisorders":
        return "Imbalances in thyroid hormone production, such as hypothyroidism or hyperthyroidism. Dietary recommendations may include iodine-rich foods for thyroid function support.";
      case "lactoseIntolerance":
        return "Inability to digest lactose, the sugar found in milk and dairy products, leading to digestive discomfort. Individuals should opt for lactose-free alternatives or lactase-treated dairy products.";
      case "celiacDisease":
        return "Autoimmune disorder triggered by gluten consumption, causing damage to the small intestine. Treatment involves strict adherence to a gluten-free diet, avoiding gluten-containing grains like wheat, barley, and rye.";
      case "hypertension":
        return "High blood pressure, a risk factor for heart disease and stroke. Dietary modifications focus on reducing sodium intake and increasing potassium-rich foods like fruits and vegetables.";
      case "diabetes":
        return "Chronic condition affecting blood sugar regulation, characterized by insulin resistance or deficiency. Dietary management involves controlling carbohydrate intake, consuming fiber-rich foods, and avoiding sugary beverages.";
      case "kidneyDisease":
        return "Impaired kidney function, leading to electrolyte imbalances and fluid retention. Dietary recommendations may include limiting phosphorus, potassium, and sodium intake while ensuring adequate protein intake.";
      default:
        return "";
    }
  };

  return (
    <ImageBackground
      source={
        colorScheme === "dark"
          ? require("../../assets/images/AnimatedDark.gif")
          : require("../../assets/images/AnimatedLight.gif")
      }
      className={`flex-1 resize-y justify-center ${colors.textColor} bg-white dark:bg-black`}
    >
      <ScrollView>
        <View className="flex-grow items-center p-5">
          <Text className={`pb-5 text-4xl ${colors.textColor}`}>
            Your Journey
          </Text>

          <View
            className={`container mt-5 flex rounded-3xl ${colors.background} items-center justify-center p-5 shadow-md`}
          >
            <Text className={`text-3xl ${colors.textColor}`}>Health</Text>
            <View className="my-5 w-full border-b border-gray-300"></View>

            <View className="flex-row items-center justify-between px-6 py-4">
              {showArrows && (
                <TouchableOpacity
                  onPress={() => handleIssueChange(-1)}
                  className={`rounded-full p-4`}
                >
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={colors.arrowColor}
                  />
                </TouchableOpacity>
              )}

              <Text className={`text-2xl ${colors.textColor}`}>
                {currentIssueLabel}
              </Text>

              {showArrows && (
                <TouchableOpacity
                  onPress={() => handleIssueChange(1)}
                  className={`rounded-full p-4`}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={colors.arrowColor}
                  />
                </TouchableOpacity>
              )}
            </View>

            <Text className={`self-start text-2xl ${colors.textColor}`}>
              Foods to eat <Text className="text-green-500">more</Text>:
            </Text>
            <Text
              className={`self-start pl-3 text-left text-[15px] ${colors.textColor}`}
            >
              {currentFoodRecommendation.moreText || ""}
            </Text>
            <View className="my-5 w-full border-b border-gray-300"></View>

            <Text className={`self-start text-2xl ${colors.textColor}`}>
              Foods to eat <Text className="text-yellow-500">less</Text>:
            </Text>
            <Text
              className={`self-start pl-3 text-left text-[15px] ${colors.textColor}`}
            >
              {currentFoodRecommendation.lessText || ""}
            </Text>
            <View className="my-5 w-full border-b border-gray-300"></View>

            <Text className={`self-start text-2xl ${colors.textColor}`}>
              Foods to <Text className="text-red-500">avoid</Text>:
            </Text>
            <Text
              className={`self-start pl-3 text-left text-[15px] ${colors.textColor}`}
            >
              {currentFoodRecommendation.avoidText || ""}
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className={`${colors.buttonBackground} rounded-full border-2 ${colors.buttonBorder} mb-2 mt-4 px-4 py-2`}
            >
              <Text className={`${colors.buttonText} text-center font-bold`}>
                Find out more
              </Text>
            </TouchableOpacity>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View className="flex-1 items-center justify-center bg-transparent">
                <View
                  className={`${colors.backGroundSolid} mx-2 rounded-lg p-10 shadow-lg`}
                >
                  <View className="mb-5 mt-10 items-center">
                    <View
                      className={`mb-4 h-48 w-48 rounded-full ${colors.backGroundSolid} shadow-lg`}
                    >
                      <Image
                        source={require("../../assets/images/icon.png")}
                        className="h-48 w-48 rounded-full"
                      />
                    </View>
                  </View>
                  <Text
                    className={`pb-5 text-center text-2xl ${colors.buttonText}`}
                  >
                    {getHealthIssueDescription(currentIssueValue)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className={`${colors.buttonBackground} rounded-full border-2 ${colors.buttonBorder} mb-2 mt-4 px-4 py-2`}
                  >
                    <Text
                      className={`${colors.buttonText} text-center font-bold`}
                    >
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <View
            className={`container mt-5 flex rounded-3xl ${colors.background} items-center justify-center p-5 shadow-md`}
          >
            <Text className={`text-3xl ${colors.textColor}`}>
              Today's Macronutrients
            </Text>
            <View className="my-5 w-full border-b border-gray-300"></View>
            {calories > 0 ? (
              <>
                <View className="items-center justify-center">
                  <PieChart
                    data={pieChartData}
                    width={screenWidth * 0.8}
                    height={160}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="10"
                    center={[0, 0]}
                    absolute
                  />
                </View>
                <View className="mt-4 items-center">
                  <Text className={`text-xl ${colors.textColor}`}>
                    <Text className="font-bold">{calories}</Text> calories
                  </Text>
                  {calorieGoal ? (
                    <>
                      <Text className={`mt-2 text-lg text-gray-500`}>
                        of {calorieGoal.toFixed(0)} calories
                      </Text>
                      <Text className={`mt-2 text-sm text-gray-400`}>
                        Calorie Goal
                      </Text>
                    </>
                  ) : null}
                </View>
                {calorieGoal && calories >= calorieGoal ? (
                  calories > calorieGoal * 1.2 ? (
                    <View
                      className={`mt-4 rounded-lg ${colors.islandBackgroundMacroExceeded} p-4`}
                    >
                      <Text
                        className={`text-center text-lg font-bold ${colors.textColor}`}
                      >
                        Oops! You exceeded your calorie goal. 🐷
                      </Text>
                      <Text className={`mt-2 text-center ${colors.textColor}`}>
                        Try to be mindful of your calorie intake and make
                        healthier choices tomorrow. Don't worry, you've got
                        this!
                      </Text>
                    </View>
                  ) : (
                    <View
                      className={`mt-4 rounded-lg ${colors.islandBackgroundMacroCongratulations} p-4`}
                    >
                      <Text
                        className={`${colors.textColor} text-center text-lg font-bold`}
                      >
                        Awesome job! 🍽️
                      </Text>
                      <Text className={`${colors.textColor} mt-2 text-center`}>
                        You've reached your calorie goal for today. Keep fueling
                        your body with healthy and nutritious food!
                      </Text>
                    </View>
                  )
                ) : (
                  <View
                    className={`mt-4 rounded-lg ${colors.islandBackgroundMacroAlmostThere} p-4`}
                  >
                    <Text
                      className={`text-center text-lg font-bold ${colors.textColor}`}
                    >
                      Keep going! 🍒
                    </Text>
                    {calorieGoal ? (
                      <Text className={`mt-2 text-center ${colors.textColor}`}>
                        You're {(calorieGoal - calories).toFixed(0)} calories
                        away from reaching your calorie goal for today. Fuel up
                        with healthy and balanced meals!
                      </Text>
                    ) : (
                      <Text className={`mt-2 text-center ${colors.textColor}`}>
                        Keep tracking your calories to reach your daily goal.
                        Fuel up with healthy and balanced meals!
                      </Text>
                    )}
                  </View>
                )}
              </>
            ) : (
              <View className="items-center justify-center">
                <Text className={`text-lg text-gray-500`}>
                  No data available. Go on, add some food!
                </Text>
              </View>
            )}
          </View>

          <View
            className={`container mt-5 flex rounded-3xl ${colors.background} items-center justify-center p-5 shadow-md`}
          >
            <Text className={`text-3xl ${colors.textColor}`}>
              Today's Water Consumption
            </Text>
            <View className="my-5 w-full border-b border-gray-300"></View>
            <View className="flex-row items-center">
              <View className="w-38 h-38 relative flex items-center justify-center">
                <ProgressChart
                  data={waterConsumptionData}
                  width={150}
                  height={150}
                  strokeWidth={14}
                  radius={65}
                  chartConfig={chartConfigWater}
                  hideLegend={true}
                />
                <Text
                  className="absolute text-3xl font-bold"
                  style={{ color: colors.percentageText }}
                >
                  {percentageText}
                </Text>
              </View>
              <View className="ml-6">
                <Text className={`text-xl ${colors.textColor}`}>
                  <Text className="font-bold">
                    {todayWaterConsumption.toFixed(2)}
                  </Text>{" "}
                  l
                </Text>
                <Text className={`text-lg text-gray-500`}>
                  of {recommendedWaterIntake.toFixed(2)} l
                </Text>
                <Text className={`mt-2 text-sm text-gray-400`}>
                  Recommended Intake
                </Text>
              </View>
            </View>
            {todayWaterConsumption >= recommendedWaterIntake ? (
              <View
                className={`mt-4 rounded-lg ${colors.islandBackgroundWaterCongratulations} p-4`}
              >
                <Text className="text-center text-lg font-bold text-white">
                  Way to go! 💧
                </Text>
                <Text className="mt-2 text-center text-white">
                  You've reached your recommended water intake for today. Keep
                  staying hydrated and feeling great!
                </Text>
              </View>
            ) : (
              <View
                className={`mt-4 rounded-lg ${colors.islandBackgroundWaterAlmostThere} p-4`}
              >
                <Text
                  className={`text-center text-lg font-bold ${colors.textColor}`}
                >
                  Almost there! 💦
                </Text>
                <Text className={`mt-2 text-center ${colors.textColor}`}>
                  You're{" "}
                  {(recommendedWaterIntake - todayWaterConsumption).toFixed(2)}{" "}
                  l away from reaching your recommended water intake for today.
                  Drink up and stay hydrated!
                </Text>
              </View>
            )}
          </View>

          <View
            className={`container mt-5 flex rounded-3xl ${colors.background} items-center justify-center p-5 shadow-md`}
          >
            <Text className={`text-3xl ${colors.textColor}`}>
              Weekly Exercise Activity
            </Text>
            <View className="my-5 w-full border-b border-gray-300"></View>
            <BarChart
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{ data: exerciseData }],
              }}
              width={screenWidth}
              height={280}
              yAxisLabel=""
              yAxisSuffix=" min"
              chartConfig={chartConfig}
              verticalLabelRotation={290}
              xLabelsOffset={25}
              showValuesOnTopOfBars={true}
            />
            <View className="mt-4">
              <Text className={`text-center text-lg ${colors.textColor}`}>
                Total minutes this week: {totalMinutes}
              </Text>
              {totalMinutes >= 150 ? (
                <View
                  className={`mt-4 rounded-lg ${colors.islandBackgroundCongratulations} p-4`}
                >
                  <Text className="text-center text-lg font-bold text-white">
                    Congratulations! 🎉
                  </Text>
                  <Text className="mt-2 text-center text-white">
                    You have reached the recommended 150 minutes of exercise
                    this week. Keep up the great work!
                  </Text>
                </View>
              ) : (
                <View
                  className={`mt-4 rounded-lg ${colors.islandBackgroundKeepPushing} p-4`}
                >
                  <Text
                    className={`text-center text-lg font-bold ${colors.textColor}`}
                  >
                    Keep Pushing! 💪
                  </Text>
                  <Text className={`mt-2 text-center ${colors.textColor}`}>
                    You're {150 - totalMinutes} minutes away from reaching the
                    recommended 150 minutes of exercise this week. Let's get
                    moving!
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Dashboard;
