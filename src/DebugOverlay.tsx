import React from "react";

/**
 * Drop this inside any scene to see a grid + crosshair at specific coords.
 * Remove before final render.
 *
 * Usage:
 *   <DebugOverlay dots={[{x: 340, y: 490, label: "checkbox1"}]} />
 */
interface Dot {
  x: number;
  y: number;
  label?: string;
}

export const DebugOverlay: React.FC<{ dots?: Dot[]; showGrid?: boolean }> = ({
  dots = [],
  showGrid = true,
}) => {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 999 }}>
      {showGrid &&
        Array.from({ length: 9 }).map((_, i) => {
          const x = ((i + 1) / 10) * 390;
          return (
            <React.Fragment key={i}>
              {/* vertical line */}
              <div style={{ position: "absolute", left: x, top: 0, bottom: 0, width: 1, background: "rgba(255,0,0,0.2)" }} />
              {/* label */}
              <span style={{ position: "absolute", left: x + 2, top: 2, fontSize: 10, color: "rgba(255,0,0,0.6)", fontFamily: "monospace" }}>
                {Math.round(x)}
              </span>
            </React.Fragment>
          );
        })}
      {showGrid &&
        Array.from({ length: 16 }).map((_, i) => {
          const y = ((i + 1) / 17) * 844;
          return (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", top: y, left: 0, right: 0, height: 1, background: "rgba(255,0,0,0.2)" }} />
              <span style={{ position: "absolute", top: y + 2, left: 2, fontSize: 10, color: "rgba(255,0,0,0.6)", fontFamily: "monospace" }}>
                {Math.round(y)}
              </span>
            </React.Fragment>
          );
        })}
      {dots.map((d, i) => (
        <React.Fragment key={i}>
          <div
            style={{
              position: "absolute",
              left: d.x - 6,
              top: d.y - 6,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "lime",
              border: "2px solid white",
            }}
          />
          {d.label && (
            <span
              style={{
                position: "absolute",
                left: d.x + 10,
                top: d.y - 8,
                fontSize: 11,
                color: "lime",
                fontFamily: "monospace",
                background: "rgba(0,0,0,0.6)",
                padding: "1px 4px",
                borderRadius: 3,
              }}
            >
              {d.label} ({d.x},{d.y})
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
