import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TwoColumn } from "../TwoColumn";
import { Pointer, TapDot } from "../Cursor";

const CB1   = { x: 219, y: 350 };
const CB3   = { x: 219, y: 439 };
const START = { x: 219, y: 295 };

export const Beat3_Checkboxes: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const filledOpacity = interpolate(frame, [50, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <TwoColumn
      text={text}
      textEnterFrame={0}
      phone={
        <>
          <Img src={staticFile("screen-3-form-empty.png")} style={{ width: "100%", height: "100%", objectFit: "fill" }} />
          <Img
            src={staticFile("screen-4-form-filled.png")}
            style={{ position: "absolute", width: "100%", height: "100%", objectFit: "fill", opacity: filledOpacity }}
          />
          <Pointer startFrame={6}  from={START} to={CB1} fadeInDuration={10} travelDuration={18} />
          <TapDot at={CB1} startFrame={35} />
          <Pointer startFrame={40} from={CB1}   to={CB3} fadeInDuration={0}  travelDuration={20} />
          <TapDot at={CB3} startFrame={61} />
        </>
      }
    />
  );
};
