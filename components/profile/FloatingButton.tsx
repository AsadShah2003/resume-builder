"use client";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { poppins } from "@/styles/fonts";
import { templateImages } from "@/utils/TemplateImages";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/Context/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface FloatingTemplateCardProps {
  id: number;
  img: string;
}

export const FloatingTemplateCard: React.FC<FloatingTemplateCardProps> = ({
  id,
  img,
}) => {
  const { push } = useRouter();
  const {
    setActiveTemplate,
    user,
    setCurrCV,
    education,
    languages,
    resumeFontSize,
    workExperience,
    socialLinks,
    personalDetails,
    skills,
  } = useGlobalContext();

  const handleCreateCV = async (resume_id: string) => {
    const authorID = user?.authorID;
    if (user && user.authorID) {
      const payload = {
        authorID,
        resumeID: resume_id,
        selectedTemplate: `template${id}`,
        selectedFontSize: resumeFontSize || 1,
        fname: personalDetails.fname || "",
        lname: personalDetails.lname || "",
        role: personalDetails.role || "",
        address: personalDetails.address || "",
        phone: personalDetails.phone || "",
        email: personalDetails.email || "",
        education: education || null,
        workExperience: workExperience,
        languages: languages || null,
        socialLinks: socialLinks || null,
        skills: skills || null,
      };

      try {
        await axios.post("/api/cvs/createCV", payload).then((res: any) => {
          const responseData = res.data.cv;
          if (
            responseData &&
            responseData.createdAt !== undefined &&
            responseData.cvData !== undefined
          ) {
            setCurrCV({
              resumeID: res.data.cv.resumeID,
              createdAt: res.data.cv.createdAt,
              cvData: {
                selectedTemplate: `template${id}`,
                selectedFontSize: resumeFontSize,
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
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleTemplateSelect = async () => {
    setActiveTemplate(`template${id}`);
    const uniqueProjectID = uuidv4();

    //Before moving to editor, push the new project info to db
    await handleCreateCV(uniqueProjectID);

    //now move to editor
    push(`/editor/${uniqueProjectID}`);
  };

  return (
    <>
      <div
        onClick={handleTemplateSelect}
        className="relative h-fit w-fit border border-gray-300 shadow-md rounded-md flex cursor-pointer hover:border-orange-500 ease-in-out duration-200"
      >
        <div className="w-[200px] h-[300px] rounded-md">
          <img
            src={img}
            alt=""
            className="object-contain rounded-md h-full w-full"
          />
        </div>
      </div>
    </>
  );
};

const FloatingButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "black";
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Detect screen size changes to update isVisible state
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check visibility on initial render

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    isVisible && (
      <>
        <button
          onClick={openModal}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 px-4 rounded-full shadow-md transition-colors"
        >
          <FaPlus size={20} />
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h2
              ref={(_subtitle) => (subtitle = _subtitle)}
              className={poppins.className + " font-bold text-[1rem]"}
            >
              Create New Resume
            </h2>
            <button onClick={closeModal}>
              <IoMdClose size={25} />
            </button>
          </div>
          <span className="text-xs">Select a Template of your choice</span>
          {/* New Resume Template Selection */}
          <div className="pt-5 flex justify-around gap-6 flex-wrap max-w-[500px] max-h-[300px] md:max-h-[600px] overflow-y-auto">
            {templateImages.map((item) => (
              <FloatingTemplateCard
                img={item.imgPath}
                key={item.id}
                id={item.id}
              />
            ))}
          </div>
        </Modal>
      </>
    )
  );
};

export default FloatingButton;
