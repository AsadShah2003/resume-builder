"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/Context/store";
import SocialLinks from "./ResumeSections/SocialLinks";
import Skills from "./ResumeSections/Skills";
import Languages from "./ResumeSections/Languages";
import PersonalProfile from "./ResumeSections/PersonalProfile";
import WorkExperience from "./ResumeSections/WorkExperience";
import Education from "./ResumeSections/Education";
import { roboto } from "@/styles/fonts";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { IoMailSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { PDFExport } from "@progress/kendo-react-pdf";

type Resume4Props = {
  draggableSections: string[];
  setDraggableSections: React.Dispatch<React.SetStateAction<string[]>>;
  forwardRef?: React.Ref<any> | null;
};

const Resume4: React.FC<Resume4Props> = ({
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
    education,
    resumeFontSize,
    hideProfileImage,
    templateColor,
    selectedImage,
  } = useGlobalContext();
  const [leftSectionOrder, setLeftSectionOrder] = useState<string[]>([]);
  const [rightSectionOrder, setRightSectionOrder] = useState<string[]>([]);

  const rightSections = ["personalprofile", "workexperience", "education"];
  const leftSections = ["sociallinks", "skills", "languages"];

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
          <div
            key={section}
            className={`${isLeft ? "mt-[1.3rem]" : "mt-2.5"} max-w-full`}
          >
            <h1
              className={
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : resumeFontSize === 3
                    ? "text-[1rem]"
                    : ""
                } break-words font-bold`
              }
            >
              Links
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
          <div
            key={section}
            className={`${isLeft ? "mt-[1.3rem]" : "mt-2.5"} max-w-full`}
          >
            <h1
              className={
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : resumeFontSize === 3
                    ? "text-[1rem]"
                    : ""
                } break-words font-bold`
              }
            >
              Skills
            </h1>
            <ul className="text-[.66rem] flex flex-col gap-2.5 pt-2">
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
            className={`${isLeft ? "mt-[1.3rem]" : "mt-2.5"} max-w-full`}
          >
            <h1
              className={
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : resumeFontSize === 3
                    ? "text-[1rem]"
                    : ""
                } break-words font-bold`
              }
            >
              Languages
            </h1>
            <ul className="text-[.66rem] flex flex-col gap-2.5 mt-2">
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
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : resumeFontSize === 3
                    ? "text-[1rem]"
                    : ""
                } underline break-words font-bold`
              }
            >
              Profile
            </h1>
            <PersonalProfile profile={personalProfile} />
          </div>
        );
      case "workexperience":
        return (
          <div key={section} className="mt-2.5">
            <h1
              className={
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : resumeFontSize === 3
                    ? "text-[1rem]"
                    : ""
                } underline break-words font-bold`
              }
            >
              Experience
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
                roboto.className +
                ` ${
                  resumeFontSize === 1
                    ? "text-[.8rem]"
                    : resumeFontSize === 2
                    ? "text-[.9rem]"
                    : resumeFontSize === 3
                    ? "text-[1rem]"
                    : ""
                } underline break-words font-bold`
              }
            >
              Education
            </h1>
            <div className="flex flex-col gap-2 mt-2">
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
          id="template4"
          style={{
            fontFamily: "DejaVu Sans",
            fontSize: "regular",
          }}
          className={`template bg-white w-[600px] pb-3 min-h-[800px]`}
        >
          <header id="resume-header">
            {/* RESUME HEADER */}
            <div
              className={`relative flex justify-center items-center bg-[${templateColor}]`}
            >
              {/* RESUME INNER CONTENT WRAPPER */}
              <div className="flex flex-col gap-3 pb-3 pt-2">
                {/* CONTAINER FOR IMAGE, NAME AND ROLE */}
                <div className="flex flex-col gap-2 items-center">
                  <div className="w-[70px] flex justify-center">
                    {!hideProfileImage && (
                      <div className="relative w-12 h-12 rounded-full">
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
                      </div>
                    )}
                  </div>
                  {/* RESUME NAME & ROLE */}
                  <div className=" text-white flex flex-col items-center">
                    <h1
                      className={`${
                        resumeFontSize === 1
                          ? "text-[1.1rem]"
                          : resumeFontSize === 2
                          ? "text-[1.2rem]"
                          : "text-[1.3rem]"
                      } max-w-[500px] break-words font-medium`}
                    >
                      {personalDetails.fname}&nbsp;
                      {personalDetails.lname}
                    </h1>
                    <span
                      className={`${
                        resumeFontSize === 1
                          ? "text-[.5rem]"
                          : resumeFontSize === 2
                          ? "text-[.6rem]"
                          : "text-[.7rem]"
                      } text-[.7rem] max-w-[500px] break-words font-light`}
                    >
                      {personalDetails.role}
                    </span>
                  </div>
                </div>

                <div className="self-center flex justify-around items-start w-[100%]">
                  {personalDetails.address && (
                    <div className="flex w-[140px] gap-1.5 text-[.66rem] items-start">
                      <div>
                        <MdLocationOn
                          size={14}
                          className="mt-auto mb-auto"
                          color="white"
                        />
                      </div>

                      <div className="flex justify-center">
                        <p
                          className={`${
                            resumeFontSize === 1
                              ? "text-[.5rem]"
                              : resumeFontSize === 2
                              ? "text-[.6rem]"
                              : "text-[.7rem]"
                          } max-w-[120px] text-white break-words`}
                        >
                          {personalDetails.address}
                        </p>
                      </div>
                    </div>
                  )}
                  {personalDetails.email && (
                    <div className="flex w-[140px] gap-1.5 text-[.66rem] items-start">
                      <div>
                        <IoMailSharp
                          className="mt-auto mb-auto"
                          color="white"
                          size={14}
                        />
                      </div>

                      <div className="flex flex-col items-start">
                        <p
                          className={`${
                            resumeFontSize === 1
                              ? "text-[.5rem]"
                              : resumeFontSize === 2
                              ? "text-[.6rem]"
                              : "text-[.7rem]"
                          } max-w-[120px] text-white break-words`}
                        >
                          {personalDetails.email}
                        </p>
                      </div>
                    </div>
                  )}
                  {personalDetails.phone && (
                    <div className="flex w-[140px] gap-1.5 text-[.66rem] items-start">
                      <div>
                        <FaPhone color="white" className="mt-[2px]" size={10} />
                      </div>
                      <div className="flex flex-col items-start flex-shrink-0">
                        <p
                          className={`${
                            resumeFontSize === 1
                              ? "text-[.5rem]"
                              : resumeFontSize === 2
                              ? "text-[.6rem]"
                              : "text-[.7rem]"
                          } max-w-[120px] text-white break-words`}
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
          <div id="resume-body" className="mt-2 w-full flex gap-3 h-full">
            {/* LEFT SIDE */}
            <div className="max-w-[220px] pl-5 pr-4 border-r border-gray-300">
              {/* REST LEFT SIDE */}
              {leftSectionOrder.map((section, index) => (
                <div key={section}>{renderSection(section, index, true)}</div>
              ))}
            </div>
            {/* RIGHT SIDE */}
            <div className="pl-2 pr-2">
              <div>
                {/* REST OF RIGHT SIDE */}
                {rightSectionOrder.map((section, index) => (
                  <div key={section}>
                    {renderSection(section, index, false)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PDFExport>
    </>
  );
};

export default Resume4;
