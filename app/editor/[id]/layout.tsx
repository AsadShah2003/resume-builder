import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-[100dvh] w-full flex">{children}</div>;
};

export default layout;
