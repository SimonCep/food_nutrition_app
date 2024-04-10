import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { DeleteConfirmationModalProps } from "@/types";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onCancel,
  onDelete,
  colors,
}) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View className="flex-1 items-center justify-center bg-black/40 px-4">
        <View
          className={`${colors.modalBackground} w-full max-w-md rounded-lg p-6 shadow-md`}
        >
          <Text className={`${colors.modalText} mb-4 text-lg font-bold`}>
            Delete Exercise
          </Text>
          <Text className={`${colors.modalText} mb-4`}>
            Are you sure you want to delete this exercise entry?
          </Text>
          <View className="flex-row justify-end">
            <TouchableOpacity
              onPress={onCancel}
              className={`${colors.cancelButtonBackground} rounded-full border-2 px-4 py-2 ${colors.cancelButtonBorder} mr-2`}
            >
              <Text className={`${colors.cancelButtonText} font-bold`}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              className={`${colors.deleteButtonBackground} rounded-full border-2 px-4 py-2 ${colors.deleteButtonBorder}`}
            >
              <Text className={`${colors.deleteButtonText} font-bold`}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;
