import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useColorScheme } from "nativewind";

import { WaterFormProps } from "@/types";
import { darkColorsDiary, lightColorsDiary } from "@/constants/Colors";

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
}) => {
  const predefinedUnits = ["ml", "l"];
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;

  const getFieldError = (field: string) => {
    return validationErrors?.inner.find((error) => error.path === field)
      ?.message;
  };

  return (
    <View
      className={`flex-1 items-center justify-center p-6 ${colors.backgroundInDiary}`}
    >
      <Text className={`mb-6 text-center text-2xl font-bold ${colors.text}`}>
        {isEditing ? "Edit Water" : "Add Water"}
      </Text>
      <View
        className={`w-full max-w-md rounded-lg p-4 shadow-md ${colors.primaryBackground}`}
      >
        <TextInput
          value={amount > 0 ? amount.toString() : ""}
          onChangeText={(text) => setAmount(parseInt(text) || 0)}
          placeholder="Amount"
          placeholderTextColor={colors.inputPlaceholder.split("-")[1]}
          keyboardType="numeric"
          className={`mb-2 border-b p-2 text-lg ${colors.inputBorder} ${colors.primaryText}`}
        />
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
                <Picker.Item key={unitItem} label={unitItem} value={unitItem} />
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
              {isEditing ? "Save" : "Add"}
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
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WaterForm;
