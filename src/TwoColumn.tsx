import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

// Crisp UI entrance curve (strong ease-out) — per Remotion best practices
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
import { color, radius, space, fontWeight } from "./theme";
import { montserrat, openSans } from "./fonts";

export const PHONE_W = 248;
export const PHONE_H = 572;
const COL_LEFT_W = 520;

// ── Phone frame shell ────────────────────────────────────────────────────────
export const PhoneShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      left: (COL_LEFT_W - PHONE_W) / 2,
      top: (720 - PHONE_H) / 2,
      width: PHONE_W,
      height: PHONE_H,
      borderRadius: radius["2xl"],
      overflow: "hidden",
      // Phone bezel using SBO brand tertiary, soft brand-tinted shadow
      border: `6px solid ${color.brand.tertiary}`,
      boxShadow: "0 32px 80px rgba(33,11,80,0.28), 0 8px 24px rgba(86,0,217,0.16)",
      background: color.surface.primary,
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);

// ── Full canvas wrapper ──────────────────────────────────────────────────────
export const TwoColumn: React.FC<{
  phone: React.ReactNode;
  text: string;
  eyebrow?: string;
  textEnterFrame?: number;
  isStaticText?: boolean;
}> = ({ phone, text, eyebrow = "Notificaciones", textEnterFrame = 0, isStaticText = false }) => {
  const frame = useCurrentFrame();
  const rel = frame - textEnterFrame;

  const translateY = isStaticText
    ? 0
    : interpolate(rel, [0, 14], [28, 0], { easing: EASE_OUT, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const opacity = isStaticText
    ? 1
    : interpolate(rel, [0, 12], [0, 1], { easing: EASE_OUT, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const eyebrowOpacity = isStaticText
    ? 1
    : interpolate(rel, [2, 14], [0, 1], { easing: EASE_OUT, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: 1280,
        height: 720,
        position: "relative",
        // Soft SBO bloom-to-white brand gradient
        background: `linear-gradient(135deg, ${color.supportive.bloom} 0%, ${color.surface.secondary} 60%, ${color.surface.primary} 100%)`,
      }}
    >
      {/* Decorative brand accent blob */}
      <div
        style={{
          position: "absolute",
          left: -120,
          bottom: -120,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: color.supportive.cloud,
          opacity: 0.5,
          filter: "blur(8px)",
        }}
      />

      {/* Left column — phone */}
      <div style={{ position: "absolute", left: 0, top: 0, width: COL_LEFT_W, height: 720 }}>
        <PhoneShell>{phone}</PhoneShell>
      </div>

      {/* Right column — text */}
      <div
        style={{
          position: "absolute",
          left: COL_LEFT_W,
          top: 0,
          width: 1280 - COL_LEFT_W,
          height: 720,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: `0 ${space["7xl"]}px`,
          boxSizing: "border-box",
        }}
      >
        {/* Eyebrow / kicker — Open Sans label with brand accent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: space.xs,
            marginBottom: space.lg,
            opacity: rel < 0 ? 0 : eyebrowOpacity,
          }}
        >
          <span
            style={{
              fontFamily: openSans,
              fontWeight: fontWeight.semiBold,
              fontSize: 20,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: color.content.accent,
            }}
          >
            {eyebrow}
          </span>
        </div>

        {/* Headline — Montserrat SemiBold */}
        <p
          style={{
            margin: 0,
            fontFamily: montserrat,
            fontSize: 60,
            fontWeight: fontWeight.semiBold,
            lineHeight: 1.12,
            color: color.brand.tertiary,
            letterSpacing: -0.5,
            transform: `translateY(${translateY}px)`,
            opacity: rel < 0 ? 0 : opacity,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
