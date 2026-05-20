import React from "react";
import { Img, staticFile } from "remotion";
import { TwoColumn } from "../TwoColumn";
import { Pointer, TapDot } from "../Cursor";

const SUBMIT = { x: 124, y: 547 };
const START  = { x: 219, y: 439 }; // desde checkbox 3

export const Beat4_Submit: React.FC<{ text: string }> = ({ text }) => (
  <TwoColumn
    text={text}
    textEnterFrame={0}
    isStaticText  /* mismo texto que Beat3, no reanima */
    phone={
      <>
        <Img src={staticFile("screen-4-form-filled.png")} style={{ width: "100%", height: "100%", objectFit: "fill" }} />
        <Pointer startFrame={0} from={START} to={SUBMIT} fadeInDuration={0} travelDuration={22} />
        <TapDot at={SUBMIT} startFrame={23} />
      </>
    }
  />
);
