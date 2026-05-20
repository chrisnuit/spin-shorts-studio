import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const PHONE_W = 248;
export const PHONE_H = 572;
const COL_LEFT_W = 520;
const BG = "#EDE9FF";

// ── Phone frame shell ────────────────────────────────────────────────────────
export const PhoneShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      left: (COL_LEFT_W - PHONE_W) / 2,
      top: (720 - PHONE_H) / 2,
      width: PHONE_W,
      height: PHONE_H,
      borderRadius: 32,
      overflow: "hidden",
      boxShadow: "0 24px 64px rgba(80,40,160,0.22), 0 4px 16px rgba(0,0,0,0.12)",
      background: "#fff",
    }}
  >
    {children}
  </div>
);

// ── Full canvas wrapper ──────────────────────────────────────────────────────
export const TwoColumn: React.FC<{
  phone: React.ReactNode;
  text: string;
  textEnterFrame?: number;
  isStaticText?: boolean;
}> = ({ phone, text, textEnterFrame = 0, isStaticText = false }) => {
  const frame = useCurrentFrame();
  const rel = frame - textEnterFrame;

  const translateY = isStaticText
    ? 0
    : interpolate(rel, [0, 14], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const opacity = isStaticText
    ? 1
    : interpolate(rel, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: 1280, height: 720, background: BG, position: "relative" }}>
      {/* Left column — phone */}
      <div style={{ position: "absolute", left: 0, top: 0, width: COL_LEFT_W, height: 720 }}>
        <PhoneShell>{phone}</PhoneShell>
      </div>

      {/* Divider */}
      <div style={{ position: "absolute", left: COL_LEFT_W, top: 60, bottom: 60, width: 1, background: "rgba(100,60,200,0.15)" }} />

      {/* Right column — text */}
      <div
        style={{
          position: "absolute",
          left: COL_LEFT_W + 1,
          top: 0,
          width: 1280 - COL_LEFT_W - 1,
          height: 720,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 64px",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#1a0a3d",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            textAlign: "left",
            transform: `translateY(${translateY}px)`,
            opacity: rel < 0 ? 0 : opacity,
            letterSpacing: -1,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
