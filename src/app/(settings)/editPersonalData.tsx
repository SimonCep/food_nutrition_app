import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
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
import { useTranslation } from 'react-i18next';

const EditPersonalData: React.FC = () => {
  
  const { t } = useTranslation();
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
    { label: t('EDTGOALLBL1'), value: "noneSelected" },
    { label: t('EDTGOALLBL2'), value: "heartDisease" },
    { label: t('EDTGOALLBL3'), value: "thyroidGlandDisorders" },
    { label: t('EDTGOALLBL4'), value: "lactoseIntolerance" },
    { label: t('EDTGOALLBL5'), value: "celiacDisease" },
    { label: t('EDTGOALLBL6'), value: "hypertension" },
    { label: t('EDTGOALLBL7'), value: "diabetes" },
    { label: t('EDTGOALLBL8'), value: "kidneyDisease" },
  ]);
  const [dietaryGoals, setDietaryGoals] = useState<string>("");
  const [open3, setOpen3] = useState(false);
  const [items3, setItems3] = useState([
    { label: t('EDTGOALGoal1'), value: "noneSelected" },
    { label: t('EDTGOALGoal2'), value: "loseWeight" },
    { label: t('EDTGOALGoal3'), value: "gainWeight" },
    { label: t('EDTGOALGoal4'), value: "increaseMuscle" },
    { label: t('EDTGOALGoal5'), value: "improveHealth" },
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
    <ImageBackground
        source={require("../../assets/images/background.png")}
        className="flex-1 resize-y justify-center bg-white dark:bg-black"
      >
      <View className={`flex-1 px-10 py-5 `}>
        <View
          className={`container mt-5 flex rounded-3xl ${colors.backgroundSolid} items-right justify-start p-5 shadow-md`}
        >
          <Text className={`mb-2 text-lg ${colors.textColor}`}>{t('EDTGOALGender')}</Text>
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

          <Text className={`mb-2 mt-3 text-lg ${colors.textColor}`}>{t('EDTGOALAge')}</Text>
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
            {t('EDTGOALheight')}
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
            {t('EDTGOALweight')}
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
          {t('EDTGOALhealth')}
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
          {t('EDTGOALdietary')}
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
                {t('EDTGOALsave')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        </View>  
      </ImageBackground>
  );
};

export default EditPersonalData;
