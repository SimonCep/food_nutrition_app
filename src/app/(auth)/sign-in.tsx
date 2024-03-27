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

import { signIn, signInValidationSchema } from "@/api/auth";
import SignInForm from "@/components/SignInForm";
import { lightColors, darkColors } from "@/constants/Colors";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColors : lightColors;
  const router = useRouter();

  const handleSignInSuccess = () => {
    router.replace("/");
  };

  const handleSignIn = async () => {
    try {
      await signInValidationSchema.validate({ email, password });
      await signIn(email, password, setIsLoading, handleSignInSuccess);
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
          options={{ title: "Sign in", headerTitleAlign: "center" }}
        />
        <View
          className={`${colors.primaryBackground} p-8 rounded-xl shadow-md`}
        >
          <SignInForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            colorScheme={colorScheme}
          />
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isLoading}
            className={`${colors.buttonBackground} py-3 rounded-full border-2 ${colors.border}`}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.primaryText} />
            ) : (
              <Text
                className={`${colors.primaryText} font-bold text-lg text-center`}
              >
                Sign in
              </Text>
            )}
          </TouchableOpacity>
          <Link
            href="/sign-up"
            className={`self-center font-bold ${colors.primaryText} text-lg`}
          >
            Create an account
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
