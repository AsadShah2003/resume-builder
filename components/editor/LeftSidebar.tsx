"use client";
import { useGlobalContext } from "@/app/Context/store";
import ResumeEditor from "./ResumeEditor";
import SubLeftSidebar from "./SubLeftSidebar";
import ResumeSettings from "./ResumeSettings";
import MobileResumePreview from "./MobileResumePreview";
import BottomMenu from "./BottomMenu";

const LeftSidebar: React.FC = () => {
  const { activeTab } = useGlobalContext();

  return (
    <aside className="overflow-y-auto overflow-x-hidden h-[100vh]  w-full bl:w-[700px] xl:flex-shrink-0  flex border-r border-gray-300">
      <SubLeftSidebar />
      {activeTab === "Editor" ? (
        <ResumeEditor />
      ) : activeTab === "Settings" ? (
        <ResumeSettings />
      ) : (
        activeTab === "Preview" && (
          <div className="overflow-hidden">
            <MobileResumePreview />
          </div>
        )
      )}
      <BottomMenu />
    </aside>
  );
};

export default LeftSidebar;
