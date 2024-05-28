import React from 'react';
import { View, Text, Button, TouchableOpacity, ImageBackground} from 'react-native';
import { useTranslation } from 'react-i18next';

import { darkColorsSettingsGoals, lightColorsSettingsGoals } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

const LanguageSelectionScreen = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);

  };

  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsSettingsGoals : lightColorsSettingsGoals;


  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1 resize-y justify-center bg-white dark:bg-black"
    >
      <View className=' flex-1 items-center justify-center mx-10'>
        <View className={`container mt-5 flex rounded-3xl ${colors.backgroundSolid} p-5 justify-start items-right shadow-md`}>
          <Text className={`${colors.textColor} text-2xl mb-5 text-center font-bold`}>{t('welcome')}</Text>
          <Text className={`${colors.textColor} mb-5 text-center`}>{t('selectLanguage')}</Text>
          
          <TouchableOpacity
          onPress={() => changeLanguage('en')}
          className={`${colors.buttonBackground} w-full rounded-full border-2 ${colors.buttonBorder} px-4 py-2 mt-4 mb-2 self-center`}
        >
          <Text className={`${colors.buttonText} text-center font-bold`}>{t('LANen')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeLanguage('lt')}
          className={`${colors.buttonBackground} w-full rounded-full border-2 ${colors.buttonBorder} px-4 py-2 mt-4 mb-2 self-center`}
        >
          <Text className={`${colors.buttonText} text-center font-bold`}>{t('LANlt')}</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LanguageSelectionScreen;