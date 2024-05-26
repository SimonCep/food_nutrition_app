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

import { signUp } from "@/api/authService";
import { insertPersonalData } from "@/api/personalDataService";
import { insertUserHeight } from "@/api/userHeightService";
import { insertUserWeight } from "@/api/userWeightService";
import SignUpForm from "@/components/authentication/SignUpForm";
import { darkColorsAuth, lightColorsAuth } from "@/constants/Colors";
import {
  personalDataValidationSchema,
  signUpValidationSchema,
  userHeightValidationSchema,
  userWeightValidationSchema,
} from "@/utils/validationSchemas";
import PersonalDataModal from "@/components/authentication/PersonalDataModal";
import { supabase } from "@/lib/supabase";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] =
    useState<Yup.ValidationError | null>(null);
  const [showPersonalDataModal, setShowPersonalDataModal] = useState(false);

  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsAuth : lightColorsAuth;
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      await signUpValidationSchema.validate(
        { username, email, password },
        { abortEarly: false },
      );
      setValidationErrors(null);
      setShowPersonalDataModal(true);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors(error);
      } else {
        console.error("Error signing up:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonalDataSubmit = async (
    height: number,
    weight: number,
    age: number,
    gender: string,
    healthIssues: string[],
    dietaryGoals: string[],
  ) => {
    try {
      setIsLoading(true);
      await personalDataValidationSchema.validate(
        { age, gender, healthIssues, dietaryGoals },
        { abortEarly: false },
      );

      await userHeightValidationSchema.validate(
        { height, unit: "cm" },
        { abortEarly: false },
      );

      await userWeightValidationSchema.validate(
        { weight, unit: "kg" },
        { abortEarly: false },
      );

      const result = await signUp(username, email, password);
      if (result && result.success && result.userId) {
        await insertPersonalData(
          result.userId,
          age,
          gender,
          healthIssues,
          dietaryGoals,
        );
        await insertUserHeight(result.userId, height, "cm");
        await insertUserWeight(result.userId, weight, "kg");
        Alert.alert(
          "Success",
          "Account created successfully! You can now log in.",
          [
            {
              text: "OK",
              onPress: () => {
                setShowPersonalDataModal(false);
                setUsername("");
                setEmail("");
                setPassword("");
                setValidationErrors(null);
                router.push("/sign-in");
              },
            },
          ],
        );
        await supabase.auth.signOut();
      } else {
        Alert.alert("Error", "Failed to create an account. Please try again.");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors(error);
      } else {
        console.error("Error submitting personal data:", error);
        Alert.alert(
          "Error",
          "An error occurred while submitting personal data. Please try again.",
        );
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
            Create Account:
          </Text>
          <SignUpForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            colorScheme={colorScheme}
            validationErrors={validationErrors}
          />
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            className={`${colors.buttonBackground} rounded-full border-2 py-3 ${colors.border}`}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.activityIndicatorColor} />
            ) : (
              <Text
                className={`${colors.buttonText} text-center text-lg font-bold`}
              >
                Create account
              </Text>
            )}
          </TouchableOpacity>
          <Link
            href="/sign-in"
            className={`mt-4 self-center font-bold ${colors.primaryText} text-lg`}
          >
            Sign in
          </Link>
        </View>
      </View>
      <PersonalDataModal
        modalVisible={showPersonalDataModal}
        setModalVisible={setShowPersonalDataModal}
        colors={colors}
        onPersonalDataSubmit={handlePersonalDataSubmit}
        validationErrors={validationErrors}
        isLoading={isLoading}
      />
    </View>
  );
};

export default SignUpScreen;
