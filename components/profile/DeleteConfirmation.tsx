import { lora, poppins } from "@/styles/fonts";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "react-modal";

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

export function DeleteConfirmation({ deleteHandler }: { deleteHandler: any }) {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#00000";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <RiDeleteBin6Line size={21} onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Delete Resume"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2
            ref={(_subtitle) => (subtitle = _subtitle)}
            className={poppins.className + " font-semibold  text-[.9rem]"}
          >
            Delete Resume
          </h2>
          <button onClick={closeModal}>
            <IoMdClose size={25} />
          </button>
        </div>

        <div className="pt-5 w-full flex flex-col gap-5">
          <h1>Are you sure you want to delete the resume?</h1>
          <div className="self-end flex items-center gap-3">
            <button
              onClick={closeModal}
              className={
                lora.className +
                " py-2 text-[.8rem] px-7 rounded-md hover:opacity-[0.9] border border-blue-500 text-blue-500"
              }
            >
              No
            </button>
            <button
              onClick={deleteHandler}
              className={
                lora.className +
                " py-2 text-[.8rem] px-7 rounded-md hover:opacity-[0.9] bg-blue-500 text-white"
              }
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
