import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { WaterFormProps } from "@/types";

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
  const getFieldError = (field: string) => {
    return validationErrors?.inner.find((error) => error.path === field)
      ?.message;
  };

  return (
    <View className="flex-1 bg-gray-100 p-6 dark:bg-black">
      <Text className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
        {isEditing ? "Edit Water" : "Add Water"}
      </Text>
      <View className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-700">
        <TextInput
          value={amount > 0 ? amount.toString() : ""}
          onChangeText={(text) => setAmount(parseInt(text) || 0)}
          placeholder="Amount"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          className="mb-2 border-b border-gray-300 p-2 text-lg text-black dark:border-gray-600 dark:text-white"
        />
        {getFieldError("amount") && (
          <Text className="mb-2 text-red-500">{getFieldError("amount")}</Text>
        )}
        <TextInput
          value={unit}
          onChangeText={setUnit}
          placeholder="Unit"
          placeholderTextColor="#6B7280"
          className="mb-2 border-b border-gray-300 p-2 text-lg text-black dark:border-gray-600 dark:text-white"
        />
        {getFieldError("unit") && (
          <Text className="mb-4 text-red-500">{getFieldError("unit")}</Text>
        )}
        <TouchableOpacity
          onPress={onSubmit}
          disabled={isLoading}
          className="mb-4 rounded-full border-2 border-black bg-yellow-400 py-3 dark:border-white dark:bg-yellow-600"
        >
          {isLoading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text className="text-center text-lg font-bold text-black dark:text-white">
              {isEditing ? "Save" : "Add"}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCancel}
          className="rounded-full bg-gray-300 px-6 py-3 dark:bg-gray-600"
        >
          <Text className="text-center text-lg font-bold text-gray-700 dark:text-gray-200">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WaterForm;
