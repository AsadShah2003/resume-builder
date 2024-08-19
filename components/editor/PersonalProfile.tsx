"use client";

import React from "react";
import { MdDragHandle } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import HorizontalDivider from "./SubComponents/HorizontalDivider";
import { poppins, roboto } from "@/styles/fonts";
import { useGlobalContext } from "@/app/Context/store";
import { SanitizeInput } from "@/utils/SanitizeInput";

const PersonalProfile = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const { setPersonalProfile, personalProfile } = useGlobalContext();

  return (
    <div className="z-[10] draggable__element" ref={setNodeRef} style={style}>
      <HorizontalDivider id={id} />
      <div className="flex gap-4 items-center mt-5">
        <MdDragHandle {...attributes} {...listeners} size={28} />
        <h1
          className={`w-fit text-[1.3rem] font-bold text-[#706F78] ${roboto.className}`}
        >
          Personal Profile
        </h1>
      </div>

      <p className="text-gray-600 text-sm mt-2">
        Please introduce yourself in max 5 or 6 lines
      </p>

      <textarea
        rows={8}
        value={personalProfile || ""}
        onChange={(e) => setPersonalProfile(SanitizeInput(e.target.value))}
        className={
          poppins.className +
          " w-full outline-none p-2 resize-none border border-gray-300 mt-4"
        }
      ></textarea>
    </div>
  );
};

export default PersonalProfile;
