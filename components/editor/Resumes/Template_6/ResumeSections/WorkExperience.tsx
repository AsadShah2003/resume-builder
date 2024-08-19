import { useGlobalContext } from "@/app/Context/store";
import React from "react";

const WorkExperience = ({
  jobtitle,
  company,
  startdate,
  enddate,
  summary,
}: {
  jobtitle: string;
  company: string;
  startdate: string;
  enddate: string | null | undefined;
  summary: string;
}) => {
  const { resumeFontSize } = useGlobalContext();
  return (
    <>
      <div className="mt-1.5">
        <div className="flex flex-col gap-1.5">
          <h2
            className={`${
              resumeFontSize === 1
                ? "text-[7px]"
                : resumeFontSize === 2
                ? "text-[8px]"
                : resumeFontSize === 3
                ? "text-[9px]"
                : ""
            } font-extrabold max-w-[350px] break-words`}
          >
            {company}
          </h2>
          <span
            className={`${
              resumeFontSize === 1
                ? "text-[7px]"
                : resumeFontSize === 2
                ? "text-[8px]"
                : resumeFontSize === 3
                ? "text-[9px]"
                : ""
            } font-semibold  max-w-[350px] break-words`}
          >
            {jobtitle}
          </span>
          <span
            className={`${
              resumeFontSize === 1
                ? "text-[7px]"
                : resumeFontSize === 2
                ? "text-[8px]"
                : resumeFontSize === 3
                ? "text-[9px]"
                : ""
            } font-medium`}
          >
            {startdate} - {!enddate ? "Current" : enddate}
          </span>
          <p
            className={`${
              resumeFontSize === 1
                ? "text-[7px]"
                : resumeFontSize === 2
                ? "text-[8px]"
                : resumeFontSize === 3
                ? "text-[9px]"
                : ""
            } font-medium  max-w-[350px] break-words`}
          >
            {summary}
          </p>
        </div>
      </div>
    </>
  );
};

export default WorkExperience;
