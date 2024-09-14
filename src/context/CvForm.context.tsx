import React, { createContext, useContext, useState } from "react";

interface AppState {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const CvFomContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  return (
    <AppContext.Provider
      value={{ step, setStep, selectedSkills, setSelectedSkills }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useCvFromContext = (): AppState => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "Error:useCvFormContext must be used within CvFomContextProvider"
    );
  }

  return context;
};
