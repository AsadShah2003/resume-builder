"use client";
import { useResumeStore } from "@/lib/store/useResumeStore";
import ResumeEditor from "./ResumeEditor";
import SubLeftSidebar from "./SubLeftSidebar";
import ResumeSettings from "./ResumeSettings";
import BottomMenu from "./BottomMenu";
import dynamic from 'next/dynamic';

const MobileResumePreview = dynamic(() => import("./MobileResumePreview"), {
  ssr: false,
});

const LeftSidebar: React.FC = () => {
  const { activeTab } = useResumeStore();

  return (
    <aside className="overflow-y-auto overflow-x-hidden h-[100vh]  w-full bl:w-[700px] xl:flex-shrink-0  flex border-r border-gray-300">
      <SubLeftSidebar />
      {activeTab === "Editor" ? (
        <ResumeEditor />
      ) : activeTab === "Settings" ? (
        <ResumeSettings />
      ) : (
        activeTab === "Preview" && (
          <div className="w-full h-full">
            <MobileResumePreview />
          </div>
        )
      )}
      <BottomMenu />
    </aside>
  );
};

export default LeftSidebar;
