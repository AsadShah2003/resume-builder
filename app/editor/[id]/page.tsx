"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useResumeStore } from "@/lib/store/useResumeStore";
import dynamic from 'next/dynamic';
import LeftSidebar from "@/components/editor/LeftSidebar";
import { ImSpinner3 } from "react-icons/im";

const ResumePreview = dynamic(() => import("@/components/editor/ResumePreview"), {
  ssr: false,
});

const EditorPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { push } = useRouter();
  const params = usePathname();
  const {
    user,
    setResumeFontSize,
    setEducation,
    setWorkExperiece,
    setActiveTemplate,
    setSocialLinks,
    setPersonalProfile,
    setLanguages,
    setSkills,
    currCV,
    setCurrCV,
    setPersonalDetails,
    allResumes
  } = useResumeStore();

  useEffect(() => {
    const fetchCVToShow = () => {
      try {
        const resumeID = params.split("/")[2].toString();
        const toShow = allResumes.find((cv: any) => cv.resumeID === resumeID);

        if (toShow) {
          setActiveTemplate(toShow.cvData.selectedTemplate);

          setPersonalDetails({
            fname: toShow.cvData.fname || "",
            lname: toShow.cvData.lname || "",
            role: toShow.cvData.role || "",
            address: toShow.cvData.address || "",
            phone: toShow.cvData.phone || "",
            email: toShow.cvData.email || "",
          });

          setEducation(toShow.cvData.education || []);
          setWorkExperiece(toShow.cvData.workExperience || []);
          setLanguages(toShow.cvData.languages || []);
          setSocialLinks(toShow.cvData.socialLinks || []);
          setSkills(toShow.cvData.skills || []);
          setResumeFontSize(toShow.cvData.resumeFontSize || 1);
          setPersonalProfile(toShow.cvData.personalProfile);

          setCurrCV({
            resumeID: resumeID,
            createdAt: toShow.createdAt,
            cvData: {
              selectedTemplate: toShow.cvData.selectedTemplate,
              selectedFontSize: toShow.cvData.resumeFontSize,
              personalProfile: toShow.cvData.personalProfile,
              fname: toShow.cvData.fname || "",
              lname: toShow.cvData.lname || "",
              role: toShow.cvData.role || "",
              address: toShow.cvData.address || "",
              phone: toShow.cvData.phone || "",
              email: toShow.cvData.email || "",
              education: toShow.cvData.education || [],
              workExperience: toShow.cvData.workExperience || [],
              languages: toShow.cvData.languages || [],
              socialLinks: toShow.cvData.socialLinks || [],
              skills: toShow.cvData.skills || [],
            },
          });

          setIsLoading(false);
        } else {
          push("/");
        }
      } catch (error) {
        console.error("Error fetching CV:", error);
        push("/");
      }
    };

    fetchCVToShow();

    return () => {
      setActiveTemplate("");
      setPersonalDetails({
        fname: "",
        lname: "",
        role: "",
        address: "",
        phone: "",
        email: "",
      });

      setEducation([]);
      setWorkExperiece([]);
      setLanguages([]);
      setSocialLinks([]);
      setSkills([]);
      setResumeFontSize(1);
      setPersonalProfile("");
    };
  }, []);

  if (isLoading) {
    return (
      <div className="z-[3000] min-h-screen w-full flex justify-center items-center">
        <ImSpinner3 size={30} className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <LeftSidebar />
      <div className="flex-[1]">
        <ResumePreview />
      </div>
    </>
  );
};

export default EditorPage;
