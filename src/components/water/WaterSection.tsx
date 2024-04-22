import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useColorScheme } from "nativewind";
import { GestureDetector } from "react-native-gesture-handler";
import * as Yup from "yup";

import WaterForm from "@/components/water/WaterForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { Tables, WaterConsumption, WaterSectionProps } from "@/types";
import {
  addWaterConsumption,
  deleteWaterConsumption,
  fetchWaterConsumption,
  updateWaterConsumption,
} from "@/api/waterService";
import { darkColorsDiary, lightColorsDiary } from "@/constants/Colors";
import { addWaterConsumptionValidationSchema } from "@/utils/validationSchemas";
import { longPressGesture, pressGesture } from "@/utils/gestureHandlers";
import { filterWaterConsumptionByDate } from "@/utils/waterUtils";

const WaterSection: React.FC<WaterSectionProps> = ({
  userId,
  selectedDate,
}) => {
  const [waterConsumption, setWaterConsumption] = useState<WaterConsumption[]>(
    [],
  );
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === "dark" ? darkColorsDiary : lightColorsDiary;
  const [validationErrors, setValidationErrors] =
    useState<Yup.ValidationError | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [holdingRecordId, setHoldingRecordId] = useState<number | null>(null);
  const [editingRecord, setEditingRecord] = useState<WaterConsumption | null>(
    null,
  );

  useEffect(() => {
    fetchWaterConsumption(userId)
      .then((data) => {
        const filteredConsumption = filterWaterConsumptionByDate(
          data,
          selectedDate,
        );
        setWaterConsumption(filteredConsumption);
      })
      .catch((error) =>
        console.error("Error fetching water consumption:", error),
      );
  }, [userId, selectedDate, filterWaterConsumptionByDate]);

  const handleSaveConsumption = async () => {
    try {
      setIsLoading(true);
      await addWaterConsumptionValidationSchema.validate(
        { amount, unit },
        { abortEarly: false },
      );
      setValidationErrors(null);

      const formattedDate = selectedDate.toISOString();
      let success;
      if (editingRecord) {
        success = await updateWaterConsumption(
          editingRecord.id,
          amount,
          unit,
          formattedDate,
        );
      } else {
        success = await addWaterConsumption(
          amount,
          unit,
          userId,
          formattedDate,
        );
      }

      if (success) {
        setAmount(0);
        setUnit("");
        setIsFormVisible(false);
        setEditingRecord(null);
        setValidationErrors(null); // Clear validation errors on successful submission
        const data = await fetchWaterConsumption(userId);
        const filteredConsumption = filterWaterConsumptionByDate(
          data,
          selectedDate,
        );
        setWaterConsumption(filteredConsumption);
      } else {
        Alert.alert(
          "Error",
          `Failed to ${
            editingRecord ? "update" : "add"
          } water consumption. Please try again.`,
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors(error);
      } else {
        console.error("Error saving water consumption:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setValidationErrors(null); // Clear validation errors on form cancel
  };

  const handleDeleteRecord = async () => {
    if (selectedRecordId) {
      try {
        const success = await deleteWaterConsumption(selectedRecordId);
        if (success) {
          const data = await fetchWaterConsumption(userId);
          const filteredConsumption = filterWaterConsumptionByDate(
            data,
            selectedDate,
          );
          setWaterConsumption(filteredConsumption);
          setSelectedRecordId(null);
          setIsDeleteModalVisible(false);
        } else {
          Alert.alert(
            "Error",
            "Failed to delete water consumption. Please try again.",
          );
        }
      } catch (error) {
        console.error("Error deleting water consumption:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleOpenForm = (record?: WaterConsumption) => {
    if (record) {
      setEditingRecord(record);
      setAmount(record.amount);
      setUnit(record.unit);
    } else {
      setEditingRecord(null);
      setAmount(0);
      setUnit("ml");
    }
    setIsFormVisible(true);
    setValidationErrors(null);
  };

  const handleLongPress = (recordId: number) => {
    setSelectedRecordId(recordId);
    setIsDeleteModalVisible(true);
  };

  const handlePress = (recordId: number) => {
    const record = waterConsumption.find((item) => item.id === recordId);
    if (record) {
      setEditingRecord(record);
      setAmount(record.amount);
      setUnit(record.unit);
      setIsFormVisible(true);
    }
    setHoldingRecordId(null);
  };

  const renderWaterConsumptionItem = ({
    item,
  }: {
    item: Tables<"water_consumption">;
  }) => (
    <GestureDetector
      gesture={longPressGesture(item.id, setHoldingRecordId, handleLongPress)}
    >
      <GestureDetector
        gesture={pressGesture(item.id, setHoldingRecordId, handlePress)}
      >
        <View
          className={`${
            holdingRecordId === item.id
              ? colors.holdingBackground
              : colors.primaryBackground
          } mb-4 rounded-lg p-4 shadow-md`}
        >
          <Text className={`text-lg font-bold ${colors.primaryText}`}>
            Amount: {item.amount} {item.unit}
          </Text>
          <Text className={`${colors.secondaryText}`}>
            Consumed At: {new Date(item.consumed_at).toLocaleString()}
          </Text>
        </View>
      </GestureDetector>
    </GestureDetector>
  );

  return (
    <View className={`p-5 ${colors.background}`}>
      <View className={`${colors.primaryBackground} rounded-lg p-4 shadow-md`}>
        <Text className={`mb-2 text-xl font-bold ${colors.primaryText}`}>
          Water
        </Text>
        <View className={`border-b ${colors.border} mb-4`} />
        <FlatList
          data={waterConsumption}
          renderItem={renderWaterConsumptionItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
        <TouchableOpacity
          onPress={() => handleOpenForm()}
          className={`${colors.buttonBackground} rounded-full border-2 px-4 py-2 ${colors.buttonBorder} mb-4`}
        >
          <Text className={`${colors.buttonText} text-center font-bold`}>
            Add Water
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isFormVisible} animationType="slide">
        <WaterForm
          amount={amount}
          setAmount={setAmount}
          unit={unit}
          setUnit={setUnit}
          onSubmit={handleSaveConsumption}
          onCancel={handleCancelForm}
          isLoading={isLoading}
          validationErrors={validationErrors}
          isEditing={!!editingRecord}
        />
      </Modal>
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onDelete={handleDeleteRecord}
        colors={colors}
        recordType="water"
      />
    </View>
  );
};

export default WaterSection;
