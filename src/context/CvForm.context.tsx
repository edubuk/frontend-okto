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
  educationVerifications: EducationVerificationsType;
  setEducationVerifications: React.Dispatch<
    React.SetStateAction<EducationVerificationsType>
  >;
  skillsVerification: SkillsVerificationType;
  setSkillsVerification: React.Dispatch<
    React.SetStateAction<SkillsVerificationType>
  >;
  AwardVerification: SkillsVerificationType;
  setAwardVerification: React.Dispatch<
    React.SetStateAction<SkillsVerificationType>
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
type EducationVerificationsType = {
  class10: {
    isSelfAttested?: boolean;
    proof?: string;
    mailStatus?: string;
  };
  class12: {
    isSelfAttested?: boolean;
    proof?: string;
    mailStatus?: string;
  };
  undergraduation: {
    isSelfAttested?: boolean;
    proof?: string;
    mailStatus?: string;
  };
  postgraduation: {
    isSelfAttested?: boolean;
    proof?: string;
    mailStatus?: string;
  };
};
type VerificationType = {
  isSelfAttested: boolean;
  proof: string;
  mailStatus: string;
};

type SkillsVerificationType = {
  [key: string]: VerificationType;
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
  const [educationVerifications, setEducationVerifications] =
    useState<EducationVerificationsType>({
      class10: {
        isSelfAttested: false,
        proof: "",
        mailStatus: "",
      },
      class12: {
        isSelfAttested: false,
        proof: "",
        mailStatus: "",
      },
      undergraduation: {
        isSelfAttested: false,
        proof: "",
        mailStatus: "",
      },
      postgraduation: {
        isSelfAttested: false,
        proof: "",
        mailStatus: "",
      },
    });
  const [skillsVerification, setSkillsVerification] =
    useState<SkillsVerificationType>({});
  const [AwardVerification, setAwardVerification] =
    useState<SkillsVerificationType>({});
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
        educationVerifications,
        setEducationVerifications,
        skillsVerification,
        setSkillsVerification,
        AwardVerification,
        setAwardVerification,
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
