import { useResumeStore } from "@/lib/store/useResumeStore";
import React from "react";

const PersonalProfile = ({ profile }: { profile: string }) => {
  const { resumeFontSize } = useResumeStore();
  return (
    <p
      className={`${
        resumeFontSize === 1
          ? "text-[7px]"
          : resumeFontSize === 2
          ? "text-[8px]"
          : resumeFontSize === 3
          ? "text-[9px]"
          : ""
      } max-w-[350px] break-words mt-2.5`}
    >
      {profile}
    </p>
  );
};

export default PersonalProfile;
