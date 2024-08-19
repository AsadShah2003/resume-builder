"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useGlobalContext } from "@/app/Context/store";
import DualInputFields from "./DualInputFields";
import EducationDatePicker from "./EducationDatePicker";
import { typeEducation } from "@/lib/types/editor";
import EducationCheckbox from "./EducationCheckbox";
import DisplayEducation from "./DisplayEducation";
import { roboto } from "@/styles/fonts";
import { SanitizeInput } from "@/utils/SanitizeInput";
import EduValidation from "@/utils/EduValidation";

interface NewEducationProps {
  setShowEducationElement: () => void;
}

const NewEducation: React.FC<NewEducationProps> = ({
  setShowEducationElement,
}) => {
  const { education, setEducation, eduErrors, setEduErrors } =
    useGlobalContext();

  //state for storing the work experience
  const [userEducation, setUserEducation] = useState<typeEducation>({
    id: education.length + 1,
    educationInstitute: "",
    educationDegree: "",
    educationStartDate: "",
    educationEndDate: "",
    isStillStudying: false,
  });

  const handleAdd = () => {
    const errors = EduValidation(userEducation);
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

    console.log(userEducation);
    setEducation([...education, userEducation]);

    setShowEducationElement();

    //reset state
    setEduErrors({
      isDegreeEmpty: false,
      isEndDateEmpty: false,
      isInstituteEmpty: false,
      isStartDateEmpty: false,
    });
  };

  const onFirstInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEducation((old) => ({
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
    setUserEducation((old) => ({
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
    return () => {
      setEduErrors({
        isDegreeEmpty: false,
        isEndDateEmpty: false,
        isInstituteEmpty: false,
        isStartDateEmpty: false,
      });
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <DualInputFields
        firstInputlabelTitle="Institution"
        // firstInputValue={userEducation.educationInstitute}
        onFirstInputChange={onFirstInputChange}
        secondInputlabelTitle="Degree"
        // secondInputValue={userEducation.educationDegree}
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
          setUserEducation={setUserEducation}
          errorLabel={
            eduErrors.isStartDateEmpty ? "Start Date is required!" : ""
          }
        />
        {userEducation.isStillStudying === false && (
          <EducationDatePicker
            dateLabel="End Date"
            setUserEducation={setUserEducation}
            errorLabel={eduErrors.isEndDateEmpty ? "End Date is required!" : ""}
          />
        )}
      </div>

      <EducationCheckbox
        isStudying={false}
        labelText="I'm still studying"
        setUserEducation={setUserEducation}
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

const AddNewEducation: React.FC = () => {
  const { education, showElements } = useGlobalContext();
  //states to show/hide the new element
  const [showEducationElement, setShowEducationElement] =
    useState<boolean>(false);
  //other states
  const [isLinkHovered, setIsLinkHovered] = useState<boolean>(false);

  const handleShowEducationElement = () => {
    setShowEducationElement(!showEducationElement);
  };

  return (
    <>
      {/* WRAPPER FOR SHOWING ALL SOCIAL LINKS*/}
      {education &&
        education.map((edu, idx) => (
          <DisplayEducation
            index={idx}
            key={edu.id}
            id={edu.id}
            eduDegree={edu.educationDegree}
            eduEndDate={edu.educationEndDate}
            eduInstitute={edu.educationInstitute}
            eduStartDate={edu.educationStartDate}
            isStudying={edu.isStillStudying}
          />
        ))}
      <div
        className={`${
          isLinkHovered ? "bg-[#ffe8d6]" : "bg-[#fde5d2]"
        } w-fit  mt-5 py-1.5 px-3 flex gap-3 items-center rounded-lg relative cursor-pointer`}
        onMouseEnter={() => setIsLinkHovered(!isLinkHovered)}
        onClick={handleShowEducationElement}
        onMouseLeave={() => setIsLinkHovered(!isLinkHovered)}
      >
        <button className="max-w-[180px] py-0.5 px-5 rounded-sm">
          <span className="ml-6 text-orange-500 text-[.9rem] font-medium">
            Add Education
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
      {showEducationElement && showElements.allowEduToShow && (
        <>
          <div className="mt-0 w-full">
            <NewEducation
              setShowEducationElement={handleShowEducationElement}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AddNewEducation;
