"use client";
import DisplayResumes from "@/components/profile/DisplayResumes";
import FloatingButton from "@/components/profile/FloatingButton";
import ProfileHeader from "@/components/profile/ProfileHeader";
import UserDetails from "@/components/profile/UserDetails";
import UserImage from "@/components/profile/UserImage";
import { poppins } from "@/styles/fonts";
import { useEffect } from "react";
import { useGlobalContext } from "./Context/store";

export default function Home() {
  const { setUser, user } = useGlobalContext();

  useEffect(() => {
    setUser({ authorID: 9 });
  }, []);

  return (
    <main id="app" className="flex min-h-screen p-3">
      <div className="w-[1200px] max-w-[1200px] mx-auto p-3">
        <ProfileHeader />
        <div className="profile pb-8 w-full mt-14 h-fit shadow-sm rounded-md py-3 px-6 flex md:flex-row flex-col gap-2 md:gap-10">
          <UserImage />
          <UserDetails />
        </div>
        <div className="your-cvs mt-10 w-full pb-10 min-h-[500px]">
          <div className="your-cvs-title w-full h-fit px-2 py-4">
            <h1 className={poppins.className + " text-[1.1rem] font-semibold"}>
              YOUR RESUMES
            </h1>
          </div>
          <div className="w-full h-full py-4 px-2">
            {user && user.authorID !== undefined && <DisplayResumes />}
          </div>
        </div>
      </div>
      <FloatingButton />
    </main>
  );
}
