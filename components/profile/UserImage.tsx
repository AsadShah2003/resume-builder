import React from "react";

const UserImage = ({ img }: { img?: string | undefined }) => {
  return (
    <div className="w-20 h-20 rounded-full md:self-start self-center">
      <img
        src={
          img ||
          "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        }
        alt="user-profile"
        className="w-full rounded-full h-full object-cover"
      />
    </div>
  );
};

export default UserImage;
