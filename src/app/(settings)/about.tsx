import React from "react";
import { ScrollView, View, Text, ImageBackground, Image } from "react-native";

import { darkColorsAboutUs, lightColorsAboutUs } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();

  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsAboutUs : lightColorsAboutUs;

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1 resize-y justify-center bg-white dark:bg-black"
    >
      <ScrollView>
        <View className="flex-grow flex-row justify-center">
          <Text className="ml-11 mt-10 text-left text-6xl font-bold uppercase color-green-500">
            Eat
          </Text>
          <Text className="mt-10 text-left text-6xl font-bold uppercase text-black dark:text-white">
            ing
          </Text>
        </View>

        <View className="flex-grow flex-row justify-center">
          <Text className="text-left text-6xl font-bold uppercase text-black dark:text-white">
            Heal
          </Text>
          <Text className="mr-14 text-left text-6xl font-bold uppercase color-green-500">
            thy
          </Text>
        </View>

        <View className="mb-5 mt-10 items-center">
          <View
            className={`mb-4 h-48 w-48 rounded-full ${colors.imageBackground} shadow-lg`}
          >
            <Image
              source={
                colorScheme === "dark"
                  ? require("../../assets/images/iconDark.png")
                  : require("../../assets/images/icon.png")
              }
              className="h-48 w-48 rounded-full"
            />
          </View>
        </View>

        <View
          className={`m-5 mr-14 rounded-3xl p-5 shadow-md ${colors.background}`}
        >
          <Text className="mb-5 ml-5 mt-5 text-left text-3xl text-black dark:text-white">
            {t("ABTmission")}
          </Text>
          <View className="w-full border-b border-gray-300"></View>
          <Text className="m-5 text-left text-black dark:text-white">
            {t("ABTmissionMore")}
          </Text>
        </View>

        <View
          className={`m-5 ml-14 rounded-3xl p-5 shadow-md ${colors.background}`}
        >
          <Text className="mb-5 mr-5 mt-5 text-right text-3xl text-black dark:text-white">
            {t("ABTvalues")}
          </Text>
          <View className="w-full border-b border-gray-300"></View>
          <Text className="m-5 text-pretty text-left text-black dark:text-white">
            {t("ABTvaluesAccess")}
          </Text>
          <Text className="ml-5 mr-5 text-pretty text-left text-black dark:text-white">
            {t("ABTvaluesAccura")}
          </Text>
          <Text className="m-5 text-pretty text-left text-black dark:text-white">
            {t("ABTvaluesComm")}
          </Text>
        </View>

        <View
          className={`m-5 mr-14 rounded-3xl p-5 shadow-md ${colors.background}`}
        >
          <Text className="mb-5 ml-5 mt-5 text-left text-3xl text-black dark:text-white">
            {t("ABTTeam")}
          </Text>
          <View className="w-full border-b border-gray-300"></View>
          <View className="ml-5 mt-5 flex-row">
            <Text className="text-pretty text-left text-red-500">D</Text>
            <Text className="text-pretty text-left text-orange-500">o</Text>
            <Text className="text-pretty text-left text-yellow-500">v</Text>
            <Text className="text-pretty text-left text-green-500">y</Text>
            <Text className="text-pretty text-left text-blue-500">d</Text>
            <Text className="text-pretty text-left text-indigo-500">a</Text>
            <Text className="text-pretty text-left text-purple-500">s</Text>
            <Text className="text-pretty text-left"> </Text>
            <Text className="text-pretty text-left text-orange-500">Š</Text>
            <Text className="text-pretty text-left text-yellow-500">i</Text>
            <Text className="text-pretty text-left text-green-500">u</Text>
            <Text className="text-pretty text-left text-blue-500">r</Text>
            <Text className="text-pretty text-left text-indigo-500">k</Text>
            <Text className="text-pretty text-left text-purple-500">u</Text>
            <Text className="text-pretty text-left text-red-500">s</Text>
            <Text className="text-pretty text-left"> </Text>
            <Text className="text-pretty text-left">✋</Text>
            <Text className="text-pretty text-left">😬</Text>
            <Text className="text-pretty text-left">🤚</Text>
          </View>
          <Text className="ml-5 text-pretty text-left text-black dark:text-white">
            dovydas.siurkus@ktu.edu
          </Text>
          <Text className="ml-5 mt-5 text-pretty text-left text-black dark:text-white">
            Simas Čeponis
          </Text>
          <Text className="ml-5 text-pretty text-left text-black dark:text-white">
            simas.ceponis@ktu.edu
          </Text>
          <Text className="ml-5 mt-5 text-pretty text-left text-black dark:text-white">
            Dominykas Valčiukas
          </Text>
          <Text className="ml-5 text-pretty text-left text-black dark:text-white">
            dominykas.valciukas@ktu.edu
          </Text>
          <Text className="ml-5 mt-5 text-pretty text-left text-black dark:text-white">
            Viltė Sakalauskaitė
          </Text>
          <Text className="ml-5 text-pretty text-left text-black dark:text-white">
            vilte.sakalauskaite@ktu.edu
          </Text>
          <Text className="ml-5 mt-5 text-pretty text-left text-black dark:text-white">
            Paulius Alešiūnas
          </Text>
          <Text className="ml-5 text-pretty text-left text-black dark:text-white">
            paulius.alesiunas@ktu.edu
          </Text>
          <Text className="ml-5 mt-5 text-pretty text-left text-black dark:text-white">
            Gerda Kaunietytė
          </Text>
          <Text className="mb-5 ml-5 text-pretty text-left text-black dark:text-white">
            gerda.kaunietyte@ktu.edu
          </Text>
        </View>

        <View
          className={`m-5 ml-14 rounded-3xl p-5 shadow-md ${colors.background}`}
        >
          <Text className="mb-5 mr-5 mt-5 text-right text-3xl text-black dark:text-white">
            {t("ABTcontacts")}
          </Text>
          <View className="w-full border-b border-gray-300"></View>
          <Text className="ml-5 mr-5 mt-5 text-pretty text-left text-black dark:text-white">
            {t("ABTcontactsMore")}
          </Text>

          <Text className="m-5 text-pretty text-left text-black dark:text-white">
            {t("ABTthank")}
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
