"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useGlobalContext } from "@/app/Context/store";
import DualInputFields from "./DualInputFields";
import CustomDatePicker from "./CustomDatePicker";
import { typeWorkExperience } from "@/lib/types/editor";
import WorkExperienceCheckbox from "./WorkExperienceCheckbox";
import DisplayWorkExperience from "./DisplayWorkExperience";
import { poppins, roboto } from "@/styles/fonts";
import { SanitizeInput } from "@/utils/SanitizeInput";
import WorkExpValidation from "@/utils/WorkExpValidation";

interface NewWorkExperienceProps {
  setShowExperienceElement: () => void;
}

const NewWorkExperience: React.FC<NewWorkExperienceProps> = ({
  setShowExperienceElement,
}) => {
  const { workExperience, setWorkExperiece, workExpErrors, setWorkExpErrors } =
    useGlobalContext();

  //state for storing the work experience
  const [userWorkExp, setUserWorkExp] = useState<typeWorkExperience>({
    id: workExperience.length + 1,
    jobTitle: "",
    jobCompany: "",
    jobStartDate: "",
    jobEndDate: "",
    isStillWorking: false,
    jobSummary: "",
  });

  const handleAdd = () => {
    const errors = WorkExpValidation(userWorkExp);
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
    //add the state variable holding the date of the work experience to context
    console.log(userWorkExp);
    setWorkExperiece([...workExperience, userWorkExp]);

    //hide the input field
    setShowExperienceElement();

    //reset state
    setWorkExpErrors({
      isJobCompanyEmpty: false,
      isJobEndDateEmpty: false,
      isJobStartDateEmpty: false,
      isJobSummaryEmpty: false,
      isJobTitleEmpty: false,
    });
  };

  const onFirstInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserWorkExp((old) => ({
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
    setUserWorkExp((old) => ({
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
    setUserWorkExp((old) => ({
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

  useEffect(() => {
    return () => {
      setWorkExpErrors({
        isJobCompanyEmpty: false,
        isJobEndDateEmpty: false,
        isJobStartDateEmpty: false,
        isJobSummaryEmpty: false,
        isJobTitleEmpty: false,
      });
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <DualInputFields
        firstInputlabelTitle="Job Title"
        onFirstInputChange={onFirstInputChange}
        errorLabelForFirstInput={
          workExpErrors.isJobTitleEmpty ? "Job Title is required Field!" : ""
        }
        errorLabelForSecondInput={
          workExpErrors.isJobCompanyEmpty
            ? "Job Company is required Field!"
            : ""
        }
        secondInputlabelTitle="Company"
        onSecondInputChange={onSecondInputChange}
      />
      <div className="flex gap-3.5">
        <CustomDatePicker
          dateLabel="Start Date"
          setUserWorkExp={setUserWorkExp}
          errorLabel={
            workExpErrors.isJobStartDateEmpty ? "Start Date is required!" : ""
          }
        />
        {userWorkExp.isStillWorking === false && (
          <CustomDatePicker
            dateLabel="End Date"
            setUserWorkExp={setUserWorkExp}
            errorLabel={
              workExpErrors.isJobEndDateEmpty ? "End Date is required!" : ""
            }
          />
        )}
      </div>
      <div className="flex flex-col mt-6 w-full">
        <label htmlFor="work-exp-summary">Summary</label>
        <textarea
          id="work-exp-summary"
          rows={4}
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
        isWorking={false}
        setUserWorkExp={setUserWorkExp}
      />
      <button
        onClick={handleAdd}
        className="self-end h-[3.1rem] mt-5 w-32 bg-orange-600 hover:bg-orange-500 duration-150 text-white rounded-md"
      >
        Add
      </button>
    </div>
  );
};

const AddNewWorkExperience: React.FC = () => {
  const { workExperience, showElements } = useGlobalContext();
  //states to show/hide the new element
  const [showExperienceElement, setShowExperienceElement] =
    useState<boolean>(false);
  //other states
  const [isLinkHovered, setIsLinkHovered] = useState<boolean>(false);

  const handleShowExperienceElement = () => {
    setShowExperienceElement(!showExperienceElement);
  };

  return (
    <>
      {/* WRAPPER FOR SHOWING ALL SOCIAL LINKS*/}
      {workExperience &&
        workExperience.map((expertise, idx) => (
          <DisplayWorkExperience
            index={idx}
            id={expertise.id}
            jobCompany={expertise.jobCompany}
            jobStartDate={expertise.jobStartDate}
            jobEndDate={expertise.jobEndDate}
            jobTitle={expertise.jobTitle}
            isStillWorking={expertise.isStillWorking}
            key={expertise.id}
          />
        ))}
      <div
        className={`${
          isLinkHovered ? "bg-[#ffe8d6]" : "bg-[#fde5d2]"
        } w-fit  mt-5 py-1.5 px-3 flex gap-3 items-center rounded-lg relative cursor-pointer`}
        onMouseEnter={() => setIsLinkHovered(!isLinkHovered)}
        onClick={handleShowExperienceElement}
        onMouseLeave={() => setIsLinkHovered(!isLinkHovered)}
      >
        <button className="max-w-[220px] py-0.5 px-5 rounded-sm">
          <span className="ml-6 text-orange-500 text-[.9rem] font-medium">
            Add Work
          </span>
        </button>

        <IoAddOutline
          className={
            roboto.className + " absolute text-orange-500 left-5 top-2"
          }
          size={24}
        />
      </div>
      {/* WRAPPER FOR ADDING SOCIAL LINK*/}
      {showExperienceElement && showElements.allowExpToShow && (
        <>
          <div className="mt-0 w-full">
            <NewWorkExperience
              setShowExperienceElement={handleShowExperienceElement}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AddNewWorkExperience;
