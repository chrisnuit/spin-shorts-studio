import React from "react";
import { Img, staticFile } from "remotion";
import { TwoColumn } from "../TwoColumn";
import { Pointer, TapDot } from "../Cursor";

const DOTS   = { x: 226, y: 178 };
const START  = { x: 226, y: 120 };

export const Beat1_ListTap: React.FC<{ text: string }> = ({ text }) => (
  <TwoColumn
    text={text}
    textEnterFrame={0}
    phone={
      <>
        <Img src={staticFile("screen-1-rest.png")} style={{ width: "100%", height: "100%", objectFit: "fill" }} />
        <Pointer startFrame={8} from={START} to={DOTS} fadeInDuration={10} travelDuration={14} />
        <TapDot at={DOTS} startFrame={33} />
      </>
    }
  />
);
