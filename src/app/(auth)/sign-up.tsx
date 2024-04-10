import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

import { signUp } from "@/api/authService";
import SignUpForm from "@/components/authentication/SignUpForm";
import { darkColorsAuth, lightColorsAuth } from "@/constants/Colors";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsAuth : lightColorsAuth;

  const router = useRouter();

  const handleSignUpSuccess = () => {
    router.push("/sign-in");
  };

  return (
    <View className={`${colors.background} flex-1 justify-center`}>
      <View className="flex-1 justify-center p-5">
        <View
          className={`${colors.primaryBackground} rounded-xl p-8 shadow-md`}
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
            onPress={() =>
              signUp(name, email, password, setIsLoading, handleSignUpSuccess)
            }
            disabled={isLoading}
            className={`${colors.buttonBackground} rounded-full border-2 py-3 ${colors.border} mb-4`}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.activityIndicatorColor} />
            ) : (
              <Text
                className={`${colors.primaryText} text-center text-lg font-bold`}
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
