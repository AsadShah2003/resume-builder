"use client";
import { lora, poppins, roboto } from "@/styles/fonts";
import React from "react";
import Modal from "react-modal";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { templateImages } from "@/utils/TemplateImages";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useResumeStore } from "@/lib/store/useResumeStore";


interface NewResumeTemplateCardProps {
  id: number;
  img: string;
}

export const NewResumeTemplateCard: React.FC<NewResumeTemplateCardProps> = ({
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
  } = useResumeStore();

  const handleCreateCV = async (resume_id: string) => {
    if (user && user.authorID) {
      const newCvData = {
        selectedTemplate: `template${id}`,
        selectedFontSize: resumeFontSize || 1,
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
        personalProfile: "",
      };

      const newResume = {
        resumeID: resume_id,
        createdAt: new Date().toISOString(),
        cvData: newCvData
      };

      setCurrCV(newResume);
      // Let's use useResumeStore.getState().setAllResumes or saveCurrentResume to add it
      // but actually setCurrCV and then saveCurrentResume handles it if we call saveCurrentResume, wait, we don't have access to saveCurrentResume directly from destructured. I'll just use the store directly.
      const store = useResumeStore.getState();
      store.setAllResumes([...store.allResumes, newResume]);
    }
  };
  const handleTemplateSelect = async () => {
    setActiveTemplate(`template${id}`);
    const uniqueProjectID = uuidv4();
    await handleCreateCV(uniqueProjectID);
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

const NewResumeDialog: React.FC = () => {
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

  return (
    <div>
      <button
        onClick={openModal}
        className="px-5 hidden md:flex justify-center items-center rounded-md bg-[#FE7A36] opacity-[0.9] hover:opacity-[0.8] text-white h-9"
      >
        <IoMdAdd size={20} />
        <span className={lora.className + " text-[.85rem] pl-2"}>
          Create Resume
        </span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="New Resume"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2
            ref={(_subtitle) => (subtitle = _subtitle)}
            className={poppins.className + " font-bold text-[1.3rem]"}
          >
            Create New Resume
          </h2>
          <button onClick={closeModal}>
            <IoMdClose size={25} />
          </button>
        </div>
        <span className="text-xs">Select a Template of your choice</span>
        {/* New Resume Template Selection */}
        <div className="pt-5 flex justify-around gap-6  flex-wrap max-w-[500px] max-h-[600px] overflow-y-auto">
          {templateImages.map((item) => (
            <NewResumeTemplateCard
              id={item.id}
              img={item.imgPath}
              key={item.id}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default NewResumeDialog;
