import { create } from "zustand";
import { persist } from "zustand/middleware";
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
} from "../types/editor";

interface ResumeState {
  user: typeUser | null;
  setUser: (user: typeUser | null) => void;

  activeTemplate: string;
  setActiveTemplate: (template: string) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;

  personalDetails: typePersonalDetails;
  setPersonalDetails: (details: typePersonalDetails | ((prev: typePersonalDetails) => typePersonalDetails)) => void;

  socialLinks: typeSocialMediaLinks[];
  setSocialLinks: (links: typeSocialMediaLinks[] | ((prev: typeSocialMediaLinks[]) => typeSocialMediaLinks[])) => void;

  skills: typeSkills[];
  setSkills: (skills: typeSkills[] | ((prev: typeSkills[]) => typeSkills[])) => void;

  personalProfile: string;
  setPersonalProfile: (profile: string) => void;

  workExperience: typeWorkExperience[];
  setWorkExperiece: (exp: typeWorkExperience[] | ((prev: typeWorkExperience[]) => typeWorkExperience[])) => void;

  education: typeEducation[];
  setEducation: (edu: typeEducation[] | ((prev: typeEducation[]) => typeEducation[])) => void;

  languages: typeLanguage[];
  setLanguages: (langs: typeLanguage[] | ((prev: typeLanguage[]) => typeLanguage[])) => void;

  highlightHR: string;
  setHightlightHR: (hr: string) => void;

  draggableSecions: string[];
  setDraggableSections: (sections: string[] | ((prev: string[]) => string[])) => void;

  selectedImage: string | null;
  setSelectedImage: (img: string | null) => void;

  resumeHeight: number | undefined;
  setResumeHeight: (height: number | undefined) => void;

  isCvBeingExported: boolean;
  setIsCvBeingExported: (isExporting: boolean) => void;

  hideProfileImage: boolean;
  setHideProfileImage: (hide: boolean | ((prev: boolean) => boolean)) => void;

  resumeFontSize: number;
  setResumeFontSize: (size: number) => void;

  templateColor: string;
  setTemplateColor: (color: string) => void;

  currCV: any;
  setCurrCV: (cv: any) => void;

  cvDeleted: boolean;
  setCVDeleted: (deleted: boolean) => void;

  cvCreationDate: string;
  setCvCreationDate: (date: string) => void;

  showElements: typeShowElements;
  setShowElements: (elements: typeShowElements | ((prev: typeShowElements) => typeShowElements)) => void;

  workExpErrors: typeExpError;
  setWorkExpErrors: (errors: typeExpError | ((prev: typeExpError) => typeExpError)) => void;

  eduErrors: typeEduError;
  setEduErrors: (errors: typeEduError | ((prev: typeEduError) => typeEduError)) => void;

  // Additional state to hold multiple resumes for the user
  allResumes: any[];
  setAllResumes: (resumes: any[] | ((prev: any[]) => any[])) => void;
  
  // Custom actions
  saveCurrentResume: () => void;
  deleteResume: (id: string) => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),

      activeTemplate: "template1",
      setActiveTemplate: (activeTemplate) => set({ activeTemplate }),

      activeTab: "Editor",
      setActiveTab: (activeTab) => set({ activeTab }),

      personalDetails: {},
      setPersonalDetails: (details) => 
        set((state) => ({ 
          personalDetails: typeof details === 'function' ? details(state.personalDetails) : details 
        })),

      socialLinks: [],
      setSocialLinks: (links) => 
        set((state) => ({ 
          socialLinks: typeof links === 'function' ? links(state.socialLinks) : links 
        })),

      skills: [],
      setSkills: (skills) => 
        set((state) => ({ 
          skills: typeof skills === 'function' ? skills(state.skills) : skills 
        })),

      personalProfile: "",
      setPersonalProfile: (personalProfile) => set({ personalProfile }),

      workExperience: [],
      setWorkExperiece: (exp) => 
        set((state) => ({ 
          workExperience: typeof exp === 'function' ? exp(state.workExperience) : exp 
        })),

      education: [],
      setEducation: (edu) => 
        set((state) => ({ 
          education: typeof edu === 'function' ? edu(state.education) : edu 
        })),

      languages: [],
      setLanguages: (langs) => 
        set((state) => ({ 
          languages: typeof langs === 'function' ? langs(state.languages) : langs 
        })),

      highlightHR: "",
      setHightlightHR: (highlightHR) => set({ highlightHR }),

      draggableSecions: [
        "sociallinks",
        "skills",
        "languages",
        "personalprofile",
        "workexperience",
        "education",
      ],
      setDraggableSections: (sections) => 
        set((state) => ({ 
          draggableSecions: typeof sections === 'function' ? sections(state.draggableSecions) : sections 
        })),

      selectedImage: null,
      setSelectedImage: (selectedImage) => set({ selectedImage }),

      resumeHeight: undefined,
      setResumeHeight: (resumeHeight) => set({ resumeHeight }),

      isCvBeingExported: false,
      setIsCvBeingExported: (isCvBeingExported) => set({ isCvBeingExported }),

      hideProfileImage: false,
      setHideProfileImage: (hide) => 
        set((state) => ({ 
          hideProfileImage: typeof hide === 'function' ? hide(state.hideProfileImage) : hide 
        })),

      resumeFontSize: 1,
      setResumeFontSize: (resumeFontSize) => set({ resumeFontSize }),

      templateColor: "#145349",
      setTemplateColor: (templateColor) => set({ templateColor }),

      currCV: null,
      setCurrCV: (currCV) => set({ currCV }),

      cvDeleted: false,
      setCVDeleted: (cvDeleted) => set({ cvDeleted }),

      cvCreationDate: "",
      setCvCreationDate: (cvCreationDate) => set({ cvCreationDate }),

      showElements: {
        allowSocialLinkToShow: true,
        allowSkillsToShow: true,
        allowLangsToShow: true,
        allowExpToShow: true,
        allowEduToShow: true,
      },
      setShowElements: (elements) => 
        set((state) => ({ 
          showElements: typeof elements === 'function' ? elements(state.showElements) : elements 
        })),

      workExpErrors: {
        isJobTitleEmpty: false,
        isJobCompanyEmpty: false,
        isJobStartDateEmpty: false,
        isJobEndDateEmpty: false,
        isJobSummaryEmpty: false,
      },
      setWorkExpErrors: (errors) => 
        set((state) => ({ 
          workExpErrors: typeof errors === 'function' ? errors(state.workExpErrors) : errors 
        })),

      eduErrors: {
        isDegreeEmpty: false,
        isEndDateEmpty: false,
        isInstituteEmpty: false,
        isStartDateEmpty: false,
      },
      setEduErrors: (errors) => 
        set((state) => ({ 
          eduErrors: typeof errors === 'function' ? errors(state.eduErrors) : errors 
        })),

      allResumes: [],
      setAllResumes: (resumes) => 
        set((state) => ({ 
          allResumes: typeof resumes === 'function' ? resumes(state.allResumes) : resumes 
        })),

      saveCurrentResume: () => {
        const state = get();
        if (!state.currCV?.resumeID) return;
        
        const newCvData = {
          selectedTemplate: state.activeTemplate,
          selectedFontSize: state.resumeFontSize,
          personalProfile: state.personalProfile,
          fname: state.personalDetails.fname || "",
          lname: state.personalDetails.lname || "",
          role: state.personalDetails.role || "",
          address: state.personalDetails.address || "",
          phone: state.personalDetails.phone || "",
          email: state.personalDetails.email || "",
          education: state.education,
          workExperience: state.workExperience,
          languages: state.languages,
          socialLinks: state.socialLinks,
          skills: state.skills,
        };

        const existingResumeIndex = state.allResumes.findIndex(r => r.resumeID === state.currCV.resumeID);
        const updatedResumes = [...state.allResumes];
        
        const resumeToSave = {
          resumeID: state.currCV.resumeID,
          createdAt: state.currCV.createdAt || new Date().toISOString(),
          cvData: newCvData
        };

        if (existingResumeIndex >= 0) {
          updatedResumes[existingResumeIndex] = resumeToSave;
        } else {
          updatedResumes.push(resumeToSave);
        }

        set({
          allResumes: updatedResumes,
          currCV: resumeToSave
        });
      },

      deleteResume: (id: string) => {
        const state = get();
        const updatedResumes = state.allResumes.filter(r => r.resumeID !== id);
        set({
          allResumes: updatedResumes,
          cvDeleted: !state.cvDeleted
        });
      }
    }),
    {
      name: "resume-storage",
      // only persist some parts of state that make sense
      partialize: (state) => ({
        allResumes: state.allResumes,
      }),
    }
  )
);
