"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import {
  typeSocialMediaLinks,
  typeSkills,
  typeWorkExperience,
  typeEducation,
  typeLanguage,
  typePersonalDetails,
  typeExpError,
  typeUser,
  typeShowElements,
  typeEduError,
} from "../../lib/types/editor";

interface ContextProps {
  //User object
  user: typeUser | null;
  setUser: Dispatch<SetStateAction<typeUser | null>>;
  //Active template - default template
  activeTemplate: string;
  setActiveTemplate: Dispatch<SetStateAction<string>>;
  //Active tab
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  //for personal details
  personalDetails: typePersonalDetails;
  setPersonalDetails: Dispatch<SetStateAction<typePersonalDetails>>;
  //for sociallinks section
  socialLinks: typeSocialMediaLinks[];
  setSocialLinks: Dispatch<SetStateAction<typeSocialMediaLinks[]>>;
  //for skills section
  skills: typeSkills[];
  setSkills: Dispatch<SetStateAction<typeSkills[]>>;
  //for personal profile
  personalProfile: string;
  setPersonalProfile: Dispatch<SetStateAction<string>>;
  //for workexperiece section
  workExperience: typeWorkExperience[];
  setWorkExperiece: Dispatch<SetStateAction<typeWorkExperience[]>>;
  //for education section
  education: typeEducation[];
  setEducation: Dispatch<SetStateAction<typeEducation[]>>;
  //for language section
  languages: typeLanguage[];
  setLanguages: Dispatch<SetStateAction<typeLanguage[]>>;
  //for highlighting the horizontal rules of the beingdraggedover div
  highlightHR: string;
  setHightlightHR: Dispatch<SetStateAction<string>>;
  //draggableSections
  draggableSecions: string[];
  setDraggableSections: Dispatch<SetStateAction<string[]>>;
  //selected image in resume preview
  selectedImage: string | null;
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
  //dynamically set the resume height based on content
  resumeHeight: number | undefined;
  setResumeHeight: Dispatch<SetStateAction<number | undefined>>;
  //for setting resume download state
  isCvBeingExported: boolean;
  setIsCvBeingExported: Dispatch<SetStateAction<boolean>>;
  //for hiding/unhiding profile image of cv
  hideProfileImage: boolean;
  setHideProfileImage: Dispatch<SetStateAction<boolean>>;
  //for setting font size
  resumeFontSize: number;
  setResumeFontSize: Dispatch<SetStateAction<number>>;
  //for template color
  templateColor: string;
  setTemplateColor: Dispatch<SetStateAction<string>>;
  //for storing curr cv data
  currCV: any;
  setCurrCV: Dispatch<SetStateAction<any>>;
  //for cv deletion
  cvDeleted: boolean;
  setCVDeleted: Dispatch<SetStateAction<boolean>>;
  //cv creation date
  cvCreationDate: string;
  setCvCreationDate: Dispatch<SetStateAction<string>>;
  ///should show link elem
  showElements: typeShowElements;
  setShowElements: Dispatch<SetStateAction<typeShowElements>>;
  //for handling empty inputs of workexp/error
  workExpErrors: typeExpError;
  setWorkExpErrors: Dispatch<SetStateAction<typeExpError>>;
  //for handling empty inputs of eduation
  eduErrors: typeEduError;
  setEduErrors: Dispatch<SetStateAction<typeEduError>>;
}

const GlobalContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  //Active template - default template
  activeTemplate: "",
  setActiveTemplate: (): string => "",
  //Active tab
  activeTab: "",
  setActiveTab: (): string => "",
  //personal details
  personalDetails: {},
  setPersonalDetails: () => {},
  //for sociallinks
  socialLinks: [],
  setSocialLinks: (): typeSocialMediaLinks[] => [],
  //for skills
  skills: [],
  setSkills: (): typeSkills[] => [],
  //for profile
  personalProfile: "",
  setPersonalProfile: (): string => "",
  //for work experience
  workExperience: [],
  setWorkExperiece: (): typeWorkExperience[] => [],
  //for storing education
  education: [],
  setEducation: (): typeEducation[] => [],
  //for storing languages
  languages: [],
  setLanguages: (): typeLanguage[] => [],
  //for storing on which section other section is being dragged over
  highlightHR: "",
  setHightlightHR: (): string => "",
  //draggable sections
  draggableSecions: [],
  setDraggableSections: (): string[] => [],
  //for storing image preview of resume preview
  selectedImage: null,
  setSelectedImage: (): string | null => null,
  //for setting dynamic height of resume
  resumeHeight: 0,
  setResumeHeight: (): number | undefined => undefined,
  //for setting loading state for downloading
  isCvBeingExported: false,
  setIsCvBeingExported: (): boolean => false,
  //for hide/unhiding profile image in cv
  hideProfileImage: false,
  setHideProfileImage: (): boolean => false,
  //for setting font size
  resumeFontSize: 0,
  setResumeFontSize: (): number => 0,
  //for template color
  templateColor: "",
  setTemplateColor: (): string => "",
  //for storing current resume data
  currCV: null,
  setCurrCV: (): any => null,
  //for updating resume after a cv deletion
  cvDeleted: false,
  setCVDeleted: (): boolean => false,
  //cv creation date
  cvCreationDate: "",
  setCvCreationDate: (): string => "",
  //for showing elements
  showElements: {
    allowSocialLinkToShow: false,
    allowSkillsToShow: false,
    allowLangsToShow: false,
    allowExpToShow: false,
    allowEduToShow: false,
  },
  setShowElements: () => ({
    allowSocialLinkToShow: false,
    allowSkillsToShow: false,
    allowLangsToShow: false,
    allowExpToShow: false,
    allowEduToShow: false,
  }),
  //for handling empty inputs of workexp/error
  workExpErrors: {
    isJobTitleEmpty: false,
    isJobCompanyEmpty: false,
    isJobStartDateEmpty: false,
    isJobEndDateEmpty: false,
    isJobSummaryEmpty: false,
  },
  setWorkExpErrors: () => ({
    isJobTitleEmpty: false,
    isJobCompanyEmpty: false,
    isJobStartDateEmpty: false,
    isJobEndDateEmpty: false,
    isJobSummaryEmpty: false,
  }),

  eduErrors: {
    isDegreeEmpty: false,
    isEndDateEmpty: false,
    isInstituteEmpty: false,
    isStartDateEmpty: false,
  },
  setEduErrors: () => ({
    isDegreeEmpty: false,
    isEndDateEmpty: false,
    isInstituteEmpty: false,
    isStartDateEmpty: false,
  }),
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<typeUser | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<string>("template1");
  const [activeTab, setActiveTab] = useState<string>("Editor");
  const [socialLinks, setSocialLinks] = useState<typeSocialMediaLinks[]>([]);
  const [skills, setSkills] = useState<typeSkills[]>([]);
  const [personalProfile, setPersonalProfile] = useState<string>("");
  const [workExperience, setWorkExperiece] = useState<typeWorkExperience[]>([]);
  const [education, setEducation] = useState<typeEducation[]>([]);
  const [languages, setLanguages] = useState<typeLanguage[]>([]);
  const [highlightHR, setHightlightHR] = useState<string>("");
  const [draggableSecions, setDraggableSections] = useState<string[]>([
    "sociallinks",
    "skills",
    "languages",
    "personalprofile",
    "workexperience",
    "education",
  ]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resumeHeight, setResumeHeight] = useState<number | undefined>(
    undefined
  );
  const [personalDetails, setPersonalDetails] = useState<typePersonalDetails>(
    {} // Initialize with default values or leave it empty based on your needs
  );
  const [isCvBeingExported, setIsCvBeingExported] = useState<boolean>(false);

  //for hiding cv profile image
  const [hideProfileImage, setHideProfileImage] = useState<boolean>(false);

  //for resume font size
  const [resumeFontSize, setResumeFontSize] = useState<number>(1);

  //for template color
  const [templateColor, setTemplateColor] = useState<string>("#145349");

  //for holding data for current working cv
  const [currCV, setCurrCV] = useState<any>();
  //for re-triggering a render in-case of cv deletion
  const [cvDeleted, setCVDeleted] = useState<boolean>(false);
  //cv creation date
  const [cvCreationDate, setCvCreationDate] = useState<string>("");
  const [showElements, setShowElements] = useState<typeShowElements>({
    allowSocialLinkToShow: true,
    allowSkillsToShow: true,
    allowLangsToShow: true,
    allowExpToShow: true,
    allowEduToShow: true,
  });

  const [workExpErrors, setWorkExpErrors] = useState<typeExpError>({
    isJobTitleEmpty: false,
    isJobCompanyEmpty: false,
    isJobStartDateEmpty: false,
    isJobEndDateEmpty: false,
    isJobSummaryEmpty: false,
  });

  const [eduErrors, setEduErrors] = useState<typeEduError>({
    isDegreeEmpty: false,
    isEndDateEmpty: false,
    isInstituteEmpty: false,
    isStartDateEmpty: false,
  });

  return (
    <GlobalContext.Provider
      value={{
        showElements,
        setShowElements,
        cvCreationDate,
        setCvCreationDate,
        cvDeleted,
        setCVDeleted,
        user,
        setUser,
        activeTemplate,
        setActiveTemplate,
        activeTab,
        setActiveTab,
        socialLinks,
        setSocialLinks,
        skills,
        setSkills,
        personalProfile,
        setPersonalProfile,
        workExperience,
        setWorkExperiece,
        education,
        setEducation,
        languages,
        setLanguages,
        highlightHR,
        setHightlightHR,
        draggableSecions,
        setDraggableSections,
        personalDetails,
        setPersonalDetails,
        selectedImage,
        setSelectedImage,
        resumeHeight,
        setResumeHeight,
        isCvBeingExported,
        setIsCvBeingExported,
        hideProfileImage,
        setHideProfileImage,
        resumeFontSize,
        setResumeFontSize,
        templateColor,
        setTemplateColor,
        currCV,
        setCurrCV,
        workExpErrors,
        setWorkExpErrors,
        eduErrors,
        setEduErrors,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
