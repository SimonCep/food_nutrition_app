import {
  View,
  Text,
  GestureResponderEvent,
  NativeTouchEvent,
  NativeSyntheticEvent,
} from "react-native";
import React from "react";
import { TabBarIcon } from "@/app/(tabs)/_layout";
import { useColorScheme } from "nativewind";
import { darkColorsDiary, lightColorsDiary } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface IProp {
  iconName?: React.ComponentProps<typeof FontAwesome>["name"];
  className?: string;
  onPress: () => void;
  children?: string;
  iconColor: "dark" | "white";
}

export default function IconButton(props: IProp) {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      className={`mx-auto flex w-72 flex-row  gap-4 rounded-xl p-6  text-center active:bg-gray-50 ${colors.buttonBackground} ${props.className}`}
    >
      {props.iconName ? (
        <TabBarIcon name={props.iconName} color={props.iconColor} />
      ) : (
        <></>
      )}
      <Text className={`mx-auto text-xl font-bold ${colors.buttonText}`}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}
