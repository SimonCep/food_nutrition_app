import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";
import { FontAwesome } from "@expo/vector-icons";

import { Tables, WaterFormProps } from "@/types";
import { darkColorsDiary, lightColorsDiary } from "@/constants/Colors";
import { fetchWaterConsumption } from "@/api/waterService";
import WaterHistoryModal from "@/components/water/WaterHistoryModal";

const WaterForm: React.FC<WaterFormProps> = ({
  amount,
  setAmount,
  unit,
  setUnit,
  onSubmit,
  onCancel,
  isLoading,
  validationErrors,
  isEditing,
  userId,
}) => {
  const { t } = useTranslation();
  const predefinedUnits = ["ml", "l"];
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;

  const [previousWaterEntries, setPreviousWaterEntries] = useState<
    Tables<"water_consumption">[]
  >([]);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);

  useEffect(() => {
    const fetchPreviousWaterEntries = async () => {
      try {
        const waterEntries = await fetchWaterConsumption(userId);
        setPreviousWaterEntries(waterEntries);
      } catch (error) {
        console.error("Error fetching previous water entries:", error);
      }
    };

    fetchPreviousWaterEntries();
  }, [userId]);

  const handleSelectFromHistory = (
    selectedWaterEntry: Tables<"water_consumption">,
  ) => {
    setAmount(selectedWaterEntry.amount);
    setUnit(selectedWaterEntry.unit);
    setIsHistoryModalVisible(false);
  };

  const getFieldError = (field: string) => {
    return validationErrors?.inner.find((error) => error.path === field)
      ?.message;
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1 resize-y justify-center bg-white dark:bg-black"
    >
      <View className={`flex-1 items-center justify-center p-6`}>
        <Text className={`mb-6 text-center text-2xl font-bold ${colors.text}`}>
          {isEditing ? t("WTRFRMediting") : t("WTRFRMadding")}
        </Text>
        <View
          className={`w-full max-w-md rounded-lg p-4 shadow-md ${colors.primaryBackground}`}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-1">
              <TextInput
                value={amount > 0 ? amount.toString() : ""}
                onChangeText={(text) => setAmount(parseInt(text) || 0)}
                placeholder={t("WTRFRMamount")}
                placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
                keyboardType="numeric"
                className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.primaryText}`}
              />
            </View>
            <TouchableOpacity
              onPress={() => setIsHistoryModalVisible(true)}
              className={`ml-4 flex-row items-center rounded-full px-4 py-2 ${colors.buttonBackground}`}
            >
              <FontAwesome
                name="history"
                size={18}
                color={colors.buttonText.split("-")[1]}
              />
              <Text className={`ml-2 text-sm font-bold ${colors.buttonText}`}>
                History
              </Text>
            </TouchableOpacity>
          </View>
          {getFieldError("amount") && (
            <Text className={colors.errorText}>{getFieldError("amount")}</Text>
          )}
          <View className="mb-2">
            <View className={`border-b ${colors.inputBorder}`}>
              <Picker
                selectedValue={unit}
                onValueChange={setUnit}
                style={{
                  color: colors.primaryText.split("-")[1],
                  backgroundColor: colors.unitBackground,
                  marginBottom: 8,
                }}
              >
                {predefinedUnits.map((unitItem) => (
                  <Picker.Item
                    key={unitItem}
                    label={unitItem}
                    value={unitItem}
                  />
                ))}
              </Picker>
            </View>
          </View>
          {getFieldError("unit") && (
            <Text className={`mb-4 ${colors.errorText}`}>
              {getFieldError("unit")}
            </Text>
          )}
          <TouchableOpacity
            onPress={onSubmit}
            disabled={isLoading}
            className={`mb-4 rounded-full border-2 py-3 ${colors.buttonBorder} ${colors.buttonBackground}`}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.buttonText.split("-")[1]} />
            ) : (
              <Text
                className={`text-center text-lg font-bold ${colors.buttonText}`}
              >
                {isEditing ? t("WTRFRMsave") : t("WTRFRMadd")}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCancel}
            className={`rounded-full px-6 py-3 ${colors.cancelButtonBackground}`}
          >
            <Text
              className={`text-center text-lg font-bold ${colors.cancelButtonText}`}
            >
              {t("WTRFRMcancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <WaterHistoryModal
        isVisible={isHistoryModalVisible}
        onClose={() => setIsHistoryModalVisible(false)}
        onSelect={handleSelectFromHistory}
        previousWaterEntries={previousWaterEntries}
      />
    </ImageBackground>
  );
};

export default WaterForm;
