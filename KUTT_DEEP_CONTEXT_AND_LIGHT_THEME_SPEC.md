# KUTT — Complete Product Context, Architectural Blueprint & Light Theme Specification

> **Document Type:** Comprehensive Architectural, Product & Design System Specification  
> **Target Audience:** Frontend Engineers, UI/UX Designers, Product Managers, and AI Agents  
> **Status:** Authoritative Master Document  
> **Scope:** Entire Kutt Landing Page Application & 1:1 Light Theme Conversion Blueprint  

---

## Table of Contents
1. [Executive Summary & Core Value Proposition](#1-executive-summary--core-value-proposition)
2. [Product & Business Context: The Handshake Bet Reimagined](#2-product--business-context-the-handshake-bet-reimagined)
3. [Traditional Sportsbook vs. Kutt P2P Model](#3-traditional-sportsbook-vs-kutt-p2p-model)
4. [Technology Stack & Architectural Overview](#4-technology-stack--architectural-overview)
5. [Complete Component-by-Component Dissection](#5-complete-component-by-component-dissection)
6. [Current Dark Mode Design System (Tokens & Visual Physics)](#6-current-dark-mode-design-system-tokens--visual-physics)
7. [Light Theme Philosophy: High-Performance Athletic Fintech](#7-light-theme-philosophy-high-performance-athletic-fintech)
8. [Complete Design Token Mapping Matrix (Dark ➔ Light)](#8-complete-design-token-mapping-matrix-dark--light)
9. [Solving Media & Asset Challenges in Light Mode](#9-solving-media--asset-challenges-in-light-mode)
10. [Component-by-Component Light Theme Implementation Guide](#10-component-by-component-light-theme-implementation-guide)
11. [Dynamic Theme Engine Architecture (CSS Variables & Tailwind)](#11-dynamic-theme-engine-architecture-css-variables--tailwind)
12. [Accessibility & WCAG Contrast Rules (The Green Contrast Rule)](#12-accessibility--wcag-contrast-rules-the-green-contrast-rule)
13. [Step-by-Step Execution Checklist](#13-step-by-step-execution-checklist)

---

## 1. Executive Summary & Core Value Proposition

**KUTT** (`https://kutt.com`) is a **peer-to-peer (P2P) social wagering platform**. Its primary thesis is simple yet transformative: **instead of wagering against a faceless, algorithmic corporate house/sportsbook, users wager directly against identifiable people—friends, coworkers, rival fanbases, or verified community members.**

### The One-Sentence Definition
> **Kutt transforms informal "I bet you" handshake arguments into real, trackable, escrow-backed social competitions with zero bookmaker juice.**

### Core Platform Pillars
1. **Identifiable Counterparties:** Every wager is human-to-human. You see your opponent's avatar, verified profile, lifetime win/loss record, and head-to-head rivalry history.
2. **Mutual Acceptance Protocol:** A wager is never active until the other party explicitly accepts the terms. No one-sided automated order filling against an algorithm.
3. **Automated Escrow Protection:** Both participants' funds are deposited and locked in segregated escrow the moment terms are accepted. Neither party can refuse to pay or disappear after the game.
4. **Zero House Vig / Juice:** Traditional sportsbooks bake in 10%–15% hidden margin (the "vig"). Kutt eliminates the house margin entirely, taking only a transparent 3% facilitation fee on the pot upon settlement.
5. **Universal Verifiable Outcomes:** Beyond traditional sports (NFL, NBA, MLB, Premier League), Kutt supports entertainment (Oscars, Grammys), pop culture milestones, elections, and personal custom handshakes (local golf matches, 5K run times).

---

## 2. Product & Business Context: The Handshake Bet Reimagined

### The Origin Story
Founded by CEO **Sim Harmon**, Kutt was born out of informal bets made among friends since high school. Millions of sports fans, coworkers, and group chats make verbal wagers every day:
- *"I bet you $50 the Celtics cover tonight."*
- *"Dinner says Nolan wins Best Director."*
- *"Bet you $20 you can't break 22 minutes on the 5K."*

Historically, these informal handshake bets suffer from severe friction:
1. **Ambiguous terms:** Memories fade, spreads are misremembered, line movements cause arguments.
2. **Payment collection awkwardness:** Chasing friends on Venmo or Zelle is uncomfortable. People "forget" or delay payments indefinitely.
3. **Zero persistent tracking:** No record of lifetime rivalries, win streaks, or bragging rights exists beyond ephemeral chat threads.
4. **No social celebration:** The thrill of winning is lost in a quiet Venmo transfer without communal acknowledgment.

Kutt acts as the official transactional and social operating system for these bets.

---

## 3. Traditional Sportsbook vs. Kutt P2P Model

Understanding this fundamental architectural contrast is critical for designing copy, layout, and UI hierarchy:

| Dimension | Traditional Sportsbooks (DraftKings, FanDuel) | Kutt Social P2P Platform |
|---|---|---|
| **Counterparty** | The House (billion-dollar algorithmic corporation) | Real human beings (friends, coworkers, verified fans) |
| **Pricing / Margin** | 10% – 15% hidden vig / juice built into spread odds (-110/-110) | **Zero Vig**. Flat 3% platform facilitation fee on the pot |
| **Wager Customization** | Rigid, immutable lines set by oddsmakers | 100% customizable: set any spread, total, or custom condition |
| **Winning Bettor Treatment**| Account limits, stake caps, bans, and delayed withdrawals | Celebrated on leaderboards, prestige badges, rising rivalry status |
| **Social Experience** | Sterile, isolated, transactional betting slip | Live trash talk, direct messaging, group feeds, rivalry records |
| **Market Scope** | Restricted strictly to licensed gaming catalogs | Any verifiable outcome with public data or objective consensus |

```
TRADITIONAL SPORTSBOOK MODEL:
[ User ] ──────────────► [ THE HOUSE / VIG ENGINES ] ──────────────► [ Outcome ]
(User faces asymmetric odds; house extracts 10-15% guaranteed margin)

KUTT P2P SOCIAL MODEL:
[ User A ] ──────┐                                                ┌────── [ User B ]
                 ├───► [ KUTT SMART ESCROW (Mutual Lock) ] ◄──────┤
                 │             (Transparent 3% Fee)               │
                 └───────────────► [ Settlement ] ◄───────────────┘
```

---

## 4. Technology Stack & Architectural Overview

The application is built on a modern, high-performance Next.js stack designed for smooth 60fps scrolling and real-time interactive physics:

### Dependencies & Libraries
- **Framework:** Next.js 14.2.15 (App Router, Server Components + Client Hydration)
- **Runtime / Language:** React 18.3.1, TypeScript 5.6.3
- **CSS & Layout:** Tailwind CSS 3.4.14, PostCSS, Autoprefixer
- **Smooth Scroll Engine:** Lenis 1.1.18 (`src/components/SmoothScroll.tsx`)
- **Physics & Motion Engine:** GSAP 3.12.5 + ScrollTrigger (Frame scrubbing, pinned stages)
- **Celebration Particle Engine:** Canvas-Confetti 1.9.3 (Dynamic multi-color particle bursts)
- **Iconography:** Lucide-react 0.453.0 (Crisp vector icons)
- **Typography:** Google Fonts:
  - `Inter`: Primary body, metadata, metrics, and numerical interfaces.
  - `Outfit`: Display headings, brand titles, and high-impact hero typography.

### Directory Structure
```text
Kutt Landing page/
├── public/
│   ├── frames/                                      # Hero canvas frame sequence (30 frames)
│   ├── how_it_works_frames/                         # How-It-Works scrubber sequence (48 frames)
│   ├── Two_people_holding_glowing_smart__.../       # Trust section scrubber sequence (30 frames)
│   ├── major&college.png                            # Markets: Sports photographic banner
│   ├── poCulture.png                                # Markets: Pop Culture banner
│   ├── civic-milstone.png                           # Markets: Civic & Elections banner
│   ├── custom.png                                   # Markets: Custom handshakes banner
│   ├── simulator-court-bg.png / bg image.png        # Simulator & section background assets
│   └── socialbg.png                                 # Social section stadium crowd backdrop
├── src/
│   ├── app/
│   │   ├── globals.css                              # CSS tokens, glassmorphism, keyframes
│   │   ├── layout.tsx                               # Root metadata, fonts, smooth scroll wrapper
│   │   └── page.tsx                                 # Single-page assembled layout sequence
│   ├── components/
│   │   ├── ui/
│   │   │   └── habit-faq-scroller.tsx               # Infinite marquee ticker FAQ system
│   │   ├── ComparisonSection.tsx                    # Traditional Sportsbook vs. Kutt table
│   │   ├── FAQSection.tsx                           # FAQ data & interactive cards
│   │   ├── Footer.tsx                               # Massive CTA banner, links, disclaimers
│   │   ├── HeroCanvasScroll.tsx                     # 30-frame pinned canvas scrub & HUD cards
│   │   ├── HowItWorks.tsx                           # 48-frame P2P 4-step interactive timeline
│   │   ├── KuttLogo.tsx                             # Custom SVG brandmark with neon styling
│   │   ├── MarketsSection.tsx                       # 4-card market category showcase
│   │   ├── Navbar.tsx                               # Floating dynamic blur navigation bar
│   │   ├── ProblemSection.tsx                       # Handshake bets breakdown comparison
│   │   ├── SmoothScroll.tsx                         # Lenis smooth-scrolling controller
│   │   ├── SocialLayer.tsx                          # Live feed, head-to-head records, chat
│   │   ├── TrustSection.tsx                         # 30-frame canvas lock + 6 security pillars
│   │   └── WagerSimulator.tsx                       # Live interactive bet builder & math engine
│   ├── tailwind.config.js                           # Tailwind color definitions & animations
│   └── tsconfig.json                                # TypeScript path aliases (@/* -> ./src/*)
```

---

## 5. Complete Component-by-Component Dissection

### 1. `Navbar.tsx`
- **Role:** Sticky floating header with dynamic blur and scroll state detection (`window.scrollY > 30`).
- **Interactive Elements:**
  - `KuttLogo`: SVG brandmark with hover glow.
  - Links: How It Works, The Problem, Vs Sportsbooks, Wager Simulator (with pulse badge), Social Layer, Trust & Security.
  - Action Buttons: `App` modal/download button + `Challenge a Friend` primary CTA with neon beam shine effect.
  - Mobile Hamburger Menu: Fullscreen overlay drawer with animated item stagger.

### 2. `HeroCanvasScroll.tsx`
- **Role:** High-impact hero section driven by a 30-frame GSAP ScrollTrigger canvas sequence (`/frames/frame_001.png` to `030.png`).
- **Mechanics:**
  - Preloads 30 PNG frames with progress tracking.
  - Renders canvas at native device pixel ratio (`Math.min(devicePixelRatio, 2)`).
  - Pinned timeline (`pin: true, end: "+=160%"`) scrubbing through frames synchronized with scroll.
  - Three sequential HUD overlay cards:
    1. *Frame 0-10:* "Bet With People. Not The House." (Live match challenge banner).
    2. *Frame 10-22:* "Instant 1v1 Mutual Escrow" (Locked $100 pot preview).
    3. *Frame 22-30:* "Zero House Vig. Instant Payout" (Final confirmation & CTA).

### 3. `ProblemSection.tsx`
- **Role:** Visually contrasts informal broken bets with Kutt's structured protocol.
- **Visual Design:** Side-by-side split screen:
  - *Left Card (The Broken Handshake):* A realistic, messy group chat interface (Dave, Jordan, Alex) showing forgotten debts, ambiguous terms, and unpaid Venmo excuses.
  - *Right Card (The Official Kutt Wager Ticket):* Clean, verified ticket with confirmed odds, mutual signatures, locked escrow badge, and automated payout guarantee.

### 4. `HowItWorks.tsx`
- **Role:** 4-step progressive protocol scrubber driven by 48 canvas frames (`/how_it_works_frames/frame_001.png` to `048.png`).
- **The 4 Steps:**
  1. `STEP 01: CREATE & CUSTOMIZE` — Set spread, moneyline, or custom prop with flexible stakes.
  2. `STEP 02: CHALLENGE YOUR COUNTERPARTY` — Send invite directly via link, SMS, or in-app discovery.
  3. `STEP 03: MUTUAL ESCROW LOCK` — Both parties deposit; funds locked until official completion.
  4. `STEP 04: AUTOMATED INSTANT SETTLEMENT` — Verified results trigger instant, fee-free settlement.
- **Performance Architecture:** Uses zero-react-rerender DOM mutations (`classList.add/remove` via direct element refs on GSAP scrub updates) to ensure butter-smooth 60fps frame scrubbing.

### 5. `WagerSimulator.tsx`
- **Role:** Highly engaging interactive bet calculator allowing visitors to experience creating a wager before downloading the app.
- **State & Inputs:**
  - Category selector: NBA, NFL, UCL, Pop Culture, Custom Handshake.
  - Friend selector: Jordan V. (12-8), Marcus T. (15-5), Alex Chen (9-11).
  - Stake slider: $10 to $250.
- **Live Mathematical Output:**
  - Stake: `$X`
  - Total Pot: `$X * 2`
  - Platform Facilitation Fee (3%): `($TotalPot * 0.03)`
  - Winner Takes Home: `TotalPot - PlatformFee`
  - Contrast with Traditional Sportsbook: Highlights how a sportsbook takes $10-$15 in vig vs Kutt's $3 fee.
- **Action:** Clicking "Send Challenge" initiates a 1.2s realistic acceptance simulation, concluding with a multi-color `canvas-confetti` explosion.

### 6. `ComparisonSection.tsx`
- **Role:** High-contrast matrix directly exposing sportsbook exploitation vs Kutt's transparent player-first terms.
- **6 Comparison Vectors:** Counterparty identity, House edge/vig, Terms customization, Treatment of winning bettors, Social banter/trash talk, and Scope of wagering markets.

### 7. `SocialLayer.tsx`
- **Role:** Proves that Kutt is a full social network, not merely a betting calculator.
- **Key Modules:**
  - Live community wager ticker feed with real user avatars and ongoing trash-talk chatter.
  - Head-to-Head Rivalry Card ("You vs. Jordan Vance: 7 - 4 Lifetime Record").
  - Persistent chat snippets demonstrating social interaction during live games.

### 8. `MarketsSection.tsx`
- **Role:** Expands user perception beyond sports betting into cultural and custom wagering.
- **4 Rich Cards:**
  1. *Major & College Sports* (NFL, NBA, UFC, Premier League).
  2. *Pop Culture & Entertainment* (Oscars, Grammys, Box Office).
  3. *Civic & Election Milestones* (Official public consensus milestones).
  4. *Custom Handshakes & Props* (Golf matches, marathon milestones, personal challenges).

### 9. `TrustSection.tsx`
- **Role:** Essential compliance and credibility anchor addressing user skepticism.
- **Features:**
  - 30-frame canvas animation illustrating encrypted mutual connection between two smartphone users.
  - 6 Interactive Security Pillars: Segregated Escrow, Outcome Verification (official API feeds), Mandatory KYC Identity Verification, Transparent Terms, 256-Bit Bank-Grade Data Security, and Responsible Play tools (deposit caps, cooling-off periods).

### 10. `FAQSection.tsx` & `habit-faq-scroller.tsx`
- **Role:** Infinite horizontal marquee scroller ticker displaying question tags, questions, and expandable answers across two alternating directional rows.

### 11. `Footer.tsx`
- **Role:** High-conversion conclusion featuring the primary headline: *"Stop Saying 'I Bet You.' Put It On Kutt."* Includes App Store and Google Play CTAs, compliance disclaimers, state eligibility notices, and legal navigation.

---

## 6. Current Dark Mode Design System (Tokens & Visual Physics)

The existing dark mode uses a cyber-athletic, stealth aesthetic inspired by luxury sports analytics terminals:

### Dark Mode Color Palette
| Token Name | Hex Code | Functional Usage |
|---|---|---|
| `kutt-bg` | `#06080A` | Deepest canvas background, near-black with blue-gray undertones |
| `kutt-surface` | `#0B0E14` | Section backgrounds, card foundations, drawer backdrops |
| `kutt-card` | `#10161F` | Elevated card surfaces, input containers |
| `kutt-cardHover` | `#161E2B` | Hover state for interactive cards and list items |
| `kutt-border` | `#1E2736` | Subtle structural borders and dividers |
| `kutt-borderHover` | `#2C384D` | Hover borders on interactive elements |
| `kutt-green` | `#00FF66` | **Primary Brand Accent:** Electric neon green for CTAs, badges, glows |
| `kutt-greenDark` | `#00CC52` | Secondary active green for borders and pressed states |
| `kutt-greenGlow` | `rgba(0, 255, 102, 0.4)` | Radial and drop-shadow glow emitters |
| `kutt-mint` | `#38EF7D` | Secondary gradient stop, softens neon green in gradients |
| `kutt-muted` | `#8A96A6` | Secondary body text, inactive icons, timestamps |
| `kutt-textLight` | `#E6ECF5` | High-contrast body copy and secondary headings |
| `white` | `#FFFFFF` | Primary headings, brand title, maximum visual weight |
| `kutt-red` | `#FF3B56` | Warning indicators, traditional sportsbook loss metrics |
| `kutt-amber` | `#FFB020` | Cautionary notices, pending wager statuses |

### Dark Visual Effects & Shadows
- `.glass-panel`: `background: rgba(16, 22, 31, 0.75); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08);`
- `.glass-panel-glow`: `background: rgba(16, 22, 31, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(0, 255, 102, 0.25); box-shadow: 0 0 30px -8px rgba(0, 255, 102, 0.2);`
- `shadow-neon`: `0 0 25px -5px rgba(0, 255, 102, 0.45)`
- `shadow-neon-lg`: `0 0 50px -10px rgba(0, 255, 102, 0.55)`
- `shadow-card`: `0 10px 30px -10px rgba(0, 0, 0, 0.7)`

---

## 7. Light Theme Philosophy: High-Performance Athletic Fintech

Designing a light theme for Kutt requires a sophisticated aesthetic balance. A naive conversion (simply turning black into `#FFFFFF` and leaving bright neon green) produces an unreadable, washed-out disaster that fails WCAG accessibility and feels like an empty hospital website.

### The Guiding Aesthetic: "High-Performance Athletic Fintech"
Think **Linear + Apple Fitness + Robinhood Cash + Nike Run Club**:
- **Backgrounds:** Clean, ultra-crisp architectural off-whites (`#F8FAFC`, `#F1F5F9`) paired with pure white (`#FFFFFF`) card surfaces.
- **Typography:** Deep obsidian and slate charcoal (`#090D16`, `#0F172A`, `#334155`). Never use pure `#000000` text on pure `#FFFFFF`—it creates harsh optical vibration.
- **The "Two-Green" Accent Strategy:**
  - **Text & Borders:** Use rich, authoritative **Emerald Green** (`#059669`, `#047857`, `#008A38`). This provides a razor-sharp 5.2:1+ contrast ratio against light backgrounds.
  - **Badges, Buttons & Glows:** Preserve the iconic **Electric Neon Green** (`#00FF66` / `#00E85D`) for solid button backgrounds (with crisp black `#000000` text), pill badges, and vibrant active toggles.
- **Elevation over Glow:** In dark mode, depth is expressed through glowing borders and light halos. In light mode, depth must be expressed through **multi-layered soft ambient shadows** and **crisp 1px borders** (`border-slate-200/80`).

---

## 8. Complete Design Token Mapping Matrix (Dark ➔ Light)

Use this exact 1:1 conversion matrix when building light mode styles:

| Semantic Role | Dark Mode Value | Light Mode Value | Rationale & Accessibility |
|---|---|---|---|
| **Canvas Background** | `#06080A` | `#F8FAFC` (Slate-50) | Warm, architectural off-white; eliminates eye fatigue |
| **Section Alternates** | `#0B0E14` | `#F1F5F9` (Slate-100) | Subtle section demarcation without harsh dividers |
| **Card Surface** | `#10161F` | `#FFFFFF` (Pure White) | Crisp, elevated card canvas with maximum clarity |
| **Card Hover State** | `#161E2B` | `#F8FAFC` / `#FFFFFF` + elevated shadow | Hover is communicated by shadow depth + border accent |
| **Border (Default)** | `#1E2736` | `#E2E8F0` (Slate-200) | Micro-thin structural divider (0.5px to 1px optical) |
| **Border (Subtle/Glass)** | `rgba(255, 255, 255, 0.08)` | `rgba(15, 23, 42, 0.08)` | Delicate enclosure for glassmorphism |
| **Border (Hover/Active)**| `#2C384D` | `#CBD5E1` (Slate-300) or `#059669` | Clear interactive feedback |
| **Primary Text (Titles)**| `#FFFFFF` | `#090D16` / `#0F172A` (Slate-900) | Authoritative, deep obsidian; WCAG AAA (15.5:1 ratio) |
| **Secondary Text** | `#E6ECF5` | `#334155` (Slate-700) | Highly legible body copy; WCAG AAA (8.4:1 ratio) |
| **Muted Text / Meta** | `#8A96A6` | `#64748B` (Slate-500) | Accessible secondary metadata; WCAG AA (4.8:1 ratio) |
| **Brand Accent (Solid)**| `#00FF66` | `#00FF66` (with `#000000` text) | High-energy action button fill; universally recognizable |
| **Brand Accent (Text)** | `#00FF66` (on dark) | `#059669` / `#008A38` (on light)| **CRITICAL:** `#00FF66` text fails on white. Use deep emerald |
| **Badge Fill (Subtle)** | `rgba(0, 255, 102, 0.15)` | `#DCFCE7` (Emerald-100) | Clean pill background with emerald text |
| **Badge Border** | `rgba(0, 255, 102, 0.3)` | `#86EFAC` (Emerald-300) | Defines badge boundaries cleanly |
| **Negative / Loss State**| `#FF3B56` | `#DC2626` (Red-600) | Sportsbook vig / error callouts; WCAG AA compliant |
| **Negative Fill (Pill)**| `rgba(255, 59, 86, 0.1)` | `#FEE2E2` (Red-100) | Subtle alert card background |
| **Warning / Caution** | `#FFB020` | `#D97706` (Amber-600) | Pending wager status; high contrast |
| **Glass Panel Base** | `rgba(16, 22, 31, 0.75)` | `rgba(255, 255, 255, 0.85)` | Frosted white glass with background blur |
| **Primary Drop Shadow** | `0 10px 30px rgba(0,0,0,0.7)` | `0 10px 30px -10px rgba(15,23,42,0.08)` | Natural daylight ambient diffusion |
| **Active Glow Shadow** | `0 0 30px rgba(0,255,102,0.4)`| `0 12px 32px -8px rgba(0,168,67,0.22)` | Controlled emerald illumination |

---

## 9. Solving Media & Asset Challenges in Light Mode

A common pitfall when converting dark-themed landing pages with canvas animations or video sequences is asset incompatibility. Here is how to handle each asset type in Kutt:

### 1. Canvas Frame Sequences (`HeroCanvasScroll`, `HowItWorks`, `TrustSection`)
- **The Challenge:** The 30 hero frames, 48 How-It-Works frames, and 30 Trust frames are pre-rendered photography and 3D renders with black/dark backgrounds. Placing a raw dark canvas on a pure white page creates an awkward black rectangle.
- **Solution A: The "Hardware Enclosure / Dark Studio" Frame (Recommended):**
  - Nest the canvas inside a sleek, dark titanium hardware bezel (resembling an iPhone 16 Pro display or a dark glass sports studio monitor).
  - Wrap it in a card with `bg-slate-950 rounded-3xl p-2 border border-slate-200/80 shadow-2xl shadow-slate-900/15`.
  - The canvas remains rich and atmospheric, but looks like an intentional high-end product display floating on an editorial light page.
- **Solution B: Seamless Light Vignette Mask:**
  - If displaying canvas borderless, apply a radial gradient mask:
    ```css
    mask-image: radial-gradient(circle at center, black 65%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle at center, black 65%, transparent 100%);
    ```
  - Place a soft dark card under the interactive HUD elements to maintain legibility.

### 2. Category Photographic Headers (`major&college.png`, `poCulture.png`, etc.)
- In light mode, preserve the photos as card banners, but change the bottom card container from dark glass to crisp white:
  - Header: Photo with a soft gradient overlay.
  - Body: `#FFFFFF` background with `#090D16` titles and `#64748B` description text.
  - Category Badges: Light emerald pill (`bg-emerald-50 text-emerald-700 border-emerald-200`).

### 3. Vector Brand Logo (`KuttLogo.tsx`)
- The current logo has white strokes for the frame and white fills for `K`, `U`, and `T` letters, with a neon green accent.
- In light mode:
  - Frame white path (`stroke="#FFFFFF"`) ➔ Change to `#090D16` (Slate-900).
  - Letter fills (`fill="#FFFFFF"`) ➔ Change to `#090D16` (Slate-900).
  - Neon green bottom frame & 'U' inner accent (`#00FF66`) ➔ Retain `#00FF66` or use vibrant athletic green (`#00CC52`) for crisp vector punch.

---

## 10. Component-by-Component Light Theme Implementation Guide

### A. `Navbar.tsx`
- **Scrolled Header:**
  - Dark: `bg-kutt-bg/90 backdrop-blur-xl border-b border-kutt-border/70`
  - Light: `bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm shadow-slate-200/50`
- **Navigation Links:**
  - Dark: `text-kutt-muted hover:text-white`
  - Light: `text-slate-600 hover:text-slate-950 font-semibold`
- **App Download Button:**
  - Dark: `bg-white/5 border-white/10 text-kutt-muted hover:text-white`
  - Light: `bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900`
- **Challenge Button:**
  - Retain `bg-kutt-green text-black font-bold shadow-md shadow-emerald-500/20`. It pops with incredible energy against the clean white navbar!

### B. `HeroCanvasScroll.tsx`
- **Background Container:** `#F8FAFC`
- **Canvas Container:** Center stage enclosed in a dark titanium frame or bordered floating panel (`bg-slate-950 rounded-3xl border border-slate-200/80 shadow-2xl`).
- **Hero Typography:**
  - Eyebrow Badge: `bg-emerald-50 text-emerald-700 border border-emerald-200`
  - Main Headline: `text-slate-900` with gradient text `from-slate-950 via-emerald-600 to-teal-700`
  - Subheadline: `text-slate-600`
- **Floating HUD Cards:**
  - Background: `bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-200/60`
  - Metric Values: `text-slate-900 font-extrabold`
  - Escrow Locked Badge: `bg-emerald-50 text-emerald-700 border border-emerald-200`

### C. `ProblemSection.tsx`
*(Note: ProblemSection already contains excellent initial light styling using `#F8FAFC`, `bg-white`, and `text-slate-900`.)*
- **Left Card (Unreliable Chat):** `bg-white border-slate-200/80 shadow-lg shadow-slate-200/50`. Chat bubbles: Incoming in `bg-slate-100 text-slate-800`, Outgoing in `bg-slate-900 text-white`.
- **Right Card (Official Kutt Ticket):** `bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10`. Wager terms clearly delineated with emerald status badges.

### D. `HowItWorks.tsx`
- **Section Background:** `#FFFFFF`
- **Step Cards:**
  - Inactive Cards: `bg-slate-50 border border-slate-200/80 text-slate-600 opacity-70`
  - Active Step Card: `bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 text-slate-900`
  - Step Progress Bar: `bg-emerald-500` (replaces dark neon bar)
  - Number Indicator: `bg-slate-900 text-white font-mono`

### E. `WagerSimulator.tsx`
- **Section Background:** `#F8FAFC`
- **Background Court Overlay:** Apply a soft high-key overlay (`bg-white/85 backdrop-blur-md`) over `simulator-court-bg.png`.
- **Builder Panel (Left):**
  - Card: `bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50 rounded-3xl p-6 sm:p-8`
  - Category Tabs: Inactive `bg-slate-100 text-slate-600 hover:text-slate-900`, Active `bg-slate-900 text-white`
  - Friend Selector: Inactive `border-slate-200 hover:border-slate-300`, Active `border-emerald-500 bg-emerald-50/50`
  - Stake Slider: Track `bg-slate-200`, Filled bar `bg-emerald-500`, Thumb `bg-slate-900 border-2 border-white`
- **Live Ticket Preview (Right):**
  - Card: `bg-white border-2 border-slate-900 shadow-2xl rounded-3xl p-6 sm:p-8`
  - Ticket Cutout Notch: Match section background `#F8FAFC`
  - Pot Value: Large `text-slate-900 font-black`
  - Fee Notice: `text-slate-500 bg-slate-50 border-slate-200`
  - Send Challenge Button: `bg-kutt-green hover:bg-emerald-400 text-black font-extrabold shadow-lg shadow-emerald-500/25`

### F. `ComparisonSection.tsx`
- **Section Background:** `#F1F5F9`
- **Comparison Table / Cards:**
  - Traditional Sportsbook Column: `bg-white/80 border border-red-200/80 text-slate-600` with subtle red accent headers (`text-red-600`)
  - Kutt Column: `bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 text-slate-900`
  - Checkmarks / Icons: Kutt uses `CheckCircle2 text-emerald-600`, Traditional uses `XCircle text-red-500`

### G. `SocialLayer.tsx`
- **Section Background:** `#F8FAFC`
- **Live Feed Cards:** `bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 hover:border-emerald-400`
- **User Avatars:** Crisp gradient backgrounds with white initials.
- **Rivalry Banner:** `bg-white border border-slate-200 p-6 rounded-2xl shadow-sm`. Win/Loss score displayed in bold high-contrast slate.

### H. `MarketsSection.tsx`
- **Section Background:** `#FFFFFF`
- **Cards (4 Columns):**
  - Wrapper: `bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 hover:shadow-xl hover:border-emerald-500 transition-all rounded-2xl overflow-hidden`
  - Photographic Top: Image with bottom gradient fade into the white card
  - Title: `text-slate-900 font-bold`
  - Description: `text-slate-600 text-sm`
  - Example Tags: `bg-slate-100 text-slate-700 text-xs rounded-lg px-2.5 py-1`

### I. `TrustSection.tsx`
- **Section Background:** `#F8FAFC`
- **Trust Pillars (6 Cards):**
  - Card: `bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-400 p-6 rounded-2xl transition-all`
  - Icon Wrapper: `bg-emerald-50 text-emerald-600 p-3 rounded-xl border border-emerald-100`
  - Title: `text-slate-900 font-bold text-sm tracking-wider uppercase`
  - Description: `text-slate-600 text-xs leading-relaxed`

### J. `FAQSection.tsx` (`habit-faq-scroller.tsx`)
- **Ticker Card Styling:**
  - Card Base: `bg-white border border-slate-200/90 shadow-md shadow-slate-200/50 hover:border-emerald-500`
  - Category Tag: `bg-emerald-50 text-emerald-700 font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-200`
  - Question: `text-slate-900 font-bold text-sm`
  - Answer: `text-slate-600 text-xs leading-relaxed`
- **Mask Fade:** Change gradient mask from `to right, transparent, black, transparent` to match `#F8FAFC` background.

### K. `Footer.tsx`
- **Massive Final CTA Banner:**
  - Card: `bg-slate-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-800` (A dark CTA banner on a light page provides immense visual power and athletic gravity!)
  - Alternatively (Pure Light Option): `bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-500/50 shadow-2xl text-slate-900`
- **Footer Navigation & Legal:**
  - Background: `#F8FAFC`
  - Text & Disclaimers: `text-slate-500`
  - Links: `text-slate-700 hover:text-slate-950`

---

## 11. Dynamic Theme Engine Architecture (CSS Variables & Tailwind)

If you plan to offer both themes with a live toggle button (Sun/Moon icon in the Navbar), here is the production-grade CSS variable architecture:

### 1. CSS Variable Definitions (`src/app/globals.css`)
```css
:root {
  /* LIGHT THEME (Default or [data-theme="light"]) */
  --bg-main: #F8FAFC;
  --bg-surface: #FFFFFF;
  --bg-surface-elevated: #F1F5F9;
  --border-subtle: #E2E8F0;
  --border-strong: #CBD5E1;
  --text-primary: #090D16;
  --text-secondary: #334155;
  --text-muted: #64748B;
  --brand-solid: #00FF66;
  --brand-accessible: #059669; /* For readable text on light */
  --brand-pill-bg: #DCFCE7;
  --brand-pill-border: #86EFAC;
  --shadow-elevation: 0 10px 30px -10px rgba(15, 23, 42, 0.08);
  --glass-bg: rgba(255, 255, 255, 0.85);
  --glass-border: rgba(15, 23, 42, 0.08);
}

[data-theme="dark"],
.dark {
  /* DARK THEME */
  --bg-main: #06080A;
  --bg-surface: #0B0E14;
  --bg-surface-elevated: #10161F;
  --border-subtle: #1E2736;
  --border-strong: #2C384D;
  --text-primary: #FFFFFF;
  --text-secondary: #E6ECF5;
  --text-muted: #8A96A6;
  --brand-solid: #00FF66;
  --brand-accessible: #00FF66;
  --brand-pill-bg: rgba(0, 255, 102, 0.15);
  --brand-pill-border: rgba(0, 255, 102, 0.3);
  --shadow-elevation: 0 10px 30px -10px rgba(0, 0, 0, 0.7);
  --glass-bg: rgba(16, 22, 31, 0.75);
  --glass-border: rgba(255, 255, 255, 0.08);
}
```

### 2. Tailwind Configuration Extension (`tailwind.config.js`)
```javascript
theme: {
  extend: {
    colors: {
      theme: {
        bg: "var(--bg-main)",
        surface: "var(--bg-surface)",
        surfaceElevated: "var(--bg-surface-elevated)",
        border: "var(--border-subtle)",
        borderStrong: "var(--border-strong)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textMuted: "var(--text-muted)",
        brand: "var(--brand-solid)",
        brandAccessible: "var(--brand-accessible)",
        pillBg: "var(--brand-pill-bg)",
        pillBorder: "var(--brand-pill-border)",
      },
    },
  },
}
```

---

## 12. Accessibility & WCAG Contrast Rules (The Green Contrast Rule)

### The #00FF66 Green Contrast Rule
> **Golden Rule of Web Contrast:** `#00FF66` (Neon Green) on a white background (`#FFFFFF`) produces a contrast ratio of **1.35:1**. This represents an extreme accessibility failure (minimum WCAG AA requires 4.5:1 for body and 3:1 for large text).

### How to Safely Use Green in Light Mode:
1. **For Text & Links:** ALWAYS use deep **Emerald Green** (`#059669` or `#047857`), which provides a **5.2:1 to 7.1:1** contrast ratio on white/slate backgrounds.
2. **For Buttons & Badges:** You CAN use `#00FF66` as a background fill, provided the text inside is solid black (`#000000` or `#090D16`), which yields an exceptional **15.6:1** contrast ratio!
3. **For Glows & Accents:** Subtle emerald drop shadows (`rgba(0, 168, 67, 0.2)`) provide athletic energy without washing out card readability.

---

## 13. Step-by-Step Execution Checklist

When executing the light theme in the codebase, follow this sequence:

- [ ] **Step 1: Logo Preparation (`KuttLogo.tsx`)**
  - Add theme-aware stroke/fill props or CSS class hooks so the white border and lettering cleanly switch to `#090D16` in light mode while keeping the `#00FF66` electric accent.
- [ ] **Step 2: CSS Variables & Base Styles (`globals.css`)**
  - Add `:root` light mode variables and `.glass-panel-light` classes.
  - Update custom scrollbars to light slate tracks with emerald thumb hover.
- [ ] **Step 3: Navbar Theme Adaptation (`Navbar.tsx`)**
  - Implement dynamic backdrop blur over light surfaces (`bg-white/90`).
  - Add theme toggle switch (Sun/Moon icon) if dual-theme support is enabled.
- [ ] **Step 4: Hero Canvas Enclosure (`HeroCanvasScroll.tsx`)**
  - Wrap canvas stage in a sleek dark hardware/studio bezel with crisp slate borders and soft ambient drop shadows.
  - Convert floating HUD cards to frosted white glass with emerald metric badges.
- [ ] **Step 5: Problem Section Harmonization (`ProblemSection.tsx`)**
  - Align existing light tokens with the master token matrix.
- [ ] **Step 6: How-It-Works Scrubber (`HowItWorks.tsx`)**
  - Update `.step-card` inactive and active classes in DOM scrub logic to swap between `bg-slate-50` and `bg-white border-emerald-500`.
- [ ] **Step 7: Wager Simulator Restyling (`WagerSimulator.tsx`)**
  - Apply soft light overlay to court background.
  - Restyle builder cards, category chips, stake slider, and live ticket.
- [ ] **Step 8: Comparison Table Conversion (`ComparisonSection.tsx`)**
  - Apply light slate alternating background with white cards and emerald highlights.
- [ ] **Step 9: Social Layer & Markets Cards (`SocialLayer.tsx`, `MarketsSection.tsx`)**
  - Restyle live ticker feeds, chat speech bubbles, and market category containers.
- [ ] **Step 10: Trust Section & FAQ Scroller (`TrustSection.tsx`, `FAQSection.tsx`)**
  - Ensure horizontal ticker scroller gradient masks blend into `#F8FAFC`.
  - Update 6 security pillar cards to crisp white elevations.
- [ ] **Step 11: Final CTA & Footer (`Footer.tsx`)**
  - Verify contrast on disclaimer text and legal links.
- [ ] **Step 12: Visual & Accessibility Testing**
  - Test at 375px (mobile), 768px (tablet), 1280px (desktop), and 1920px (ultrawide).
  - Verify all text meets WCAG AA standards.

---

*This document represents the definitive master reference for Kutt landing page development, marketing copy, and multi-theme design execution.*
