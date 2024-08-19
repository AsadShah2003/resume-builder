import { lora } from "@/styles/fonts";
import EditProfileDialog from "./EditProfileDialog";
import NewResumeDialog from "./NewResumeDialog";

const ProfileHeader = () => {
  return (
    <header className="w-full flex items-center justify-between">
      <h1 className={lora.className + " text-2xl font-semibold"}>My Profile</h1>
      <div className="flex gap-2 items-center">
        <NewResumeDialog />
        <EditProfileDialog />
      </div>
    </header>
  );
};

export default ProfileHeader;
