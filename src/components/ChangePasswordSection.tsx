import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useColorScheme } from "nativewind";
import { changePassword } from "@/api/authService";
import * as Yup from "yup";
import {
  inputClassName,
  buttonClassName,
} from "@/constants/AccountSecurityStyles";
import { changePasswordValidationSchema } from "@/utils/validationSchemas";

const ChangePasswordSection = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] =
    useState<Yup.ValidationError | null>(null);
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const handleChangePassword = async () => {
    try {
      await changePasswordValidationSchema.validate(
        { newPassword, confirmPassword },
        { abortEarly: false },
      );
      setValidationErrors(null);

      const success = await changePassword(newPassword);
      if (success) {
        setNewPassword("");
        setConfirmPassword("");
        Alert.alert("Success", "Password changed successfully.");
      } else {
        Alert.alert("Error", "Failed to change password. Please try again.");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors(error);
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <View
      className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow-md`}
    >
      <Text
        className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}
      >
        Change Password
      </Text>
      <View className="mb-4">
        <TextInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          className={inputClassName(isDarkMode)}
          placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
        />
        {validationErrors?.inner.some(
          (error) => error.path === "newPassword",
        ) && (
          <Text className="text-red-500 mt-1">
            {
              validationErrors.inner.find(
                (error) => error.path === "newPassword",
              )?.message
            }
          </Text>
        )}
      </View>
      <View className="mb-4">
        <TextInput
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          className={inputClassName(isDarkMode)}
          placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
        />
        {validationErrors?.inner.some(
          (error) => error.path === "confirmPassword",
        ) && (
          <Text className="text-red-500 mt-1">
            {
              validationErrors.inner.find(
                (error) => error.path === "confirmPassword",
              )?.message
            }
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={handleChangePassword}
        className={buttonClassName(isDarkMode)}
      >
        <Text className="text-white font-bold text-center">
          Change Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordSection;
