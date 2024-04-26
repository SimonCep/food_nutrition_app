import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  View as DefaultView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { TouchableOpacity } from "react-native";
import IconButton from "../buttons/IconButton";

interface IProps {
  // isCameraOn: boolean;
  setCameraOff: () => void;
}
export default function CameraComponent(props: IProps) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [photo, setPhoto] = useState<PhotoFile>();
  const camera = useRef<Camera>(null);
  const [isFlashOn, setFlashOn] = useState(false);

  const device = useCameraDevice("back");

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (!hasPermission) return <ActivityIndicator />;
  if (!device) {
    return <Text>NO CAMERA</Text>;
  }
  const [isClosed, setClosed] = useState(false);
  const handlePicture = async () => {
    const photo = await camera.current?.takePhoto();
    setPhoto(photo);
    console.log(photo);
  };
  return (
    <View className="flex-1">
      {photo ? (
        <View className="" style={StyleSheet.absoluteFill}>
          <Image
            source={{ uri: "file://" + photo.path }}
            style={StyleSheet.absoluteFill}
          />
          <IconButton
            iconName="close"
            onPress={() => props.setCameraOff()}
            iconColor="white"
            className=" ml-auto mr-0 w-20 bg-transparent"
          ></IconButton>
          <View className=" mb-5 mt-auto flex flex-row gap-x-3 bg-transparent">
            <IconButton
              onPress={() => props.setCameraOff()}
              className=" ml-auto mr-0 w-1/2 bg-gray-400"
              iconColor="dark"
            >
              Retry
            </IconButton>
            <IconButton
              iconName="send"
              onPress={() => props.setCameraOff()}
              className="ml-auto mr-0 w-1/2 bg-blue-400"
              iconColor="white"
            >
              Save
            </IconButton>
          </View>
        </View>
      ) : (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            ref={camera}
            photo={true}
          />
          <View className="mb-5 mt-auto flex  flex-row">
            <TouchableOpacity className="w-1/3 flex-row bg-transparent">
              <IconButton
                className="w-20 bg-transparent"
                iconName="arrow-left"
                onPress={() => props.setCameraOff()}
                iconColor="dark"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mx-auto flex w-20 flex-row rounded-full bg-green-200"
              onPress={() => handlePicture()}
            ></TouchableOpacity>
            <TouchableOpacity className="flex w-1/3 flex-row bg-transparent">
              {isFlashOn ? (
                <IconButton
                  className="w-20 bg-transparent"
                  iconName="flash"
                  iconColor="white"
                  onPress={() => setFlashOn(false)}
                />
              ) : (
                <IconButton
                  className="w-20 bg-transparent"
                  iconName="home"
                  iconColor="dark"
                  onPress={() => setFlashOn(true)}
                />
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
