import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import { darkColorsExercise, lightColorsExercise } from "@/constants/Colors";
import { DatePickerProps } from "@/types";

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsExercise : lightColorsExercise;
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (_event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      onDateChange(date);
    }
  };

  const handleArrowPress = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    onDateChange(newDate);
  };

  return (
    <View className="flex-row items-center justify-between px-6 py-4">
      <TouchableOpacity
        onPress={() => handleArrowPress(-1)}
        className={`rounded-full p-2`}
      >
        <Ionicons name="chevron-back" size={24} color={colors.arrowColor} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className={`rounded-lg px-4 py-2 shadow-md ${colors.datePickerBackground}`}
      >
        <Text className={`${colors.datePickerText} text-lg font-bold`}>
          {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleArrowPress(1)}
        className={`rounded-full p-2`}
      >
        <Ionicons name="chevron-forward" size={24} color={colors.arrowColor} />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          textColor={colors.datePickerText}
        />
      )}
    </View>
  );
};

export default DatePicker;
