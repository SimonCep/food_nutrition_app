import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Modal, 
  Image
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import React, { useState } from 'react';


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
  { name: "Carbohydrates", population: 15, color: "#FFFF5F", legendFontColor: '#000000', legendFontSize: 12  },
  { name: "Protein", population: 20, color: "#85FF5F", legendFontColor: '#000000', legendFontSize: 12 },
  { name: "Fat", population: 25, color: "#5FD6FF", legendFontColor: '#000000', legendFontSize: 12 },
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
  backgroundGradientFrom: "#DCFCE7",
  backgroundGradientToOpacity: 0,
  backgroundGradientTo: "#DCFCE7",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 1,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  style: {
    borderRadius: 16,
    
  },
  propsForDots: { //line charto taskai
    r: "6",
    strokeWidth: "2",
    //stroke: "#ffa726",
  },
  
};


export default function Dashboard() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
      source={require("../../assets/images/gradientBackground.png")}
      className="flex-1 resize-y justify-center bg-white dark:bg-black"
    >
      <ScrollView>
        <View className="flex-grow items-center p-5">
          <Text className="pb-5 text-4xl dark:text-white">Your journey</Text>

          <View className="container mt-5 flex rounded-3xl bg-white/90 p-5 justify-center items-center shadow-md">
            <Text className="text-3xl ">Health</Text>
            <View className="w-full border-b border-gray-300 my-5"></View>

            <Text className="text-2xl pb-5">Heart issues</Text> 
              
            
            <Text className="text-2xl self-start">Foods to eat <Text className="text-green-500">more</Text>:</Text>
            <Text className="pl-3 text-[15px] text-left self-start">Fruits, vegetables, whole grains, lean proteins (e.g., poultry, fish), nuts, seeds, legumes, olive oil.</Text>
            <View className="w-full border-b border-gray-300 my-5"></View>

            <Text className="text-2xl self-start">Foods to eat <Text className="text-yellow-500">less</Text>:</Text>
            <Text className="pl-3 text-[15px] self-start">Saturated and trans fats (e.g., fatty meats, processed foods), high-sodium foods (e.g., canned soups, processed snacks), sugary beverages.</Text>
            <View className="w-full border-b border-gray-300 my-5"></View>

            <Text className="text-2xl self-start">Foods to <Text className="text-red-500">avoid</Text>:</Text>
            <Text className="pl-3 pb-5 text-[15px] self-start">Trans fats, excessive saturated fats, high-sodium processed foods.</Text>
            
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className={`bg-green-100/90 rounded-full border-2 border-black px-4 py-2 mt-4 mb-2`}
              >
                <Text className={'text-center font-bold'}>Find out more</Text>
              </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View className="flex-1 justify-center items-center bg-transparent">
                  <View className="bg-white p-10 mx-2 rounded-lg shadow-lg">
                    <View className="mb-5 mt-10 items-center">
                      <View className="mb-4 h-48 w-48 rounded-full bg-white shadow-lg">
                        <Image
                          source={require("../../assets/images/icon.png")}
                          className="h-48 w-48 rounded-full"
                        />
                      </View>
                    </View>
                    <Text className="pb-5 text-2xl">Conditions affecting the heart's functioning, including coronary artery disease and heart failure. A heart-healthy diet emphasizes fruits, vegetables, lean proteins, and healthy fats while avoiding saturated fats and excess sodium.</Text>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      className={`bg-green-100/90 rounded-full border-2 border-black px-4 py-2 mt-4 mb-2`}
                    >
                      <Text className={'text-center font-bold'}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal> 
              
          </View>

          <View className="container mt-5 rounded-3xl bg-white/90 p-5 flex justify-center items-center shadow-md">
            <Text className="text-3xl">Weight</Text>
            <View className="w-full border-b border-gray-300 my-5"></View>
            <LineChart
              data={lineData}
              width={(Dimensions.get("window").width * 10) / 12}
              height={300}
              chartConfig={chartConfig}
              verticalLabelRotation={290}
              xLabelsOffset={25}
              yAxisInterval={1}
              
              bezier // padaro smooth lines
            />
            <TouchableOpacity
              //onPress={handle...}
              className={`bg-green-100/90 rounded-full border-2 border-black px-4 py-2 mt-4 mb-2 self-end`}
            >
              <Text className={'text-center font-bold'}>Add entry</Text>
            </TouchableOpacity>
          </View>

          <View className="container mt-5 rounded-3xl bg-white/90 p-5 flex justify-center items-center shadow-md">
            <Text className="text-3xl ">Food intake</Text>
            <View className="w-full border-b border-gray-300 my-5"></View>
            <PieChart
              data={pieChartData}
              width={(Dimensions.get("window").width * 10) / 12}
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
              className={`bg-green-100/90 rounded-full border-2 border-black px-4 py-2 mt-4 mb-2 self-end`}
            >
              <Text className={'text-center font-bold'}>Add entry</Text>
            </TouchableOpacity>
          </View>

          <View className="container mt-5 rounded-3xl bg-white/90 p-5 flex justify-center items-center shadow-md">
            <Text className="text-3xl ">Monthly activity</Text>
            <View className="w-full border-b border-gray-300 my-5"></View>
            <BarChart
              data={columnChartData}
              width={(Dimensions.get("window").width * 10) / 12}
              height={280}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={chartConfig}
              verticalLabelRotation={290}
              xLabelsOffset={25}
              showValuesOnTopOfBars={true}
            />
            <TouchableOpacity
              //onPress={handle...}
              className={`bg-green-100/90 rounded-full border-2 border-black px-4 py-2 mt-4 mb-2 self-end`}
            >
              <Text className={'text-center font-bold'}>Add entry</Text>
            </TouchableOpacity>
          </View>

          <View className="container mt-5 rounded-3xl bg-white/90 p-5 flex justify-center items-center shadow-md">
            <Text className="text-3xl ">Daily activity</Text>
            <View className="w-full border-b border-gray-300 my-5"></View>
            <ProgressChart
              data={progressData}
              width={(Dimensions.get("window").width * 10) / 12}
              height={200}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
            <TouchableOpacity
              //onPress={handle...}
              className={`bg-green-100/90 rounded-full border-2 border-black px-4 py-2 mt-4 mb-2 self-end`}
            >
              <Text className={'text-center font-bold'}>Add entry</Text>
            </TouchableOpacity>

          </View>
          
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
