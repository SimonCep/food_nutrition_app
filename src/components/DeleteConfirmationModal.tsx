import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { DeleteConfirmationModalProps } from "@/types";
import { useTranslation } from "react-i18next";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onCancel,
  onDelete,
  colors,
  recordType,
}) => {
  const { t } = useTranslation();
  const getHeadingText = () => {
    switch (recordType) {
      case "exercise":
        return t("DELETEexercise");
      case "water":
        return t("DELETEwater");
      case "food":
        return t("DELETEfood");
      default:
        return t("DELETErecord");
    }
  };

  const getBodyText = () => {
    switch (recordType) {
      case "exercise":
        return t("DELETEexerconf");
      case "water":
        return t("DELETEwaterconf");
      case "food":
        return t("DELETEfoodconf");
      default:
        return t("DELETErecordconf");
    }
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View className="flex-1 items-center justify-center bg-black/40 px-4">
        <View
          className={`${colors.modalBackground} w-full max-w-md rounded-lg p-6 shadow-md`}
        >
          <Text className={`${colors.modalText} mb-4 text-lg font-bold`}>
            {getHeadingText()}
          </Text>
          <Text className={`${colors.modalText} mb-4`}>{getBodyText()}</Text>
          <View className="flex-row justify-end">
            <TouchableOpacity
              onPress={onCancel}
              className={`${colors.cancelButtonBackground} rounded-full border-2 px-4 py-2 ${colors.cancelButtonBorder} mr-2`}
            >
              <Text className={`${colors.cancelButtonText} font-bold`}>
                {t("DELETEcancel")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              className={`${colors.deleteButtonBackground} rounded-full border-2 px-4 py-2 ${colors.deleteButtonBorder}`}
            >
              <Text className={`${colors.deleteButtonText} font-bold`}>
                {t("DELETEdelete")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;
