import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Beat1_ListTap } from "./scenes/Beat1_ListTap";
import { Beat2_OptionsSheet } from "./scenes/Beat2_OptionsSheet";
import { Beat3_Checkboxes } from "./scenes/Beat3_Checkboxes";
import { Beat4_Submit } from "./scenes/Beat4_Submit";
import { Beat5_Success } from "./scenes/Beat5_Success";
import { NotificationsProps } from "./schema";

// Crossfade duration between beats
const FADE = 10;
const fadeTransition = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: FADE })}
  />
);

// Sequence durations: 60 + 50 + 70 + 40 + 50 = 270
// Minus 4 crossfades of 10 frames = 270 - 40 = 230 frames total
export const Notifications: React.FC<NotificationsProps> = ({
  beat1Text,
  beat2Text,
  beat3Text,
  beat5Text,
}) => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
        <Beat1_ListTap text={beat1Text} />
      </TransitionSeries.Sequence>
      {fadeTransition}
      <TransitionSeries.Sequence durationInFrames={50}>
        <Beat2_OptionsSheet text={beat2Text} />
      </TransitionSeries.Sequence>
      {fadeTransition}
      <TransitionSeries.Sequence durationInFrames={70}>
        <Beat3_Checkboxes text={beat3Text} />
      </TransitionSeries.Sequence>
      {fadeTransition}
      <TransitionSeries.Sequence durationInFrames={40}>
        <Beat4_Submit text={beat3Text} /> {/* mismo texto que beat3 */}
      </TransitionSeries.Sequence>
      {fadeTransition}
      <TransitionSeries.Sequence durationInFrames={50}>
        <Beat5_Success text={beat5Text} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
