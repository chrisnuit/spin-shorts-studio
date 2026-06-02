/**
 * Spin by OXXO (SBO) design tokens.
 * Extracted from the official design-system token set (stable/semantic/sbo).
 */

export const color = {
  brand: {
    primary: "#5600D9",
    secondary: "#FF6700",
    tertiary: "#210B50",
  },
  ui: {
    active: "#5600D9",
    activeHover: "#4216A0",
    activeTonal: "#EEE8FA",
    success: "#3B8C04",
    error: "#CC3E3D",
  },
  content: {
    primary: "#141418",
    secondary: "#33333D",
    tertiary: "#71717F",
    accent: "#5600D9",
    inversePrimary: "#FFFFFF",
    inverseSecondary: "#A8A8B2",
  },
  surface: {
    primary: "#FFFFFF",
    secondary: "#F7F8FA",
    tertiary: "#E2E2E9",
    inversePrimary: "#131A38",
  },
  stroke: {
    primary: "#8B95B9",
    secondary: "#DBDDEF",
  },
  supportive: {
    space: "#210B50",
    lilac: "#C7A1FF",
    bloom: "#EEE3FF",
    cloud: "#D9DBFD",
  },
  success: {
    surface: "#E2FCBC",
    decoration: "#45A206",
    content: "#2C6903",
  },
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
} as const;

export const space = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "5xl": 48,
  "7xl": 64,
} as const;

/** Font families — loaded via @remotion/google-fonts in fonts.ts */
export const font = {
  headline: "Montserrat",
  body: "'Open Sans'",
} as const;

export const fontWeight = {
  regular: 400,
  semiBold: 600,
} as const;
