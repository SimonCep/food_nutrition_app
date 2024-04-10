import React from "react";
import { TextInput } from "react-native";

import { SignUpFormProps } from "@/types";

const SignUpForm: React.FC<SignUpFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  colorScheme,
}) => {
  return (
    <>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Username"
        placeholderTextColor={colorScheme === "dark" ? "#A0AEC0" : "#4B5563"}
        className={`border-2 ${
          colorScheme === "dark" ? "border-gray-600" : "border-black"
        } mb-4 mt-1 p-3 ${
          colorScheme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-md text-lg ${
          colorScheme === "dark" ? "text-white" : "text-black"
        }`}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={colorScheme === "dark" ? "#A0AEC0" : "#4B5563"}
        className={`border-2 ${
          colorScheme === "dark" ? "border-gray-600" : "border-black"
        } mb-4 mt-1 p-3 ${
          colorScheme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-md text-lg ${
          colorScheme === "dark" ? "text-white" : "text-black"
        }`}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={colorScheme === "dark" ? "#A0AEC0" : "#4B5563"}
        className={`border-2 ${
          colorScheme === "dark" ? "border-gray-600" : "border-black"
        } mb-6 mt-1 p-3 ${
          colorScheme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-md text-lg ${
          colorScheme === "dark" ? "text-white" : "text-black"
        }`}
        secureTextEntry
      />
    </>
  );
};

export default SignUpForm;
