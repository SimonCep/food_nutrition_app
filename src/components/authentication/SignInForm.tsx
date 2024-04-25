import React from "react";
import { Text, TextInput } from "react-native";

import { SignInFormProps } from "@/types";
import { darkColorsAuth, lightColorsAuth } from "@/constants/Colors";

const SignInForm: React.FC<SignInFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  colorScheme,
  validationErrors,
}) => {
  const colors = colorScheme === "dark" ? darkColorsAuth : lightColorsAuth;

  const getFieldError = (field: string) => {
    return validationErrors?.inner.find((error) => error.path === field)
      ?.message;
  };

  return (
    <>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={colors.inputPlaceholder}
        className={`border-2 ${colors.inputBorder} mb-2 mt-1 p-3 ${colors.inputBackground} rounded-md text-lg ${colors.primaryText}`}
      />
      {getFieldError("email") && (
        <Text className={colors.errorText}>{getFieldError("email")}</Text>
      )}
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={colors.inputPlaceholder}
        className={`border-2 ${colors.inputBorder} mb-2 mt-1 p-3 ${colors.inputBackground} rounded-md text-lg ${colors.primaryText}`}
        secureTextEntry
      />
      {getFieldError("password") && (
        <Text className={`mb-4 ${colors.errorText}`}>
          {getFieldError("password")}
        </Text>
      )}
    </>
  );
};

export default SignInForm;
