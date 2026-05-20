import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TwoColumn } from "../TwoColumn";

export const Beat5_Success: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <TwoColumn
      text={text}
      textEnterFrame={0}
      phone={
        <Img
          src={staticFile("screen-5-success.png")}
          style={{ width: "100%", height: "100%", objectFit: "fill", opacity }}
        />
      }
    />
  );
};
