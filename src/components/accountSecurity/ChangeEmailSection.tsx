import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useColorScheme } from "nativewind";
import * as Yup from "yup";

import { changeEmail } from "@/api/authService";
import { supabase } from "@/lib/supabase";
import {
  inputClassName,
  buttonClassName,
} from "@/constants/AccountSecurityStyles";
import { changeEmailValidationSchema } from "@/utils/validationSchemas";
import { useTranslation } from 'react-i18next';

const ChangeEmailSection = () => {
  const { t } = useTranslation();
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    const fetchCurrentEmail = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user?.user) {
        setCurrentEmail(user.user.email ?? "");
      }
    };

    fetchCurrentEmail()
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching current email:", error);
      });
  }, []);

  const handleChangeEmail = async () => {
    try {
      await changeEmailValidationSchema.validate({ newEmail });
      setValidationError("");

      const success = await changeEmail(newEmail);
      if (success) {
        setNewEmail("");
        Alert.alert(
          "Email Change Initiated",
          `An email has been sent to ${newEmail} and to ${currentEmail}. Please follow the instructions to confirm your new email address.`,
        );
      } else {
        Alert.alert(
          "Error",
          "Failed to initiate email change. Please try again later.",
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationError(error.message);
      } else {
        console.error("Error changing email:", error);
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later.",
        );
      }
    }
  };

  return (
    <View
      className={`${isDarkMode ? "bg-gray-800" : "bg-white"} mb-4 rounded-lg p-4 shadow-md`}
    >
      <Text
        className={`mb-4 text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
      >
        {t('CHNGEMAILtitle')}
      </Text>
      <View className="mb-4">
        <TextInput
          value={currentEmail}
          editable={false}
          className={inputClassName(isDarkMode)}
          placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
        />
      </View>
      <View className="mb-4">
        <TextInput
          placeholder={t('CHNGEMAILnew')}
          value={newEmail}
          onChangeText={setNewEmail}
          className={inputClassName(isDarkMode)}
          placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
        />
        {validationError !== "" && (
          <Text className="mt-1 text-red-500">{validationError}</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={handleChangeEmail}
        className={buttonClassName(isDarkMode)}
      >
        <Text
          className={`text-center font-bold ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {t('CHNGEMAILtitle')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeEmailSection;
