"use client";
import React, { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { HiOutlineCloudDownload } from "react-icons/hi";
import { useGlobalContext } from "@/app/Context/store";
import { RenderSelectedTemplate } from "./RenderTemplate";
import useWindowWidth from "@/app/hooks/useWindowWidth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { isObjectEqual } from "@/utils/IsObjectEqual";
import { ControlZoom } from "./SubComponents/ControlZoom";
import { ImSpinner3 } from "react-icons/im";

const ResumePreview = () => {
  const {
    draggableSecions,
    setDraggableSections,
    isCvBeingExported,
    education,
    workExperience,
    skills,
    socialLinks,
    resumeHeight,
    setIsCvBeingExported,
    personalProfile,
    languages,
    activeTemplate,
    cvCreationDate,
    setResumeHeight,
    user,
    personalDetails,
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

  //Attach height observer for resume
  useEffect(() => {
    if (templateRef?.current) {
      const doc = document.querySelector(".template"); // Change the selector if needed
      let parentDiv;

      if (doc !== null) {
        parentDiv = doc;

        const resizeObserver = new ResizeObserver(() => {
          const newHeight =
            document.getElementById(activeTemplate)?.offsetHeight;
          setResumeHeight(newHeight);
        });

        resizeObserver.observe(parentDiv);
      }
    }
  }, [templateRef, resumeHeight]);

  useEffect(() => {
    const initialHeight = document.getElementById(activeTemplate)?.offsetHeight;
    setResumeHeight(initialHeight);
  }, [activeTemplate]);

  //This portion of code handles the scaling of cv preview
  const windowWidth = useWindowWidth();
  const minWidth = 1040;
  const maxWidth = 1400;
  const scalingRange = 0.3;
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
    console.log(resumeHeight);
    transformRef.current.resetTransform();
    const obtainData = {
      resumeID: currCV?.resumeID,
      createdAt: currCV?.createdAt,
      cvData: {
        selectedTemplate: activeTemplate,
        selectedFontSize: resumeFontSize,
        personalProfile: personalProfile,
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
            personalProfile: personalProfile,
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
                personalProfile: personalProfile,
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
          toast.success("Your Progress is in Sync!", {
            position: "top-right",
          });
        } catch (error) {
          console.error("Error updating database:", error);
        }
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
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
    resumeHeight,
    cvCreationDate,
    personalProfile,
    isCvBeingExported,
    user?.authorID,
  ]);

  return (
    <main
      className={`flex-[1] h-full overflow-x-hidden hidden bl:flex flex-col px-5 relative bg-[#98A2AE]`}
    >
      <div>
        <TransformWrapper
          velocityAnimation={{
            sensitivity: 1,
          }}
          centerOnInit
          minScale={1}
          initialScale={1}
          maxScale={2}
          ref={transformRef}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <figure className="relative h-full flex justify-center lg:items-center xl:items-start xl:top-5">
                <TransformComponent
                  wrapperStyle={{
                    height: "840px",
                    transform: transformStyle,
                    backgroundColor: "#98A2AE",
                    transformOrigin: "center center",
                  }}
                >
                  {RenderSelectedTemplate({
                    draggableSecions: draggableSecions,
                    setDraggableSections: setDraggableSections,
                    templateRef: templateRef,
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
              </figure>
              <ControlZoom
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                resetZoom={resetTransform}
              />
            </>
          )}
        </TransformWrapper>
      </div>
      <div className="relative lg:bottom-[100px] xl:bottom-[70px] mx-auto w-fit h-fit rounded-full">
        <div className="relative">
          <button
            onClick={exportPDF}
            className="bg-orange-600 hover:bg-orange-500 duration-300 text-white px-12 rounded-full py-2"
          >
            <span className="pr-3">
              ({resumeHeight && resumeHeight > 910 ? "2 of 2" : "1 of 1"})
              Download
            </span>
          </button>
          {isCvBeingExported ? (
            <>
              <ImSpinner3
                color="white"
                className="animate-spin absolute cursor-pointer right-6 top-3"
              />
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

export default ResumePreview;
