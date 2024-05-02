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
});

const DiaryProvider = ({ children }: Readonly<PropsWithChildren>) => {
  const [waterUpdated, setWaterUpdated] = useState(false);
  const [exerciseUpdated, setExerciseUpdated] = useState(false);
  const [foodUpdated, setFoodUpdated] = useState(false);

  const contextValue = useMemo(
    () => ({
      waterUpdated,
      exerciseUpdated,
      foodUpdated,
      setWaterUpdated,
      setExerciseUpdated,
      setFoodUpdated,
    }),
    [waterUpdated, exerciseUpdated, foodUpdated],
  );

  return (
    <DiaryContext.Provider value={contextValue}>
      {children}
    </DiaryContext.Provider>
  );
};

export default DiaryProvider;

export const useDiaryContext = () => useContext(DiaryContext);
