import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface CaptionProps {
  text: string;
  enterFrame: number;
  isStatic?: boolean;
}

export const Caption: React.FC<CaptionProps> = ({
  text,
  enterFrame,
  isStatic = false,
}) => {
  const frame = useCurrentFrame();
  const relFrame = frame - enterFrame;

  const translateY = isStatic
    ? 0
    : interpolate(relFrame, [0, 12], [18, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const opacity = isStatic
    ? 1
    : interpolate(relFrame, [0, 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  if (relFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10,10,10,0.72)",
        backdropFilter: "blur(8px)",
        zIndex: 100,
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 54,
          fontWeight: 700,
          color: "#ffffff",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          textAlign: "center",
          transform: `translateY(${translateY}px)`,
          opacity,
          letterSpacing: -0.5,
          lineHeight: 1.15,
          padding: "0 32px",
        }}
      >
        {text}
      </p>
    </div>
  );
};
