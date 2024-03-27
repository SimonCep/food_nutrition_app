import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import * as Yup from "yup";

import { signUp, signUpValidationSchema } from "@/api/auth";
import SignUpForm from "@/components/SignUpForm";
import { lightColors, darkColors } from "@/constants/Colors";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColors : lightColors;

  const handleSignUpSuccess = () => {
    router.push("/sign-in");
  };

  const handleSignUp = async () => {
    try {
      await signUpValidationSchema.validate({ name, email, password });
      await signUp(name, email, password, setIsLoading, handleSignUpSuccess);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Validation Error", error.message);
      } else {
        throw error;
      }
    }
  };

  return (
    <View className={`${colors.background} flex-1 justify-center`}>
      <View className="flex-1 p-5 justify-center">
        <Stack.Screen
          options={{ title: "Sign up", headerTitleAlign: "center" }}
        />
        <View
          className={`${colors.primaryBackground} p-8 rounded-xl shadow-md`}
        >
          <SignUpForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            colorScheme={colorScheme}
          />
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            className={`${colors.buttonBackground} py-3 rounded-full border-2 ${colors.border} mb-4`}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.primaryText} />
            ) : (
              <Text
                className={`${colors.primaryText} font-bold text-lg text-center`}
              >
                Create account
              </Text>
            )}
          </TouchableOpacity>
          <Link
            href="/sign-in"
            className={`self-center font-bold ${colors.primaryText} text-lg`}
          >
            Sign in
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
