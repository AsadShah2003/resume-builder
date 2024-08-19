"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "@/app/Context/store";
import LeftSidebar from "@/components/editor/LeftSidebar";
import ResumePreview from "@/components/editor/ResumePreview";
import { ImSpinner3 } from "react-icons/im";

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
  } = useGlobalContext();

  useEffect(() => {
    const fetchCVToShow = async () => {
      try {
        if (currCV === undefined) {
          push("/");
          return;
        }

        const req = await axios.get(`/api/cvs/getCV/${user?.authorID}`);
        const res = req.data;

        if (!res.hasOwnProperty("cvs")) {
          push("/");
          return;
        }

        const resumeID = params.split("/")[2].toString();
        const toShow = res.cvs.find((cv: any) => cv.resumeID === resumeID);

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
