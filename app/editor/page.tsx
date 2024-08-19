"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { poppins } from "@/styles/fonts";

const RootEditor = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-3 items-center">
        <h1 className={poppins.className + " text-3xl font-bold"}>
          Nothing to show here!
        </h1>
        <p className={poppins.className + " font-light"}>
          Redirecting you back to homepage....
        </p>
      </div>
    </div>
  );
};

export default RootEditor;
