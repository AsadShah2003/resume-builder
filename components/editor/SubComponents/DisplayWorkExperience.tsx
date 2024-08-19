"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import DualInputFields from "./DualInputFields";
import InputField from "./InputField";
import { typeWorkExperience } from "@/lib/types/editor";
import { useGlobalContext } from "@/app/Context/store";
import CustomDatePicker from "./CustomDatePicker";
import WorkExperienceCheckbox from "./WorkExperienceCheckbox";
import { SanitizeInput } from "@/utils/SanitizeInput";
import { poppins } from "@/styles/fonts";
import WorkExpValidation from "@/utils/WorkExpValidation";

interface DisplayWorkExperienceProps {
  index: number;
  id: number;
  jobTitle: string;
  jobCompany: string;
  jobStartDate: string;
  jobEndDate?: string | null;
  isStillWorking?: boolean | null;
}

const DisplayWorkExperience: React.FC<DisplayWorkExperienceProps> = ({
  index,
  id,
  jobTitle,
  jobCompany,
  jobStartDate,
  jobEndDate,
  isStillWorking,
}) => {
  const {
    setWorkExperiece,
    workExperience,
    setWorkExpErrors,
    workExpErrors,
    setShowElements,
  } = useGlobalContext();
  const [isTryingToUpdate, setIsTryingToUpdate] = useState<boolean>(false);
  const [workExperienceUpdatedData, setWorkExperienceUpdatedData] =
    useState<typeWorkExperience>({
      id,
      jobTitle,
      jobCompany,
      jobStartDate,
      jobEndDate,
      isStillWorking,
      jobSummary: "",
    });

  const handleWorkExperienceDeletion = () => {
    const removeCurrWorkExperience = workExperience.filter(
      (experience) => experience.id !== id
    );
    setWorkExperiece([...removeCurrWorkExperience]);
    setShowElements((prev) => ({ ...prev, allowExpToShow: true }));
  };

  useEffect(() => {
    //init state of errors
    setWorkExpErrors({
      isJobCompanyEmpty: !workExperience[index].jobSummary ? true : false,
      isJobEndDateEmpty: !workExperience[index].jobEndDate ? true : false,
      isJobStartDateEmpty: !workExperience[index].jobStartDate ? true : false,
      isJobSummaryEmpty: !workExperience[index].jobSummary ? true : false,
      isJobTitleEmpty: !workExperience[index].jobTitle ? true : false,
    });

    setWorkExperienceUpdatedData({
      id: workExperience[index].id,
      jobCompany: workExperience[index].jobCompany,
      jobStartDate: workExperience[index].jobStartDate,
      jobEndDate: workExperience[index].jobEndDate,
      jobSummary: workExperience[index].jobSummary,
      jobTitle: workExperience[index].jobTitle,
      isStillWorking: workExperience[index].isStillWorking,
    });
  }, []);

  const handleWorkExperienceUpdate = () => {
    const errors = WorkExpValidation(workExperienceUpdatedData);
    console.log(errors);

    if (
      errors.isJobTitleEmpty ||
      errors.isJobCompanyEmpty ||
      errors.isJobStartDateEmpty ||
      errors.isJobEndDateEmpty ||
      errors.isJobSummaryEmpty
    ) {
      setWorkExpErrors(errors);
      return;
    }

    const experienceToUpdate = workExperience.find(
      (experience) => experience.id === id
    );

    if (experienceToUpdate) {
      // Update the work experience data
      const updatedExperience = {
        ...experienceToUpdate,
        jobTitle: workExperienceUpdatedData.jobTitle,
        jobCompany: workExperienceUpdatedData.jobCompany,
        jobStartDate: workExperienceUpdatedData.jobStartDate,
        jobEndDate: workExperienceUpdatedData.jobEndDate,
        isStillWorking: workExperienceUpdatedData.isStillWorking,
        jobSummary: workExperienceUpdatedData.jobSummary,
      };

      // Find the index of the work experience in the array
      const experienceIndex = workExperience.findIndex((e) => e.id === id);

      // Create a new array with the updated work experience
      const updatedExperiences = [...workExperience];
      updatedExperiences[experienceIndex] = updatedExperience;

      // Set the updated work experience array
      setWorkExperiece(updatedExperiences);

      // Reset the state variables
      setIsTryingToUpdate(false);
    }

    setShowElements((prev) => ({ ...prev, allowExpToShow: true }));
  };

  const handleIsTryingtoUpdate = () => {
    setShowElements((prev) => ({ ...prev, allowExpToShow: false }));
    setIsTryingToUpdate(!isTryingToUpdate);
  };

  const onFirstInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkExperienceUpdatedData((old) => ({
      ...old,
      jobTitle: SanitizeInput(e.target.value),
    }));
    if (e.target.value.length === 0) {
      setWorkExpErrors((old) => ({ ...old, isJobTitleEmpty: true }));
    }
    if (e.target.value.length > 0) {
      setWorkExpErrors((old) => ({ ...old, isJobTitleEmpty: false }));
    }
  };
  const onSecondInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkExperienceUpdatedData((old) => ({
      ...old,
      jobCompany: SanitizeInput(e.target.value),
    }));
    if (e.target.value.length === 0) {
      setWorkExpErrors((old) => ({ ...old, isJobCompanyEmpty: true }));
    }
    if (e.target.value.length > 0) {
      setWorkExpErrors((old) => ({ ...old, isJobCompanyEmpty: false }));
    }
  };
  const onSummaryChange = (e: any) => {
    setWorkExperienceUpdatedData((old) => ({
      ...old,
      jobSummary: SanitizeInput(e.target.value),
    }));
    if (e.target.value.length === 0) {
      setWorkExpErrors((old) => ({ ...old, isJobSummaryEmpty: true }));
    }
    if (e.target.value.length > 0) {
      setWorkExpErrors((old) => ({ ...old, isJobSummaryEmpty: false }));
    }
  };
  return (
    <>
      <div className="mt-5 w-full border flex items-center justify-between border-gray-300 px-3 py-4 rounded-md">
        <span className="text-sm truncate max-w-[350px]">
          {`${jobTitle} - ${jobCompany} (${jobStartDate} - ${
            isStillWorking === true
              ? "Current"
              : isStillWorking === undefined
              ? jobEndDate
              : isStillWorking === null
              ? jobEndDate
              : jobEndDate
          })`}
        </span>
        <div className="flex gap-6 items-center">
          <RiDeleteBin6Line
            onClick={handleWorkExperienceDeletion}
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
              firstInputlabelTitle="Job Title"
              onFirstInputChange={onFirstInputChange}
              errorLabelForFirstInput={
                workExpErrors.isJobTitleEmpty
                  ? "Job Title is required Field!"
                  : ""
              }
              errorLabelForSecondInput={
                workExpErrors.isJobCompanyEmpty
                  ? "Job Company is required Field!"
                  : ""
              }
              firstInputValue={workExperienceUpdatedData.jobTitle}
              secondInputValue={workExperienceUpdatedData.jobCompany}
              secondInputlabelTitle="Company"
              onSecondInputChange={onSecondInputChange}
            />
            <div className="flex gap-3.5">
              <CustomDatePicker
                dateLabel="Start Date"
                setUserWorkExp={setWorkExperienceUpdatedData}
                errorLabel={
                  workExpErrors.isJobStartDateEmpty
                    ? "Start Date is required!"
                    : ""
                }
              />
              {workExperienceUpdatedData.isStillWorking === false && (
                <CustomDatePicker
                  dateLabel="End Date"
                  setUserWorkExp={setWorkExperienceUpdatedData}
                  errorLabel={
                    workExpErrors.isJobEndDateEmpty
                      ? "End Date is required!"
                      : ""
                  }
                />
              )}
            </div>

            <div className="flex flex-col mt-6 w-full">
              <label htmlFor="work-exp-summary">Summary</label>
              <textarea
                id="work-exp-summary"
                rows={4}
                value={workExperienceUpdatedData.jobSummary}
                onChange={onSummaryChange}
                className="w-full outline-none p-2 resize-none border border-gray-300 mt-1"
              ></textarea>
              {workExpErrors.isJobSummaryEmpty ? (
                <span
                  className={
                    poppins.className + " text-red-500 text-xs relative top-2"
                  }
                >
                  Job Summary is required field!
                </span>
              ) : null}
            </div>
            <WorkExperienceCheckbox
              labelText="I'm still working on this role"
              setUserWorkExp={setWorkExperienceUpdatedData}
              isWorking={
                workExperienceUpdatedData.isStillWorking || isStillWorking
              }
            />
            <button
              onClick={handleWorkExperienceUpdate}
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

export default DisplayWorkExperience;
