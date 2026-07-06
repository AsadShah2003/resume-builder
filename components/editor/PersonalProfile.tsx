"use client";

import React from "react";
import { poppins, roboto } from "@/styles/fonts";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { SanitizeInput } from "@/utils/SanitizeInput";

const PersonalProfile = ({ id }: { id: string }) => {
  const setPersonalProfile = useResumeStore((state) => state.setPersonalProfile);
  const personalProfile = useResumeStore((state) => state.personalProfile);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all hover:shadow-md">
      <div className="flex items-center mb-2">
        <h2 className={`text-xl font-bold text-gray-800 ${roboto.className}`}>
          Personal Profile
        </h2>
      </div>

      <p className="text-gray-500 text-sm mb-6">
        Please introduce yourself in max 5 or 6 lines.
      </p>

      <textarea
        rows={6}
        value={personalProfile || ""}
        onChange={(e) => setPersonalProfile(SanitizeInput(e.target.value))}
        className={
          poppins.className +
          " w-full outline-none p-4 resize-none border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors bg-gray-50 hover:bg-white"
        }
        placeholder="e.g. A passionate software engineer with..."
      ></textarea>
    </div>
  );
};

export default PersonalProfile;
