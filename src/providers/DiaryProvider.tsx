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
});

const DiaryProvider = ({ children }: Readonly<PropsWithChildren>) => {
  const [waterUpdated, setWaterUpdated] = useState(false);
  const [exerciseUpdated, setExerciseUpdated] = useState(false);

  const contextValue = useMemo(
    () => ({
      waterUpdated,
      exerciseUpdated,
      setWaterUpdated,
      setExerciseUpdated,
    }),
    [waterUpdated, exerciseUpdated],
  );

  return (
    <DiaryContext.Provider value={contextValue}>
      {children}
    </DiaryContext.Provider>
  );
};

export default DiaryProvider;

export const useDiaryContext = () => useContext(DiaryContext);
