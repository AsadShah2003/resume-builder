import React, { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.min.css";
import { typeEducation } from "@/lib/types/editor";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import { inter, poppins } from "@/styles/fonts";
import { useGlobalContext } from "@/app/Context/store";

interface EducationDatePickerProps {
  dateLabel: string;
  setUserEducation: React.Dispatch<React.SetStateAction<typeEducation>>;
  errorLabel?: string | undefined;
}

const EducationDatePicker: React.FC<EducationDatePickerProps> = ({
  dateLabel,
  setUserEducation,
  errorLabel,
}) => {
  const { setEduErrors } = useGlobalContext();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openDatePicker = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const UpdateInputDate = (date: Date | null) => {
    setStartDate(date);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      if (dateLabel === "Start Date") {
        setEduErrors((old) => ({
          ...old,
          isStartDateEmpty: false,
        }));
      }
      if (dateLabel === "End Date") {
        setEduErrors((old) => ({
          ...old,
          isEndDateEmpty: false,
        }));
      }
      const formattedDate = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
      setStartDate(date); // Update the startDate state
      //setting the relevant date based on the label passed
      switch (dateLabel) {
        case "Start Date":
          setUserEducation((old) => ({
            ...old,
            educationStartDate: formattedDate,
          }));
          break;
        case "End Date":
          setUserEducation((old) => ({
            ...old,
            educationEndDate: formattedDate,
          }));
          break;
      }
    }
  };

  return (
    <>
      <div className="relative flex-[1] flex flex-col px-1 mt-5">
        <DatePicker
          selected={startDate}
          showYearDropdown
          showMonthDropdown
          onChange={(date) => handleDateChange(date)}
          customInput={
            <div className="flex flex-col gap-1">
              <label htmlFor="">{dateLabel}</label>
              <input
                ref={inputRef}
                value={startDate ? startDate.toLocaleDateString() : ""}
                className={`${inter.className} py-3.5 border border-gray-300 rounded focus:outline-none focus:border-orange-500`}
                style={{ textAlign: "center" }}
                onClick={openDatePicker}
                onChange={() => UpdateInputDate(startDate)}
              />
            </div>
          }
          popperClassName="datepicker-popper"
          dateFormat="MM/yyyy"
          dropdownMode="select"
          wrapperClassName="date-picker-wrapper"
        />
        <FaCalendarAlt
          className="relative bottom-9 left-9 cursor-pointer"
          onClick={openDatePicker}
        />
        {errorLabel && (
          <span
            className={
              poppins.className + " text-red-500 text-xs relative top-0"
            }
          >
            {errorLabel}
          </span>
        )}
      </div>
    </>
  );
};

export default EducationDatePicker;
