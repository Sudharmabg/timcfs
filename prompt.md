# Techno India Manchester City Football School - Design System & Component Guidelines

This document outlines the core design language, styling parameters, and component structures used across the website. Use this as a reference or prompt for future AI assistants to maintain perfect visual consistency.

## 🎨 Global Brand Identity & Colors

*   **Primary Navy (City Blue Dark):** `rgb(0, 40, 94)` — Used for all primary text, Headings, base buttons, card borders, and primary shadows.
*   **Secondary Light Blue (City Sky Blue):** `rgb(152, 197, 233)` — Used for the Header background, timeline lines, dot indicators, and subtle accent elements.
*   **Highlight Gold/Orange:** `#f7a83e` — Used exclusively for special callouts (like the "WHO COULD YOU BECOME?" milestone goal).
*   **Base Backgrounds:** 
    *   Sections alternate between crisp White `#ffffff` and ultra-light off-white `#f4f7fb` (e.g., Team Section) to create visual separation.
    *   Dark overlays use true black or dark navy with opacity (e.g., `rgba(0, 0, 0, 0.65)` for Hero image, `rgba(0, 15, 40, 0.9)` for Team).

## 🔤 Typography & Text Alignment

*   **Section Titles ("THE MANCHESTER CITY...", "OUR PROGRAMMES", "OUR TEAM"):**
    *   **Font Size:** `2.5rem`
    *   **Font Weight:** `700` (Bold)
    *   **Color:** Primary Navy `rgb(0, 40, 94)`
    *   **Text Transform:** `uppercase`
    *   **Alignment:** `text-align: center; margin-left: auto; margin-right: auto;`
    *   **Spacing:** `margin-bottom: 2rem` to `3.5rem` depending on the section density.
*   **Card Headings:**
    *   Font Size: `1.25rem` (20px)
    *   Font Weight: `800` (Extra Bold)
    *   Color: Primary Navy.
*   **Body Text & Descriptions:**
    *   Font Size: `0.9rem` to `1rem`
    *   Line Height: `1.6` to `1.65` (Breathes nicely)
    *   Color: `black` or dark gray `#444` (for slightly softer text).
    
## 🔘 Buttons & CTAs

*   **Primary CTA ("Book Now", "Register"):**
    *   **Style:** Solid Primary Navy `rgb(0, 40, 94)` background, `white` text, `border-radius: 5px`, `font-weight: 700`.
    *   **Standard Animation:** A `2s infinite` bounce animation (`translateY(-4px)` to `translateY(4px)`).
    *   **Hover State:** Animation pauses (`animation-play-state: paused`), background deepens (`#003080`), and button scales slightly (`scale(1.05)`).
*   **Circular Arrow Button:**
    *   **Style:** 38x38px circle, transparent background, 2px Primary Navy border. Arrow SVG is stroke Primary Navy.
    *   **Hover State:** Background fills Primary Navy, white arrow stroke, `scale(1.1)`.

## 📦 Core Component Architectures

### 1. Programs Section (Information Cards)
*   **Layout:** 4-column grid (`repeat(4, 1fr)`) shrinking to 2 on tablet, 1 on mobile.
*   **Card Structure:** `.program-card`
    *   **Container:** White background, 12px border-radius, thin border `1.5px solid #e0e7f0`.
    *   **Image Top:** `aspect-ratio: 4 / 3`, image covers. Zoom effect (`scale(1.05)`) strictly on image inside `overflow: hidden`.
    *   **Content Bottom:** Flex column. Title, Age subtitle, description (`lines-height: 1.65`), and a top-bordered footer row containing the Book Now CTA (centered).
*   **Card Hover Physics:**
    *   Entry (Hover): `translateY(-8px)`, increased shadow (`rgba(0,40,94, 0.25)`), border color changes to solid Navy. Uses `0.35s ease-out` for a smooth float up.
    *   Exit (Mouse leave): Uses a faster `0.2s ease-in` transition to snap back, preventing jitter when dragging the mouse rapidly across the grid. No `scale` on the whole card to avoid neighbor overlaps.

### 2. Team Section (Profile Cards)
*   **Layout:** 4-column grid on off-white `#f4f7fb` background.
*   **Card Structure:** `.team-card`
    *   **Container:** `border-radius: 8px`, Flex Column layout.
    *   **Image Top:** `aspect-ratio: 1 / 1.1` (slightly taller than square). `object-position: top center`. Subtle SVG diagonal line background pattern overlaid on the image.
    *   **Information Box Bottom:** Solid dark blue block `rgb(0, 20, 50)`, `flex-grow: 1`. 
    *   **Micro-Data UI:** Uses sub-labels (`font-size: 0.55rem`, uppercase, high letter-spacing `1.2px`) paired with values (`0.75rem`, bold, white).
    *   **Nationality:** Flex row. Uses `flagcdn` for reliable system-agnostic flag images.
    *   **Certifications:** Pill badges with white border/bg at low opacity (`rgba(255, 255, 255, 0.1)`), uppercase tiny font.

### 3. Gallery (3D Coverflow)
*   **Architecture:** 3 hardcoded distinct DOM nodes (`prev`, `active`, `next`).
*   **3D Effect:** Wrapper has `perspective: 1000px`. Active card is front-and-center (`translateZ(30px)`). Prev/Next cards are pushed to sides (`translateX(±78%)`), scaled down (`scale(0.78)`), and angled (`rotateY(±30deg)`).
*   **Images:** Strictly `object-fit: contain` on a dark background `#111` to prevent any unnatural cropping of aspect ratios.

### 4. Player Development Timeline
*   **Mechanics:** An SVG path (`.timeline-path-progress`) is drawn sequentially over 6 seconds via `stroke-dashoffset` in sync with GSAP's ScrollTrigger.
*   **Nodes:** Alternating top/bottom absolute-positioned milestone items, containing nested blue/light-blue dots and dark blue border text boxes.
