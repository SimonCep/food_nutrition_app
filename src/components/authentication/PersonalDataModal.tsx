import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { PersonalDataModalProps } from "@/types";

const PersonalDataModal: React.FC<PersonalDataModalProps> = ({
  modalVisible,
  setModalVisible,
  colors,
  onPersonalDataSubmit,
  validationErrors,
}) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [open1, setOpen1] = useState(false);
  const [gender, setGender] = useState("");
  const [open2, setOpen2] = useState(false);
  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  const [items1, setItems1] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
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

  const getFieldError = (field: string) => {
    return validationErrors?.inner.find((error) => error.path === field)
      ?.message;
  };

  const handleSubmit = () => {
    onPersonalDataSubmit(height, weight, parseInt(age), gender, healthIssues)
      .then(() => {})
      .catch((error) => {
        console.error("Error submitting personal data:", error);
      });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex items-center justify-center">
        <View className={`${colors.background} mx-2 rounded-lg p-10 shadow-lg`}>
          <View className="mb-5 mt-10 items-center">
            <Text className={`mb-1 mt-10 px-4 py-4 text-3xl ${colors.text}`}>
              Enter your personal data
            </Text>
            <Text className="self-start py-1 text-[#6B7280]">
              Select your gender
            </Text>
            <DropDownPicker
              open={open1}
              value={gender}
              items={items1}
              setOpen={setOpen1}
              setValue={setGender}
              setItems={setItems1}
            />
            {getFieldError("gender") && (
              <Text className="self-start text-red-500">
                {getFieldError("gender")}
              </Text>
            )}

            <TextInput
              className={`mb-5 w-full self-start border-b border-gray-300 px-4 py-4 text-lg ${colors.text}`}
              placeholder="Enter your height"
              placeholderTextColor="#6B7280"
              value={height}
              onChangeText={setHeight}
            />
            {getFieldError("height") && (
              <Text className="self-start text-red-500">
                {getFieldError("height")}
              </Text>
            )}

            <TextInput
              className={`mb-5 w-full self-start border-b border-gray-300 px-4 py-4 text-lg ${colors.text}`}
              placeholder="Enter your weight"
              placeholderTextColor="#6B7280"
              value={weight}
              onChangeText={setWeight}
            />
            {getFieldError("weight") && (
              <Text className="self-start text-red-500">
                {getFieldError("weight")}
              </Text>
            )}

            <TextInput
              className={`mb-5 w-full self-start border-b border-gray-300 px-4 py-4 text-lg ${colors.text}`}
              placeholder="Enter your age"
              placeholderTextColor="#6B7280"
              value={age}
              onChangeText={setAge}
            />
            {getFieldError("age") && (
              <Text className="self-start text-red-500">
                {getFieldError("age")}
              </Text>
            )}

            <Text className="self-start py-1 text-[#6B7280]">
              Select your health issues
            </Text>
            <DropDownPicker
              open={open2}
              value={healthIssues}
              items={items2}
              setOpen={setOpen2}
              setValue={setHealthIssues}
              setItems={setItems2}
              multiple={true}
            />
            {getFieldError("healthIssues") && (
              <Text className="self-start text-red-500">
                {getFieldError("healthIssues")}
              </Text>
            )}
          </View>
          <Text className={`pb-5 text-2xl ${colors.buttonText}`}></Text>

          <TouchableOpacity
            onPress={handleSubmit}
            className={`${colors.buttonBackground} rounded-full border-2 ${colors.border} mb-2 mt-4 px-4 py-2`}
          >
            <Text className={`${colors.buttonText} text-center font-bold`}>
              Submit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCancel}
            className="mb-2 mt-4 px-4 py-2"
          >
            <Text className="text-center font-bold text-red-500">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PersonalDataModal;
