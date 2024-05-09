import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Button
} from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { darkColorsIndex, lightColorsIndex } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useAuth } from "@/providers/AuthProvider";

const HomePage = () => {
  const router = useRouter();
  const { session, loading } = useAuth();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsIndex : lightColorsIndex;

  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskText, setTaskText] = useState('Enter your daily task');
  const [inputVisible, setInputVisible] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const handleSave = () => {
    const updatedTaskText = newTaskText.trim() !== '' ? newTaskText : 'Enter your daily task';
    setTaskText(updatedTaskText);
    setInputVisible(false);
  };
  const handleCancel = () => {
    setInputVisible(false);
    setNewTaskText('');
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

  const handleDiaryPress = () => {
    router.push("./diary");
  };

  const handleProfilePress = () => {
    router.push("./userInfo");
  };

  return (
    <ImageBackground
      source={colorScheme === 'dark' ? require("../../assets/images/AnimatedDark.gif") : require("../../assets/images/AnimatedLight.gif")}
      className="flex-1 items-center justify-center"
    >
      <View className="flex-1 items-center justify-center px-5">
        <View className={`mb-4 h-24 w-24 rounded-full ${colors.imageBackground} shadow-lg  items-center`}>
          <Image
            source={colorScheme === 'dark' ? require("../../assets/images/iconDark.png") : require("../../assets/images/icon.png")}
            className="mb-5 h-24 w-24"
          />
        </View>
        <Text className={`mb-2 text-4xl font-bold ${colors.textColor}`}>Eathy</Text>
        <Text className={`mb-7 text-xl ${colors.textColor}`}>
          Track your calories and health
        </Text>

        
        <TouchableOpacity onPress={toggleTaskCompletion} className={`mb-4 rounded-xl px-6 py-2
            ${taskCompleted ? colors.backgroundChecked : colors.background} 
            ${taskCompleted ? colors.taskShadowChecked : colors.taskShadow}`}>
          <View className="flex-row items-center justify-start"> 
            {inputVisible ? (
              <View className="flex-row items-center justify-start">
                <FontAwesome name="check" size={28} color="green" onPress={handleSave}/>
                <TextInput
                  className={`border-b border-gray-300 py-4 px-4 mb-1 text-2xl w-10/12 ${colors.textColor}`}
                  placeholder="Enter task text"
                  placeholderTextColor={"#52525b"}
                  onChangeText={(text) => setNewTaskText(text)}
                  value={newTaskText}
                />
                <FontAwesome name="close" size={28} color="red" onPress={handleCancel} />
              </View>
            ) : (
              <View className="flex-row items-center justify-start mr-10">
                <FontAwesome name="edit" size={28} color={`${taskCompleted ? colors.iconColorChecked : colors.iconColor}`} onPress={() => setInputVisible(true)} /> 
                <Text className={`border-b border-transparent py-4 px-4 mb-1 text-2xl w-10/12 ${taskCompleted ? colors.checkmarkUncheckedText : colors.checkmarkCheckedText}`}>{taskText}</Text>
                <View className={`w-11 h-11 rounded-full border ${colors.checkmarkBorder} flex justify-center items-center 
                    ${taskCompleted ? colors.checkmarkChecked : colors.checkmarkUnchecked}`}>
                  {taskCompleted && <Text className={`${taskCompleted ? colors.checkmarkUncheckedText : colors.checkmarkUncheckedText}`}>✓</Text>}
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          className={`mb-4 rounded-full ${colors.background} px-7 py-4`}
          onPress={handleDiaryPress}
        >
          <Text className={`text-center text-xl font-bold ${colors.textColor}`}>
            Diary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`mb-4 rounded-full ${colors.background} px-7 py-4`}
          onPress={handleProfilePress}
        >
          <Text className={`text-center text-xl font-bold ${colors.textColor}`}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomePage;
