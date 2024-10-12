import React, { createContext, useContext, useState } from "react";

interface AppState {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
  skillError: string;
  setSkillError: React.Dispatch<React.SetStateAction<string>>;
  showSkillError: boolean;
  setSkillShowError: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const CvFomContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillError, setSkillError] = useState("");
  const [showSkillError, setSkillShowError] = useState(false);
  return (
    <AppContext.Provider
      value={{
        step,
        setStep,
        selectedSkills,
        setSelectedSkills,
        skillError,
        setSkillError,
        showSkillError,
        setSkillShowError,
      }}
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
