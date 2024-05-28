import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, ImageBackground } from "react-native";

import { darkColorsSettingsGoals, lightColorsSettingsGoals } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { useTranslation } from 'react-i18next';

const EditGoals: React.FC = () => {
  const { t } = useTranslation();
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
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1 resize-y justify-center bg-white dark:bg-black"
    >
    <View className={`flex-1 py-20 px-10`}>
      <View className={`container mt-5 flex rounded-3xl ${colors.backgroundSolid} p-5 justify-start items-right shadow-md`}>
        <TextInput
          className={`border-b border-gray-300 py-4 px-4 mb-5  text-2xl text-black`}
          placeholder={t('EDTGOALtotalcal')}
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
              <Text className={` text-2xl ${colors.textColor}`}>{t('EDTGOALweightloss')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVeganChecked(!veganChecked)}>
            <View className={`flex flex-row items-center mb-4`}>
              <View className={`w-8 h-8 rounded-full border ${colors.checkmarkBorder} mr-4 flex justify-center items-center 
                  ${veganChecked ? colors.checkmarkChecked : colors.checkmarkUnchecked}`}>
                {veganChecked && <Text className={`${veganChecked ? colors.checkmarkUncheckedText : colors.checkmarkUncheckedText}`}>✓</Text>}
              </View>
              <Text className={` text-2xl ${colors.textColor}`}>{t('EDTGOALvegan')}</Text>
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
              <Text className={` text-2xl ${colors.textColor}`}>{t('EDTGOALvegetarian')}</Text>
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
              <Text className={` text-2xl ${colors.textColor}`}>{t('EDTGOALdiseasespecific')}</Text>
            </View>
          </TouchableOpacity>
          
        </View>
        <TouchableOpacity
          onPress={handleSaveGoals}
          className={`${colors.buttonBackground} w-full rounded-full border-2 ${colors.buttonBorder} px-4 py-2 mt-4 mb-2 self-center`}
        >
          <Text className={`${colors.buttonText} text-center font-bold`}>{t('EDTGOALsave')}</Text>
        </TouchableOpacity>  
      </View>           
    </View>
    </ImageBackground>
  );
};

export default EditGoals;
