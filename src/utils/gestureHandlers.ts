import { Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

export const longPressGesture = (
  exerciseId: number,
  setHoldingExerciseId: (exerciseId: number | null) => void,
  handleLongPress: (exerciseId: number) => void,
) =>
  Gesture.LongPress()
    .onStart(() => {
      runOnJS(setHoldingExerciseId)(exerciseId);
      runOnJS(handleLongPress)(exerciseId);
    })
    .onEnd(() => {
      runOnJS(setHoldingExerciseId)(null);
    });

export const pressGesture = (
  exerciseId: number,
  setHoldingExerciseId: (exerciseId: number | null) => void,
  handlePress: (exerciseId: number) => void,
) =>
  Gesture.Tap()
    .onStart(() => {
      runOnJS(setHoldingExerciseId)(exerciseId);
    })
    .onEnd(() => {
      runOnJS(handlePress)(exerciseId);
    });
