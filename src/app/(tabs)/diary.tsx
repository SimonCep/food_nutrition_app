import React, { useState } from "react";
import { FlatList, Modal, View } from "react-native";
import { useColorScheme } from "nativewind";
import "../../../global.css"; // For Tailwind CSS styles. XDDDD

import ExerciseSection from "@/components/exercise/ExerciseSection";
import WaterSection from "@/components/water/WaterSection";
import DatePicker from "@/components/DatePicker";
import { useAuth } from "@/providers/AuthProvider";
import { darkColorsDiary, lightColorsDiary } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "@/components/Themed";
import { Button } from "react-native-elements";
import CameraComponent from "../../components/camera/Camera";
import IconButton from "@/components/buttons/IconButton";
import { TabBarIcon } from "./_layout";
const Diary = () => {
  const { session } = useAuth();
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderExerciseSection = () => (
    <ExerciseSection
      userId={session?.user?.id ?? ""}
      selectedDate={selectedDate}
    />
  );

  const renderWaterSection = () => (
    <WaterSection
      userId={session?.user?.id ?? ""}
      selectedDate={selectedDate}
    />
  );

  const renderButton = () => (
    <IconButton
      className="mb-5 mt-auto border"
      iconName="camera"
      onPress={() => {
        setCameraOpen(true);
      }}
      iconColor="dark"
    >
      Picture Your Food!
    </IconButton>
  );

  const [isCameraOpen, setCameraOpen] = useState(false);
  const openCameraModal = () => {
    console.log("zaza");
  };
  console.log(isCameraOpen);
  return (
    <View className={`flex-1 ${colors.background}`}>
      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={
          session?.user && (
            <>
              {renderExerciseSection()}
              {renderWaterSection()}
              {renderButton()}
            </>
          )
        }
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={() => "diary"}
      />

      <Modal className="" visible={isCameraOpen}>
        <View className="flex-1 ">
          <CameraComponent setCameraOff={() => setCameraOpen(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Diary;
