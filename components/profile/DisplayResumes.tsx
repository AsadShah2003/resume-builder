"use client";
import React, { useEffect, useState } from "react";
import ResumeCard from "./ResumeCard";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { templateImages } from "@/utils/TemplateImages";
import CreateNewResume from "./CreateNewResume";
import { ImSpinner3 } from "react-icons/im";

const DisplayResumes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, cvDeleted, allResumes } = useResumeStore();
  const [userCVS, setUserCVS] = useState<any | null>(null);

  useEffect(() => {
    setUserCVS(allResumes);
    setIsLoading(false);
  }, [cvDeleted, allResumes]);

  return (
    <div className="flex flex-wrap gap-4 space-py-12 md:space-y-0 justify-center md:justify-start md:gap-7 pt-5">
      {isLoading ? (
        <div className="w-full h-[100px] items-center flex justify-center">
          <ImSpinner3 color="gray" className="animate-spin" size={30} />
        </div>
      ) : userCVS && Array.isArray(userCVS) && userCVS.length > 0 ? (
        userCVS.map((userCV: any, index: number) => {
          const selectedTemplate = userCV.cvData.selectedTemplate;
          const templateImage = templateImages.find(
            (image) => image.title === selectedTemplate
          );

          return (
            <ResumeCard
              key={index}
              id={userCV.resumeID}
              img={templateImage ? templateImage.imgPath : ""}
              creationDate={userCV.createdAt}
            />
          );
        })
      ) : (
        <>
          <CreateNewResume />
        </>
      )}
    </div>
  );
};

export default DisplayResumes;
