import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";

import { darkColorsSettingsGoals, lightColorsSettingsGoals } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

const EditGoals: React.FC = () => {
  const [totalCalories, setTotalCalories] = useState<string>("");
  const [weightLossChecked, setWeightLossChecked] = useState<boolean>(false);
  const [veganChecked, setVeganChecked] = useState<boolean>(false);
  const [vegetarianChecked, setVegetarianChecked] = useState<boolean>(false);
  const [diseaseSpecificChecked, setDiseaseSpecificChecked] =
    useState<boolean>(false);

  const handleSaveGoals = () => {
    console.log("Goals saved!");
  };

  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsSettingsGoals : lightColorsSettingsGoals;

  return (
    <View className={`flex-1 py-20 px-10 ${colors.background}`}>
      <View className={`container mt-5 flex rounded-3xl ${colors.backgroundSolid} p-5 justify-start items-right shadow-md`}>
        <TextInput
          className={`border-b border-gray-300 py-4 px-4 mb-5  text-2xl text-black`}
          placeholder="Total Calories"
          placeholderTextColor="#6B7280"
          value={totalCalories}
          onChangeText={setTotalCalories}
          keyboardType="numeric"
        />
        <View className={`flex flex-col items-left mb-5`}>

          <TouchableOpacity
            onPress={() => setWeightLossChecked(!weightLossChecked)}
          >
            <View className={`flex flex-row items-center mb-4`}>
              <View className={`w-8 h-8 rounded-full border ${colors.checkmarkBorder} mr-4 flex justify-center items-center 
                  ${weightLossChecked ? colors.checkmarkChecked : colors.checkmarkUnchecked}`}>
                {weightLossChecked && <Text className={`${weightLossChecked ? colors.checkmarkUncheckedText : colors.checkmarkUncheckedText}`}>✓</Text>}
              </View>
              <Text className={` text-2xl ${colors.textColor}`}>Weight Loss</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVeganChecked(!veganChecked)}>
            <View className={`flex flex-row items-center mb-4`}>
              <View className={`w-8 h-8 rounded-full border ${colors.checkmarkBorder} mr-4 flex justify-center items-center 
                  ${veganChecked ? colors.checkmarkChecked : colors.checkmarkUnchecked}`}>
                {veganChecked && <Text className={`${veganChecked ? colors.checkmarkUncheckedText : colors.checkmarkUncheckedText}`}>✓</Text>}
              </View>
              <Text className={` text-2xl ${colors.textColor}`}>Vegan</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setVegetarianChecked(!vegetarianChecked)}
          >
            <View className={`flex flex-row items-center mb-4`}>
              <View className={`w-8 h-8 rounded-full border ${colors.checkmarkBorder} mr-4 flex justify-center items-center 
                  ${vegetarianChecked ? colors.checkmarkChecked : colors.checkmarkUnchecked}`}>
                {vegetarianChecked && <Text className={`${vegetarianChecked ? colors.checkmarkUncheckedText : colors.checkmarkUncheckedText}`}>✓</Text>}
              </View>
              <Text className={` text-2xl ${colors.textColor}`}>Vegetarian</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDiseaseSpecificChecked(!diseaseSpecificChecked)}
          >
            <View className={`flex flex-row items-center mb-4`}>
            <View className={`w-8 h-8 rounded-full border ${colors.checkmarkBorder} mr-4 flex justify-center items-center 
                  ${diseaseSpecificChecked ? colors.checkmarkChecked : colors.checkmarkUnchecked}`}>
                {diseaseSpecificChecked && (<Text className={`${diseaseSpecificChecked ? colors.checkmarkUncheckedText : colors.checkmarkUncheckedText}`}>✓</Text>)}
              </View>
              <Text className={` text-2xl ${colors.textColor}`}>Disease specific</Text>
            </View>
          </TouchableOpacity>
          
        </View>
        <TouchableOpacity
          onPress={handleSaveGoals}
          className={`${colors.buttonBackground} w-full rounded-full border-2 ${colors.buttonBorder} px-4 py-2 mt-4 mb-2 self-center`}
        >
          <Text className={`${colors.buttonText} text-center font-bold`}>Save</Text>
        </TouchableOpacity>  
      </View>           
    </View>
  );
};

export default EditGoals;
