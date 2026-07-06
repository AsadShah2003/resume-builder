import { lora, poppins } from "@/styles/fonts";
import React from "react";

const UserDetails = () => {
  return (
    <div className="flex flex-col pt-2 gap-3.5">
      {/* NAME AND ROLE */}
      <div className="md:self-start self-center flex flex-col gap-1">
        <h1 className={poppins.className + " text-2xl font-semibold"}>
          Jane Doe
        </h1>
        <div className="bg-[#EBEBEC] rounded-full mt-1 w-fit max-w-48 text-slate-700 text-wrap px-3.5 py-1 flex items-center">
          <span className={lora.className + " text-xs"}>Product Designer</span>
        </div>
      </div>
      {/* REMAINING DETAILS */}
      <div className="pt-2 flex md:flex-row flex-col self-center gap-5 md:gap-8">
        {/* PHONE NUMBER */}
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className={poppins.className + " text-[.75rem] font-semibold"}>
            Phone Number
          </span>
          <p className={lora.className + " text-[.75rem]"}>+81 123 4567890</p>
        </div>
        {/* EMAIL */}
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className={poppins.className + " text-[.75rem] font-semibold"}>
            Email
          </span>
          <p className={lora.className + " text-[.75rem]"}>johndoe@gmail.com</p>
        </div>
        {/* LATEST LOGIN */}
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className={poppins.className + " text-[.75rem] font-semibold"}>
            Latest Login
          </span>
          <p className={lora.className + " text-[.75rem]"}>
            Mar 10, 2022 15:22
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
