import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

type Point = { x: number; y: number };

/**
 * Emphasizes a tap target by dimming everything except a soft radial area
 * around the focus point. Unlike a zoom, the whole screen stays visible and
 * nothing gets clipped at the edges.
 *
 * Wrap ONLY the screenshot layer(s); render the cursor/TapDot as siblings
 * AFTER this component so they stay bright above the dim overlay.
 *
 * Coordinates are in the same space as the cursor (phone inner box).
 */
export const Spotlight: React.FC<{
  children: React.ReactNode;
  focusPoint: Point;
  inStart: number;
  inEnd: number;
  outStart: number;
  outEnd: number;
  /** Fully-lit radius around the focus point (px). */
  radius?: number;
  /** Soft falloff distance from the lit edge into full dim (px). */
  feather?: number;
  /** Max darkness outside the spotlight (0–1). */
  dim?: number;
}> = ({
  children,
  focusPoint,
  inStart,
  inEnd,
  outStart,
  outEnd,
  radius = 90,
  feather = 120,
  dim = 0.6,
}) => {
  const frame = useCurrentFrame();

  const dimOpacity = interpolate(
    frame,
    [inStart, inEnd, outStart, outEnd],
    [0, 1, 1, 0],
    { easing: EASE, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <>
      {children}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${focusPoint.x}px ${focusPoint.y}px, rgba(0,0,0,0) ${radius}px, rgba(0,0,0,${dim}) ${radius + feather}px)`,
          opacity: dimOpacity,
          pointerEvents: "none",
        }}
      />
    </>
  );
};
