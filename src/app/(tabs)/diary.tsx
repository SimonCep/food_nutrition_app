import React from "react";
import { View, FlatList } from "react-native";
import { useColorScheme } from "nativewind";
import ExerciseTab from "@/components/ExerciseSection";
import { useAuth } from "@/providers/AuthProvider";
import { lightColorsExercise, darkColorsExercise } from "@/constants/Colors";

const Diary = () => {
  const { session } = useAuth();
  const { colorScheme } = useColorScheme();
  const colors =
    colorScheme === "dark" ? darkColorsExercise : lightColorsExercise;

  const renderExerciseSection = () => (
    <ExerciseTab userId={session?.user?.id ?? ""} />
  );

  return (
    <View className={`flex-1 ${colors.background}`}>
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={session && session.user && renderExerciseSection()}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={() => "diary"}
      />
    </View>
  );
};

export default Diary;
