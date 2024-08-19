"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/Context/store";
import SocialLinks from "./ResumeSections/SocialLinks";
import Skills from "./ResumeSections/Skills";
import Languages from "./ResumeSections/Languages";
import PersonalProfile from "./ResumeSections/PersonalProfile";
import WorkExperience from "./ResumeSections/WorkExperience";
import Education from "./ResumeSections/Education";
import { inter, abril } from "@/styles/fonts";
import Image from "next/image";
import { PDFExport } from "@progress/kendo-react-pdf";

type Resume7Props = {
  draggableSections: string[];
  setDraggableSections: React.Dispatch<React.SetStateAction<string[]>>;
  forwardRef?: React.Ref<any> | null;
};

const Resume7: React.FC<Resume7Props> = ({
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
    hideProfileImage,
    resumeFontSize,
    workExperience,
    education,
    selectedImage,
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

  const moveSection = (dragIndex: number, hoverIndex: number) => {
    const dragSection = sectionOrder[dragIndex];
    const updatedOrder = [...sectionOrder];

    updatedOrder.splice(dragIndex, 1);
    updatedOrder.splice(hoverIndex, 0, dragSection);

    setSectionOrder(updatedOrder);
    setDraggableSections(updatedOrder);
  };

  const renderSection = (section: string, index: number, isLeft: boolean) => {
    switch (section) {
      case "sociallinks":
        return (
          <div
            key={section}
            className={`${
              isLeft ? "mt-[1rem]" : "mt-2.5"
            } max-w-full flex items-center gap-[5.8rem]`}
          >
            <h1
              className={
                inter.className +
                ` font-medium text-gray-500 self-start ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                }`
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
      case "personalprofile":
        return (
          <div key={section} className="mt-4 flex items-center gap-[5.5rem]">
            <h1
              className={
                inter.className +
                ` font-medium text-gray-500 self-start ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                }`
              }
            >
              Profile
            </h1>
            <PersonalProfile profile={personalProfile} />
          </div>
        );
      case "skills":
        return (
          <div
            key={section}
            className={`${
              isLeft ? "mt-[1rem]" : "mt-2.5"
            }  flex items-center gap-[5.8rem]`}
          >
            <h1
              className={
                inter.className +
                ` font-medium text-gray-500 self-start ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                }`
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
            } max-w-full flex items-center gap-[4.2rem]`}
          >
            <h1
              className={
                inter.className +
                ` font-medium text-gray-500 self-start ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                }`
              }
            >
              Languages
            </h1>
            <ul className="text-xs flex gap-5 font-medium items-center">
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
                ` font-medium text-gray-500 self-start ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                }`
              }
            >
              Profile
            </h1>
            <PersonalProfile profile={personalProfile} />
          </div>
        );
      case "workexperience":
        return (
          <div key={section} className="mt-4 flex items-center gap-[4rem]">
            <h1
              className={
                inter.className +
                ` font-medium text-gray-500 self-start ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                }`
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
          <div key={section} className="mt-4 flex items-center gap-[4.5rem]">
            <h1
              className={
                inter.className +
                ` font-medium text-gray-500 self-start ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                }`
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
          id="template7"
          style={{
            fontFamily: "DejaVu Sans",
            fontSize: "regular",
          }}
          className={`template w-[600px] bg-white pb-3 min-h-[800px] overflow-hidden`}
        >
          <header id="resume-header">
            {/* RESUME TOP HEADER */}
            <div className="w-[560px] py-1 pt-3 px-4 h-fit flex justify-between">
              <div
                className={`${
                  resumeFontSize === 1
                    ? "text-[.50rem]"
                    : resumeFontSize === 2
                    ? "text-[.55rem]"
                    : "text-[.60rem]"
                } max-w-[140px] break-words`}
              >
                <span> {personalDetails.address}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div
                  className={`${
                    resumeFontSize === 1
                      ? "text-[.50rem]"
                      : resumeFontSize === 2
                      ? "text-[.55rem]"
                      : "text-[.60rem]"
                  } max-w-[140px] break-words`}
                >
                  <span> {personalDetails.email}</span>
                </div>
                <div
                  className={`${
                    resumeFontSize === 1
                      ? "text-[.50rem]"
                      : resumeFontSize === 2
                      ? "text-[.55rem]"
                      : "text-[.60rem]"
                  } max-w-[140px] break-words`}
                >
                  <span> {personalDetails.phone}</span>
                </div>
              </div>
            </div>
            {/* RESUME HEADER */}
            <div className="relative w-full flex mt-2 outline-none">
              {/* IMAGE CONTAINER */}
              <div className="flex px-4 gap-[3.5rem] items-center">
                <div className="relative min-w-16 w-16 h-16 rounded-full">
                  {!hideProfileImage && (
                    <Image
                      alt="user-image"
                      src={
                        !selectedImage
                          ? "https://cdn-icons-png.flaticon.com/512/7084/7084424.png"
                          : selectedImage
                      }
                      width={100}
                      height={100}
                      className={`bg-white rounded-full h-full object-cover ${
                        !selectedImage ? "bg-white" : ""
                      }`}
                    />
                  )}
                </div>
                {/* FIRSTNAME & LASTNAME */}
                <div className="w-[260px]">
                  <h1
                    className={
                      abril.className +
                      ` ${
                        resumeFontSize === 1
                          ? "text-[1rem]"
                          : resumeFontSize === 2
                          ? "text-[1.2rem]"
                          : "text-[1.3rem]"
                      } max-w-[260px] break-words uppercase`
                    }
                  >
                    {personalDetails.fname} {personalDetails.lname}
                  </h1>
                  <span
                    className={`${
                      resumeFontSize === 1
                        ? "text-[.8rem]"
                        : resumeFontSize === 2
                        ? "text-[.9rem]"
                        : "text-[1rem]"
                    } max-w-[120px] break-words`}
                  >
                    {personalDetails.role}
                  </span>
                </div>
              </div>
            </div>
          </header>
          {/* RESUME BODY */}
          <div id="resume-body" className="mt-1 w-full flex gap-3">
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

export default Resume7;
