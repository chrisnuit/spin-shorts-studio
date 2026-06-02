import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

type Point = { x: number; y: number };

/**
 * Zooms the phone content toward a focus point (the tap target) to emphasize
 * the action, then eases back out. The focus point stays fixed because it is
 * used as the CSS transform-origin — everything scales around it.
 *
 * Coordinates are in the same space as the cursor (phone inner box).
 */
export const ZoomFocus: React.FC<{
  children: React.ReactNode;
  focusPoint: Point;
  inStart: number;
  inEnd: number;
  outStart: number;
  outEnd: number;
  scale?: number;
}> = ({ children, focusPoint, inStart, inEnd, outStart, outEnd, scale = 1.5 }) => {
  const frame = useCurrentFrame();

  const s = interpolate(
    frame,
    [inStart, inEnd, outStart, outEnd],
    [1, scale, scale, 1],
    { easing: EASE, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transformOrigin: `${focusPoint.x}px ${focusPoint.y}px`,
        transform: `scale(${s})`,
      }}
    >
      {children}
    </div>
  );
};
