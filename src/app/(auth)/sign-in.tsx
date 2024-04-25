import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import * as Yup from "yup";

import { signIn } from "@/api/authService";
import SignInForm from "@/components/authentication/SignInForm";
import { darkColorsAuth, lightColorsAuth } from "@/constants/Colors";
import { signInValidationSchema } from "@/utils/validationSchemas";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] =
    useState<Yup.ValidationError | null>(null);

  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsAuth : lightColorsAuth;

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInValidationSchema.validate(
        { email, password },
        { abortEarly: false },
      );
      setValidationErrors(null);

      const success = await signIn(email, password);
      if (success) {
        router.replace("/");
      } else {
        Alert.alert(
          "Error",
          "Failed to sign in. Please check your credentials and try again.",
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors(error);
      } else {
        console.error("Error signing in:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className={`${colors.background} flex-1 justify-center`}>
      <View className="flex-1 justify-center p-5">
        <View
          className={`${colors.primaryBackground} rounded-xl p-8 shadow-md`}
        >
          <Text className={`${colors.primaryText} mb-4 text-2xl font-bold`}>
            Member Login:
          </Text>
          <SignInForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            colorScheme={colorScheme}
            validationErrors={validationErrors}
          />
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isLoading}
            className={`${colors.buttonBackground} rounded-full border-2 py-3 ${colors.border}`}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.activityIndicatorColor} />
            ) : (
              <Text
                className={`${colors.buttonText} text-center text-lg font-bold`}
              >
                Sign in
              </Text>
            )}
          </TouchableOpacity>
          <Link
            href="/sign-up"
            className={`mt-4 self-center font-bold ${colors.primaryText} text-lg`}
          >
            Create an account
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
