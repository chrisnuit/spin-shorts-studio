import React from "react";
import { Img, staticFile } from "remotion";
import { TwoColumn } from "../TwoColumn";
import { Pointer, TapDot } from "../Cursor";

const DELETE = { x: 124, y: 509 };
const START  = { x: 124, y: 460 };

export const Beat2_OptionsSheet: React.FC<{ text: string }> = ({ text }) => (
  <TwoColumn
    text={text}
    textEnterFrame={0}
    phone={
      <>
        <Img src={staticFile("screen-2-options.png")} style={{ width: "100%", height: "100%", objectFit: "fill" }} />
        <Pointer startFrame={8} from={START} to={DELETE} fadeInDuration={10} travelDuration={14} />
        <TapDot at={DELETE} startFrame={33} />
      </>
    }
  />
);
