import { Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

export const longPressGesture = (
  itemId: number,
  setHoldingItemId: (itemId: number | null) => void,
  handleLongPress: (itemId: number) => void,
) =>
  Gesture.LongPress()
    .onStart(() => {
      runOnJS(setHoldingItemId)(itemId);
      runOnJS(handleLongPress)(itemId);
    })
    .onEnd(() => {
      runOnJS(setHoldingItemId)(null);
    });

export const pressGesture = (
  itemId: number,
  setHoldingItemId: (itemId: number | null) => void,
  handlePress: (itemId: number) => void,
) =>
  Gesture.Tap()
    .maxDistance(10)
    .maxDuration(500)
    .onStart(() => {
      runOnJS(setHoldingItemId)(itemId);
    })
    .onEnd(() => {
      runOnJS(handlePress)(itemId);
    });
