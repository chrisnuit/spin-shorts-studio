import React from "react";
import { Img, staticFile } from "remotion";
import { TwoColumn } from "../TwoColumn";

export const Beat5_Success: React.FC<{ text: string }> = ({ text }) => {
  // Entrance is handled by the TransitionSeries crossfade in Composition.tsx
  return (
    <TwoColumn
      text={text}
      textEnterFrame={0}
      phone={
        <Img
          src={staticFile("screen-5-success.png")}
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
        />
      }
    />
  );
};
