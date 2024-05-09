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
import SignUpForm from "@/components/authentication/SignUpForm";
import { darkColorsAuth, lightColorsAuth } from "@/constants/Colors";
import { signUpValidationSchema } from "@/utils/validationSchemas";
import { useAuth } from "@/providers/AuthProvider";
import PersonalDataModal from "@/components/authentication/PersonalDataModal";

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
  const { session } = useAuth();

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      await signUpValidationSchema.validate(
        { username, email, password },
        { abortEarly: false },
      );
      setValidationErrors(null);

      const success = await signUp(username, email, password);
      if (success) {
        setShowPersonalDataModal(true);
      } else {
        Alert.alert("Error", "Failed to create an account. Please try again.");
      }
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
    height: string,
    weight: string,
    age: number,
    gender: string,
    healthIssues: string[],
  ) => {
    try {
      const userId = session?.user?.id;
      if (userId) {
        await insertPersonalData(
          userId,
          height,
          weight,
          age,
          gender,
          healthIssues,
        );
        Alert.alert(
          "Success",
          "Account created successfully! You can now log in.",
          [{ text: "OK", onPress: () => router.push("/sign-in") }],
        );
      } else {
        console.error("User ID not found in the session:", session);
      }
    } catch (error) {
      console.error("Error submitting personal data:", error);
      Alert.alert(
        "Error",
        "An error occurred while submitting personal data. Please try again.",
      );
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
      />
    </View>
  );
};

export default SignUpScreen;
