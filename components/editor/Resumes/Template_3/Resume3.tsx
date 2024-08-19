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

type Resume3Props = {
  draggableSections: string[];
  setDraggableSections: React.Dispatch<React.SetStateAction<string[]>>;
  forwardRef?: React.Ref<any> | null;
};

const Resume3: React.FC<Resume3Props> = ({
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
    personalProfile,
    workExperience,
    education,
    hideProfileImage,
    resumeFontSize,
    selectedImage,
  } = useGlobalContext();
  const [leftSectionOrder, setLeftSectionOrder] = useState<string[]>([]);
  const [rightSectionOrder, setRightSectionOrder] = useState<string[]>([]);

  const rightSections = [
    "personalprofile",
    "workexperience",
    "education",
    "languages",
  ];
  const leftSections = ["sociallinks", "skills"];

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
            <ul className="flex flex-col text-[0.74rem] gap-2.5 pt-2">
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
              } break-words`
            }
          >
            <h1 className="underline font-bold">Languages</h1>
            <ul className="text-xs flex flex-col gap-1.5 mt-2">
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
                } break-words underline font-bold`
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
                } break-words underline font-bold`
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
                } break-words underline font-bold`
              }
            >
              Education
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
      <PDFExport ref={forwardRef} paperSize={"A4"}>
        <div
          ref={forwardRef}
          id="template3"
          className={`template bg-white w-[600px] pb-3 min-h-[800px]`}
        >
          <header id="resume-header">
            {/* RESUME HEADER */}
            <div className="relative pt-2 w-full h-fit flex items-center gap-3">
              {/* RESUME IMAGE */}
              <div className="w-[80px] p-2 flex justify-center self-start">
                <div className="relative w-16 h-16 rounded-full">
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
              <div className="flex flex-col gap-1 items-center">
                <h1
                  className={` ${
                    resumeFontSize === 1
                      ? "text-[1rem]"
                      : resumeFontSize === 2
                      ? "text-[1.2rem]"
                      : resumeFontSize === 3
                      ? "text-[1.3rem]"
                      : ""
                  } max-w-[300px] break-words font-medium`}
                >
                  {personalDetails.fname}&nbsp;
                  {personalDetails.lname}
                </h1>
                <span
                  className={` ${
                    resumeFontSize === 1
                      ? "text-[.6rem]"
                      : resumeFontSize === 2
                      ? "text-[.7rem]"
                      : "text-[.8rem]"
                  } mt-1 max-w-[300px] break-words font-light`}
                >
                  {personalDetails.role}
                </span>
              </div>
              {/* Shape */}
              <div
                className={`absolute top-[20px] right-[-165px] z-[0] rounded-[100%] h-[200px] w-[200px] bg-[${templateColor}]`}
              ></div>
            </div>
          </header>
          {/* RESUME BODY */}
          <div id="resume-body" className=" pl-3 mt-6 w-full flex">
            {/* LEFT SIDE */}
            <div className="flex-[0.6] p-2">
              {/* REST LEFT SIDE */}
              {leftSectionOrder.map((section, index) => (
                <div key={section}>{renderSection(section, index, true)}</div>
              ))}
            </div>
            {/* RIGHT SIDE */}

            <div className="flex-[.6] p-2">
              {/* PERSONAL DETAILS */}
              <div className="z-[1]">
                <h1
                  className={
                    roboto.className +
                    ` ${
                      resumeFontSize === 1
                        ? "text-[1rem]"
                        : resumeFontSize === 2
                        ? "text-[1.2rem]"
                        : "text-[1.3rem]"
                    } font-medium`
                  }
                >
                  Details
                </h1>
                <div className="mt-2 flex flex-col gap-1 break-words max-w-[180px]">
                  <div>
                    <span
                      className={` ${
                        resumeFontSize === 1
                          ? "text-[.66rem]"
                          : resumeFontSize === 2
                          ? "text-[.70rem]"
                          : "text-[.75rem]"
                      } font-medium`}
                    >
                      Address
                    </span>
                    <p
                      className={
                        inter.className +
                        ` ${
                          resumeFontSize === 1
                            ? "text-[.5rem]"
                            : resumeFontSize === 2
                            ? "text-[.6rem]"
                            : "text-[.7rem]"
                        } break-words max-w-[180px] font-light`
                      }
                    >
                      {personalDetails.address}
                    </p>
                  </div>
                  <div>
                    <span
                      className={` ${
                        resumeFontSize === 1
                          ? "text-[.66rem]"
                          : resumeFontSize === 2
                          ? "text-[.70rem]"
                          : "text-[.75rem]"
                      } font-medium`}
                    >
                      Phone
                    </span>
                    <p
                      className={
                        inter.className +
                        ` ${
                          resumeFontSize === 1
                            ? "text-[.5rem]"
                            : resumeFontSize === 2
                            ? "text-[.6rem]"
                            : "text-[.7rem]"
                        } break-words max-w-[180px] font-light`
                      }
                    >
                      {personalDetails.phone}
                    </p>
                  </div>
                  <div>
                    <span
                      className={` ${
                        resumeFontSize === 1
                          ? "text-[.66rem]"
                          : resumeFontSize === 2
                          ? "text-[.70rem]"
                          : "text-[.75rem]"
                      } font-medium`}
                    >
                      Email
                    </span>
                    <p
                      className={
                        inter.className +
                        ` ${
                          resumeFontSize === 1
                            ? "text-[.5rem]"
                            : resumeFontSize === 2
                            ? "text-[.6rem]"
                            : "text-[.7rem]"
                        } break-words max-w-[180px] font-light`
                      }
                    >
                      {personalDetails.email}
                    </p>
                  </div>
                </div>
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

export default Resume3;
