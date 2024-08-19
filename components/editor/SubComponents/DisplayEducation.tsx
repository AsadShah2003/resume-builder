"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import DualInputFields from "./DualInputFields";

import { typeEducation } from "@/lib/types/editor";
import { useGlobalContext } from "@/app/Context/store";

import EducationCheckbox from "./EducationCheckbox";
import EducationDatePicker from "./EducationDatePicker";
import { SanitizeInput } from "@/utils/SanitizeInput";
import EduValidation from "@/utils/EduValidation";

interface DisplayEducationProps {
  index: number;
  id: number;
  eduInstitute: string;
  eduDegree: string;
  eduStartDate: string;
  eduEndDate: string | null | undefined;
  isStudying: boolean | null | undefined;
}

const DisplayEducation: React.FC<DisplayEducationProps> = ({
  index,
  id,
  eduInstitute,
  eduDegree,
  eduEndDate,
  isStudying,
  eduStartDate,
}) => {
  const { setEducation, education, setShowElements, setEduErrors, eduErrors } =
    useGlobalContext();
  const [isTryingToUpdate, setIsTryingToUpdate] = useState<boolean>(false);
  const [educationUpdatedData, setEducationUpdatedData] =
    useState<typeEducation>({
      id,
      educationInstitute: "",
      educationDegree: "",
      educationStartDate: "",
      educationEndDate: "",
      isStillStudying: false,
    });

  const handleEducationDeletion = () => {
    const removeEducation = education.filter((edu) => edu.id !== id);
    setEducation([...removeEducation]);
    setShowElements((prev) => ({ ...prev, allowEduToShow: true }));
  };

  const handleEducationUpdate = () => {
    const errors = EduValidation(educationUpdatedData);
    console.log(errors);
    if (
      errors.isDegreeEmpty ||
      errors.isEndDateEmpty ||
      errors.isInstituteEmpty ||
      errors.isStartDateEmpty
    ) {
      setEduErrors(errors);
      return;
    }

    const eduToUpdate = education.find((edu) => edu.id === id);
    if (eduToUpdate) {
      // Update the work experience data
      const updatedEducation = {
        ...eduToUpdate,
        educationInstitute: educationUpdatedData.educationInstitute,
        educationDegree: educationUpdatedData.educationDegree,
        educationStartDate: educationUpdatedData.educationStartDate,
        educationEndDate: educationUpdatedData.educationEndDate,
        isStillStudying: educationUpdatedData.isStillStudying,
      };

      // Find the index of the work experience in the array
      const eduIndex = education.findIndex((edu) => edu.id === id);

      // Create a new array with the updated work experience
      const updatedEducations = [...education];
      updatedEducations[eduIndex] = updatedEducation;

      // Set the updated work experience array
      setEducation(updatedEducations);

      // Reset the state variables
      setIsTryingToUpdate(false);
    }
    //reset state
    setShowElements((prev) => ({ ...prev, allowEduToShow: true }));
  };

  const handleIsTryingtoUpdate = () => {
    setShowElements((prev) => ({ ...prev, allowEduToShow: false }));
    setIsTryingToUpdate(!isTryingToUpdate);
  };

  const onFirstInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEducationUpdatedData((old) => ({
      ...old,
      educationInstitute: SanitizeInput(e.target.value),
    }));
    if (e.target.value.length === 0) {
      setEduErrors((old) => ({ ...old, isInstituteEmpty: true }));
    }
    if (e.target.value.length > 0) {
      setEduErrors((old) => ({ ...old, isInstituteEmpty: false }));
    }
  };

  const onSecondInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEducationUpdatedData((old) => ({
      ...old,
      educationDegree: SanitizeInput(e.target.value),
    }));
    if (e.target.value.length === 0) {
      setEduErrors((old) => ({ ...old, isDegreeEmpty: true }));
    }
    if (e.target.value.length > 0) {
      setEduErrors((old) => ({ ...old, isDegreeEmpty: false }));
    }
  };

  useEffect(() => {
    setEducationUpdatedData({
      educationDegree: education[index].educationDegree,
      educationInstitute: education[index].educationInstitute,
      educationStartDate: education[index].educationStartDate,
      educationEndDate: education[index].educationEndDate,
      isStillStudying: education[index].isStillStudying,
      id: education[index].id,
    });
  }, []);

  return (
    <>
      <div className="mt-5 w-full border flex items-center justify-between border-gray-300 px-3 py-4 rounded-md">
        <span className="text-sm max-w-[350px] truncate">{`${eduDegree}`}</span>
        <div className="flex gap-6 items-center">
          <RiDeleteBin6Line
            onClick={handleEducationDeletion}
            className="cursor-pointer"
            size={22}
          />
          <GoPencil
            onClick={handleIsTryingtoUpdate}
            className="cursor-pointer"
            size={21}
          />
        </div>
      </div>
      {isTryingToUpdate && (
        <>
          <div className="w-full mt-2 flex flex-col">
            <DualInputFields
              firstInputlabelTitle="Institution"
              firstInputValue={educationUpdatedData.educationInstitute}
              onFirstInputChange={onFirstInputChange}
              secondInputlabelTitle="Degree"
              secondInputValue={educationUpdatedData.educationDegree}
              onSecondInputChange={onSecondInputChange}
              errorLabelForFirstInput={
                eduErrors.isInstituteEmpty ? "Institute is required Field!" : ""
              }
              errorLabelForSecondInput={
                eduErrors.isDegreeEmpty ? "Degree is required Field!" : ""
              }
            />
            <div className="flex gap-3.5">
              <EducationDatePicker
                dateLabel="Start Date"
                setUserEducation={setEducationUpdatedData}
                errorLabel={
                  eduErrors.isStartDateEmpty ? "Start Date is required!" : ""
                }
              />
              {educationUpdatedData.isStillStudying === false && (
                <EducationDatePicker
                  dateLabel="End Date"
                  setUserEducation={setEducationUpdatedData}
                  errorLabel={
                    eduErrors.isEndDateEmpty ? "End Date is required!" : ""
                  }
                />
              )}
            </div>
            <EducationCheckbox
              labelText="I'm still studying"
              setUserEducation={setEducationUpdatedData}
              isStudying={educationUpdatedData.isStillStudying || isStudying}
            />
            <button
              onClick={handleEducationUpdate}
              className="self-end h-[3.1rem] mt-4 w-32 bg-orange-600 hover:bg-orange-500 duration-150 text-white rounded-md"
            >
              Update
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DisplayEducation;
