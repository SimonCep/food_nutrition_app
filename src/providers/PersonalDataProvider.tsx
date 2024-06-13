import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

import { PersonalDataContextType } from "@/types";

const PersonalDataContext = createContext<PersonalDataContextType>({
  height: 0,
  setHeight: () => {},
  weight: 0,
  setWeight: () => {},
  age: 0,
  setAge: () => {},
  gender: "",
  setGender: () => {},
  healthIssues: [],
  setHealthIssues: () => {},
  dietaryGoals: "",
  setDietaryGoals: () => {},
  shouldRefreshPersonalData: false,
  refreshPersonalData: () => {},
});

const PersonalDataProvider = ({ children }: Readonly<PropsWithChildren>) => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  const [dietaryGoals, setDietaryGoals] = useState("");
  const [shouldRefreshPersonalData, setShouldRefreshPersonalData] =
    useState(false);

  const refreshPersonalData = () => {
    setShouldRefreshPersonalData((prevValue) => !prevValue);
  };

  const contextValue = useMemo(
    () => ({
      height,
      setHeight,
      weight,
      setWeight,
      age,
      setAge,
      gender,
      setGender,
      healthIssues,
      setHealthIssues,
      dietaryGoals,
      setDietaryGoals,
      shouldRefreshPersonalData,
      refreshPersonalData,
    }),
    [
      height,
      weight,
      age,
      gender,
      healthIssues,
      dietaryGoals,
      shouldRefreshPersonalData,
    ],
  );

  return (
    <PersonalDataContext.Provider value={contextValue}>
      {children}
    </PersonalDataContext.Provider>
  );
};

export default PersonalDataProvider;

export const usePersonalDataContext = () => useContext(PersonalDataContext);
