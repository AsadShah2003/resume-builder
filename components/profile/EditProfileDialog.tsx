"use client";
import { lora, poppins } from "@/styles/fonts";
import React from "react";
import Modal, { setAppElement } from "react-modal";
import { IoMdClose } from "react-icons/io";
import DualInputFields from "../editor/SubComponents/DualInputFields";
import InputField from "../editor/SubComponents/InputField";
import ChangeImage from "./ChangeImage";

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

const EditProfileDialog: React.FC = () => {
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
        className="px-3 w-24 flex justify-center items-center rounded-md bg-[#FE7A36] opacity-[0.9] hover:opacity-[0.8] text-white h-9"
      >
        <span className={lora.className + " text-[.85rem]"}>Edit</span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2
            ref={(_subtitle) => (subtitle = _subtitle)}
            className={poppins.className + " font-bold text-[1rem]"}
          >
            Editing Profile
          </h2>
          <button onClick={closeModal}>
            <IoMdClose size={25} />
          </button>
        </div>
        {/* EDIT FORM */}
        <form>
          <DualInputFields
            firstInputlabelTitle="First Name"
            secondInputlabelTitle="Last Name"
          />
          <DualInputFields
            firstInputlabelTitle="Job Title"
            secondInputlabelTitle="Email"
          />
          <InputField labelTitle="Phone Number" />
          <ChangeImage />
          {/* SUBMIT AND CANCEL BUTTONS */}
          <div className="mt-4 w-full flex justify-end">
            <div className="flex gap-4 items-center">
              <button
                className={
                  lora.className +
                  " py-2 text-[.8rem] px-7 rounded-md hover:opacity-[0.9] border border-blue-500 text-blue-500"
                }
              >
                Cancel
              </button>
              <button
                className={
                  lora.className +
                  " py-2 text-[.8rem] px-7 rounded-md hover:opacity-[0.9] bg-blue-500 text-white"
                }
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditProfileDialog;
