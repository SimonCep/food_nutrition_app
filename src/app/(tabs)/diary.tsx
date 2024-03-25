import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import ExerciseForm from "@/components/ExerciseForm";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";

const addExercise = async (
  exercise: string,
  duration: number,
  calories: number,
  userId: string,
  setIsLoading: (isLoading: boolean) => void,
  onSuccess: () => void,
) => {
  try {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("exercises")
      .insert({ exercise, duration, calories, user_id: userId });
    if (error) {
      throw error;
    }
    onSuccess();
  } catch (error) {
    console.error("Error adding exercise:", error);
    Alert.alert("Error", "An error occurred while adding the exercise.");
  } finally {
    setIsLoading(false);
  }
};

export default function Diary() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState(0);
  const [calories, setCalories] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("user_id", session?.user?.id)
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      Alert.alert("Error", "An error occurred while fetching exercises.");
    }
  };

  const handleAddExercise = () => {
    addExercise(
      exercise,
      duration,
      calories,
      session?.user?.id || "",
      setIsLoading,
      () => {
        setExercise("");
        setDuration(0);
        setCalories(0);
        setIsFormVisible(false);
        fetchExercises();
      },
    );
  };

  const renderExerciseItem = ({ item }: { item: any }) => (
    <View className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <Text className="text-lg font-bold text-black dark:text-white">
        {item.exercise}
      </Text>
      <Text className="text-gray-500 dark:text-gray-400">
        Duration: {item.duration} minutes
      </Text>
      <Text className="text-gray-500 dark:text-gray-400">
        Calories Burned: {item.calories}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 p-6 bg-gray-100 dark:bg-black">
      <View className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <Text className="text-xl font-bold mb-2 text-black dark:text-white">
          Exercise
        </Text>
        <View className="border-b border-gray-300 dark:border-gray-600 mb-4" />
        <FlatList
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
        <TouchableOpacity
          onPress={() => setIsFormVisible(true)}
          className="bg-yellow-400 dark:bg-yellow-600 py-2 px-4 rounded-full border-2 border-black dark:border-white mb-4"
        >
          <Text className="text-black dark:text-white font-bold text-center">
            Add Exercise
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isFormVisible} animationType="slide">
        <ExerciseForm
          exercise={exercise}
          setExercise={setExercise}
          duration={duration}
          setDuration={setDuration}
          calories={calories}
          setCalories={setCalories}
          onAddExercise={handleAddExercise}
          onCancel={() => setIsFormVisible(false)}
          isLoading={isLoading}
        />
      </Modal>
    </View>
  );
}
