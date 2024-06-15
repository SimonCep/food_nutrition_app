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

import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

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
      name: t('DSHCarbs'),
      population: carbohydrates,
      color: "#FFFF5F",
      legendFontColor: `${colors.chartLabel}`,
      legendFontSize: 10,
    },
    {
      name: t('DSHProtein'),
      population: protein,
      color: "#85FF5F",
      legendFontColor: `${colors.chartLabel}`,
      legendFontSize: 10,
    },
    {
      name: t('DSHFat'),
      population: fat,
      color: "#5FD6FF",
      legendFontColor: `${colors.chartLabel}`,
      legendFontSize: 10,
    },
  ];

  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
  const healthIssueOptions = [
    { label: t('DSHLBL1'), value: "noneSelected" },
    { label: t('DSHLBL2'), value: "heartDisease" },
    { label: t('DSHLBL3'), value: "thyroidGlandDisorders" },
    { label: t('DSHLBL4'), value: "lactoseIntolerance" },
    { label: t('DSHLBL5'), value: "celiacDisease" },
    { label: t('DSHLBL6'), value: "hypertension" },
    { label: t('DSHLBL7'), value: "diabetes" },
    { label: t('DSHLBL8'), value: "kidneyDisease" },
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
      t('DSHLbl1More'),
      lessText:
      t('DSHLbl1Less'),
      avoidText:
      t('DSHLbl1Avoid'),
    },
    heartDisease: {
      moreText:
      t('DSHLbl2More'),
      lessText:
      t('DSHLbl2Less'),
      avoidText:
      t('DSHLbl2Avoid'),
    },
    thyroidGlandDisorders: {
      moreText:
      t('DSHLbl3More'),
      lessText:
      t('DSHLbl3Less'),
      avoidText:
      t('DSHLbl3Avoid'),
    },
    lactoseIntolerance: {
      moreText:
      t('DSHLbl4More'),
      lessText:
      t('DSHLbl4Less'),
      avoidText:
      t('DSHLbl4Avoid'),
    },
    celiacDisease: {
      moreText:
      t('DSHLbl5More'),
      lessText:
      t('DSHLbl5Less'),
      avoidText:
      t('DSHLbl5Avoid'),
    },
    hypertension: {
      moreText:
      t('DSHLbl6More'),
      lessText:
      t('DSHLbl6Less'),
      avoidText:
      t('DSHLbl6Avoid'),
    },
    diabetes: {
      moreText:
      t('DSHLbl7More'),
      lessText:
      t('DSHLbl7Less'),
      avoidText:
      t('DSHLbl7Avoid'),
    },
    kidneyDisease: {
      moreText:
      t('DSHLbl8More'),
      lessText:
      t('DSHLbl8Less'),
      avoidText:
      t('DSHLbl8Avoid'),
    },
  };

  const currentFoodRecommendation =
    foodRecommendations[currentIssueValue] || {};

  const getHealthIssueDescription = (value: string) => {
    switch (value) {
      case "noneSelected":
        return t('DSHLBL1Desc');
      case "heartDisease":
        return t('DSHLBL2Desc');
      case "thyroidGlandDisorders":
        return t('DSHLBL3Desc');
      case "lactoseIntolerance":
        return t('DSHLBL4Desc');
      case "celiacDisease":
        return t('DSHLBL5Desc');
      case "hypertension":
        return t('DSHLBL6Desc');
      case "diabetes":
        return t('DSHLBL7Desc');
      case "kidneyDisease":
        return t('DSHLBL8Desc');
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
          {t('DSHYourJourney')}
          </Text>

          <View
            className={`container mt-5 flex rounded-3xl ${colors.background} items-center justify-center p-5 shadow-md`}
          >
            <Text className={`text-3xl ${colors.textColor}`}>{t('DSHHealth')}</Text>
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
            {t('DSHFoodToEat')} <Text className="text-green-500">{t('DSHtomore')}</Text>:
            </Text>
            <Text
              className={`self-start pl-3 text-left text-[15px] ${colors.textColor}`}
            >
              {currentFoodRecommendation.moreText || ""}
            </Text>
            <View className="my-5 w-full border-b border-gray-300"></View>

            <Text className={`self-start text-2xl ${colors.textColor}`}>
            {t('DSHFoodToEat')}  <Text className="text-yellow-500">{t('DSHtoless')}</Text>:
            </Text>
            <Text
              className={`self-start pl-3 text-left text-[15px] ${colors.textColor}`}
            >
              {currentFoodRecommendation.lessText || ""}
            </Text>
            <View className="my-5 w-full border-b border-gray-300"></View>

            <Text className={`self-start text-2xl ${colors.textColor}`}>
            {t('DSHFoodsTo')} <Text className="text-red-500">{t('DSHtoavoid')}</Text>:
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
              {t('DSHFindOutMore')}
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
                      {t('DSHClose')}
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
            {t('DSHTodaysMacro')}
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
                    <Text className="font-bold">{calories}</Text> {t('DSHcalories')}
                  </Text>
                  {calorieGoal ? (
                    <>
                      <Text className={`mt-2 text-lg text-gray-500`}>
                      {t('DSHof')} {calorieGoal.toFixed(0)} {t('DSHcalories')}
                      </Text>
                      <Text className={`mt-2 text-sm text-gray-400`}>
                      {t('DSHCalorieGoal')}
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
                        {t('DSHCaloriesExceeded')} 🐷
                      </Text>
                      <Text className={`mt-2 text-center ${colors.textColor}`}>
                      {t('DSHCaloriesTip')}
                      </Text>
                    </View>
                  ) : (
                    <View
                      className={`mt-4 rounded-lg ${colors.islandBackgroundMacroCongratulations} p-4`}
                    >
                      <Text
                        className={`${colors.textColor} text-center text-lg font-bold`}
                      >
                      {t('DSHCaloriesGJ')} 🍽️
                      </Text>
                      <Text className={`${colors.textColor} mt-2 text-center`}>
                      {t('DSHCaloriesReached')}
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
                      {t('DSHKeepGoing')} 🍒
                    </Text>
                    {calorieGoal ? (
                      <Text className={`mt-2 text-center ${colors.textColor}`}>
                        {t('DSHYoure')} {(calorieGoal - calories).toFixed(0)} {t('DSHcaloriesAway')}
                      </Text>
                    ) : (
                      <Text className={`mt-2 text-center ${colors.textColor}`}>
                        {t('DSHMotivate')}
                      </Text>
                    )}
                  </View>
                )}
              </>
            ) : (
              <View className="items-center justify-center">
                <Text className={`text-lg text-gray-500`}>
                {t('DSHCaloriesNoData')}
                </Text>
              </View>
            )}
          </View>

          <View
            className={`container mt-5 flex rounded-3xl ${colors.background} items-center justify-center p-5 shadow-md`}
          >
            <Text className={`text-3xl ${colors.textColor}`}>
            {t('DSHTodaysWater')}
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
                {t('DSHofwater')} {recommendedWaterIntake.toFixed(2)} l
                </Text>
                <Text className={`mt-2 text-sm text-gray-400`}>
                {t('DSHRecommendedIntake')}
                </Text>
              </View>
            </View>
            {todayWaterConsumption >= recommendedWaterIntake ? (
              <View
                className={`mt-4 rounded-lg ${colors.islandBackgroundWaterCongratulations} p-4`}
              >
                <Text className="text-center text-lg font-bold text-white">
                {t('DSHWayToGo')} 💧
                </Text>
                <Text className="mt-2 text-center text-white">
                {t('DSHWaterGJ')}
                </Text>
              </View>
            ) : (
              <View
                className={`mt-4 rounded-lg ${colors.islandBackgroundWaterAlmostThere} p-4`}
              >
                <Text
                  className={`text-center text-lg font-bold ${colors.textColor}`}
                >
                {t('DSHAlmostThere')} 🌊
                </Text>
                <Text className={`mt-2 text-center ${colors.textColor}`}>
                {t('DSHYoure')}{" "}
                  {(recommendedWaterIntake - todayWaterConsumption).toFixed(2)}{" "}
                  {t('DSHAwayFrom')}
                </Text>
              </View>
            )}
          </View>

          <View
            className={`container mt-5 flex rounded-3xl ${colors.background} items-center justify-center p-5 shadow-md`}
          >
            <Text className={`text-3xl ${colors.textColor}`}>
            {t('DSHWeeklyExercise')}
            </Text>
            <View className="my-5 w-full border-b border-gray-300"></View>
            <BarChart
              data={{
                labels: [
                  t('DSHDateMON'), 
                  t('DSHDateTUE'), 
                  t('DSHDateWED'), 
                  t('DSHDateTHU'), 
                  t('DSHDateFRI'), 
                  t('DSHDateSAT'), 
                  t('DSHDateSUN')],
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
              {t('DSHMinutesThisWeek')} {totalMinutes}
              </Text>
              {totalMinutes >= 150 ? (
                <View
                  className={`mt-4 rounded-lg ${colors.islandBackgroundCongratulations} p-4`}
                >
                  <Text className="text-center text-lg font-bold text-white">
                  {t('DSHCongrats')} 🎉
                  </Text>
                  <Text className="mt-2 text-center text-white">
                  {t('DSHYouHaveReached')}
                  </Text>
                </View>
              ) : (
                <View
                  className={`mt-4 rounded-lg ${colors.islandBackgroundKeepPushing} p-4`}
                >
                  <Text
                    className={`text-center text-lg font-bold ${colors.textColor}`}
                  >
                    {t('DSHKeepPushing')} 💪
                  </Text>
                  <Text className={`mt-2 text-center ${colors.textColor}`}>
                  {t('DSHYoure')} {150 - totalMinutes} {t('DSHminutesAway')}
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
