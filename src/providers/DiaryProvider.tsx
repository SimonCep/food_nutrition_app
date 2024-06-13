import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

import { DiaryContextType } from "@/types";

const DiaryContext = createContext<DiaryContextType>({
  waterUpdated: false,
  setWaterUpdated: () => {},
  exerciseUpdated: false,
  setExerciseUpdated: () => {},
  foodUpdated: false,
  setFoodUpdated: () => {},
  shouldRefreshCalories: false,
  refreshCalories: () => {},
  shouldRefreshWater: false,
  refreshWater: () => {},
  shouldRefreshExercises: false,
  refreshExercises: () => {},
  shouldRefreshFood: false,
  refreshFood: () => {},
});

const DiaryProvider = ({ children }: Readonly<PropsWithChildren>) => {
  const [waterUpdated, setWaterUpdated] = useState(false);
  const [exerciseUpdated, setExerciseUpdated] = useState(false);
  const [foodUpdated, setFoodUpdated] = useState(false);
  const [shouldRefreshCalories, setShouldRefreshCalories] = useState(false);
  const [shouldRefreshWater, setShouldRefreshWater] = useState(false);
  const [shouldRefreshExercises, setShouldRefreshExercises] = useState(false);
  const [shouldRefreshFood, setShouldRefreshFood] = useState(false);

  const refreshCalories = () => {
    setShouldRefreshCalories((prevValue) => !prevValue);
  };

  const refreshWater = () => {
    setShouldRefreshWater((prevValue) => !prevValue);
  };

  const refreshExercises = () => {
    setShouldRefreshExercises((prevValue) => !prevValue);
  };

  const refreshFood = () => {
    setShouldRefreshFood((prevValue) => !prevValue);
  };

  const contextValue = useMemo(
    () => ({
      waterUpdated,
      exerciseUpdated,
      foodUpdated,
      setWaterUpdated,
      setExerciseUpdated,
      setFoodUpdated,
      refreshCalories,
      shouldRefreshCalories,
      refreshWater,
      shouldRefreshWater,
      refreshExercises,
      shouldRefreshExercises,
      refreshFood,
      shouldRefreshFood,
    }),
    [
      waterUpdated,
      exerciseUpdated,
      foodUpdated,
      setWaterUpdated,
      setExerciseUpdated,
      setFoodUpdated,
      shouldRefreshCalories,
      shouldRefreshWater,
      shouldRefreshExercises,
      shouldRefreshFood,
    ],
  );

  return (
    <DiaryContext.Provider value={contextValue}>
      {children}
    </DiaryContext.Provider>
  );
};

export default DiaryProvider;

export const useDiaryContext = () => useContext(DiaryContext);
