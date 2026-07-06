import React from "react";
import AddNewSocialLink from "./SubComponents/AddNewSocialLink";
import { roboto } from "@/styles/fonts";

const SocialLinks = ({ id }: { id: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all hover:shadow-md">
      <div className="flex items-center mb-2">
        <h2 className={`text-xl font-bold text-gray-800 ${roboto.className}`}>
          Social Links
        </h2>
      </div>

      <p className="text-gray-500 text-sm mb-6">
        Add your social links like LinkedIn, Twitter, etc.
      </p>
      <AddNewSocialLink />
    </div>
  );
};

export default SocialLinks;
