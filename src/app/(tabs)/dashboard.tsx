import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "nativewind";

import { darkColorsDashboard, lightColorsDashboard } from "@/constants/Colors";
import { fetchExercises } from "@/api/exerciseService";
import { useAuth } from "@/providers/AuthProvider";
import { filterExercisesByWeek } from "@/utils/exerciseUtils";
import { useDiaryContext } from "@/providers/DiaryProvider";
import { calculateTotalWaterConsumption } from "@/utils/waterUtils";
import { fetchUserWeight } from "@/api/userWeightService";

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsDashboard : lightColorsDashboard;

  const screenWidth = (Dimensions.get("window").width * 10) / 12;

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [72, 73, 72, 73, 73.5, 74.2],
      },
    ],
  };

  const pieChartData = [
    {
      name: "Carbohydrates",
      population: 15,
      color: "#FFFF5F",
      legendFontColor: `${colors.chartLabel}`,
      legendFontSize: 12,
    },
    {
      name: "Protein",
      population: 20,
      color: "#85FF5F",
      legendFontColor: `${colors.chartLabel}`,
      legendFontSize: 12,
    },
    {
      name: "Fat",
      population: 25,
      color: "#5FD6FF",
      legendFontColor: `${colors.chartLabel}`,
      legendFontSize: 12,
    },
  ];

  // https://www.npmjs.com/package/react-native-chart-kit daugiau apie chart`us

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFromOpacity: 0,
    backgroundGradientFrom: "#DCFCE7",
    backgroundGradientToOpacity: 0,
    backgroundGradientTo: "#DCFCE7",
    decimalPlaces: 2,
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
  const { shouldRefreshExercises, shouldRefreshWater } = useDiaryContext();
  const [todayWaterConsumption, setTodayWaterConsumption] = useState(0);
  const [recommendedWaterIntake, setRecommendedWaterIntake] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          const exercises = await fetchExercises(session.user.id);
          const filteredExercises = filterExercisesByWeek(exercises);
          const data = [0, 0, 0, 0, 0, 0, 0]; // Initialize data for each day of the week
          let total = 0;

          filteredExercises.forEach((exercise) => {
            const dayIndex = new Date(exercise.created_at).getDay();
            data[dayIndex] += exercise.duration;
            total += exercise.duration;
          });

          setExerciseData(data);
          setTotalMinutes(total);
        } catch (error) {
          console.error("Error fetching exercise data:", error);
        }
        try {
          const today = new Date();
          const totalConsumption = await calculateTotalWaterConsumption(
            session.user.id,
            today,
          );
          setTodayWaterConsumption(totalConsumption);

          const userWeight = await fetchUserWeight(session.user.id);
          if (userWeight) {
            const recommendedIntake = Math.round(
              (userWeight.weight * 35) / 1000,
            ); // Convert to liters
            setRecommendedWaterIntake(recommendedIntake);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [session?.user?.id, shouldRefreshExercises, shouldRefreshWater]);

  const waterConsumptionPercentage =
    recommendedWaterIntake > 0
      ? Math.min(todayWaterConsumption / recommendedWaterIntake, 1)
      : 0;

  const waterConsumptionData = {
    labels: ["Water Consumption"],
    data: [waterConsumptionPercentage],
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
            Your journey
          </Text>

          <View
            className={`container mt-5 flex rounded-3xl ${colors.background} items-center justify-center p-5 shadow-md`}
          >
            <Text className={`text-3xl ${colors.textColor}`}>Health</Text>
            <View className="my-5 w-full border-b border-gray-300"></View>

            <Text className={`pb-5 text-2xl ${colors.textColor}`}>
              Heart issues
            </Text>

            <Text className={`self-start text-2xl ${colors.textColor}`}>
              Foods to eat <Text className="text-green-500">more</Text>:
            </Text>
            <Text
              className={`self-start pl-3 text-left text-[15px] ${colors.textColor}`}
            >
              Fruits, vegetables, whole grains, lean proteins (e.g., poultry,
              fish), nuts, seeds, legumes, olive oil.
            </Text>
            <View className="my-5 w-full border-b border-gray-300"></View>

            <Text className={`self-start text-2xl ${colors.textColor}`}>
              Foods to eat <Text className="text-yellow-500">less</Text>:
            </Text>
            <Text
              className={`self-start pl-3 text-left text-[15px] ${colors.textColor}`}
            >
              Saturated and trans fats (e.g., fatty meats, processed foods),
              high-sodium foods (e.g., canned soups, processed snacks), sugary
              beverages.
            </Text>
            <View className={"my-5 w-full border-b border-gray-300"}></View>

            <Text className={`self-start text-2xl ${colors.textColor}`}>
              Foods to <Text className="text-red-500">avoid</Text>:
            </Text>
            <Text
              className={`self-start pl-3 text-left text-[15px] ${colors.textColor}`}
            >
              Trans fats, excessive saturated fats, high-sodium processed foods.
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
                  <Text className={`pb-5 text-2xl ${colors.buttonText}`}>
                    Conditions affecting the heart's functioning, including
                    coronary artery disease and heart failure. A heart-healthy
                    diet emphasizes fruits, vegetables, lean proteins, and
                    healthy fats while avoiding saturated fats and excess
                    sodium.
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
            <Text className={`text-3xl ${colors.textColor}`}>Weight</Text>
            <View className="my-5 w-full border-b border-gray-300"></View>
            <LineChart
              data={lineData}
              width={screenWidth}
              height={300}
              chartConfig={chartConfig}
              verticalLabelRotation={290}
              xLabelsOffset={25}
              yAxisInterval={1}
              bezier // padaro smooth lines
            />
            <TouchableOpacity
              //onPress={handle...}
              className={`${colors.buttonBackground} rounded-full border-2 ${colors.buttonBorder} mb-2 mt-4 self-end px-4 py-2`}
            >
              <Text className={`${colors.buttonText} text-center font-bold`}>
                Add entry
              </Text>
            </TouchableOpacity>
          </View>

          <View
            className={`container mt-5 flex rounded-3xl ${colors.background} items-center justify-center p-5 shadow-md`}
          >
            <Text className={`text-3xl ${colors.textColor}`}>Food Intake</Text>
            <View className="my-5 w-full border-b border-gray-300"></View>
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="10"
              center={[0, 0]}
              absolute
            />
            <TouchableOpacity
              //onPress={handle...}
              className={`${colors.buttonBackground} rounded-full border-2 ${colors.buttonBorder} mb-2 mt-4 self-end px-4 py-2`}
            >
              <Text className={`${colors.buttonText} text-center font-bold`}>
                Add entry
              </Text>
            </TouchableOpacity>
          </View>

          <View
            className={`container mt-5 flex rounded-3xl ${colors.background} items-center justify-center p-5 shadow-md`}
          >
            <Text className={`text-3xl ${colors.textColor}`}>
              Today's Water Consumption
            </Text>
            <View className="my-5 w-full border-b border-gray-300"></View>
            <View className="flex-row items-center">
              <ProgressChart
                data={waterConsumptionData}
                width={150}
                height={150}
                strokeWidth={14}
                radius={65}
                chartConfig={chartConfigWater}
                hideLegend={true}
              />
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
              <Text className={`text-lg ${colors.textColor}`}>
                Total minutes this week: {totalMinutes}
              </Text>
              {totalMinutes >= 150 ? (
                <View className="mt-4 rounded-lg bg-green-500 p-4">
                  <Text className="text-center text-lg font-bold text-white">
                    Congratulations! 🎉
                  </Text>
                  <Text className="mt-2 text-center text-white">
                    You have reached the recommended 150 minutes of exercise
                    this week. Keep up the great work!
                  </Text>
                </View>
              ) : (
                <View className="mt-4 rounded-lg bg-yellow-600 p-4">
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
