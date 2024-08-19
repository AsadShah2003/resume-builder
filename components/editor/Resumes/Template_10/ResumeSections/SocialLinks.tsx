import { useGlobalContext } from "@/app/Context/store";
import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
import { IoLink } from "react-icons/io5";

const SocialLinks = ({
  link,
  logotype,
}: {
  link: string;
  logotype: string;
}) => {
  const { resumeFontSize } = useGlobalContext();
  return (
    <div className="mt-2.5 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <span className="text-xs font-bold self-start mt-0.5">
          {logotype === "linkedin" ? (
            <span className="k-icon k-font-icon k k-i-linkedin k-icon-xs"></span>
          ) : logotype === "facebook" ? (
            <span className="k-icon k-font-icon k k-i-facebook-box k-icon-xs"></span>
          ) : logotype === "github" ? (
            <span className="k-icon k-font-icon k k-i-globe-outline k-icon-xs"></span>
          ) : logotype === "website" ? (
            <span className="k-icon k-font-icon k k-i-pin k-icon-xs"></span>
          ) : logotype === "youtube" ? (
            <span className="k-icon k-font-icon k k-i-youtube k-icon-xs"></span>
          ) : (
            logotype === "twitter" && (
              <span className="k-icon k-font-icon k k-i-twitter k-icon-xs"></span>
            )
          )}
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
          } max-w-[210px] break-words self-center`}
        >
          {link}
        </p>
      </div>
    </div>
  );
};

export default SocialLinks;
