"use client";
import React from "react";
import PersonalDetails from "./PersonalDetails";
import SocialLinks from "./SocialLinks";
import Skills from "./Skills";
import PersonalProfile from "./PersonalProfile";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Languages from "./Languages";

const ResumeEditor = () => {
  return (
    <div className="overflow-y-auto overflow-x-hidden pt-8 pb-20 w-full bg-slate-50 xs:pl-[80px] relative z-0">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <PersonalDetails />
          <PersonalProfile id="personalprofile" />
          <WorkExperience id="workexperience" />
          <Education id="education" />
          <Skills id="skills" />
          <Languages id="languages" />
          <SocialLinks id="sociallinks" />
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
