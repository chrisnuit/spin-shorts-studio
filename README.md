# Spin Shorts Studio

Onboarding videos for Spin by OXXO features, built with [Remotion](https://www.remotion.dev).

Each video uses a two-column layout: the phone screen on the left with animated cursor interactions, and descriptive text on the right. Texts are editable directly from the Remotion Studio UI — no code changes needed.

---

## Preview

| Layout |
|--------|
| Phone frame (left) + animated caption (right) on a lavender background |
| Cursor fades in at the focal element and taps the target |
| Scenes crossfade between interaction states |

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Add your screenshots

Place your iOS screenshots inside `public/` with these exact names:

| File | Description |
|------|-------------|
| `screen-1-rest.png` | Initial screen (resting state) |
| `screen-2-options.png` | Bottom sheet with options |
| `screen-3-form-empty.png` | Feedback form — empty |
| `screen-4-form-filled.png` | Feedback form — filled |
| `screen-5-success.png` | Success toast |

> Screenshots must be **1080 × 2493 px**. Other sizes will require recalibrating cursor coordinates.

### 3. Open Remotion Studio

```bash
npm start
```

Opens at `http://localhost:3000`.

---

## Editing texts (no code needed)

In Remotion Studio, select the **Notifications** composition and open the **Input Props** panel on the right sidebar. You'll see four editable fields:

| Field | Beat |
|-------|------|
| `beat1Text` | Scene 1 — notification list |
| `beat2Text` | Scene 2 — options sheet |
| `beat3Text` | Scenes 3 & 4 — feedback form |
| `beat5Text` | Scene 5 — success state |

Edit a field and press **Enter** — the preview updates instantly.

---

## Render to video

```bash
npm run render
```

Output: `out/video.mp4` — 1280×720, 30fps, ~9 seconds.

---

## Project structure

```
spin-notifications-video/
├── public/
│   ├── screen-1-rest.png
│   ├── screen-2-options.png
│   ├── screen-3-form-empty.png
│   ├── screen-4-form-filled.png
│   └── screen-5-success.png
└── src/
    ├── index.ts               # Remotion entry point
    ├── Root.tsx               # Composition registration + schema
    ├── Composition.tsx        # Series of beats
    ├── schema.ts              # Zod schema for editable props
    ├── TwoColumn.tsx          # Two-column layout + text animation
    ├── Cursor.tsx             # Pointer + TapDot components
    ├── Caption.tsx            # Caption band (legacy)
    ├── DebugOverlay.tsx       # Coordinate calibration helper
    └── scenes/
        ├── Beat1_ListTap.tsx
        ├── Beat2_OptionsSheet.tsx
        ├── Beat3_Checkboxes.tsx
        ├── Beat4_Submit.tsx
        └── Beat5_Success.tsx
```

---

## Calibrating cursor positions

If you swap screenshots for a different feature, cursor coordinates will need adjustment. Use `DebugOverlay` in any scene to find the right values:

```tsx
import { DebugOverlay } from "../DebugOverlay";

// Add inside the phone content:
<DebugOverlay
  showGrid={false}
  dots={[
    { x: 195, y: 600, label: "y600" },
    { x: 195, y: 700, label: "y700" },
  ]}
/>
```

Green dots appear at the specified coordinates. Identify which one lands on your target element, then update the constants at the top of the scene file.

---

## Creating a new feature video

1. Add new screenshots to `public/`
2. Duplicate and rename the scene files in `src/scenes/`
3. Update cursor coordinates using `DebugOverlay`
4. Register the new composition in `src/Root.tsx`
5. Add the new `<Series.Sequence>` blocks in `src/Composition.tsx`

---

## Tech stack

- [Remotion 4](https://www.remotion.dev) — React-based video framework
- [Zod](https://zod.dev) — Schema validation for editable props
- TypeScript + React 18
