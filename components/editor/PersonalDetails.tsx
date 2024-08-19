"use client";

import React from "react";
import DualInputFields from "./SubComponents/DualInputFields";
import PhotoSelector from "./SubComponents/PhotoSelector";
import InputField from "./SubComponents/InputField";
import { roboto } from "@/styles/fonts";
import { useGlobalContext } from "@/app/Context/store";
import Checkbox from "./SubComponents/Checkbox";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { SanitizeInput } from "@/utils/SanitizeInput";

const PersonalDetails: React.FC = () => {
  const {
    setPersonalDetails,
    personalDetails,
    hideProfileImage,
    setHideProfileImage,
  } = useGlobalContext();
  const { push } = useRouter();
  return (
    <>
      <div className="cursor-pointer xs:hidden">
        <IoArrowBack size={25} onClick={() => push("/")} />
      </div>

      <h1
        className={`w-fit mt-3 text-[1.3rem] font-bold text-[#706F78] ${roboto.className}`}
      >
        Personal Details
      </h1>
      <div className="flex flex-col w-full gap-3">
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
    </>
  );
};

export default PersonalDetails;
