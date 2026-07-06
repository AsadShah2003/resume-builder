"use client";

import React from "react";
import DualInputFields from "./SubComponents/DualInputFields";
import PhotoSelector from "./SubComponents/PhotoSelector";
import InputField from "./SubComponents/InputField";
import { roboto } from "@/styles/fonts";
import { useResumeStore } from "@/lib/store/useResumeStore";
import Checkbox from "./SubComponents/Checkbox";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { SanitizeInput } from "@/utils/SanitizeInput";

const PersonalDetails: React.FC = () => {
  const personalDetails = useResumeStore((state) => state.personalDetails);
  const setPersonalDetails = useResumeStore((state) => state.setPersonalDetails);
  const hideProfileImage = useResumeStore((state) => state.hideProfileImage);
  const setHideProfileImage = useResumeStore((state) => state.setHideProfileImage);
  const { push } = useRouter();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all hover:shadow-md relative">
      <div className="cursor-pointer xs:hidden absolute top-4 right-4">
        <IoArrowBack size={25} onClick={() => push("/")} className="text-gray-500 hover:text-gray-800" />
      </div>

      <div className="flex items-center mb-6">
        <h2 className={`text-xl font-bold text-gray-800 ${roboto.className}`}>
          Personal Details
        </h2>
      </div>
      
      <div className="flex flex-col w-full gap-4">
        <DualInputFields
          firstInputlabelTitle="First name"
          secondInputlabelTitle="Last name"
          firstInputValue={personalDetails.fname || ""}
          secondInputValue={personalDetails.lname || ""}
          onFirstInputChange={(e) =>
            setPersonalDetails((old) => ({
              ...old,
              fname: SanitizeInput(e.target.value),
            }))
          }
          onSecondInputChange={(e) =>
            setPersonalDetails((old) => ({
              ...old,
              lname: SanitizeInput(e.target.value),
            }))
          }
        />
        <PhotoSelector />
        <Checkbox
          label="Hide Profile Image"
          checked={hideProfileImage}
          onChange={setHideProfileImage}
        />
        <InputField
          labelTitle="Email"
          InputValue={personalDetails.email || ""}
          onChange={(e) =>
            setPersonalDetails((old) => ({
              ...old,
              email: SanitizeInput(e.target.value),
            }))
          }
        />
        <InputField
          labelTitle="Role"
          InputValue={personalDetails.role || ""}
          onChange={(e) =>
            setPersonalDetails((old) => ({
              ...old,
              role: SanitizeInput(e.target.value),
            }))
          }
        />
        <InputField
          labelTitle="Address"
          InputValue={personalDetails.address || ""}
          onChange={(e) =>
            setPersonalDetails((old) => ({
              ...old,
              address: SanitizeInput(e.target.value),
            }))
          }
        />
        <InputField
          labelTitle="Phone"
          InputValue={personalDetails.phone || ""}
          onChange={(e) =>
            setPersonalDetails((old) => ({
              ...old,
              phone: SanitizeInput(e.target.value),
            }))
          }
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
