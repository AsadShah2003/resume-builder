import React from "react";
import AddNewEducation from "./SubComponents/AddNewEducation";
import { MdDragHandle } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import HorizontalDivider from "./SubComponents/HorizontalDivider";
import { roboto } from "@/styles/fonts";

const Education = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div className="draggable__element" ref={setNodeRef} style={style}>
      <HorizontalDivider id={id} />
      <div className="flex gap-4 items-center mt-5">
        <MdDragHandle {...attributes} {...listeners} size={28} />
        <h1
          className={`w-fit text-[1.3rem] font-bold text-[#706F78] ${roboto.className}`}
        >
          Education
        </h1>
      </div>

      <p className="text-gray-600 text-sm mt-2">
        Add your education information
      </p>
      <AddNewEducation />
    </div>
  );
};

export default Education;
