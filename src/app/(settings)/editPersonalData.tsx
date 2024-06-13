import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useColorScheme } from "nativewind";
import DropDownPicker from "react-native-dropdown-picker";
import * as Yup from "yup";

import {
  darkColorsSettingsGoals,
  lightColorsSettingsGoals,
} from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";
import {
  fetchPersonalData,
  updatePersonalData,
} from "@/api/personalDataService";
import { fetchUserHeight, updateUserHeight } from "@/api/userHeightService";
import { fetchUserWeight, updateUserWeight } from "@/api/userWeightService";
import {
  personalDataValidationSchema,
  userHeightValidationSchema,
  userWeightValidationSchema,
} from "@/utils/validationSchemas";
import { usePersonalDataContext } from "@/providers/PersonalDataProvider";

const EditPersonalData: React.FC = () => {
  const { session } = useAuth();
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [open1, setOpen1] = useState(false);
  const [items1, setItems1] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  const [open2, setOpen2] = useState(false);
  const [items2, setItems2] = useState([
    { label: "None", value: "noneSelected" },
    { label: "Heart disease", value: "heartDisease" },
    { label: "Thyroid gland disorders", value: "thyroidGlandDisorders" },
    { label: "Lactose intolerance", value: "lactoseIntolerance" },
    { label: "Celiac Disease", value: "celiacDisease" },
    { label: "Hypertension (High Blood Pressure)", value: "hypertension" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Kidney Disease", value: "kidneyDisease" },
  ]);
  const [dietaryGoals, setDietaryGoals] = useState<string>("");
  const [open3, setOpen3] = useState(false);
  const [items3, setItems3] = useState([
    { label: "None", value: "noneSelected" },
    { label: "Lose weight", value: "loseWeight" },
    { label: "Gain weight", value: "gainWeight" },
    { label: "Increase muscle mass", value: "increaseMuscle" },
    { label: "Improve overall health", value: "improveHealth" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] =
    useState<Yup.ValidationError | null>(null);

  const { refreshPersonalData } = usePersonalDataContext();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          const personalData = await fetchPersonalData(session.user.id);
          const userHeight = await fetchUserHeight(session.user.id);
          const userWeight = await fetchUserWeight(session.user.id);

          setAge(personalData?.age?.toString() ?? "");
          setGender(personalData?.gender ?? "");
          setHeight(userHeight?.height?.toString() ?? "");
          setWeight(userWeight?.weight?.toString() ?? "");
          setHealthIssues(personalData?.health_issues || []);
          setDietaryGoals(personalData?.dietary_goals ?? "");
        } catch (error) {
          console.error("Error fetching personal data:", error);
          Alert.alert(
            "Error",
            "An error occurred while fetching personal data. Please try again.",
          );
        }
      }
    };

    fetchData();
  }, [session?.user?.id]);

  const getFieldError = (field: string) => {
    return validationErrors?.inner.find((error) => error.path === field)
      ?.message;
  };

  const handleHealthIssuesChange = (
    callback: (prevState: string[]) => string[],
  ) => {
    setHealthIssues((prevSelectedValues) => {
      const newSelectedValues = callback(prevSelectedValues);
      if (newSelectedValues.includes("noneSelected")) {
        return ["noneSelected"];
      } else {
        return newSelectedValues.filter((value) => value !== "noneSelected");
      }
    });
  };

  const handleSavePersonalData = async () => {
    if (session?.user?.id) {
      setLoading(true);
      setValidationErrors(null);

      try {
        await personalDataValidationSchema.validate(
          { age: parseInt(age), gender, healthIssues, dietaryGoals },
          { abortEarly: false },
        );

        await userHeightValidationSchema.validate(
          { height: parseInt(height), unit: "cm" },
          { abortEarly: false },
        );

        await userWeightValidationSchema.validate(
          { weight: parseFloat(weight), unit: "kg" },
          { abortEarly: false },
        );

        const updatedPersonalData = await updatePersonalData(
          session.user.id,
          parseInt(age),
          gender,
          healthIssues,
          dietaryGoals,
        );
        const updatedHeight = await updateUserHeight(
          session.user.id,
          parseInt(height),
          "cm",
        );
        const updatedWeight = await updateUserWeight(
          session.user.id,
          parseFloat(weight),
          "kg",
        );

        if (updatedPersonalData && updatedHeight && updatedWeight) {
          Alert.alert("Success", "Personal data saved successfully!");
          refreshPersonalData();
        } else {
          Alert.alert(
            "Error",
            "Failed to save personal data. Please try again.",
          );
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setValidationErrors(error);
        } else {
          console.error("Error saving personal data:", error);
          Alert.alert(
            "Error",
            "An error occurred while saving personal data. Please try again.",
          );
        }
      }

      setLoading(false);
    }
  };

  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsSettingsGoals : lightColorsSettingsGoals;

  return (
    <View className={`flex-1 px-10 py-20 ${colors.background}`}>
      <ScrollView>
        <View
          className={`container mt-5 flex rounded-3xl ${colors.backgroundSolid} items-right justify-start p-5`}
        >
          <Text className={`mb-2 text-lg ${colors.textColor}`}>Gender</Text>
          <DropDownPicker
            open={open1}
            value={gender}
            items={items1}
            setOpen={setOpen1}
            setValue={setGender}
            setItems={setItems1}
          />
          {getFieldError("gender") && (
            <Text className={`self-start ${colors.errorText}`}>
              {getFieldError("gender")}
            </Text>
          )}

          <Text className={`mb-2 mt-3 text-lg ${colors.textColor}`}>Age</Text>
          <TextInput
            className={`mb-5 border-b border-gray-300 px-4 py-4 text-2xl ${colors.textColor}`}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          {getFieldError("age") && (
            <Text className={`self-start ${colors.errorText}`}>
              {getFieldError("age")}
            </Text>
          )}

          <Text className={`mb-2 text-lg ${colors.textColor}`}>
            Height (cm)
          </Text>
          <TextInput
            className={`mb-5 border-b border-gray-300 px-4 py-4 text-2xl ${colors.textColor}`}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          {getFieldError("height") && (
            <Text className={`self-start ${colors.errorText}`}>
              {getFieldError("height")}
            </Text>
          )}

          <Text className={`mb-2 text-lg ${colors.textColor}`}>
            Weight (kg)
          </Text>
          <TextInput
            className={`mb-5 border-b border-gray-300 px-4 py-4 text-2xl ${colors.textColor}`}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          {getFieldError("weight") && (
            <Text className={`self-start ${colors.errorText}`}>
              {getFieldError("weight")}
            </Text>
          )}

          <Text className={`mb-2 text-lg ${colors.textColor}`}>
            Health Issues
          </Text>
          <DropDownPicker
            open={open2}
            value={healthIssues}
            items={items2}
            setOpen={setOpen2}
            setValue={handleHealthIssuesChange}
            setItems={setItems2}
            multiple={true}
            zIndex={2000}
            dropDownDirection={"TOP"}
          />
          {getFieldError("healthIssues") && (
            <Text className={`self-start ${colors.errorText}`}>
              {getFieldError("healthIssues")}
            </Text>
          )}

          <Text className={`mb-2 mt-3 text-lg ${colors.textColor}`}>
            Dietary Goals
          </Text>
          <DropDownPicker
            open={open3}
            value={dietaryGoals}
            items={items3}
            setOpen={setOpen3}
            setValue={setDietaryGoals}
            setItems={setItems3}
            multiple={false}
            zIndex={1000}
          />
          {getFieldError("dietaryGoals") && (
            <Text className={`self-start ${colors.errorText}`}>
              {getFieldError("dietaryGoals")}
            </Text>
          )}

          <TouchableOpacity
            onPress={handleSavePersonalData}
            disabled={loading}
            className={`${colors.buttonBackground} w-full rounded-full border-2 ${colors.buttonBorder} mb-2 mt-4 self-center px-4 py-2`}
          >
            {loading ? (
              <ActivityIndicator
                color={colors.buttonText.split("-")[1]}
                size="small"
              />
            ) : (
              <Text className={`${colors.buttonText} text-center font-bold`}>
                Save
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditPersonalData;
