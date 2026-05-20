import React from "react";
import { Series } from "remotion";
import { Beat1_ListTap } from "./scenes/Beat1_ListTap";
import { Beat2_OptionsSheet } from "./scenes/Beat2_OptionsSheet";
import { Beat3_Checkboxes } from "./scenes/Beat3_Checkboxes";
import { Beat4_Submit } from "./scenes/Beat4_Submit";
import { Beat5_Success } from "./scenes/Beat5_Success";
import { NotificationsProps } from "./schema";

export const Notifications: React.FC<NotificationsProps> = ({
  beat1Text,
  beat2Text,
  beat3Text,
  beat5Text,
}) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={60}>
        <Beat1_ListTap text={beat1Text} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={50}>
        <Beat2_OptionsSheet text={beat2Text} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={70}>
        <Beat3_Checkboxes text={beat3Text} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={40}>
        <Beat4_Submit text={beat3Text} /> {/* mismo texto que beat3 */}
      </Series.Sequence>
      <Series.Sequence durationInFrames={50}>
        <Beat5_Success text={beat5Text} />
      </Series.Sequence>
    </Series>
  );
};
