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

type Resume5Props = {
  draggableSections: string[];
  setDraggableSections: React.Dispatch<React.SetStateAction<string[]>>;
  forwardRef?: React.Ref<any> | null;
};

const Resume5: React.FC<Resume5Props> = ({
  draggableSections,
  setDraggableSections,
  forwardRef,
}) => {
  const {
    personalDetails,
    socialLinks,
    templateColor,
    skills,
    languages,
    hideProfileImage,
    resumeFontSize,
    personalProfile,
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
        "skills",
        "languages",
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
            } max-w-full flex items-center gap-[5.5em]`}
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
                } underline font-bold self-start`
              }
            >
              Links
            </h1>
            <div className="flex flex-col">
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
              isLeft ? "mt-[.6rem]" : "mt-2.5"
            } flex items-center gap-[5.6rem] max-w-[500px]`}
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
                } underline font-bold self-start`
              }
            >
              Skills
            </h1>
            <ul className="flex gap-2 flex-wrap">
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
              isLeft ? "mt-[.6rem]" : "mt-2.5"
            } flex items-center gap-[3.6rem]`}
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
                } underline font-bold self-start`
              }
            >
              Languages
            </h1>
            <ul className="text-xs flex gap-1 flex-wrap">
              {languages.map((lang) => (
                <Languages key={lang.id} language={lang.language} />
              ))}
            </ul>
          </div>
        );
      case "personalprofile":
        return (
          <div
            key={section}
            className="mt-[.6rem] flex items-center gap-[5.2rem]"
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
                } underline font-bold self-start`
              }
            >
              Profile
            </h1>
            <PersonalProfile profile={personalProfile} />
          </div>
        );
      case "workexperience":
        return (
          <div
            key={section}
            className="mt-[.6rem] flex items-center gap-[3.7rem]"
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
                } underline font-bold self-start`
              }
            >
              Experience
            </h1>
            <div className="flex flex-col">
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
          <div
            key={section}
            className="mt-[.6rem] flex items-center gap-[4.18rem]"
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
                } underline font-bold self-start`
              }
            >
              Education
            </h1>
            <div className="flex flex-col">
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
          id="template5"
          style={{
            fontFamily: "DejaVu Sans",
            fontSize: "regular",
          }}
          className={`template w-[600px] bg-white pb-3 min-h-[800px] overflow-hidden`}
        >
          <header id="resume-header">
            {/* RESUME HEADER */}
            <div
              className={`relative w-full flex justify-center bg-[${templateColor}] items-center`}
            >
              {/* RESUME INNER CONTENT WRAPPER */}
              <div className="flex flex-col gap-3 pb-3">
                {/* CONTAINER FOR IMAGE, NAME AND ROLE */}
                <div className="flex flex-col gap-2 items-center pt-3">
                  <div className="w-[70px] flex justify-center">
                    <div className="relative w-12 h-12 rounded-full">
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
                          : "text-[.65rem]"
                      }   max-w-[500px] break-words font-light`}
                    >
                      {personalDetails.role}
                    </span>
                  </div>
                </div>

                <div className="mt-1 self-center flex gap-5 justify-evenly w-[500px]">
                  {personalDetails.address && (
                    <div className="flex gap-1.5 items-start">
                      <div>
                        <MdLocationOn
                          className="mt-auto mb-auto"
                          color="lightgray"
                          size={14}
                        />
                      </div>

                      <div className="flex flex-col items-start">
                        <p
                          className={`w-[120px] max-w-[140px] ${
                            resumeFontSize === 1
                              ? "text-[.5rem]"
                              : resumeFontSize === 2
                              ? "text-[.6rem]"
                              : "text-[.65rem]"
                          }   text-white break-words`}
                        >
                          {personalDetails.address}
                        </p>
                      </div>
                    </div>
                  )}
                  {personalDetails.email && (
                    <div className="flex gap-1.5 items-start">
                      <div>
                        <IoMailSharp
                          className="mt-auto mb-auto"
                          color="lightgray"
                          size={14}
                        />
                      </div>

                      <div className="flex flex-col items-start">
                        <p
                          className={`w-[120px] max-w-[140px] ${
                            resumeFontSize === 1
                              ? "text-[.5rem]"
                              : resumeFontSize === 2
                              ? "text-[.6rem]"
                              : "text-[.65rem]"
                          }   text-white  break-words`}
                        >
                          {personalDetails.email}
                        </p>
                      </div>
                    </div>
                  )}
                  {personalDetails.phone && (
                    <div className="flex gap-1.5 items-start">
                      <div className="self-start mt-[2px]">
                        <FaPhone
                          color="lightgray"
                          className="mt-auto mb-auto"
                          size={10}
                        />
                      </div>
                      <div className="flex flex-col items-start flex-shrink-0">
                        <p
                          className={`w-[120px] max-w-[140px] ${
                            resumeFontSize === 1
                              ? "text-[.5rem]"
                              : resumeFontSize === 2
                              ? "text-[.6rem]"
                              : "text-[.65rem]"
                          }   text-white  break-words`}
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
          <div id="resume-body" className="mt-1 w-full h-full flex gap-3">
            {/* MAIN SIDE*/}
            <div className="flex-[1] h-full px-5">
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

export default Resume5;
