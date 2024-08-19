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
import { MdLocationOn } from "react-icons/md";
import { IoMailSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { PDFExport } from "@progress/kendo-react-pdf";

type Resume10Props = {
  draggableSections: string[];
  setDraggableSections: React.Dispatch<React.SetStateAction<string[]>>;
  forwardRef?: React.Ref<any> | null;
};

const Resume10: React.FC<Resume10Props> = ({
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
    activeTemplate,
    workExperience,
    resumeFontSize,
    education,
    templateColor,
  } = useGlobalContext();
  const [leftSectionOrder, setLeftSectionOrder] = useState<string[]>([]);
  const [rightSectionOrder, setRightSectionOrder] = useState<string[]>([]);

  const rightSections = ["personalprofile", "workexperience", "education"];

  const leftSections = ["skills", "sociallinks", "languages"];

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
          <div key={section} className={isLeft ? "mt-[1rem]" : "mt-2.5"}>
            <h1
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[12px]"
                    : resumeFontSize === 2
                    ? "text-[14px]"
                    : "text-[16px]"
                } font-bold`
              }
            >
              LINKS
            </h1>
            <div className="mt-2 flex flex-col gap-2">
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
          <div key={section} className={isLeft ? "mt-[1rem]" : "mt-2.5"}>
            <h1
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[12px]"
                    : resumeFontSize === 2
                    ? "text-[14px]"
                    : "text-[16px]"
                } font-bold`
              }
            >
              SKILLS
            </h1>
            <ul className="mt-2 flex flex-col gap-2.5">
              {skills.map((skill) => (
                <Skills skill={skill.title} key={skill.id} />
              ))}
            </ul>
          </div>
        );
      case "languages":
        return (
          <div key={section} className={isLeft ? "mt-[1rem]" : "mt-2.5"}>
            <h1
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[12px]"
                    : resumeFontSize === 2
                    ? "text-[14px]"
                    : "text-[16px]"
                } font-bold`
              }
            >
              LANGUAGES
            </h1>
            <ul className="mt-2 flex flex-col gap-2.5">
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
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[12px]"
                    : resumeFontSize === 2
                    ? "text-[14px]"
                    : "text-[16px]"
                } font-bold`
              }
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
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[12px]"
                    : resumeFontSize === 2
                    ? "text-[14px]"
                    : "text-[16px]"
                } font-bold`
              }
            >
              WORK EXPERIENCE
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
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[12px]"
                    : resumeFontSize === 2
                    ? "text-[14px]"
                    : "text-[16px]"
                } font-bold`
              }
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
          id="template10"
          className={`template bg-white w-[600px] pb-3`}
        >
          <header id="resume-header">
            {/* RESUME HEADER */}
            <div className="w-full text-white">
              {/* NAME,ROLE AND DETAILS */}
              <div className={`h-fit px-5 py-2 bg-[${templateColor}]`}>
                {/* NAME */}
                <h1
                  className={
                    inter.className +
                    ` ${
                      resumeFontSize === 1
                        ? "text-[17px]"
                        : resumeFontSize === 2
                        ? "text-[19px]"
                        : "text-[20px]"
                    } mt-1 max-w-[260px] break-words font-bold`
                  }
                >
                  {personalDetails.fname} {personalDetails.lname}
                </h1>
                {/* ROLE */}
                <h3
                  className={
                    inter.className +
                    ` ${
                      resumeFontSize === 1
                        ? "text-[9px]"
                        : resumeFontSize === 2
                        ? "text-[11px]"
                        : "text-[12px]"
                    } mt-1 text-gray-200  font-light max-w-[260px] break-words`
                  }
                >
                  {personalDetails.role}
                </h3>
                {/* PERSONAL DETAILS */}
                <div className="mt-3 self-center flex justify-start gap-4 items-start w-[80%] pb-3">
                  {personalDetails.address && (
                    <div className="flex gap-1.5 text-[.66rem] items-start">
                      <div>
                        <MdLocationOn
                          size={12}
                          className="mt-auto mb-auto"
                          color="white"
                        />
                      </div>

                      <div className="flex justify-center">
                        <p
                          className={`${
                            resumeFontSize === 1
                              ? "text-[8.8px]"
                              : resumeFontSize === 2
                              ? "text-[9.6px]"
                              : "text-[11.2px]"
                          } max-w-[140px] text-white break-words`}
                        >
                          {personalDetails.address}
                        </p>
                      </div>
                    </div>
                  )}
                  {personalDetails.email && (
                    <div className="flex gap-1.5 text-[.66rem] items-start">
                      <div>
                        <IoMailSharp
                          className="mt-auto mb-auto"
                          color="white"
                          size={12}
                        />
                      </div>

                      <div className="flex flex-col items-start">
                        <p
                          className={`${
                            resumeFontSize === 1
                              ? "text-[8.8px]"
                              : resumeFontSize === 2
                              ? "text-[9.6px]"
                              : "text-[11.2px]"
                          } max-w-[140px] text-white break-words`}
                        >
                          {personalDetails.email}
                        </p>
                      </div>
                    </div>
                  )}
                  {personalDetails.phone && (
                    <div className="flex gap-1.5 text-[.66rem] items-start">
                      <div>
                        <FaPhone color="white" className="" size={10} />
                      </div>
                      <div className="flex flex-col items-start flex-shrink-0">
                        <p
                          className={`${
                            resumeFontSize === 1
                              ? "text-[8.8px]"
                              : resumeFontSize === 2
                              ? "text-[9.6px]"
                              : "text-[11.2px]"
                          } max-w-[140px] text-white break-words`}
                        >
                          {personalDetails.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
          {/* RESUME BODY */}
          <div id="resume-body" className="w-full h-fit flex px-5 py-2">
            {/* LEFT SECTION */}
            <div className="pt-4 h-[640px] pr-3">
              {/* SOCIAL LINKS */}
              {leftSectionOrder.map((section, index) => (
                <div key={section}>{renderSection(section, index, true)}</div>
              ))}
            </div>

            {/* RIGHT SECTION */}
            <div className="border-l border-gray-200 pl-3 pt-4">
              {/* PERSONAL PROFILE */}
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

export default Resume10;
