import React from "react";
import AddNewEducation from "./SubComponents/AddNewEducation";
import { roboto } from "@/styles/fonts";

const Education = ({ id }: { id: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all hover:shadow-md">
      <div className="flex items-center mb-2">
        <h2 className={`text-xl font-bold text-gray-800 ${roboto.className}`}>
          Education
        </h2>
      </div>

      <p className="text-gray-500 text-sm mb-6">
        Add your education information.
      </p>
      <AddNewEducation />
    </div>
  );
};

export default Education;
