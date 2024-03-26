import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";

const screenWidth = (Dimensions.get("window").width * 9) / 12;

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [72, 73, 72, 73, 73.5, 74.2],
    },
  ],
};

const pieChartData = [
  { name: "Carbohydrates", population: 15, color: "#FF0000" },
  { name: "Protein", population: 20, color: "#0000FF" },
  { name: "Fat", population: 25, color: "#00FF00" },
];

const columnChartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const progressData = {
  labels: ["Swim", "Bike", "Run"],
  data: [0.4, 0.6, 0.8],
};

// https://www.npmjs.com/package/react-native-chart-kit daugiau apie chart`us
const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFromOpacity: 0,
  backgroundGradientFrom: "#fff",
  backgroundGradientToOpacity: 0.5,
  backgroundGradientTo: "#fff",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 1,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export default function Dashboard() {
  return (
    <ImageBackground
      source={require("../../assets/images/gradientBackground.png")}
      className="bg-white dark:bg-black flex-1 justify-center resize-y"
    >
      <ScrollView>
        <View className="flex-grow items-center p-5">
          <Text className="pb-5 text-4xl dark:text-white">Your journey</Text>
          <View className="mt-5 p-5 container h-96 bg-emerald-200 rounded-3xl">
            <Text className="pb-5 text-3xl ">Weight</Text>
            <LineChart
              data={lineData}
              width={screenWidth}
              height={screenWidth * 0.75}
              chartConfig={chartConfig}
              yAxisInterval={1}
              bezier // padaro smooth lines
            />
          </View>

          <View className="mt-5 p-5 container h-96 bg-emerald-200 rounded-3xl">
            <Text className="pb-5 text-3xl ">Food intake</Text>
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={screenWidth * 0.75}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              center={[0, 0]}
              absolute
            />
          </View>

          <View className="mt-5 p-5 container h-96 bg-emerald-200 rounded-3xl">
            <Text className="pb-5 text-3xl ">Monthly activity</Text>
            <BarChart
              data={columnChartData}
              width={screenWidth}
              height={screenWidth * 0.75}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </View>

          <View className="mt-5 p-5 container h-96 bg-emerald-200 rounded-3xl">
            <Text className="pb-5 text-3xl ">Daily activity</Text>
            <ProgressChart
              data={progressData}
              width={screenWidth}
              height={screenWidth * 0.75}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
