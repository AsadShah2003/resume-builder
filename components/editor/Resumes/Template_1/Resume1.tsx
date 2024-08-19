"use client";
import React, { useState, useEffect } from "react";
import SocialLinks from "./ResumeSections/SocialLinks";
import Skills from "./ResumeSections/Skills";
import Languages from "./ResumeSections/Languages";
import PersonalProfile from "./ResumeSections/PersonalProfile";
import WorkExperience from "./ResumeSections/WorkExperience";
import Education from "./ResumeSections/Education";
import { useGlobalContext } from "@/app/Context/store";
import { PDFExport } from "@progress/kendo-react-pdf";

type Resume1Props = {
  draggableSections: string[];
  setDraggableSections: React.Dispatch<React.SetStateAction<string[]>>;
  forwardRef?: React.Ref<any> | null;
};

const Resume1: React.FC<Resume1Props> = ({
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
    templateColor,
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
                  : resumeFontSize === 3
                  ? "text-[1rem]"
                  : ""
              } underline font-bold`}
            >
              LINKS
            </h1>
            {socialLinks.map((link) => (
              <SocialLinks
                key={link.id}
                link={link.link}
                logotype={link.platform}
              />
            ))}
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
                  : resumeFontSize === 3
                  ? "text-[1rem]"
                  : ""
              } underline font-bold`}
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
                  : resumeFontSize === 3
                  ? "text-[1rem]"
                  : ""
              } underline font-bold`}
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
      case "personalprofile":
        return (
          <div key={section} className="mt-2.5">
            <h1
              className={`${
                resumeFontSize === 1
                  ? "text-[.8rem]"
                  : resumeFontSize === 2
                  ? "text-[.9rem]"
                  : resumeFontSize === 3
                  ? "text-[1rem]"
                  : ""
              } underline font-bold`}
            >
              PROFILE
            </h1>
            <PersonalProfile profile={personalProfile} />
          </div>
        );
      case "workexperience":
        return (
          <div key={section} className="mt-2.5">
            <h1
              className={`${
                resumeFontSize === 1
                  ? "text-[.8rem]"
                  : resumeFontSize === 2
                  ? "text-[.9rem]"
                  : resumeFontSize === 3
                  ? "text-[1rem]"
                  : ""
              } underline font-bold`}
            >
              EXPERIENCE
            </h1>
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
        );
      case "education":
        return (
          <div key={section} className="mt-2.5">
            <h1
              className={`${
                resumeFontSize === 1
                  ? "text-[.8rem]"
                  : resumeFontSize === 2
                  ? "text-[.9rem]"
                  : resumeFontSize === 3
                  ? "text-[1rem]"
                  : ""
              } underline font-bold`}
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

  useEffect(() => {}, [templateColor]);

  return (
    <>
      <PDFExport ref={forwardRef} paperSize={"A4"}>
        <div
          id="template1"
          className={`template w-[600px] bg-white pb-3 min-h-[800px] overflow-hidden`}
        >
          <header
            id="resume-header"
            className={`bg-[${templateColor}] text-white`}
          >
            {/* RESUME HEADER */}
            <div className="max-w-full break-words p-2">
              <h1
                className={`font-bold ${
                  resumeFontSize === 1
                    ? "text-[1rem]"
                    : resumeFontSize === 2
                    ? "text-[1.2rem]"
                    : resumeFontSize === 3
                    ? "text-[1.4rem]"
                    : ""
                }`}
              >
                {personalDetails.fname}&nbsp;
                {personalDetails.lname}
              </h1>
              <span
                className={`mt-1 ${
                  resumeFontSize === 1
                    ? "text-[.67rem]"
                    : resumeFontSize === 2
                    ? "text-[.71rem]"
                    : resumeFontSize === 3
                    ? "text-[.75rem]"
                    : ""
                }`}
              >
                {personalDetails.role}
              </span>
              <hr className="mt-4" />
            </div>
          </header>
          {/* RESUME BODY */}
          <div id="resume-body" className="w-[full] flex">
            {/* LEFT SECTION */}
            <div className="pt-4 pl-3 pr-6 max-w-[240px] min-h-[700px]">
              {/* PERSONAL DETAILS */}
              <div className="mt-2.5">
                <h1
                  className={`${
                    resumeFontSize === 1
                      ? "text-[.8rem]"
                      : resumeFontSize === 2
                      ? "text-[.9rem]"
                      : resumeFontSize === 3
                      ? "text-[1rem]"
                      : ""
                  } underline font-bold`}
                >
                  DETAILS
                </h1>
                <div className="mt-2 flex flex-col gap-1.5">
                  <div>
                    <span
                      className={`
                      ${
                        resumeFontSize === 1
                          ? "text-[.66rem]"
                          : resumeFontSize === 2
                          ? "text-[.7rem]"
                          : resumeFontSize === 3
                          ? "text-[.74rem]"
                          : ""
                      } font-bold`}
                    >
                      Address
                    </span>
                    <p
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.55rem]"
                          : resumeFontSize === 2
                          ? "text-[.58rem]"
                          : resumeFontSize === 3
                          ? "text-[.62rem]"
                          : ""
                      } max-w-[210px] break-words`}
                    >
                      {personalDetails.address}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.66rem]"
                          : resumeFontSize === 2
                          ? "text-[.7rem]"
                          : resumeFontSize === 3
                          ? "text-[.74rem]"
                          : ""
                      } font-bold`}
                    >
                      Phone
                    </span>
                    <p
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.55rem]"
                          : resumeFontSize === 2
                          ? "text-[.58rem]"
                          : resumeFontSize === 3
                          ? "text-[.62rem]"
                          : ""
                      } max-w-[210px] break-words`}
                    >
                      {personalDetails.phone}
                    </p>
                  </div>
                  <div
                    className={`${
                      resumeFontSize === 1
                        ? "text-[.66rem]"
                        : resumeFontSize === 2
                        ? "text-[.7rem]"
                        : resumeFontSize === 3
                        ? "text-[.74rem]"
                        : ""
                    } font-bold`}
                  >
                    <span
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.66rem]"
                          : resumeFontSize === 2
                          ? "text-[.7rem]"
                          : resumeFontSize === 3
                          ? "text-[.74rem]"
                          : ""
                      } font-bold`}
                    >
                      Email
                    </span>
                    <p
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.55rem]"
                          : resumeFontSize === 2
                          ? "text-[.58rem]"
                          : resumeFontSize === 3
                          ? "text-[.62rem]"
                          : ""
                      } max-w-[210px] font-medium break-words`}
                    >
                      {personalDetails.email}
                    </p>
                  </div>
                </div>
              </div>

              {leftSectionOrder.map((section, index) => (
                <div key={section}>{renderSection(section, index, true)}</div>
              ))}
            </div>

            <div className="border-l  border-gray-300 pl-5 pr-2 pt-4 max-w-[350px]">
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

export default Resume1;
