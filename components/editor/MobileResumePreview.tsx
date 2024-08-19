"use client";

import React, { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { HiOutlineCloudDownload } from "react-icons/hi";
import { useGlobalContext } from "@/app/Context/store";
import useWindowWidth from "@/app/hooks/useWindowWidth";
import axios from "axios";
import { RenderSelectedTemplate } from "./RenderTemplate";
import { isObjectEqual } from "@/utils/IsObjectEqual";
import { ControlZoom } from "./SubComponents/ControlZoom";
import toast, { Toaster } from "react-hot-toast";

const MobileResumePreview = () => {
  const {
    draggableSecions,
    setResumeHeight,
    setDraggableSections,
    isCvBeingExported,
    education,
    workExperience,
    skills,
    socialLinks,
    setIsCvBeingExported,
    languages,
    resumeHeight,
    activeTemplate,
    setActiveTab,
    user,
    personalDetails,
    cvCreationDate,
    currCV,
    resumeFontSize,
    setCurrCV,
  } = useGlobalContext();

  const templateRef = useRef<any>(null);
  const transformRef = useRef<any>(null);
  const [firstTime, setFirstTime] = useState<boolean>(true);

  const exportPDF = () => {
    setIsCvBeingExported(true);

    if (firstTime) {
      toast.success("PDF Processing Completed! Hit Download Again!", {
        position: "top-center",
        duration: 2000,
      });
      setFirstTime((old) => false);
    }

    setTimeout(() => {
      try {
        if (templateRef.current) {
          templateRef.current.save();
        }
      } catch (error) {
        console.error("Error exporting PDF:", error);
      } finally {
        setIsCvBeingExported(false);
      }
    }, 2000);
  };

  //For keeping track of the template height
  const updateHeight = () => {
    const bodyHeight: number | undefined =
      document.getElementById("resume-body")?.offsetHeight;
    const headerHeight: number | undefined =
      document.getElementById("resume-header")?.offsetHeight;

    if (bodyHeight !== undefined && headerHeight !== undefined) {
      setResumeHeight(bodyHeight + headerHeight);
    }
  };

  //Attach height observer for resume
  if (templateRef && templateRef.current) {
    let parentDiv: any;
    const doc = document.querySelector(".template");
    if (doc !== undefined) {
      parentDiv = doc;
    }
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(parentDiv);
  }

  //Logic for scaling
  const windowWidth = useWindowWidth();
  const minWidth = 300;
  const maxWidth = 752;
  const scalingRange = 0.5;
  const scaleFactor =
    windowWidth >= maxWidth || windowWidth <= minWidth
      ? 1
      : Math.max(
          1 -
            (1 - (windowWidth - minWidth) / (maxWidth - minWidth)) *
              scalingRange,
          1 - scalingRange
        );

  const transformStyle = `scale(${scaleFactor})`;

  useEffect(() => {
    const obtainData = {
      resumeID: currCV.resumeID,
      createdAt: currCV.createdAt,
      cvData: {
        selectedTemplate: activeTemplate,
        selectedFontSize: resumeFontSize,
        fname: personalDetails.fname || "",
        lname: personalDetails.lname || "",
        role: personalDetails.role || "",
        address: personalDetails.address || "",
        phone: personalDetails.phone || "",
        email: personalDetails.email || "",
        education: education,
        workExperience: workExperience,
        languages: languages,
        socialLinks: socialLinks,
        skills: skills,
      },
    };

    const intervalId = setInterval(async () => {
      if (
        isObjectEqual(obtainData.cvData, currCV.cvData) &&
        obtainData.cvData.selectedTemplate === currCV.cvData.selectedTemplate &&
        obtainData.cvData.selectedFontSize === currCV.cvData.selectedFontSize
      ) {
        return;
      } else {
        try {
          const payload = {
            authorID: user?.authorID,
            resumeID: currCV.resumeID,
            createdAt: currCV.createdAt,
            selectedTemplate: activeTemplate,
            selectedFontSize: resumeFontSize !== undefined ? resumeFontSize : 1,
            fname: personalDetails.fname || "",
            lname: personalDetails.lname || "",
            role: personalDetails.role || "",
            address: personalDetails.address || "",
            phone: personalDetails.phone || "",
            email: personalDetails.email || "",
            education: education,
            workExperience: workExperience,
            languages: languages,
            socialLinks: socialLinks,
            skills: skills,
          };
          await axios.post("/api/cvs/updateCV", payload).then(() => {
            // Re-sync the old state with new data
            setCurrCV({
              resumeID: payload.resumeID,
              createdAt: payload.createdAt,
              cvData: {
                selectedTemplate: payload.selectedTemplate,
                selectedFontSize: payload.selectedFontSize,
                fname: personalDetails.fname || "",
                lname: personalDetails.lname || "",
                role: personalDetails.role || "",
                address: personalDetails.address || "",
                phone: personalDetails.phone || "",
                email: personalDetails.email || "",
                education: education || [],
                workExperience: workExperience || [],
                languages: languages || [],
                socialLinks: socialLinks || [],
                skills: skills || [],
              },
            });
          });
        } catch (error) {
          console.error("Error updating database:", error);
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [
    currCV,
    personalDetails,
    education,
    workExperience,
    languages,
    socialLinks,
    skills,
    activeTemplate,
    resumeFontSize,
    cvCreationDate,
    user?.authorID,
    windowWidth,
  ]);

  useEffect(() => {
    if (windowWidth >= 1160) {
      setActiveTab("Editor");
    }
  }, [windowWidth]);

  return (
    <main
      className={`mx-auto h-[1000px] overflow-x-hidden overflow-y-hidden min-w-[100vw] w-full flex bl:hidden justify-center items-start xs:items-center relative bottom-20`}
    >
      <TransformWrapper
        ref={transformRef}
        velocityAnimation={{
          sensitivity: 1,
        }}
        centerOnInit
        minScale={1}
        initialScale={1}
        maxScale={2}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent
              wrapperStyle={{
                transform:
                  windowWidth < 1160 && windowWidth > 480
                    ? "scale(.9)"
                    : transformStyle,
                position: "relative",
                top: "-50px",
                right: windowWidth < 477 ? "5px" : "-50px",
                minWidth: "600px",

                transformOrigin: "center center",
              }}
            >
              {RenderSelectedTemplate({
                draggableSecions: draggableSecions,
                setDraggableSections: setDraggableSections,
              })}
            </TransformComponent>

            {/* THIS IS HIDDEN FROM USER AND PRESERVER THE REF FOR EXPORT  */}
            <div className="absolute left-[4000px]">
              {RenderSelectedTemplate({
                draggableSecions: draggableSecions,
                setDraggableSections: setDraggableSections,
                templateRef: templateRef,
              })}
            </div>

            <ControlZoom
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              resetZoom={resetTransform}
            />
          </>
        )}
      </TransformWrapper>

      <div className="absolute xs:left-[45%] xl:left-[43%] bottom-[35%] xs:bottom-[10%] w-fit h-fit rounded-full">
        <div className="relative">
          <button
            onClick={exportPDF}
            className="bg-orange-600 hover:bg-orange-500 duration-300 text-white px-12 rounded-full py-2"
          >
            <span className="pr-3">
              ({resumeHeight && resumeHeight > 810 ? 2 : 1} of
              {resumeHeight && resumeHeight > 810 ? 2 : 1}) Download
            </span>
          </button>
          {isCvBeingExported ? (
            <>
              <svg
                className="absolute cursor-pointer right-6 text-white top-3 animate-spin"
                width="18"
                height="16"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                  stroke="white"
                />
              </svg>
            </>
          ) : (
            <>
              <HiOutlineCloudDownload
                className="absolute cursor-pointer right-6 text-white top-3"
                size={20}
              />
            </>
          )}
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default MobileResumePreview;
