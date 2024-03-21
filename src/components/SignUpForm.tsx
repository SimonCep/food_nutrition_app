import React from "react";
import { TextInput } from "react-native";

interface SignUpFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  colorScheme: "dark" | "light" | undefined;
}

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
        placeholder="Name"
        placeholderTextColor={colorScheme === "dark" ? "#A0AEC0" : "#4B5563"}
        className={`border-2 ${
          colorScheme === "dark" ? "border-gray-600" : "border-black"
        } p-3 mt-1 mb-4 ${
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
        } p-3 mt-1 mb-4 ${
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
        } p-3 mt-1 mb-6 ${
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
