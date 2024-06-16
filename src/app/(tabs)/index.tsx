import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { darkColorsIndex, lightColorsIndex } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useAuth } from "@/providers/AuthProvider";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const { session, loading } = useAuth();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsIndex : lightColorsIndex;

  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskText, setTaskText] = useState(t("INDTASKtextdefault"));
  const [inputVisible, setInputVisible] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const handleSave = () => {
    const updatedTaskText =
      newTaskText.trim() !== "" ? newTaskText : t("INDTASKtextdefault");
    setTaskText(updatedTaskText);
    setInputVisible(false);
  };
  const handleCancel = () => {
    setInputVisible(false);
    setNewTaskText("");
  };
  const toggleTaskCompletion = () => {
    setTaskCompleted(!taskCompleted);
  };

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/(auth)/sign-in");
    }
  }, [loading, session, router]);

  if (loading) {
    // Render loading state
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      </View>
    );
  }

  const handleRecipePress = () => {
    router.push("./recipeList");
  };

  const handleDiaryPress = () => {
    router.push("./diary");
  };

  const handleProfilePress = () => {
    router.push("./userInfo");
  };

  return (
    <ImageBackground
      source={
        colorScheme === "dark"
          ? require("../../assets/images/AnimatedDark.gif")
          : require("../../assets/images/AnimatedLight.gif")
      }
      className="flex-1 items-center justify-center"
    >
      <View className="flex-1 items-center justify-center px-5">
        <View
          className={`mb-4 h-24 w-24 rounded-full ${colors.imageBackground} items-center  shadow-lg`}
        >
          <Image
            source={
              colorScheme === "dark"
                ? require("../../assets/images/iconDark.png")
                : require("../../assets/images/icon.png")
            }
            className="mb-5 h-24 w-24"
          />
        </View>
        <Text className={`mb-2 text-4xl font-bold ${colors.textColor}`}>
          Eathy
        </Text>
        <Text className={`mb-7 text-xl ${colors.textColor}`}>
          {t("INDTitle")}
        </Text>

        <TouchableOpacity
          onPress={toggleTaskCompletion}
          className={`mb-4 rounded-xl px-6 py-2
            ${taskCompleted ? colors.backgroundChecked : colors.background} 
            ${taskCompleted ? colors.taskShadowChecked : colors.taskShadow}`}
        >
          <View className="flex-row items-center justify-start">
            {inputVisible ? (
              <View className="flex-row items-center justify-start">
                <FontAwesome
                  name="check"
                  size={28}
                  color="green"
                  onPress={handleSave}
                />
                <TextInput
                  className={`mb-1 w-10/12 border-b border-gray-300 px-4 py-4 text-2xl ${colors.textColor}`}
                  placeholder={t("INDTASKtext")}
                  placeholderTextColor={"#52525b"}
                  onChangeText={(text) => setNewTaskText(text)}
                  value={newTaskText}
                />
                <FontAwesome
                  name="close"
                  size={28}
                  color="red"
                  onPress={handleCancel}
                />
              </View>
            ) : (
              <View className="mr-10 flex-row items-center justify-start">
                <FontAwesome
                  name="edit"
                  size={28}
                  color={`${taskCompleted ? colors.iconColorChecked : colors.iconColor}`}
                  onPress={() => setInputVisible(true)}
                />
                <Text
                  className={`mb-1 w-10/12 border-b border-transparent px-4 py-4 text-2xl ${taskCompleted ? colors.checkmarkUncheckedText : colors.checkmarkCheckedText}`}
                >
                  {taskText}
                </Text>
                <View
                  className={`h-11 w-11 rounded-full border ${colors.checkmarkBorder} flex items-center justify-center 
                    ${taskCompleted ? colors.checkmarkChecked : colors.checkmarkUnchecked}`}
                >
                  {taskCompleted && (
                    <Text
                      className={`${taskCompleted ? colors.checkmarkUncheckedText : colors.checkmarkUncheckedText}`}
                    >
                      ✓
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className={`mb-4 rounded-full ${colors.background} px-7 py-4`}
          onPress={handleRecipePress}
        >
          <Text className={`text-center text-xl font-bold ${colors.textColor}`}>
            {t("INDRecipe")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`mb-4 rounded-full ${colors.background} px-7 py-4`}
          onPress={handleDiaryPress}
        >
          <Text className={`text-center text-xl font-bold ${colors.textColor}`}>
            {t("INDDiary")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`mb-4 rounded-full ${colors.background} px-7 py-4`}
          onPress={handleProfilePress}
        >
          <Text className={`text-center text-xl font-bold ${colors.textColor}`}>
            {t("INDProfile")}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomePage;
