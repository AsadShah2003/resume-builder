"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/Context/store";
import SocialLinks from "./ResumeSections/SocialLinks";
import Skills from "./ResumeSections/Skills";
import Languages from "./ResumeSections/Languages";
import PersonalProfile from "./ResumeSections/PersonalProfile";
import WorkExperience from "./ResumeSections/WorkExperience";
import Education from "./ResumeSections/Education";
import { inter } from "@/styles/fonts";
import { PDFExport } from "@progress/kendo-react-pdf";

type Resume9Props = {
  draggableSections: string[];
  setDraggableSections: React.Dispatch<React.SetStateAction<string[]>>;
  forwardRef?: React.Ref<any> | null;
};

const Resume9: React.FC<Resume9Props> = ({ draggableSections, forwardRef }) => {
  const {
    personalDetails,
    socialLinks,
    skills,
    languages,
    personalProfile,
    templateColor,
    workExperience,
    education,
    resumeFontSize,
  } = useGlobalContext();
  const [sectionOrder, setSectionOrder] = useState<string[]>([]);

  useEffect(() => {
    const order = draggableSections.filter((section) =>
      [
        "personalprofile",
        "workexperience",
        "education",
        "languages",
        "skills",
        "sociallinks",
      ].includes(section.toLowerCase())
    );

    setSectionOrder(order);
  }, [draggableSections]);

  const renderSection = (section: string, index: number, isLeft: boolean) => {
    switch (section) {
      case "sociallinks":
        return (
          <div
            key={section}
            className={`${
              isLeft ? "mt-[1rem]" : "mt-2.5"
            } max-w-full flex items-center gap-[6.3rem]`}
          >
            <h1
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : "text-[1rem]"
                } self-start underline font-bold`
              }
            >
              Links
            </h1>
            <div className="flex flex-col gap-2">
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
          <div
            key={section}
            className={`${
              isLeft ? "mt-[1rem]" : "mt-2.5"
            }  flex items-center gap-[6.3rem]`}
          >
            <h1
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : "text-[1rem]"
                } self-start underline font-bold`
              }
            >
              Skills
            </h1>
            <ul className="w-[370px] break-words gap-2 flex flex-wrap">
              {skills.map((skill) => (
                <Skills skill={skill.title} key={skill.id} />
              ))}
            </ul>
          </div>
        );
      case "languages":
        return (
          <div
            key={section}
            className={`${
              isLeft ? "mt-[1rem]" : "mt-2.5"
            } max-w-full flex items-center gap-[4.1rem]`}
          >
            <h1
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : "text-[1rem]"
                } self-start underline font-bold`
              }
            >
              Languages
            </h1>
            <ul className="text-xs flex flex-col gap-2.5">
              {languages.map((lang) => (
                <Languages key={lang.id} language={lang.language} />
              ))}
            </ul>
          </div>
        );
      case "personalprofile":
        return (
          <div key={section} className="mt-4 flex items-center gap-[6rem]">
            <h1
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : "text-[1rem]"
                } self-start underline font-bold`
              }
            >
              Profile
            </h1>
            <PersonalProfile profile={personalProfile} />
          </div>
        );
      case "workexperience":
        return (
          <div key={section} className="mt-4 flex items-center gap-[4.2rem]">
            <h1
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : "text-[1rem]"
                } self-start underline font-bold`
              }
            >
              Experience
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
          <div key={section} className="mt-3 flex items-center gap-[4.7rem]">
            <h1
              className={
                inter.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : "text-[1rem]"
                } self-start underline font-bold`
              }
            >
              Education
            </h1>
            <div className="flex flex-col gap-2">
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
          id="template9"
          style={{
            fontFamily: "DejaVu Sans",
            fontSize: "regular",
          }}
          className={`template bg-white w-[600px] pb-3 min-h-[800px] overflow-hidden`}
        >
          <header id="resume-header">
            {/* RESUME HEADER */}
            <div className="relative w-full flex mt-4 justify-between px-5">
              {/* NAME AND SQUARE */}
              {/* FIRSTNAME & LASTNAME */}
              <div className="w-[260px] self-end">
                <h1
                  className={
                    inter.className +
                    ` ${
                      resumeFontSize === 1
                        ? "text-[1.4rem]"
                        : resumeFontSize === 2
                        ? "text-[1.7rem]"
                        : "text-[2rem]"
                    } max-w-[260px] break-words font-bold`
                  }
                >
                  {personalDetails.fname} {personalDetails.lname}
                </h1>
                <span
                  className={
                    inter.className +
                    ` font-medium max-w-[260px] break-words ${
                      resumeFontSize === 1
                        ? "text-[.65rem]"
                        : resumeFontSize === 2
                        ? "text-[.68rem]"
                        : "text-[.71rem]"
                    }`
                  }
                >
                  {personalDetails.role}
                </span>
              </div>
              {/* SQUARE PATTERN */}
              <div>
                <div
                  className={`w-[30px] h-[50px] bg-[${templateColor}]`}
                ></div>
              </div>
            </div>
            {/* PERSONTAL DETAILS */}
            <div className="mt-4 pl-5 flex gap-3 items-center w-[410px] text-gray-500">
              <span
                className={`max-w-[120px] break-words ${
                  resumeFontSize === 1
                    ? "text-[.50rem]"
                    : resumeFontSize === 2
                    ? "text-[.55rem]"
                    : "text-[.60rem]"
                }`}
              >
                {personalDetails.address}
              </span>
              <div className="w-[5px] h-[5px] bg-orange-500"></div>
              <span
                className={`max-w-[120px] break-words ${
                  resumeFontSize === 1
                    ? "text-[.50rem]"
                    : resumeFontSize === 2
                    ? "text-[.55rem]"
                    : "text-[.60rem]"
                }`}
              >
                {personalDetails.email}
              </span>
              <div className="w-[5px] h-[5px] bg-orange-500"></div>
              <span
                className={`max-w-[120px] break-words ${
                  resumeFontSize === 1
                    ? "text-[.50rem]"
                    : resumeFontSize === 2
                    ? "text-[.55rem]"
                    : "text-[.60rem]"
                }`}
              >
                {personalDetails.phone}
              </span>
            </div>
          </header>
          {/* RESUME BODY */}
          <div id="resume-body" className="mt-1 w-full h-full flex gap-3">
            {/* MAIN SIDE*/}
            <div className="flex-[1] px-5">
              {/* REST OF OTHER SECTIONS */}
              {sectionOrder.map((section, index) => (
                <div key={section}>{renderSection(section, index, true)}</div>
              ))}
            </div>
          </div>
        </div>
      </PDFExport>
    </>
  );
};

export default Resume9;
