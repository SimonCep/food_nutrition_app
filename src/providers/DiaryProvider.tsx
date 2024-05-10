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
});

const DiaryProvider = ({ children }: Readonly<PropsWithChildren>) => {
  const [waterUpdated, setWaterUpdated] = useState(false);
  const [exerciseUpdated, setExerciseUpdated] = useState(false);
  const [foodUpdated, setFoodUpdated] = useState(false);
  const [shouldRefreshCalories, setShouldRefreshCalories] = useState(false);

  const refreshCalories = () => {
    setShouldRefreshCalories((prevValue) => !prevValue);
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
    }),
    [
      waterUpdated,
      exerciseUpdated,
      foodUpdated,
      setWaterUpdated,
      setExerciseUpdated,
      setFoodUpdated,
      shouldRefreshCalories,
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
