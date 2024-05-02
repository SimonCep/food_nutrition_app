import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import * as Yup from "yup";

import { signUp } from "@/api/authService";
import SignUpForm from "@/components/authentication/SignUpForm";
import { darkColorsAuth, lightColorsAuth } from "@/constants/Colors";
import { signUpValidationSchema } from "@/utils/validationSchemas";
import DropDownPicker from 'react-native-dropdown-picker';


const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] =
    useState<Yup.ValidationError | null>(null);

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ]);
  const [items2, setItems2] = useState([
    {label: "Heart disease", value: 'heartDisease'},
    {label: "Thyroid gland disorders", value: 'thyroidGlandDisorders'},
    {label: "Lactose intolerance", value: 'lactoseIntolerance'},
    {label: "Celiac Disease", value: 'celiacDisease'},
    {label: "Hypertension (High Blood Pressure)", value: 'hypertension'},
    {label: "Diabetes", value: 'diabetes'},
    {label: "Kidney Disease", value: 'kidneyDisease'},
    {label: "None", value: 'noneSelected'}
  ]);

  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsAuth : lightColorsAuth;
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

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
        Alert.alert(
          "Success",
          "Account created successfully! You can now log in.",
          [{ text: "OK", onPress: () => router.push("/sign-in") }],
        );
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
                onPress={() => setModalVisible(true)}
                className={`px-4 py-2 mt-4 mb-2`}
              >
                <Text className={`${colors.buttonText} text-center font-bold`}>Enter personal data</Text>
              </TouchableOpacity>

              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View className="flex justify-center items-center">
                  <View className={`${colors.background} p-10 mx-2 rounded-lg shadow-lg`}>
                    <View className="mb-5 mt-10 items-center">
                    <Text className={`py-4 px-4 mb-1 mt-10 text-3xl ${colors.text}`}>Enter your personal data</Text>
                    <Text className="self-start py-1 text-[#6B7280]">Select your gender</Text>
                    <DropDownPicker
                      open={open1}
                      value={value1}
                      items={items1}
                      setOpen={setOpen1}
                      setValue={setValue1}
                      setItems={setItems1}
                    />
                    <TextInput
                      className={`border-b border-gray-300 py-4 px-4 mb-5 text-lg self-start w-full ${colors.text}`}
                      placeholder="Enter your height"
                      placeholderTextColor="#6B7280"
                      value={height}
                      onChangeText={setHeight}
                    />
                    <TextInput
                      className={`border-b border-gray-300 py-4 px-4 mb-5 text-lg self-start w-full ${colors.text}`}
                      placeholder="Enter your weight"
                      placeholderTextColor="#6B7280"
                      value={weight}
                      onChangeText={setWeight}
                    />
                    <TextInput
                      className={`border-b border-gray-300 py-4 px-4 mb-5 text-lg self-start w-full ${colors.text}`}
                      placeholder="Enter your age"
                      placeholderTextColor="#6B7280"
                      value={age}
                      onChangeText={setAge}
                    />
                    
                    <Text className="self-start py-1 text-[#6B7280]">Select your health issues</Text>
                    <DropDownPicker
                      open={open2}
                      value={value2}
                      items={items2}
                      setOpen={setOpen2}
                      setValue={setValue2}
                      setItems={setItems2}
                    />

                    </View>
                    <Text className={`pb-5 text-2xl ${colors.buttonText}`}></Text>

                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      className={`${colors.buttonBackground} rounded-full border-2 ${colors.border} px-4 py-2 mt-4 mb-2`}
                    >
                      <Text className={`${colors.buttonText} text-center font-bold`}>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      className={` x-4 py-2 mt-4 mb-2`}
                    >
                      <Text className={` text-red-500 text-center font-bold`}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal> 


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
    </View>
  );
};

export default SignUpScreen;
