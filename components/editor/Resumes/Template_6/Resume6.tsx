"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/Context/store";
import SocialLinks from "./ResumeSections/SocialLinks";
import Skills from "./ResumeSections/Skills";
import Languages from "./ResumeSections/Languages";
import PersonalProfile from "./ResumeSections/PersonalProfile";
import WorkExperience from "./ResumeSections/WorkExperience";
import Education from "./ResumeSections/Education";
import { inter, roboto } from "@/styles/fonts";
import Image from "next/image";
import { PDFExport } from "@progress/kendo-react-pdf";

type Resume6Props = {
  draggableSections: string[];
  setDraggableSections: React.Dispatch<React.SetStateAction<string[]>>;
  forwardRef?: React.Ref<any> | null;
};

const Resume6: React.FC<Resume6Props> = ({
  draggableSections,
  setDraggableSections,
  forwardRef,
}) => {
  const {
    personalDetails,
    socialLinks,
    skills,
    templateColor,
    languages,
    personalProfile,
    workExperience,
    education,
    hideProfileImage,
    selectedImage,
    resumeFontSize,
  } = useGlobalContext();
  const [sectionOrder, setSectionOrder] = useState<string[]>([]);

  useEffect(() => {
    const order = draggableSections.filter((section) =>
      [
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
            } max-w-full flex items-center gap-[6.4rem]`}
          >
            <h1
              className={
                inter.className +
                `  ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                } font-medium text-gray-500`
              }
            >
              Links
            </h1>
            <div className="flex gap-2 justify-center flex-col flex-wrap">
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
            }  flex items-center gap-[6.4rem]`}
          >
            <h1
              className={
                inter.className +
                `  ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                } font-medium text-gray-500 self-start`
              }
            >
              Skills
            </h1>
            <ul className="w-[370px] break-words flex gap-3 flex-wrap">
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
            } max-w-full flex items-center gap-[4.8rem]`}
          >
            <h1
              className={
                inter.className +
                `  ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                } font-medium text-gray-500 self-start`
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
                `  ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                } font-medium text-gray-500 self-start`
              }
            >
              Profile
            </h1>
            <PersonalProfile profile={personalProfile} />
          </div>
        );
      case "workexperience":
        return (
          <div key={section} className="mt-3 flex items-center gap-[4.8rem]">
            <h1
              className={
                inter.className +
                `  ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                } font-medium text-gray-500 self-start`
              }
            >
              Experience
            </h1>
            <div className="flex flex-col gap-1">
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
          <div key={section} className="mt-2.5 flex items-center gap-[5.1rem]">
            <h1
              className={
                inter.className +
                `  ${
                  resumeFontSize === 1
                    ? "text-[.6rem]"
                    : resumeFontSize === 2
                    ? "text-[.7rem]"
                    : "text-[.8rem]"
                } font-medium text-gray-500 self-start`
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
          id="template6"
          style={{
            fontFamily: "DejaVu Sans",
            fontSize: "regular",
          }}
          className={`template bg-white w-[600px] pb-3 min-h-[800px] overflow-hidden`}
        >
          <header id="resume-header">
            {/* RESUME HEADER */}
            <div className="relative w-full flex pt-2 border-none">
              {/* IMAGE CONTAINER */}
              <div className="flex px-4 gap-10 z-[2]">
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
                {/* PERSONAL DETAILS */}
                <div className="flex flex-col gap-0 pl-6 pt-1">
                  <p
                    className={
                      inter.className +
                      ` ${
                        resumeFontSize === 1
                          ? "text-[.5rem]"
                          : resumeFontSize === 2
                          ? "text-[.53rem]"
                          : "text-[.56rem]"
                      } font-[300] text-[.54rem] max-w-[370px] break-words`
                    }
                  >
                    {personalDetails.address}
                  </p>
                  <div className="flex gap-2 mt-1.5 items-start font-[300] text-[.54rem]">
                    <span
                      className={` ${
                        resumeFontSize === 1
                          ? "text-[.5rem]"
                          : resumeFontSize === 2
                          ? "text-[.6rem]"
                          : "text-[.7rem]"
                      }  max-w-[180px] break-words`}
                    >
                      {personalDetails.phone}
                    </span>
                    <span
                      className={` ${
                        resumeFontSize === 1
                          ? "text-[.5rem]"
                          : resumeFontSize === 2
                          ? "text-[.6rem]"
                          : "text-[.7rem]"
                      } break-words max-w-[180px] relative right-1`}
                    >
                      {personalDetails.email}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-col gap-1 w-[360px]">
                    <h1
                      className={
                        inter.className +
                        `  ${
                          resumeFontSize === 1
                            ? "text-[.8rem]"
                            : resumeFontSize === 2
                            ? "text-[.9rem]"
                            : "text-[1rem]"
                        } font-extrabold text-[1rem] break-words max-w-[360px]`
                      }
                    >
                      {personalDetails.fname} {personalDetails.lname}
                      {personalDetails.lname && personalDetails.fname && ", "}
                      {personalDetails.role}
                    </h1>
                    <p
                      className={
                        inter.className +
                        ` ${
                          resumeFontSize === 1
                            ? "text-[.6rem]"
                            : resumeFontSize === 2
                            ? "text-[.7rem]"
                            : "text-[.8rem]"
                        } font-medium uppercase break-words text-[.8rem] pb-1 max-w-[360px]`
                      }
                    >
                      {personalProfile}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* RESUME BODY */}
          <div id="resume-body" className="mt-1 w-full flex gap-3">
            {/* MAIN SIDE*/}
            <div className="flex-[1] h-[695px] overflow-hidden px-5">
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

export default Resume6;
