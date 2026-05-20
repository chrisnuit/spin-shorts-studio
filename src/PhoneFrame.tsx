import React from "react";

export const CAPTION_HEIGHT = 100;

// Positions children below the caption band so cursor coordinates
// stay in "phone screen" space (0,0 = top-left of the screenshot).
export const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: CAPTION_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};
