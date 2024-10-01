// Define the type for education object
type EducationType = {
  class10School?: string;
  class10Board?: string;
  class10Grade?: Number;
  class12College?: string;
  class12Board?: string;
  class12Grade?: Number;
  underGraduateCollege?: string;
  underGraduateDegree?: string;
  underGraduateGPA?: Number;
  postGraduateCollege?: string;
  postGraduateDegree?: string;
  postGraduateGPA?: Number;
};

export type ExperienceObjectType = {
  company_name: string;
  description: string;
  duration: {
    from: string;
    to: string;
  };
  job_role: string;
};
export type AwardObjectType = {
  award_name: string;
  awarding_organization: string;
  date_of_achievement: string;
  description: string;
};
export type CourseObjectType = {
  course_name: string;
  organization: string;
  duration: {
    from: string;
    to: string;
  };
  description: string;
};
export type ProjectObjectType = {
  project_name: string;
  project_url: string;
  duration: {
    from: string;
    to: string;
  };
  description: string;
};
// Define the type for personal details object
type PersonalDetailsType = {
  name: string;
  email: string;
  location: string;
  profession: string;
  imageUrl: string;
  phoneNumber: string;
  years_of_experience: string;
};

type AchievementsObjectType = {
  awards: AwardObjectType[] | [];
  courses: CourseObjectType[] | [];
  projects: ProjectObjectType[] | [];
};

// Main data type with personal details and education
export type Cv_resoponse_type = {
  _id: string;
  personalDetails: PersonalDetailsType;
  education: EducationType;
  experience: ExperienceObjectType[] | [];
  skills: string[] | [];
  achievements: AchievementsObjectType;
  profile_summary: string;
};
