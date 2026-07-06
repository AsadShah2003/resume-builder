import { useResumeStore } from "@/lib/store/useResumeStore";
import React from "react";

const PersonalProfile = ({ profile }: { profile: string }) => {
  const { resumeFontSize } = useResumeStore();
  return (
    <p
      className={`${
        resumeFontSize === 1
          ? "text-[.55rem]"
          : resumeFontSize === 2
          ? "text-[.58rem]"
          : resumeFontSize === 3
          ? "text-[.62rem]"
          : ""
      } max-w-[400px] break-words mt-2.5`}
    >
      {profile}
    </p>
  );
};

export default PersonalProfile;
