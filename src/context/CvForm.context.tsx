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
  // verifications;
  // step1;
  personalDetailsVerifications: PersonalVerificationsType;
  setPersonalDetailsVerifications: React.Dispatch<
    React.SetStateAction<PersonalVerificationsType>
  >;
}
type PersonalVerificationsType = {
  name: {
    isSelfAttested: boolean;
  };
  email: {
    isSelfAttested: boolean;
  };
  location: {
    isSelfAttested: boolean;
  };
  profession: {
    isSelfAttested: boolean;
  };
  imageUrl: {
    isSelfAttested: boolean;
  };
  phoneNumber: {
    isSelfAttested: boolean;
  };
};
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
  const [personalDetailsVerifications, setPersonalDetailsVerifications] =
    useState<PersonalVerificationsType>({
      name: {
        isSelfAttested: false,
      },
      email: {
        isSelfAttested: false,
      },
      location: {
        isSelfAttested: false,
      },
      profession: {
        isSelfAttested: false,
      },
      imageUrl: {
        isSelfAttested: false,
      },
      phoneNumber: {
        isSelfAttested: false,
      },
    });
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
        personalDetailsVerifications,
        setPersonalDetailsVerifications,
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
