import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { supabase } from "@/lib/supabase";
import SignInForm from "@/components/SignInForm";

const signIn = async (
  email: string,
  password: string,
  setIsLoading: (isLoading: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert("Error", error.message);
    }
  } catch (error) {
    Alert.alert("Error", "An error occurred while signing in.");
    console.error("Sign in error:", error);
  } finally {
    setIsLoading(false);
  }
};

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={`${
        colorScheme === "dark" ? "bg-black" : "bg-white"
      } flex-1 justify-center`}
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
          <SignInForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            colorScheme={colorScheme}
          />
          <TouchableOpacity
            onPress={() => signIn(email, password, setIsLoading)}
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
    </View>
  );
};

export default SignInScreen;
