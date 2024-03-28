import React, { useState } from "react";
import { View, Text, Image, TextInput, Button, TouchableOpacity, Modal } from "react-native";

const EditProfile: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [website, setWebsite] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newAvatarUrl, setNewAvatarUrl] = useState<string>("");

    const handleSaveProfile = () => {
        console.log("Profile saved!");
    };

    const handleChangeAvatar = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleAvatarUrlChange = () => {
        setAvatarUrl(newAvatarUrl);
        handleModalClose();
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "#f3f4f6" }}>
            <TouchableOpacity onPress={handleChangeAvatar}>
                <Image
                    source={{ uri: avatarUrl || "https://via.placeholder.com/150" }}
                    style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 20, alignSelf: "center" }}
                />
            </TouchableOpacity>
            <TextInput
                style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", padding: 10, marginBottom: 20, fontSize: 18, color: "#000" }}
                placeholder="Username"
                placeholderTextColor="#6B7280"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", padding: 10, marginBottom: 20, fontSize: 18, color: "#000" }}
                placeholder="Full name"
                placeholderTextColor="#6B7280"
                value={fullname}
                onChangeText={setFullname}
            />
            <TextInput
                style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", padding: 10, marginBottom: 20, fontSize: 18, color: "#000" }}
                placeholder="Website"
                placeholderTextColor="#6B7280"
                value={website}
                onChangeText={setWebsite}
            />
            <Button title="Save" onPress={handleSaveProfile} />
            <Modal visible={showModal} animationType="slide" onRequestClose={handleModalClose}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", padding: 10, marginBottom: 20, fontSize: 18, color: "#000" }}
                        placeholder="Avatar URL"
                        placeholderTextColor="#6B7280"
                        value={newAvatarUrl}
                        onChangeText={setNewAvatarUrl}
                    />
                    <Button title="Save Avatar URL" onPress={handleAvatarUrlChange} />
                    <Button title="Cancel" onPress={handleModalClose} />
                </View>
            </Modal>
        </View>
    );
};

export default EditProfile;
