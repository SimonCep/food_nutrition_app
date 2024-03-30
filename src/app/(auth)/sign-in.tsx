import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

import { signIn } from "@/api/authService";
import SignInForm from "@/components/SignInForm";
import { darkColorsAuth, lightColorsAuth } from "@/constants/Colors";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsAuth : lightColorsAuth;

  const router = useRouter();

  const handleSignInSuccess = () => {
    router.replace("/");
  };

  return (
    <View className={`${colors.background} flex-1 justify-center`}>
      <View className="flex-1 p-5 justify-center">
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
            onPress={() =>
              signIn(email, password, setIsLoading, handleSignInSuccess)
            }
            disabled={isLoading}
            className={`${colors.buttonBackground} py-3 rounded-full border-2 ${colors.border}`}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.activityIndicatorColor} />
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
