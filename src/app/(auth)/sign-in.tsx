import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { supabase } from "@/lib/supabase";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  async function handleSignIn() {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Signed in successfully!");
        router.push("/");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while signing in.");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
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
          options={{ title: "Sign in", headerTitleAlign: "center" }}
        />
        <View
          className={`${
            colorScheme === "dark" ? "bg-gray-700" : "bg-white"
          } p-8 rounded-xl shadow-md`}
        >
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
            onPress={handleSignIn}
            disabled={isLoading}
            className={`${
              colorScheme === "dark" ? "bg-yellow-600" : "bg-yellow-400"
            } py-3 rounded-full border-2 ${
              colorScheme === "dark" ? "border-white" : "border-black"
            }`}
          >
            {isLoading ? (
              <ActivityIndicator
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ) : (
              <Text
                className={`${
                  colorScheme === "dark" ? "text-white" : "text-black"
                } font-bold text-lg text-center`}
              >
                Sign in
              </Text>
            )}
          </TouchableOpacity>
          <Link
            href="/sign-up"
            className={`self-center font-bold ${
              colorScheme === "dark" ? "text-white" : "text-black"
            } text-lg`}
          >
            Create an account
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignInScreen;
