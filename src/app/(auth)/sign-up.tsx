import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { supabase } from "@/lib/supabase";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colorScheme } = useColorScheme();

  async function handleSignIn() {
    //   const { error } = await supabase.auth.signUp({
    //     email,
    //     password,
    //   });
    //   if (error) {
    //     Alert.alert(error.message);
    //   }
    Alert.alert("gejus");
    const { error } = await supabase.from("food").insert({
      id: 12,
      name: "aasdasdasdsa",
      nutritional_value: "Bybys tasej",
      calories: 505,
    });

    if (error) {
      Alert.alert(error.message);
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/images/backgroundImage2.png")}
      className={`${
        colorScheme === "dark" ? "bg-black" : "bg-white"
      } flex-1 justify-center resize-y`}
    >
      <View className="flex-1 p-5 justify-center">
        <Stack.Screen
          options={{ title: "Sign up", headerTitleAlign: "center" }}
        />
        <View
          className={`${
            colorScheme === "dark" ? "bg-gray-700" : "bg-white"
          } p-8 rounded-xl shadow-md`}
        >
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor={
              colorScheme === "dark" ? "#A0AEC0" : "#4B5563"
            }
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
            placeholderTextColor={
              colorScheme === "dark" ? "#A0AEC0" : "#4B5563"
            }
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
            placeholderTextColor={
              colorScheme === "dark" ? "#A0AEC0" : "#4B5563"
            }
            className={`border-2 ${
              colorScheme === "dark" ? "border-gray-600" : "border-black"
            } p-3 mt-1 mb-6 ${
              colorScheme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-md text-lg ${
              colorScheme === "dark" ? "text-white" : "text-black"
            }`}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={async () => handleSignIn}
            className={`${
              colorScheme === "dark" ? "bg-yellow-600" : "bg-yellow-400"
            } py-3 rounded-full border-2 ${
              colorScheme === "dark" ? "border-white" : "border-black"
            } mb-4`}
          >
            <Text
              className={`${
                colorScheme === "dark" ? "text-white" : "text-black"
              } font-bold text-lg text-center`}
            >
              Create account
            </Text>
          </TouchableOpacity>
          <Link
            href="/sign-in"
            className={`self-center font-bold ${
              colorScheme === "dark" ? "text-white" : "text-black"
            } text-lg`}
          >
            Sign in
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
