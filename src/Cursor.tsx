import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Point = { x: number; y: number };

/** A position the persistent pointer should reach by `frame` (relative to startFrame). */
type Waypoint = { point: Point; frame: number };

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

interface PointerProps {
  startFrame: number;
  fadeInDuration?: number;
  /** Simple mode: a single straight glide from → to. */
  from?: Point;
  to?: Point;
  travelDuration?: number;
  /**
   * Persistent-pointer mode: ONE cursor that glides between several targets
   * without resetting. Use this for multiple taps on the same UI so two
   * cursors never appear at once. Frames are relative to startFrame.
   */
  path?: Waypoint[];
}

export const Pointer: React.FC<PointerProps> = ({
  startFrame,
  from,
  to,
  travelDuration = 20,
  fadeInDuration = 8,
  path,
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

  let x: number;
  let y: number;

  if (path && path.length > 0) {
    // Multi-waypoint: interpolate position across the keyframes (eased per segment).
    const frames = path.map((w) => w.frame);
    x = interpolate(relFrame, frames, path.map((w) => w.point.x), {
      easing: EASE_OUT,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    y = interpolate(relFrame, frames, path.map((w) => w.point.y), {
      easing: EASE_OUT,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else {
    const travel = spring({
      fps,
      frame: Math.max(0, relFrame - fadeInDuration),
      config: { damping: 18, stiffness: 120, mass: 0.8 },
      durationInFrames: travelDuration,
    });
    x = interpolate(travel, [0, 1], [from!.x, to!.x]);
    y = interpolate(travel, [0, 1], [from!.y, to!.y]);
  }

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
        background: "rgba(255,103,0,0.28)",
        border: "2.5px solid #FF6700",
        boxShadow: "0 2px 14px rgba(255,103,0,0.5)",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

interface TapDotProps {
  at: Point;
  startFrame: number;
}

export const TapDot: React.FC<TapDotProps> = ({ at, startFrame }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - startFrame;

  const scale = interpolate(relFrame, [0, 12], [0.3, 2.2], {
    easing: EASE_OUT,
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
        background: "rgba(255,103,0,0.22)",
        border: "2px solid rgba(255,103,0,0.65)",
        transform: `scale(${scale})`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
