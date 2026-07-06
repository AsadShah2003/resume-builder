//All type related to EditorPage
export type typeUser = {
  authorID?: number;
};

export type typeEditorActiveTab = {
  activeTab: string;
};
export type typePersonalDetails = {
  fname?: string;
  lname?: string;
  role?: string;
  address?: string;
  phone?: string;
  email?: string;
};
export type typeSocialMediaLinks = {
  id: number;
  platform: string;
  link: string;
};
export type typeSkills = {
  id: number;
  title: string;
};
export type typeWorkExperience = {
  id: number;
  jobTitle: string;
  jobCompany: string;
  jobStartDate: string;
  jobEndDate?: string | null;
  isStillWorking?: boolean | null;
  jobSummary: string;
};
export type typeEducation = {
  id: number;
  educationInstitute: string;
  educationDegree: string;
  educationStartDate: string;
  educationEndDate?: string;
  isStillStudying?: boolean | null;
};
export type typeLanguage = {
  id: number;
  language: string;
};

// FOR API
export type typeCVData = {
  fname: String | null;
  lname: String | null;
  role: String | null;
  address: String | null;
  phone: String | null;
  email: String | null;
  socialLinks: typeSocialMediaLinks | typeSocialMediaLinks[] | null;
  skills: typeSkills | typeSkills[] | null;
  workExperiences: typeWorkExperience | typeWorkExperience[] | null;
  educations: typeEducation | typeEducation[] | null;
  languages: typeLanguage | typeLanguage[] | null;
  selectedTemplate: String | null;
  selectedFontSize: String | null;
};

//For Adding/Updating things like links etc
export type typeShowElements = {
  allowSocialLinkToShow: boolean;
  allowSkillsToShow: boolean;
  allowLangsToShow: boolean;
  allowExpToShow: boolean;
  allowEduToShow: boolean;
};

//For education input error
export type typeEduError = {
  isInstituteEmpty: boolean;
  isDegreeEmpty: boolean;
  isStartDateEmpty: boolean;
  isEndDateEmpty: boolean;
};
//For work experience input error
export type typeExpError = {
  isJobTitleEmpty: boolean;
  isJobCompanyEmpty: boolean;
  isJobStartDateEmpty: boolean;
  isJobEndDateEmpty: boolean;
  isJobSummaryEmpty: boolean;
};
