"use client";

import { useEffect, useState } from "react";

const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Initial update
    updateWindowWidth();

    // Add event listener to track window width changes
    window.addEventListener("resize", updateWindowWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return windowWidth;
};

export default useWindowWidth;
