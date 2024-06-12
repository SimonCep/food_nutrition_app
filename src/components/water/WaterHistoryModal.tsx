import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";

import { lightColorsDiary, darkColorsDiary } from "@/constants/Colors";
import { Tables, WaterHistoryModalProps } from "@/types";

const WaterHistoryModal: React.FC<WaterHistoryModalProps> = ({
  isVisible,
  onClose,
  onSelect,
  previousWaterEntries,
}) => {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [selectedWaterId, setSelectedWaterId] = useState<number | null>(null);

  const renderWaterItem = ({ item }: { item: Tables<"water_consumption"> }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedWaterId(item.id);
        onSelect(item);
      }}
      className={`mb-4 rounded-lg p-4 shadow-md ${
        selectedWaterId === item.id
          ? colors.holdingBackground
          : colors.primaryBackground
      }`}
    >
      <Text className={`text-lg font-bold ${colors.primaryText}`}>
        Amount: {item.amount}
      </Text>
      <Text className={`${colors.secondaryText}`}>Unit: {item.unit}</Text>
    </TouchableOpacity>
  );

  const recentWaterEntries = previousWaterEntries.slice(0, 14);

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
              Water History
            </Text>
            <View className={`border-b ${colors.border} mb-4`} />
            {recentWaterEntries.length > 0 ? (
              <FlatList
                data={recentWaterEntries}
                renderItem={renderWaterItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 80 }}
              />
            ) : (
              <Text className={`${colors.secondaryText}`}>
                Water history is empty.
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedWaterId(null);
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

export default WaterHistoryModal;
