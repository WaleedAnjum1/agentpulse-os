---
name: Autonomous Intelligence & Strategy Core
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#5c00ca'
  on-tertiary: '#ffffff'
  tertiary-container: '#7531e6'
  on-tertiary-container: '#e4d4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  code-body:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system targets enterprise operators, executive strategists, and autonomous AI system orchestrators who require total situational clarity over multi-agent workflows. The interface balances the high-velocity precision of Linear, the structured, document-first canvas readability of Notion, and the refined monoline engineering rigor of Vercel. 

The aesthetic is functional minimalism infused with high-density data legibility:
- **Atmosphere:** Controlled, calm, reliable, and deeply technical. It treats autonomous intelligence not as an unpredictable black box, but as an auditable, high-throughput operating system.
- **Visual Stance:** Precision 1px grid lines, subtle surface elevation, muted neutral canvases, and deliberate, surgical hits of color designated exclusively for agent persona semantics and system status states.
- **Interaction Ethos:** Keyboard-first efficiency, zero visual friction, micro-transitions governed by immediate response times, and translucent navigational glass surfaces that retain spatial hierarchy without visual noise.

## Colors

The palette establishes an ultra-clean, neutral canvas where saturation serves an operational purpose. Backgrounds maintain high-contrast hierarchy through crisp slate nuances.

### Primary & Functional Roles
- **Primary Accent (`#4F46E5` / `#6366F1`):** Applied to primary platform CTAs, selected multi-agent states, focused command inputs, and active session borders.
- **Surface Canvas (Light):** `#FFFFFF` (default elevated surface), `#F8FAFC` (neutral application canvas/workspace), `#F1F5F9` (sidebar, grouped panels, recessed inspect modules).
- **Surface Canvas (Dark Mode Support):** `#0B0F19` (base canvas), `#111827` (card/panel level), `#1E293B` (elevated drawers/flyouts).
- **Border & Dividers:** Subtle structural division using `#E2E8F0` for outer card strokes and table dividers, and `#CBD5E1` for active hover or focused bounds.

### Agent Persona Signatures
Each specialized agent persona holds a distinct spectral fingerprint across text, icon strokes, and translucent badge backgrounds:
1. **Planner Agent:** `#7C3AED` (Dark) / `#F5F3FF` (Light tint) — Strategy, DAG synthesis, and goal decomposition.
2. **Researcher Agent:** `#0284C7` (Dark) / `#F0F9FF` (Light tint) — Dynamic web retrieval, source queries, and API ingestion.
3. **Data Analyzer Agent:** `#0D9488` (Dark) / `#F0FDFA` (Light tint) — CSV processing, tabular synthesis, and quantitative math.
4. **Report Writer Agent:** `#D97706` (Dark) / `#FFFBEB` (Light tint) — Narrative drafting, executive summaries, and markdown synthesis.
5. **Fact-Checker Agent:** `#E11D48` (Dark) / `#FFF1F2` (Light tint) — Source grounding, contradiction detection, and claim audits.

### Execution & Operational States
- **Completed / Healthy:** `#10B981` (Emerald)
- **Pending Human Approval / In Review:** `#F59E0B` (Amber)
- **Error / Rejected / Anomaly:** `#EF4444` (Rose)
- **Running / Executing Sub-Routine:** `#0EA5E9` (Sky)

## Typography

The typographical structure utilizes a dual-engine architecture:
- **Inter** handles narrative flow, executive report viewports, primary interaction labels, and operational navigation. It is tuned for compact density with precise tracking (`-0.01em` to `-0.025em` across headlines).
- **JetBrains Mono** governs the technical underpinnings: DAG node labels, runtime trace telemetry, confidence metrics, API schema inspect sheets, raw tokens, and timestamp audit lines.

### Hierarchy & Treatment
- Headlines must maintain disciplined vertical metric alignments. Avoid dramatic scale leaps; the interface is an operating tool rather than a display showcase.
- Code and system traces use `code-body` and `label-sm` with tabular numbering enabled (`font-variant-numeric: tabular-nums`) to ensure absolute column parity during rapid data streaming.

## Layout & Spacing

The layout operates on a fluid, panel-oriented workstation structure divided into three distinct operational planes:
1. **Control Rail (Left):** Collapsible workspace navigation (240px default, 64px iconified).
2. **Execution Canvas (Center / Primary):** Dynamic workspace containing the DAG graph, continuous document editor, or agent trace orchestration view.
3. **Inspector / Verification Drawer (Right):** Contextual deep-dive pane (360px–420px) displaying JSON payloads, retrieval citations, and audit logs.

### Responsive Breakpoints & Reflow
- **Desktop (>= 1280px):** 3-pane concurrent visibility. Full DAG layout and code trace sidecar panels active.
- **Tablet (768px - 1279px):** Inspector drawer transforms into an overlay sheet. The sidebar auto-collapses to the compact 64px rail.
- **Mobile (< 768px):** Single-column stacked mode. Workspace sections toggle via a floating segmented control. DAG visualizers transform into linear status lists.

## Elevation & Depth

Visual separation relies on monoline borders, tonal transitions, and translucent glass tiers rather than pronounced drop shadows.

- **Surface Layers:**
  - `Layer 0 (Canvas):` `#F8FAFC` base background.
  - `Layer 1 (Panels & Cards):` `#FFFFFF` elevated over base using a crisp `1px solid #E2E8F0` border.
  - `Layer 2 (Popovers, Modals & Floating Toolbars):` `#FFFFFF` combined with a soft, ambient blur: `box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(226, 232, 240, 0.8)`.
- **Glassmorphism:**
  - Sticky table headers, agent execution docks, and global action bars apply a frosted veil: `background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px)`.
- **Dark Mode Elevation:**
  - Boundaries in dark mode rely on subtle luminosity contrasts: `1px solid rgba(255, 255, 255, 0.08)` bordering `#111827` surfaces.

## Shapes

The interface balances sharp technological precision with human usability by standardizing on an intentional `10px` to `12px` visual corner radius for primary interaction containers:
- **Default Elements (`rounded`):** `0.5rem` (8px) for buttons, text input boxes, dropdown menus, and agent pill tokens.
- **Container Elements (`rounded-lg`):** `0.75rem` (12px) for analytical cards, DAG process nodes, telemetry widgets, and modal dialogues.
- **Outer Shells (`rounded-xl`):** `1rem` (16px) for master floating workspaces, full canvas preview modules, and slide-in trays.
- **Tags & Indicators:** `9999px` strictly for run-status dots, confidence metric badges, and agent persona avatars.

## Components

### Buttons
- **Primary:** Solid `#4F46E5` background, white text, 0.5rem roundedness, 1px border of `#4338CA`. Subtle translateY(-1px) hover effect with smooth 150ms ease.
- **Secondary / Outline:** Background transparent or `#FFFFFF`, 1px border `#E2E8F0`, text `#1E293B`. Hover state applies `#F8FAFC` with `#CBD5E1` border.
- **Agent Action Buttons:** Contextual borders matching agent accent colors with a 5% translucent background fill on hover.

### Chips & Agent Status Badges
- Built with `JetBrains Mono` at `label-sm` sizing.
- Padded with `0.25rem` vertical and `0.5rem` horizontal.
- Planner tokens use `#F5F3FF` fill with `#7C3AED` text and subtle `1px solid rgba(124, 58, 237, 0.2)`. Apply matching patterns for Researcher, Data Analyzer, Report Writer, and Fact-Checker personas.

### DAG Pipeline Nodes
- Encapsulated cards with a base `#FFFFFF` fill, 12px border radius, and a crisp 1px stroke.
- Left-side 3px agent color accent stripe designating the processing entity.
- Header featuring agent avatar, node label, and a live micro-badge displaying execution duration in tabular JetBrains Mono (e.g., `142ms`).

### Input Fields & Command Bars
- Inset input style with `#FFFFFF` background, 1px `#E2E8F0` border, and `0.5rem` corners.
- Focus ring: No heavy default browser outline; replace with `1px solid #4F46E5` accompanied by an immediate `0 0 0 3px rgba(79, 70, 229, 0.12)` glow.
- Quick command input includes inline shortcut chips (`⌘K`, `Enter`) styled in `JetBrains Mono`.

### Checkboxes & Radio Buttons
- Crisp 16px squares with 4px border radius for checkboxes; 16px circular rings for radio buttons.
- Inactive state: `#FFFFFF` fill with a `1.5px solid #CBD5E1` border.
- Checked state: `#4F46E5` fill displaying a razor-sharp `#FFFFFF` checkmark or center pin.

### Cards & Execution Drawers
- Multi-tiered container surfaces enclosed in 1px `#E2E8F0` borders.
- Header sections feature internal partition lines (`border-bottom: 1px solid #F1F5F9`) separating configuration parameters from continuous data streams.
- Code blocks within drawers nest cleanly using `#0B0F19` slate surfaces with syntax highlighting matched to agent colors.