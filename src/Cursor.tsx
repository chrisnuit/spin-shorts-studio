import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Point = { x: number; y: number };

interface PointerProps {
  startFrame: number;
  from: Point;
  to: Point;
  travelDuration?: number;
  fadeInDuration?: number;
}

export const Pointer: React.FC<PointerProps> = ({
  startFrame,
  from,
  to,
  travelDuration = 20,
  fadeInDuration = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - startFrame;

  const opacity =
    fadeInDuration === 0
      ? 1
      : interpolate(relFrame, [0, fadeInDuration], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const travel = spring({
    fps,
    frame: Math.max(0, relFrame - fadeInDuration),
    config: { damping: 18, stiffness: 120, mass: 0.8 },
    durationInFrames: travelDuration,
  });

  const x = interpolate(travel, [0, 1], [from.x, to.x]);
  const y = interpolate(travel, [0, 1], [from.y, to.y]);

  if (relFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x - 18,
        top: y - 18,
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.55)",
        border: "2px solid rgba(255,255,255,0.9)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

interface TapDotProps {
  frame: number;
  at: Point;
  startFrame: number;
}

export const TapDot: React.FC<TapDotProps> = ({ at, startFrame }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - startFrame;

  const scale = interpolate(relFrame, [0, 12], [0.3, 2.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(relFrame, [0, 5, 12], [0.9, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (relFrame < 0 || relFrame > 14) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: at.x - 20,
        top: at.y - 20,
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.45)",
        border: "2px solid rgba(255,255,255,0.7)",
        transform: `scale(${scale})`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
