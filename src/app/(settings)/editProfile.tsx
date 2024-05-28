import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";
import * as Yup from "yup";

import { updateProfile } from "@/api/profileService";
import { useAuth } from "@/providers/AuthProvider";
import { updateProfileValidationSchema } from "@/utils/validationSchemas";
import { darkColorsSettingsProfile, lightColorsSettingsProfile } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { useTranslation } from 'react-i18next';

const EditProfile: React.FC = () => {
  const { t } = useTranslation();
  const { profile, updateProfileData } = useAuth();

  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsSettingsProfile : lightColorsSettingsProfile;

  const [username, setUsername] = useState<string>(profile?.username ?? "");
  const [fullname, setFullname] = useState<string>(profile?.full_name ?? "");
  const [avatarUrl, setAvatarUrl] = useState<string>(profile?.avatar_url ?? "");
  const [website, setWebsite] = useState<string>(profile?.website ?? "");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] =
    useState<Yup.ValidationError | null>(null);

  const handleSaveProfile = async () => {
    try {
      await updateProfileValidationSchema.validate(
        { username, full_name: fullname, avatar_url: avatarUrl, website },
        { abortEarly: false },
      );
      setValidationErrors(null);

      const isProfileUpdated = await updateProfile(profile!.id, {
        username,
        full_name: fullname,
        avatar_url: avatarUrl,
        website,
      });

      if (isProfileUpdated) {
        await updateProfileData(profile!.id);
        Alert.alert("Success", "Profile updated successfully.");
        router.push("/(tabs)/userInfo");
      } else {
        Alert.alert("Error", "Failed to update profile. Please try again.");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors(error);
      } else {
        console.error("Error updating profile:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleChangeAvatar = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const getFieldError = (field: string) => {
    return validationErrors?.inner.find((error) => error.path === field)
      ?.message;
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1 resize-y justify-center bg-white dark:bg-black"
    >
    <View className={`flex-1 justify-center items-center p-10`}>
      <View className={`container mt-5 flex rounded-3xl ${colors.backgroundSolid} p-5 py-10 justify-start items-right shadow-md`}>
        <TouchableOpacity onPress={handleChangeAvatar}>
          <Image
            source={{ uri: avatarUrl || "https://via.placeholder.com/150" }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75, 
              marginBottom: 20,
              alignSelf: "center",
              borderColor: "#000000",
              borderWidth: 2,
              
            }}
          />
        </TouchableOpacity>
        <TextInput
          className={`border-b border-gray-300 py-4 px-4 mb-1 mt-10 text-2xl ${colors.textColor}`}
          placeholder={t('EDTPROFusername')}
          placeholderTextColor="#6B7280"
          value={username}
          onChangeText={setUsername}
        />
        {getFieldError("username") && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {getFieldError("username")}
          </Text>
        )}
        <TextInput
          className={`border-b border-gray-300 py-4 px-4 mb-1 text-2xl ${colors.textColor}`}
          placeholder={t('EDTPROFfullname')}
          placeholderTextColor="#6B7280"
          value={fullname}
          onChangeText={setFullname}
        />
        {getFieldError("full_name") && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {getFieldError("full_name")}
          </Text>
        )}
        <TextInput
          className={`border-b border-gray-300 py-4 px-4 mb-10 text-2xl ${colors.textColor}`}
          placeholder={t('EDTPROFwebsite')}
          placeholderTextColor="#6B7280"
          value={website}
          onChangeText={setWebsite}
        />
        {getFieldError("website") && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {getFieldError("website")}
          </Text>
        )}
        
        <TouchableOpacity
          onPress={handleSaveProfile}
          className={`${colors.buttonBackground} w-full rounded-full border-2 ${colors.buttonBorder} px-4 py-2 mt-4 self-center`}
        >
          <Text className={`${colors.buttonText} text-center font-bold`}>{t('EDTPROFsave')}</Text>
        </TouchableOpacity> 
        
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={handleModalClose}
        >
          <View className={`flex-1 justify-center items-center p-10 ${colors.backgroundSolid}`}>
            <View className={`container mt-5 flex rounded-3xl p-5 mx-2 ${colors.backgroundSolid} justify-start items-right shadow-lg`}>       
              <TextInput
                className={`border-b border-gray-300 py-4 px-4 mb-5 text-lg ${colors.textColor}`}
                placeholder="Avatar URL"
                placeholderTextColor="#6B7280"
                value={avatarUrl}
                onChangeText={setAvatarUrl}
              />
              
              <TouchableOpacity
                onPress={handleModalClose}
                className={`${colors.buttonBackground} w-full rounded-full border-2 ${colors.buttonBorder} px-4 py-2 mt-4 mb-2 self-center`}
              >
                <Text className={`${colors.buttonText} text-center font-bold`}>{t('EDTPROFsaveurl')}</Text>
              </TouchableOpacity> 
              
              <TouchableOpacity
                onPress={handleModalClose}
                className={`${colors.buttonBackground} w-full rounded-full border-2 ${colors.buttonBorder} px-4 py-2 mt-4 mb-2 self-center`}
              >
                <Text className={`${colors.buttonText} text-center font-bold`}>{t('EDTPROFcancel')}</Text>
              </TouchableOpacity> 
              
            </View>
          </View>
        </Modal>
      </View>
    </View>
    </ImageBackground>
  );
};

export default EditProfile;
