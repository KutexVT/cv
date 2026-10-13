---
name: Mikel Villegas / MV_
description: An open technical portfolio with expressive typography, geometric artwork and glass surfaces
colors:
  bg: "#0d1220"
  surface: "#141b2d"
  blue: "#4d9fff"
  violet: "#7c3aed"
  lavender: "#c2c1ff"
  pink: "#f5b2e0"
  text: "#f4f5fc"
  text-soft: "#c8cbd8"
  muted: "#a2abc0"
  border: "#303a50"
  glass: "rgba(13,18,32,.66)"
  glass-border: "rgba(194,193,255,.22)"
  secondary-wash: "rgba(194,193,255,.06)"
typography:
  display: {fontFamily: '"Space Grotesk", sans-serif', fontSize: "clamp(3.25rem, 6.65vw, 6rem)", fontWeight: 500, lineHeight: 1.04, letterSpacing: "-.04em"}
  headline: {fontFamily: '"Space Grotesk", sans-serif', fontSize: "clamp(2.25rem, 4vw, 3.75rem)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-.035em"}
  title: {fontFamily: '"Space Grotesk", sans-serif', fontSize: "clamp(2.1rem, 3.3vw, 3rem)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-.035em"}
  body: {fontFamily: '"Space Grotesk", sans-serif', fontSize: "16px", fontWeight: 400, lineHeight: 1.7}
  label: {fontFamily: '"IBM Plex Mono", monospace', fontSize: ".75rem", fontWeight: 400, lineHeight: 1.8}
rounded:
  standard: "16px"
  schedule: "6px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary: {backgroundColor: "{colors.blue}", textColor: "{colors.bg}", rounded: "{rounded.standard}", padding: "13px 22px"}
  button-primary-hover: {backgroundColor: "{colors.lavender}"}
  button-secondary: {backgroundColor: "{colors.secondary-wash}", textColor: "{colors.text}", rounded: "{rounded.standard}", padding: "13px 22px"}
  button-secondary-hover: {backgroundColor: "{colors.surface}"}
  navigation-link: {textColor: "{colors.text-soft}"}
  navigation-link-current: {textColor: "{colors.lavender}"}
  project-status: {textColor: "{colors.lavender}"}
  project-link: {textColor: "{colors.lavender}"}
---

# Design System: Mikel Villegas / MV_

## Overview

**Creative North Star: "An Open Technical Portfolio"**

A personal, technical world built from dark navy, large sans-serif statements, native geometric compositions and glassmorphism throughout the portfolio. Translucent framed sections reveal fixed blue, violet and pink light behind them; professional supporting content remains quiet enough for the work to lead.

The expressive portrait is a true transparent cutout against a rotated violet glass plane. Project artwork has its own geometric vocabulary and is clearly identified as a concept or identity, rather than a product screenshot. Solid surface alternatives preserve legibility when blur is unsupported or reduced transparency is requested.

**Key Characteristics:**
- Open typographic composition with alternating visual weight
- Navy foundations with blue actions and lavender emphasis
- Shared translucent glass frames over fixed colored light
- Local display and mono fonts with restrained technical labels
- Real portrait and native geometric project artwork
- Small purposeful motion with a complete reduced-motion path

## Colors

The palette combines a deep navy foundation with clear cool accents and small warm counterpoints; frontmatter is the normative source for reusable colors. Sidecar tonal ramps are synthesized preview metadata, not additional implemented color tokens.

### Primary
- **Signal Blue (`blue`):** primary actions, small punctuation, status dots and keyboard focus

### Secondary
- **Electric Violet (`violet`):** the portrait's geometric plane
- **Soft Lavender (`lavender`):** highlighted headline fragments, links, status text and primary hover

### Tertiary
- **Warm Pink (`pink`):** selected accents inside project compositions

### Neutral
- **Midnight Navy (`bg`) / Raised Navy (`surface`):** page foundation, secondary hover and opaque accessibility fallbacks
- **Navy Glass (`glass`) / Lavender Glass Edge (`glass-border`):** shared translucent panels and restrained edge definition
- **Secondary Wash (`secondary-wash`):** the secondary action's translucent fill
- **Clear White (`text`) / Soft White (`text-soft`):** headings and primary content versus explanatory prose
- **Slate (`muted`) / Divider Slate (`border`):** metadata and quiet structural separators

**The Accent Purpose Rule.** Blue identifies actions and small signals; lavender carries readable emphasis; violet is a graphic plane rather than a text surface.

## Typography

Space Grotesk supplies display, body and interface text; IBM Plex Mono supplies technology lists, dates and system-oriented metadata. Both are served locally from `assets/fonts/` with swap loading and sans-serif or monospace fallbacks.

The hierarchy is defined in frontmatter. Display type is medium-weight with tight tracking; body copy stays regular and breathable. Technical labels remain small and never compete with headings.

Hero body copy is bounded at (38ch), project prose at (44ch), and experience descriptions at (65ch). At the mobile breakpoint the hero changes to `clamp(2.1rem, 6.8vw, 3.5rem)` with line-height (1.12) and tracking (-.035em); below (359px) it becomes (1.92rem).

**The Two Voices Rule.** Use the sans family for the human message and the mono family for technical supporting detail.

## Layout

The shared page container is capped at (1280px) with total horizontal subtraction of (96px). That subtraction becomes (64px) below (1100px), (40px) below (767px), and (32px) below (359px).

Desktop uses unequal two-column grids: hero (1.2fr / 1fr), section introductions (1.25fr / 1fr), and project rows (1.15fr / 1fr). The second project reverses the artwork and copy. Framed sections use (56px) padding and separation; project rows use (110px) separation. At (1100px) section padding becomes (40px); at (767px) it becomes (32px 24px) with (28px) section gaps and (70px) project gaps. At (359px) section padding becomes (28px 18px). Profile and contact sections retain their larger vertical padding where specified.

The desktop hero lets the heading span the grid and the portrait overlap upward. Mobile places the portrait below the introduction with a narrower footprint. The project index switches from three columns to divided rows. Navigation becomes a three-column link grid, controlled by a menu button when JavaScript enhancement is active; links remain available without enhancement.

## Elevation & Depth

Headers, every section, the footer and dialog share navy glass, a lavender edge and a shine gradient (`linear-gradient(135deg,rgba(194,193,255,.07),rgba(77,159,255,.025) 45%,rgba(124,58,237,.055))`). Their depth uses the glass shadow (`0 20px 48px rgba(3,6,17,.25),inset 0 1px 0 rgba(244,245,252,.09)`) and backdrop treatment (`blur(20px) saturate(135%)`). Project covers and the portrait plane use (12px) blur; secondary actions use (10px).

Fixed radial light occupies the blue upper-left, violet right and pink lower-left background. The portrait plane stays inside the image wrapper, keeping the caption outside its footprint. Dialogs use the browser top layer and a dark backdrop (`rgba(5,8,18,.86)`). Unsupported backdrop filtering gives shared panels and covers solid raised-navy surfaces. Reduced transparency additionally removes blur from secondary actions and makes the portrait plane solid violet.

Motion uses the extracted easing in the sidecar. Hero lines enter once with short staggered offsets; project reveals affect route opacity or one schedule column rather than moving entire repeated rows. Buttons and certificate previews have small hover lifts. Reduced motion disables transitions, animation and smooth scrolling.

## Shapes

The reusable corner is gently rounded; schedule blocks use the smaller radius in frontmatter. Borders are thin (1px) structural lines. Status dots are circular (6px). Native artwork combines rotated route outlines, labeled nodes, schedule blocks and offset typography. The portrait plane rotates (-9deg), routes use opposing (-14deg / 14deg) angles and the schedule composition rotates (-7deg).

## Components

**Buttons:** inline-flex controls with medium sans text (.9375rem), minimum height (52px), spaced labels and stroked icons. Primary is blue on navy with a diagonal white shine and inset highlight; secondary has a translucent lavender wash, glass edge and backdrop blur. Hover lifts (-3px); active returns to rest. Mobile action padding narrows to (18px) with a (16px) gap.

**Navigation:** small sans links with minimum height (44px). Hover and the current location are lavender; the contact destination is always lavender. The shared glass header has (16px 28px) padding and (82px) minimum height; mobile uses (14px 18px) and (76px).

**Project status and links:** status is plain lavender text (.8125rem) with a small blue dot, without a pill container. Repository links are lavender (.875rem), have minimum height (44px), underline on hover, and move only the arrow (3px right / -3px up).

**Project artwork:** descriptive native compositions inside translucent, bordered frames with inset highlights and (12px) blur. Default minimum height is (520px), then (480px) below (1100px), (400px) below (767px), and (370px) below (359px). Artwork colors and geometry may vary by project while readable captions stay explicit.

**Certificates and viewer:** previews preserve document proportions with contained images, glass borders, inset highlights and a (-4px) hover lift. Text links open the same accessible native dialog with shared glass treatment and a (44px) close control.

**The Visible Focus Rule.** Every interactive link and button uses a blue (2px) focus outline with (6px) offset.

## Do's and Don'ts

### Do:
- **Do** preserve spacious asymmetry on desktop and a clear single-column mobile reading order
- **Do** keep cutout imagery separate from readable captions
- **Do** apply the shared glass material consistently and preserve opaque accessibility fallbacks
- **Do** identify concept artwork explicitly and retain genuine project states
- **Do** use small component or graphic motion with visible keyboard focus and reduced-motion support

### Don't:
- **Don't** replace native project concepts with fabricated product screenshots
- **Don't** turn status text or technical lists into decorative pills
- **Don't** trade readable content or visible focus for transparency
- **Don't** animate entire repeated project rows as a reveal pattern
