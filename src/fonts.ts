import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadOpenSans } from "@remotion/google-fonts/OpenSans";

// Montserrat — SBO headlines
export const { fontFamily: montserrat } = loadMontserrat("normal", {
  weights: ["400", "600", "700"],
});

// Open Sans — SBO body / labels
export const { fontFamily: openSans } = loadOpenSans("normal", {
  weights: ["400", "600"],
});
