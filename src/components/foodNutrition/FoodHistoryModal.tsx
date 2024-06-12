import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";

import { lightColorsDiary, darkColorsDiary } from "@/constants/Colors";
import { FoodHistoryModalProps, Tables } from "@/types";

const FoodHistoryModal: React.FC<FoodHistoryModalProps> = ({
  isVisible,
  onClose,
  onSelect,
  previousFoodEntries,
}) => {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);

  const renderFoodItem = ({ item }: { item: Tables<"nutrition"> }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedFoodId(item.id);
        onSelect(item);
      }}
      className={`mb-4 rounded-lg p-4 shadow-md ${
        selectedFoodId === item.id
          ? colors.holdingBackground
          : colors.primaryBackground
      }`}
    >
      <Text className={`text-lg font-bold ${colors.primaryText}`}>
        {item.food_name}
      </Text>
      <Text className={`${colors.secondaryText}`}>Brand: {item.brand}</Text>
      <Text className={`${colors.secondaryText}`}>
        Serving Size: {item.serving_size} {item.measurement_unit}
      </Text>
      <Text className={`${colors.secondaryText}`}>
        Calories: {item.calories}
      </Text>
    </TouchableOpacity>
  );

  const recentFoodEntries = previousFoodEntries.slice(0, 14);

  return (
    <Modal visible={isVisible} animationType="slide">
      <View
        className={`flex-1 ${colorScheme === "dark" ? "bg-black" : "bg-white"}`}
      >
        <View className={`flex-1 p-5`}>
          <View
            className={`${colors.primaryBackground} rounded-lg p-4 shadow-md`}
          >
            <Text className={`mb-2 text-xl font-bold ${colors.primaryText}`}>
              Food History
            </Text>
            <View className={`border-b ${colors.border} mb-4`} />
            {recentFoodEntries.length > 0 ? (
              <FlatList
                data={recentFoodEntries}
                renderItem={renderFoodItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 80 }}
              />
            ) : (
              <Text className={`${colors.secondaryText}`}>
                Food history is empty.
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedFoodId(null);
            onClose();
          }}
          className={`items-center justify-center p-4 ${colors.cancelButtonBackground}`}
        >
          <Text className={`text-lg font-bold ${colors.cancelButtonText}`}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FoodHistoryModal;
