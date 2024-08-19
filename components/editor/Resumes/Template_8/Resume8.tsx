"use client";
import React, { useState, useEffect } from "react";
import SocialLinks from "./ResumeSections/SocialLinks";
import Skills from "./ResumeSections/Skills";
import Languages from "./ResumeSections/Languages";
import PersonalProfile from "./ResumeSections/PersonalProfile";
import WorkExperience from "./ResumeSections/WorkExperience";
import Education from "./ResumeSections/Education";
import { useGlobalContext } from "@/app/Context/store";
import { inter } from "@/styles/fonts";
import { PDFExport } from "@progress/kendo-react-pdf";

type Resume8Props = {
  draggableSections: string[];
  setDraggableSections: React.Dispatch<React.SetStateAction<string[]>>;
  forwardRef?: React.Ref<any> | null;
};

const Resume8: React.FC<Resume8Props> = ({
  draggableSections,
  setDraggableSections,
  forwardRef,
}) => {
  const {
    personalDetails,
    socialLinks,
    skills,
    languages,
    personalProfile,
    workExperience,
    resumeFontSize,
    education,
  } = useGlobalContext();
  const [leftSectionOrder, setLeftSectionOrder] = useState<string[]>([]);
  const [rightSectionOrder, setRightSectionOrder] = useState<string[]>([]);

  const leftSections = ["sociallinks", "skills", "languages"];
  const rightSections = ["personalprofile", "workexperience", "education"];

  useEffect(() => {
    const leftOrder = draggableSections.filter((section) =>
      leftSections.includes(section)
    );
    const rightOrder = draggableSections.filter((section) =>
      rightSections.includes(section)
    );

    setLeftSectionOrder(leftOrder);
    setRightSectionOrder(rightOrder);
  }, [draggableSections]);

  const moveSection = (
    dragIndex: number,
    hoverIndex: number,
    isLeft: boolean
  ) => {
    const dragSection = isLeft
      ? leftSectionOrder[dragIndex]
      : rightSectionOrder[dragIndex];
    const updatedOrder = isLeft
      ? [...leftSectionOrder]
      : [...rightSectionOrder];

    updatedOrder.splice(dragIndex, 1);
    updatedOrder.splice(hoverIndex, 0, dragSection);

    if (isLeft) {
      setLeftSectionOrder(updatedOrder);
      setDraggableSections([...updatedOrder, ...rightSectionOrder]);
    } else {
      setRightSectionOrder(updatedOrder);
      setDraggableSections([...leftSectionOrder, ...updatedOrder]);
    }
  };

  const renderSection = (section: string, index: number, isLeft: boolean) => {
    switch (section) {
      case "sociallinks":
        return (
          <div key={section} className={isLeft ? "mt-[1.3rem]" : "mt-2.5"}>
            <h1
              className={`${
                resumeFontSize === 1
                  ? "text-[.8rem]"
                  : resumeFontSize === 2
                  ? "text-[.9rem]"
                  : "text-[1rem]"
              } max-w-[300px] break-words font-[400]`}
            >
              LINKS
            </h1>
            <div className="mt-2 flex flex-col gap-1">
              {socialLinks.map((link) => (
                <SocialLinks
                  key={link.id}
                  link={link.link}
                  logotype={link.platform}
                />
              ))}
            </div>
          </div>
        );
      case "skills":
        return (
          <div key={section} className={isLeft ? "mt-[1.3rem]" : "mt-2.5"}>
            <h1
              className={`${
                resumeFontSize === 1
                  ? "text-[.8rem]"
                  : resumeFontSize === 2
                  ? "text-[.9rem]"
                  : "text-[1rem]"
              } max-w-[300px] break-words font-[400]`}
            >
              SKILLS
            </h1>
            <ul className="text-xs flex flex-col gap-2.5 pt-2">
              {skills.map((skill) => (
                <Skills skill={skill.title} key={skill.id} />
              ))}
            </ul>
          </div>
        );
      case "languages":
        return (
          <div key={section} className={isLeft ? "mt-[1.3rem]" : "mt-2.5"}>
            <h1
              className={`${
                resumeFontSize === 1
                  ? "text-[.8rem]"
                  : resumeFontSize === 2
                  ? "text-[.9rem]"
                  : "text-[1rem]"
              } max-w-[300px] break-words font-[400]`}
            >
              LANGUAGES
            </h1>
            <ul className="text-xs flex flex-col gap-2.5 mt-2">
              {languages.map((lang) => (
                <Languages key={lang.id} language={lang.language} />
              ))}
            </ul>
          </div>
        );
      case "workexperience":
        return (
          <div key={section} className="mt-2.5">
            <h1
              className={`${
                resumeFontSize === 1
                  ? "text-[1rem]"
                  : resumeFontSize === 2
                  ? "text-[1.2rem]"
                  : "text-[1.3rem]"
              } max-w-[300px] break-words font-bold`}
            >
              EMPLOYMENT HISTORY
            </h1>
            <div className="flex flex-col gap-2">
              {workExperience.map((work) => (
                <WorkExperience
                  company={work.jobCompany}
                  enddate={work.jobEndDate}
                  jobtitle={work.jobTitle}
                  startdate={work.jobStartDate}
                  summary={work.jobSummary}
                  key={work.id}
                />
              ))}
            </div>
          </div>
        );
      case "education":
        return (
          <div key={section} className="mt-2.5">
            <h1
              className={`${
                resumeFontSize === 1
                  ? "text-[1rem]"
                  : resumeFontSize === 2
                  ? "text-[1.2rem]"
                  : "text-[1.3rem]"
              } max-w-[300px] break-words font-bold`}
            >
              EDUCATION
            </h1>
            {education.map((edu) => (
              <Education
                key={edu.id}
                eduDegree={edu.educationDegree}
                eduStartDate={edu.educationStartDate}
                eduEndDate={edu.educationEndDate}
                eduInstitute={edu.educationInstitute}
                isStudying={edu.isStillStudying}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PDFExport ref={forwardRef}>
        <div
          ref={forwardRef}
          id="template8"
          style={{
            fontFamily: "DejaVu Sans",
            fontSize: "regular",
          }}
          className={`template bg-white w-[600px] pb-3 min-h-[800px] overflow-hidden`}
        >
          <div id="resume-header">
            {/* RESUME TOP HEADER */}
            <div className="py-1 pt-2 px-4 h-fit flex justify-between">
              <div className="flex w-[120px]">
                {personalDetails.email && (
                  <>
                    <div className="text-[.6rem]">
                      <span className="max-w-[120px] break-words">
                        {personalDetails.email}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col w-[300px] items-end">
                {personalDetails.address && (
                  <>
                    <div className="w-[190px] text-[.6rem] flex justify-end">
                      <span className="max-w-[220px] break-words">
                        {personalDetails.address}
                      </span>
                    </div>
                  </>
                )}

                {personalDetails.phone && (
                  <>
                    <div className="text-[.6rem] self-end mt-1">
                      <span className="max-w-[120px] break-words">
                        {personalDetails.phone}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* RESUME HEADER */}
            <div className="relative w-full flex mt-2 outline-none">
              {/* NAME COTAINER */}
              <div className="px-2 max-w-[500px] break-words">
                <h1
                  className={
                    inter.className +
                    ` ${
                      resumeFontSize === 1
                        ? "text-[1.9rem]"
                        : resumeFontSize === 2
                        ? "text-[2rem]"
                        : "text-[2.1rem]"
                    } font-[500]`
                  }
                >
                  {personalDetails.fname} {personalDetails.lname}
                </h1>
              </div>
            </div>
          </div>
          {/* RESUME BODY */}
          <div id="resume-body" className="w-full h-full flex px-3">
            {/* LEFT SECTION */}
            <div className="pt-[.4rem] pr-4 w-[200px]">
              {/* SOCIAL LINKS */}
              {leftSectionOrder.map((section, index) => (
                <div key={section}>{renderSection(section, index, true)}</div>
              ))}
            </div>

            {/* RIGHT SECTION */}
            <div className="pl-4 pt-[1rem] max-w-[400px]">
              {/* PERSONAL PROFILE */}
              <div className="mt-2.5">
                <h1
                  className={`${
                    resumeFontSize === 1
                      ? "text-[1rem]"
                      : resumeFontSize === 2
                      ? "text-[1.2rem]"
                      : "text-[1.3rem]"
                  } max-w-[300px] break-words font-bold`}
                >
                  {personalDetails.role}
                </h1>
                <PersonalProfile profile={personalProfile} />
              </div>

              {/* REST OF SECTIONS */}
              {rightSectionOrder.map((section, index) => (
                <div key={section}>{renderSection(section, index, false)}</div>
              ))}
            </div>
          </div>
        </div>
      </PDFExport>
    </>
  );
};

export default Resume8;
