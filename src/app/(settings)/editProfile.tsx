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
} from "react-native";
import { router } from "expo-router";
import * as Yup from "yup";

import { updateProfile } from "@/api/profileService";
import { useAuth } from "@/providers/AuthProvider";
import { updateProfileValidationSchema } from "@/utils/validationSchemas";

const EditProfile: React.FC = () => {
  const { profile, updateProfileData } = useAuth();

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
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f3f4f6" }}>
      <TouchableOpacity onPress={handleChangeAvatar}>
        <Image
          source={{ uri: avatarUrl || "https://via.placeholder.com/150" }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            marginBottom: 20,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          padding: 10,
          marginBottom: 2,
          fontSize: 18,
          color: "#000",
        }}
        placeholder="Username"
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
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          padding: 10,
          marginBottom: 2,
          fontSize: 18,
          color: "#000",
        }}
        placeholder="Full name"
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
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          padding: 10,
          marginBottom: 2,
          fontSize: 18,
          color: "#000",
        }}
        placeholder="Website"
        placeholderTextColor="#6B7280"
        value={website}
        onChangeText={setWebsite}
      />
      {getFieldError("website") && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {getFieldError("website")}
        </Text>
      )}
      <Button title="Save" onPress={handleSaveProfile} />
      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              padding: 10,
              marginBottom: 20,
              fontSize: 18,
              color: "#000",
            }}
            placeholder="Avatar URL"
            placeholderTextColor="#6B7280"
            value={avatarUrl}
            onChangeText={setAvatarUrl}
          />
          <Button title="Save Avatar URL" onPress={handleModalClose} />
          <Button title="Cancel" onPress={handleModalClose} />
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
