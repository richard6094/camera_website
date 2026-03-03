# Development Notes

## Recent Changes & Optimizations

### 2026-03-03: SEG Color Transition Smoothing
**Summary**: Fixed two color seam issues at the top and bottom of ScrollExpandGallery. (1) Replaced solid bgColor on the expand track with a gradient from transparent→bgColor over the first 40vh, so the section blends smoothly from the silk-bg above instead of an abrupt dark-grey jump. (2) Rewrote the fade-out mask gradient to start fully opaque at shrink-p=0 (transparent edges pushed outside element bounds), eliminating the light band that appeared where silk-bg bled through the 8% transparent strip. Added 2px overlap between gallery section and fade-out track to prevent sub-pixel gaps.

**Files Changed**:
- `client/src/components/ScrollExpandGallery.tsx` — Expand track: `backgroundColor` → `background: linear-gradient(transparent→bgColor)`. Gallery section: added `marginBottom: -2px` overlap.
- `client/src/index.css` — `.seg-fade-out` mask: changed from `transparent 0% / black 8%…` to `transparent calc(-5% + 50%*p) / black calc(0% + 45%*p)…` so mask starts fully opaque.

**Rationale**: Expand track's solid bgColor caused an abrupt dark-grey transition from silk-bg above; fade-out mask's initial 8% transparent edges let silk-bg bleed through as a visible light band.

---

### 2026-03-03: Scroll-Expand Gallery Effect (mandler.shop-inspired)
**Summary**: Added a scroll-driven image-expand → gallery-background → shrink effect. Replaces the first ParallaxQuote with a cinematic scroll animation where an image starts small with rounded corners, expands to fill the viewport, cross-fades to a warm background color, and that background serves as the gallery section's backdrop. After the gallery is scrolled past, the background shrinks back with rounded corners and fades out, revealing the silk-bg gradient behind it.

**Files Changed**:
- `client/src/components/ScrollExpandGallery.tsx` — New component: expand track (250vh, sticky), gallery section (normal flow, bgColor), shrink track (200vh, sticky). Uses rAF-driven `--expand-p` / `--shrink-p` CSS custom properties for 60 fps animation with zero React re-renders.
- `client/src/index.css` — Added SEG CSS classes: `.seg-expand-frame` (width/height/border-radius driven by `--expand-p`), `.seg-shrink-frame` (reverse animation driven by `--shrink-p`), `.seg-quote` (opacity fade-out), `.seg-color-overlay` (bg-color cross-fade), mobile overrides, reduced-motion support.
- `client/src/pages/Home.tsx` — Replaced `<ParallaxQuote>` #1 + standalone `<section id="gallery">` with `<ScrollExpandGallery>` wrapping the gallery content. Added `ScrollExpandGallery` import.
- `docs/manus-context/COMPONENT_GUIDE.md` — Added ScrollExpandGallery component documentation.

**Rationale**: User requested mandler.shop-inspired scroll-driven expand/shrink effect to create a more immersive transition into the user sample gallery section.

---

### 2026-03-03: Scroll-Progress Continuous Animations (mandler.shop style)
**Summary**: Replaced one-shot IntersectionObserver scroll-reveals with a continuous, bidirectional scroll-progress system. Elements now animate **proportionally to scroll position** — sliding, fading, and revealing as you scroll down, and reversing when you scroll back up. This creates the "assembling/dispersing" effect seen on mandler.shop, where content layers converge at different speeds.

**Key concepts**:
- `useScrollProgress` hook sets `--sp` (0→1) CSS custom property on each section via rAF loop
- CSS classes (`sp-fade-up`, `sp-clip-reveal`, `sp-parallax-fast/slow`, `sp-stagger-children`, etc.) consume `--sp` for zero-JS-state rendering
- Multi-layer differential speeds: title moves faster than body text, creating depth
- Fully bidirectional: scroll up reverses all effects smoothly
- Respects `prefers-reduced-motion`

**Files Changed**:
- `client/src/hooks/useScrollProgress.ts` — New hook: `useScrollProgress` (CSS custom property driver), `useScrollProgressValue` (React state variant), `useMultiScrollProgress` (callback ref for lists). Computes element-center-to-viewport-zone mapping, updates via rAF with dirty-check optimization
- `client/src/index.css` — Added scroll-progress CSS system (~100 lines): `sp-fade-up/down/left/right`, `sp-scale-in`, `sp-clip-reveal`, `sp-clip-reveal-left`, `sp-line-grow`, `sp-parallax-fast/slow`, `sp-stagger-children` (differential translateY per child), reduced-motion overrides
- `client/src/pages/Home.tsx` — Replaced 11 `useScrollReveal` refs with 5 `useScrollProgress` section refs; updated Brand Story (sp-clip-reveal image + sp-parallax-fast title + sp-parallax-slow body + sp-line-grow divider), Gallery header (sp-fade-up), Reviews section (sp-fade-up header + sp-stagger-children grid), Support section (sp-clip-reveal-left image + parallax content), CTA section (sp-parallax-fast heading + sp-line-grow + sp-parallax-slow tagline + sp-fade-up button)

**Rationale**: User requested mandler.shop-style scroll animations where content assembles/disperses continuously with scroll position, rather than triggering once.

---

### 2026-03-03: Restore Lost Wording Fixes & Add Media Reviews Feature
**Summary**: Restored homepage wording refinements and the full Media Reviews feature that were present on the luxury-homepage branch but missing from main. This includes: (1) refined parallax quote #2 text and footer about description in all 3 languages, (2) new Media Reviews homepage section with 3 featured review cards, (3) dedicated /reviews page with hero, filter tabs, featured review, and reviews grid, (4) header navigation link to reviews page.

**Files Changed**:
- `client/src/lib/translations.ts` — Refined `quote.2` text (3 langs), refined `footer.about.description` (3 langs), added `header.reviews` key (3 langs), added `reviews.*` keys (12 keys × 3 langs), added `home.reviews.*` keys (3 keys × 3 langs)
- `client/src/pages/Home.tsx` — Added Play/FileText imports, added reviewsHeaderRef/reviewsGridRef scroll-reveal refs, inserted Media Reviews section (3-card grid with video/article badges, thumbnails, platform/author meta, excerpts, "View All" CTA) between gallery and parallax quote #2
- `client/src/components/Header.tsx` — Added `{ label: t('header.reviews'), href: '/reviews' }` to navItems array
- `client/src/pages/MediaReviews.tsx` — New file: full media reviews page with hero section, filter tabs (All/Video/Article), featured review card (21:9 aspect ratio with gradient overlay), reviews grid (3-col), ReviewCard sub-component; 6 placeholder review items covering YouTube/Bilibili/摄影笔记/LensRentals/色影无忌/カメラ部TV
- `client/src/App.tsx` — Added MediaReviews import and `/reviews` route

**Rationale**: User noticed homepage wording changes and the Media Reviews feature from the luxury-homepage branch were lost after the SE variant merge on main. All content changes were applied with styling adapted to main's industrial aesthetic (no gold accents or luxury typography).

---

### 2026-03-03: Merge Special Edition into 35mm F/2 as Material Variant
**Summary**: Merged the standalone Special Edition product into the 35mm F/2 product page as a material variant selector (Aluminum vs Brass · Special Edition). Users can now toggle between standard and special edition on a single product page. Removed all SE-specific navigation entries, showcase cards, and product listings. The SE intro/detail pages remain accessible via direct URL but are no longer linked from main navigation.

**Files Changed**:
- `client/src/pages/Product35mmF2.tsx` — Added `type Variant = 'standard' | 'special'`, variant state, separate `standardImages`/`specialImages` arrays, variant-aware specs (weight, body material, limited edition rows), variant-aware features (limited collection, premium materials, exclusive accessories for SE), variant-aware pricing (SE: discounted from original, limited availability, remaining count), material/variant selector UI, Limited Edition badge (Award icon), variant-conditional description, max-3 quantity limit for SE, "What's Included" packaging list for SE
- `client/src/components/Header.tsx` — Removed SE submenu entry from products navigation
- `client/src/pages/Home.tsx` — Removed SE showcase item and its click handler from horizontal product showcase
- `client/src/components/ProductSelectionCards.tsx` — Removed SE card, simplified grid from 3-col to 2-col, removed SE-specific name rendering logic
- `client/src/pages/Products.tsx` — Removed SE product entries from all 3 language arrays, removed category filter (only 1 product now), simplified Product type and copy strings

**Rationale**: Product integration — the Special Edition is a material variant of the same lens, not a separate product. Consolidating improves UX and reduces navigation complexity.

---

### 2026-03-03: Scroll-Reveal Animations & Image Hover Effects
**Summary**: Added scroll-triggered reveal animations to the homepage, inspired by mandler.shop's visual effects. Created a reusable `useScrollReveal` hook using IntersectionObserver and a comprehensive CSS animation system. Effects include: clip-path image reveals, fade-up/left/right content animations, divider line growth, staggered card reveals, and smooth image hover zoom. All animations respect `prefers-reduced-motion` for accessibility. Style remains unchanged (industrial Leica aesthetic).

**Files Changed**:
- `client/src/hooks/useScrollReveal.ts` — New hook: `useScrollReveal` (ref-based) and `useScrollRevealCallback` (callback-ref), supporting 10 animation types with configurable threshold, delay, duration, and stagger
- `client/src/index.css` — Added scroll-reveal animation system (~150 lines): `sr-fade-up/down/left/right`, `sr-fade-in`, `sr-scale-in`, `sr-clip-reveal`, `sr-clip-reveal-left`, `sr-line-grow`, `sr-stagger` + `image-hover-zoom` effect + reduced-motion overrides
- `client/src/pages/Home.tsx` — Applied scroll-reveal to Brand Story (clip-reveal image + fade-left content + line-grow divider), Gallery header (fade-up), Support section (clip-reveal-left image + fade-right content), Final CTA (fade-up heading + line-grow divider); added `image-hover-zoom` to story/support images
- `client/src/components/ProductSelectionCards.tsx` — Added stagger scroll-reveal to product grid, `image-hover-zoom` to product images

**Rationale**: User requested adding scroll-triggered special effects (referencing mandler.shop) to the main branch while keeping the existing industrial design style.

---

### 2026-03-02: ParallaxQuote — Rounded Corners & Color-Matched Gradient Background
**Summary**: Added rounded corners to ParallaxQuote sections. Restructured component with outer `<section>` (padding) + inner `<div>` (rounded-2xl + overflow-hidden). Fixed mobile bottom-edge visibility by increasing background height to 130%. Added `topBg`/`bottomBg` props so the padding area uses a 50/50 linear gradient that exactly matches adjacent section backgrounds, eliminating color mismatch.

**Files Changed**:
- `client/src/components/ParallaxQuote.tsx` — Added `topBg`/`bottomBg` props, nested structure with rounded-2xl, gradient background, increased parallax image height to 130% with -15% top offset, reduced parallax multiplier to 0.08
- `client/src/pages/Home.tsx` — Pass `topBg`/`bottomBg` color tokens to both ParallaxQuote instances

**Rationale**: User requested rounded corners on parallax quotes, then iteratively fixed padding size and color mismatch between the parallax section's padding area and adjacent sections.

---

### 2026-03-02: Usage Scenes — Add Sample Images from Gallery
**Summary**: Added sample images from the Azure Blob Storage gallery to each of the 4 usage scenarios in the 35mm F/2 intro page. Each scene now displays a relevant photograph above the title and description.

**Image Assignments**:
- 人文街拍 (Street) → Portugal streets & trams (第1章 地域/葡萄牙)
- 环境人像 (Portrait) → People & Objects (第6章 人・物)
- 旅行纪实 (Travel) → Egypt travel (第1章 地域/埃及)
- 视频拍摄 (Video) → Neon night scenes (第4章 霓虹)

**Files Changed**:
- `client/src/pages/Product35mmF2Intro.tsx` — Added `blobUrl` helper, added `image` field to scenes data, updated section layout with `aspect-[16/9] rounded-xl` image cards, increased `space-y` from 12 to 20

**Rationale**: User requested adding relevant sample photos to the usage scenes section for visual richness.

---

### 2026-03-02: Soft Wide-Screen Frame — Light Background + Rounded Corners
**Summary**: Replaced the dark (#000) wide-screen frame with a warm light-gray background. The outermost container and global header remain sharp-edged (no rounded corners) for a clean edge-to-edge appearance. Elevation shadows softened to complement the light background.

**Files Changed**:
- `client/src/index.css` — Changed `html { background-color: #000 }` → `oklch(0.92 0.006 60)` (warm light gray); softened elevation shadow values; removed heavy `section-raised` box-shadow (now z-index only)
- `client/src/App.tsx` — No rounded corners on outermost wrapper (sharp edge-to-edge)
- `client/src/components/Header.tsx` — No rounded corners on header; kept `top-0` fixed positioning
- `docs/manus-context/DESIGN_SYSTEM.md` — Updated Site Max-Width and Elevation & Depth System sections

**Rationale**: User requested softer visual presentation on wide screens — light background instead of dark, rounded corners instead of sharp hard edges and color blocks. The rounded container + light bg creates a modern, refined "floating card" aesthetic that feels less harsh than the previous dark frame approach.

---

### 2026-03-02: Restore Full-Width Hero Section
**Summary**: Restored the Hero (HorizontalProductShowcase) to full viewport width, breaking out of the 1440px container constraint. Added `.full-bleed` CSS utility class for elements that need to span the full viewport width while remaining inside a max-width parent.

**Files Changed**:
- `client/src/index.css` — Added `.full-bleed` utility class (uses `width: 100vw; left: 50%; margin-left: -50vw` technique)
- `client/src/components/HorizontalProductShowcase.tsx` — Applied `full-bleed` class to the outer `<section>`
- `client/src/App.tsx` — Added `overflow-x-clip` to the site wrapper to prevent horizontal scrollbar from the full-bleed element

**Rationale**: After the 1440px constraint was applied, the Hero section was no longer full-screen. User requested restoring it to the original full-width design.

---

### 2026-03-02: Visual Depth & Elevation System
**Summary**: Added a multi-layer depth system to create visual hierarchy between different levels of content. Includes alternating surface backgrounds, elevation shadows, floating section effects, and recessed parallax bands.

**Files Changed**:
- `client/src/index.css` — Added `--surface-alt` CSS variable (light/dark modes), registered `--color-surface-alt` in Tailwind theme; added `.elevation-1/2/3`, `.section-raised`, `.section-inset` utility classes
- `client/src/App.tsx` — Added `elevation-3` to the 1440px site wrapper for floating panel shadow
- `client/src/components/Header.tsx` — Added `boxShadow: '0 2px 16px rgba(0,0,0,0.06)'` to fixed header for floating depth
- `client/src/components/ParallaxQuote.tsx` — Added `section-inset` class for recessed inner shadow effect
- `client/src/pages/Home.tsx` — Applied `section-raised` to Brand Story, Gallery, and Support sections; used `bg-surface-alt` on Gallery and Product Cards sections for alternating surface tones
- `client/src/components/ProductSelectionCards.tsx` — Changed section to `bg-surface-alt section-raised`; added `elevation-1 hover:elevation-2` to individual product cards

**Rationale**: User requested visual hierarchy/depth between different layers of components. The system creates:
- **Layer 0** (deepest): ParallaxQuote bands with inner shadow — appear recessed
- **Layer 1**: Content sections with `section-raised` — float above parallax
- **Layer 2**: Cards with `elevation-1/2` — pop off their parent surface
- **Layer 3**: Header and site wrapper — top-most floating elements

---

### 2026-03-02: Global Max-Width Constraint (1440px) for Wide Screen Optimization
**Summary**: Added a global max-width constraint of 1440px to the entire site layout, preventing content from stretching across ultra-wide screens. Content is centered with a dark frame background, inspired by tec.gov.ae's contained layout approach.

**Files Changed**:
- `client/src/index.css` — Added `html { background-color: #000; }` for dark frame outside content area
- `client/src/App.tsx` — Wrapped Router content in `max-w-[1440px] mx-auto` container with `bg-background` and `min-h-screen`
- `client/src/components/Header.tsx` — Added `max-w-[1440px] mx-auto` to fixed header; restructured dropdown menu wrapper with max-width centering and `pointer-events-none/auto` passthrough

**Rationale**: User reported that full-width layout caused image distortion on wide screens. Constraining to 1440px prevents stretching while maintaining the editorial aesthetic. Dark html background creates a premium "floating content" frame effect, like a photographic print on dark matte.

---

### 2026-03-01: Global Button Rounded Corners
**Summary**: Changed global `--radius` design token from `0px` to `6px`, giving all buttons and UI components subtle rounded corners. Removed inline `borderRadius` workarounds from product page buttons.

**Files Changed**:
- `client/src/index.css` — `--radius: 0px` → `--radius: 6px` (yields `rounded-md`=4px, `rounded-lg`=6px)
- `client/src/pages/Product35mmF2.tsx` — Removed inline `borderRadius: '6px'` from quantity selector and purchase buttons, using Tailwind `rounded-md`/`rounded-l-md`/`rounded-r-md` classes instead
- `client/src/pages/Product35mmF2Special.tsx` — Same cleanup as above

**Rationale**: User requested subtle rounded corners on all buttons. Updating the design token is cleaner than per-button inline styles.

---

### 2026-03-01: Homepage UserGallery — Real Sample Photos & Full Uncropped Display
**Summary**: Replaced placeholder sample images in homepage UserGallery carousel with 7 real landscape photos from Azure Blob Storage (WebP), spanning chapters 1–5. Changed display from fixed-height `object-cover` (cropped) to natural aspect ratio `h-auto` (full uncropped) layout.

**Files Changed**:
- `client/src/pages/Home.tsx` — Replaced `/images/sample-*.jpg` placeholders with 7 Azure Blob Storage gallery URLs (landscape images from Geography, Color, Rhythm, Neon, Monochrome chapters)
- `client/src/components/UserGallery.tsx` — Removed fixed container heights (`h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]`), removed `h-full` from flex/slides, changed image from `object-cover` to `w-full h-auto` for natural proportions

**Rationale**: User requested (1) real gallery photos instead of placeholders, (2) landscape-only images displayed at full size without cropping.

---

### 2026-02-28: Gallery Page & Azure Blob Storage Integration
**Summary**: Created dedicated `/gallery` page displaying 131 user sample photos from Azure Blob Storage, organized by 6 chapters. Added "查看更多" (View More) link to homepage gallery section heading. Updated header navigation to link to `/gallery` instead of homepage anchor `/#gallery`.

**Scope**:
- **Gallery page** (`Gallery.tsx`): Hierarchical navigation — chapter tabs (sticky) + section sub-tabs; displays one section at a time with masonry grid; prev/next navigation with position indicator; lightbox scoped to current section; trilingual chapter/section titles with subtitles
- **Homepage "View More"**: Positioned inline to the right of the "用户样片" heading with subtle underline + chevron, matching editorial design language
- **Header nav**: Gallery link changed from `/#gallery` anchor to `/gallery` route

**Files Changed**:
- `client/src/pages/Gallery.tsx` (new) — Section-at-a-time gallery with chapter/section tab navigation, masonry columns, lightbox, prev/next, position counter
- `client/src/App.tsx` — Added Gallery import and `/gallery` route
- `client/src/pages/Home.tsx` — Moved "View More" to right of heading with design-forward inline style
- `client/src/components/Header.tsx` — Changed gallery nav link from `/#gallery` to `/gallery`
- `client/src/lib/translations.ts` — Added `gallery.viewMore` key in zh/en/ja

**Rationale**: User uploaded 131 sample photos (~749MB) to Azure Blob Storage and requested a dedicated gallery page accessible from homepage. User requested (1) "查看更多" at heading right with design feel, (2) show one section at a time rather than all images at once.

---

### 2026-02-28: Shop Page Carousel, UserGallery Enhancements & UI Refinements
**Summary**: Major overhaul of product shop pages and homepage UserGallery. Replaced thumbnail grids with horizontal-slide carousels, added lightbox, auto-scroll, position-based drag logic, and various UI refinements.

**Scope**:
- **Shop Page Carousel** (Product35mmF2.tsx, Product35mmF2Special.tsx): Replaced thumbnail grid with `translateX`-based horizontal slide carousel; 4s auto-play interval with dot indicators; mouse/touch drag support with position-based switching (right→left half = next, left→right half = prev); `hasDragged` ref (5px threshold) distinguishes click from drag; removed `aspect-square` constraint, using `object-contain` + `h-auto` for full image display
- **Lightbox on Shop Pages**: Added click-to-enlarge `ImageLightbox` on main product image; auto-play pauses when lightbox is open
- **Product Introduction Links**: Added "查看产品介绍 / View Introduction / 製品紹介を見る" link buttons between description and purchase section, linking to respective intro pages
- **Button Rounded Corners**: Added inline `borderRadius: '6px'` to quantity selector, add-to-cart, and buy-now buttons (workaround for `--radius: 0px` global CSS)
- **UserGallery Enhancements**: Applied same position-based drag logic; added 4s auto-scroll with pause on hover/drag/lightbox; removed `hover:opacity-90` from images; circular wrap-around for drag (last→first, first→last)
- **FlagIcon Component** (new): SVG-based flag icons for language switcher (replaces emoji flags for cross-platform consistency)
- **Header Language Switcher**: Updated to use FlagIcon component
- **Aperture Sample Images** (new): Added `35mmF2-F2.jpg` and `35mmF2-F4-8.jpg` for intro page aperture comparison section
- **Copilot Instructions**: Added mandatory pre-read context, documentation sync rules, consolidation policy, pre-commit checklist

**Files Changed**:
- `client/src/pages/Product35mmF2.tsx` — carousel, lightbox, intro link, button corners, drag logic
- `client/src/pages/Product35mmF2Special.tsx` — same as above + limited edition badge overlay
- `client/src/pages/Product35mmF2Intro.tsx` — aperture sample images section, breadcrumb updates
- `client/src/pages/Product35mmF2SpecialIntro.tsx` — breadcrumb label fix
- `client/src/components/UserGallery.tsx` — position-based drag, auto-scroll, hover removal, circular wrap
- `client/src/components/FlagIcon.tsx` (new) — SVG flag icon component
- `client/src/components/Header.tsx` — FlagIcon integration, language switcher styling
- `client/src/pages/Products.tsx` — breadcrumb label unification
- `client/public/images/35mmF2-sample-images/` (new) — aperture comparison images
- `.github/copilot-instructions.md` — documentation workflow rules

**Rationale**: User requested iterative UI improvements to match magazine-style editorial design: richer product browsing (carousel + lightbox), smoother interactions (drag + auto-scroll), and visual polish.

---

### 2026-02-27: Product Naming — Remove "7-element" Suffix
**Summary**: Removed "7-element" suffix from all product display names. Products now display as "35mm F/2" (standard) and "35mm F/2 特别版/特別版/Special Edition" (special). Also fixed `heroEdition` content key in ProductE39SpecialIntro.tsx so the edition label renders on a separate line in the hero section.

**Files Changed**:
- `client/src/components/Header.tsx` — nav labels
- `client/src/components/ProductSelectionCards.tsx` — card names
- `client/src/pages/Home.tsx` — showcase names
- `client/src/pages/Products.tsx` — product listing names (zh/en/ja)
- `client/src/pages/ProductE39.tsx` — h1 title, alt tags
- `client/src/pages/ProductE39Special.tsx` — alt tags, package list
- `client/src/pages/ProductE39Intro.tsx` — breadcrumb, heroTitle, inline paragraphs, alt tags
- `client/src/pages/ProductE39SpecialIntro.tsx` — split heroTitle/heroEdition keys, breadcrumb, inline paragraphs
- `client/src/lib/translations.ts` — timeline4Desc

**Rationale**: User decided "7-element" suffix didn't look good and requested removal.

---

### 2026-02-27: E39 Product Introduction Page — Content Expansion
**Summary**: Significantly expanded `ProductE39Intro.tsx` with detailed product information covering optical structure, aperture characteristics, craftsmanship, optical performance data, and additional usage scenarios. All content trilingual (zh/en/ja).

**Scope**:
- Replaced existing "Optical Design" section with new **Legendary Optical Architecture** section: 7E/5G Double Gaussian design, purple-gold multi-layer coating, spec mini-cards (construction, design type, coating)
- Added **Aperture Highlight** parallax quote section with cinematic background image
- Added **F2 Large Aperture** section: two-column layout comparing wide-open (F2.0) vs stopped-down (F4–F8) characteristics
- Added **Full-Metal Craftsmanship** section: crescent focus ring, 10-blade circular aperture, mechanical damping, reversed image/text layout
- Added **Optical Performance Data** section: 4-card grid (field curvature, distortion < ±0.5%, aperture blades, max aperture)
- Expanded **Usage Scenes** from 3 to 4: street documentary, environmental portrait, travel documentary, video/motion
- Added full-bleed image divider using `银色镜头不挂机特写.jpg`
- Updated product specs throughout from f/1.4 to F2.0, from 8组11片 to 7片5组, from 320g to 34mm compact length
- Updated closing statement to reflect new positioning
- Refactored scenes/perfStats into mapped arrays for cleaner JSX

**Files Changed**:
- `client/src/pages/ProductE39Intro.tsx` (full rewrite, ~221 → ~350 lines)

**Rationale**: User provided detailed E39 lens specifications and requested richer editorial content aligned with the existing magazine-style design language.

---

### 2026-02-27: Japanese Language Support (Trilingual)
**Summary**: Added full Japanese (日本語) language support, expanding the site from bilingual (zh/en) to trilingual (zh/en/ja).

**Scope**:
- Updated `LanguageContext.tsx`: Language type `'zh' | 'en'` → `'zh' | 'en' | 'ja'`, localStorage validation includes `ja`
- Added complete Japanese translation block (~200 keys) to `translations.ts` covering all sections: header, hero, products, brand story, parallax quotes, gallery, support, CTA, footer, product details (M11/Q3/SL3), lightbox
- Fixed `getTranslation` return type cast to resolve pre-existing TS2322 error
- Updated language switcher in `Header.tsx`: 3-option dropdown (🇨🇳中文/🇺🇸English/🇯🇵日本語)
- Updated all hardcoded ternary expressions across 10+ files to include `ja` branch
- Added Japanese content blocks to: `ProductE39Intro.tsx`, `ProductE39SpecialIntro.tsx`, `ServiceSupport.tsx`, `ProductE39.tsx`, `ProductE39Special.tsx`
- Updated breadcrumbs in all pages: ホーム/製品/ブランドストーリー/サービス・サポート etc.
- Japanese pricing: ¥278,000 (E39) / ¥628,000 (E39 Special)

**Files Changed**:
- `client/src/contexts/LanguageContext.tsx`
- `client/src/lib/translations.ts`
- `client/src/components/Header.tsx`
- `client/src/components/ProductSelectionCards.tsx`
- `client/src/pages/Home.tsx`
- `client/src/pages/Products.tsx`
- `client/src/pages/BrandStory.tsx`
- `client/src/pages/ProductDetail.tsx`
- `client/src/pages/ProductE39.tsx`
- `client/src/pages/ProductE39Intro.tsx`
- `client/src/pages/ProductE39Special.tsx`
- `client/src/pages/ProductE39SpecialIntro.tsx`
- `client/src/pages/ServiceSupport.tsx`

---

## Consolidated Historical Changes

### 2026-02-26: Deployment, UI Enhancements & Page Additions
- **Azure SWA Deployment**: New resource `zealous-stone-00bf12300`, CI/CD on `release` branch, SPA routing fix (`navigationFallback`), cleanup of orphaned workflows
- **Hero Section UI**: Dot-style scroll indicators (active capsule/inactive circles), mobile spacing fix for product cards
- **Service & Support Page**: New `/support` page with magazine-style editorial layout, full zh/en content; Header nav updated from anchor to route
- **Products Page**: Removed duplicate local header, adjusted padding for global header

### 2026-02-24: Navigation, Cart, Brand Story & Product Pages
- **Navigation & Scroll-Top Fixes**: `navigateWithTop` helper for forced scroll-top on route entry; Header/Home link targets unified
- **Cart Click Prompt**: Replaced disabled cart with clickable coming-soon toast notification
- **Brand Story Corrections**: Timeline years corrected (2025→2024, 2020→2023), lens-first wording
- **Products Page & Card Entry**: Realigned to E39 range, added E39 Special card, editorial intro pages created (`/products/e39-intro`, `/products/e39-special-intro`)
- Files: `Header.tsx`, `Home.tsx`, `Products.tsx`, `ProductSelectionCards.tsx`, `ProductE39Intro.tsx`, `ProductE39SpecialIntro.tsx`, `App.tsx`, `translations.ts`

### 2026-02-24: E39 Special Intro Page — Iterative Design Refinements
Multiple rounds of styling and layout adjustments to the E39 Special Edition intro page:
- Signature section: boundary shifted to tonal contrast, typography unified with page system, meta text readability improved, switched to open horizontal layout
- Typography scale aligned with design system (`md:text-5xl` → `md:text-4xl`)
- Leica-magazine editorial style pass for overall aesthetic
- Layout consistency refinement with protocol markers (`01 / 03` style)
- Removed edition number element from hero
- Premium differentiation upgrade (materials, finish, limited-edition identity badge)
- Files: `client/src/pages/ProductE39SpecialIntro.tsx`

---

### 2026-02-24: Products Page & Card Entry Updates
- Products page realigned to E39 range only with full zh/en bilingual support
- Added E39 Special Edition card entry on homepage `ProductSelectionCards`
- Intro page CTA navigation forced scroll-to-top on route change
- Created editorial product introduction pages for E39 and E39 Special Edition (`/products/e39-intro`, `/products/e39-special-intro`)
- Header and homepage showcase click targets updated to intro pages
- Files: `Products.tsx`, `ProductSelectionCards.tsx`, `ProductE39Intro.tsx`, `ProductE39SpecialIntro.tsx`, `App.tsx`, `Header.tsx`, `Home.tsx`

---

### 2026-02-24: Home Hero Background Update
- Updated Mandler hero background to manually prepared cover asset in `Home.tsx`

---

### 2026-02-14 to 2026-02-23: Initial Build & Foundational Features
- **2026-02-14**: Initial setup — Hero horizontal showcase with parallax, auto-scroll, header auto-hide, product detail pages (E39 / E39 Special Edition), fixed header overlap
- **2026-02-16**: Ultra-wide screen optimization — `maxHeight: 1080px` on Hero, responsive CTA spacing
- **2026-02-17**: Product rename E35 → E39 across all files, routes, and docs
- **2026-02-23**: Migrated CDN images to local `client/public/images/`, fixed store status i18n (disabled cart + multilingual notice), added language coverage requirement


---

## Known Issues

### TypeScript Error in translations.ts
**Status**: ✅ Fixed (2026-02-27) — Added `as string` cast in `getTranslation` return.

---

## Development Workflow

### Local Development
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Creating Checkpoints
Use `webdev_save_checkpoint` before major changes:
```
Description: Brief summary of changes
- Feature 1
- Feature 2
- Bug fixes
```

### Syncing to GitHub
After checkpoint, sync to `richard6094/camera_website`:
```bash
cd /home/ubuntu/camera_website
rm -rf *
cp -r /home/ubuntu/premium-brand-homepage/{client,server,shared,package.json,pnpm-lock.yaml,tsconfig.json,vite.config.ts,.gitignore} .
git add -A
git commit -m "Descriptive commit message"
git push origin main
```

---

## Asset Management

### Image Upload Process
1. Prepare image assets and place them in `client/public/images/`
2. Use stable file naming (prefer descriptive names or source basename)
3. Reference images in code via `/images/<filename>`
4. Keep originals in an archival folder if needed

**Example**:
```bash
cp /path/to/image.jpg client/public/images/hero-cover.jpg
# Use in code: /images/hero-cover.jpg
```

### Image Optimization
- Use WebP format when possible
- Provide fallbacks for older browsers
- Lazy load below-the-fold images
- Use responsive images with `srcset`

---

## Performance Considerations

### Hero Section
- Max height limit (1080px) prevents excessive image loading
- Gradient mask reduces visual artifacts on ultra-wide screens
- Parallax effect uses `transform` (GPU-accelerated)
- Auto-scroll uses `setInterval` with cleanup

### Header
- Fixed positioning with `transform` for smooth hide/show
- Passive scroll listener for better performance
- Menu auto-closes when header hides

### Images
- Product images are served as local static assets from `client/public/images`
- Lazy loading for gallery images
- Object-fit: cover for consistent aspect ratios

---

## Browser Compatibility

### Tested Browsers
- Chrome/Edge 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅

### Known Issues
- Safari: Gradient mask may have slight rendering differences
- Firefox: Parallax effect may be less smooth on lower-end devices

### Polyfills Needed
- None (modern browsers only)

---

## Accessibility Checklist

### Implemented
✅ Semantic HTML elements  
✅ Alt text for all images  
✅ Keyboard navigation  
✅ Focus indicators  
✅ ARIA labels for icons  
✅ Color contrast (WCAG AA)  

### TODO
⬜ Screen reader testing  
⬜ High contrast mode support  
⬜ Reduced motion preference  
⬜ Skip to content link  

---

## Security Considerations

### Current Implementation
- No user authentication (static site)
- No sensitive data storage
- No API keys in client code
- CDN URLs are public (intentional)

### Future Considerations
- If adding user accounts: Use secure authentication (OAuth)
- If adding payment: Use Stripe integration (PCI compliant)
- If adding backend: Implement CSRF protection

---

## Testing Strategy

### Manual Testing
- Test on multiple screen sizes (mobile, tablet, desktop, ultra-wide)
- Test all interactive elements (buttons, links, forms)
- Test language switching (ZH/EN/JA)
- Test navigation (header menu, breadcrumbs, back buttons)

### Browser Testing
- Chrome DevTools device emulation
- Real device testing (iOS, Android)
- Cross-browser testing (Chrome, Firefox, Safari)

### Accessibility Testing
- Keyboard-only navigation
- Screen reader testing (NVDA, VoiceOver)
- Color contrast checker
- Focus indicator visibility

---

## Deployment

### Manus Platform
- Automatic deployment on checkpoint creation
- CDN for static assets
- Custom domain support (`.manus.space`)
- SSL/TLS enabled by default

### GitHub Repository
- Manual sync required (not automatic)
- Repository: `richard6094/camera_website`
- Branch: `main`

---

## Future Enhancements

### High Priority
1. **Shopping Cart Functionality**
   - Add/remove items
   - Quantity adjustment
   - Checkout flow
   - Order confirmation

2. **Product Comparison**
   - Side-by-side spec comparison
   - Highlight differences
   - Add to comparison button

3. **User Reviews**
   - Star ratings
   - Written reviews
   - Photo uploads
   - Verified purchase badges

### Medium Priority
1. **Search & Filtering**
   - Product search
   - Filter by price, focal length, aperture
   - Sort options

2. **Wishlist**
   - Save products for later
   - Share wishlist

3. **Newsletter Signup**
   - Email collection
   - Promotional emails

### Low Priority
1. **360° Product Views**
   - Interactive product rotation
   - Zoom functionality

2. **Video Demonstrations**
   - Product intro videos
   - Tutorial videos

3. **Blog/News Section**
   - Product announcements
   - Photography tips
   - Brand stories

---

## Code Quality

### Linting
- ESLint configured (via Vite)
- Prettier for code formatting (optional)

### Type Safety
- TypeScript strict mode enabled
- Prop types defined for all components
- Context types defined

### Code Organization
- Components in `client/src/components/`
- Pages in `client/src/pages/`
- Utilities in `client/src/lib/`
- Contexts in `client/src/contexts/`

---

## Troubleshooting

### Dev Server Won't Start
1. Check if port 3000 is already in use
2. Delete `node_modules` and reinstall: `pnpm install`
3. Clear Vite cache: `rm -rf node_modules/.vite`

### Images Not Loading
1. Verify image path starts with `/images/`
2. Check file exists in `client/public/images/`
3. Check browser console for 404 path errors

### TypeScript Errors
1. Check `tsconfig.json` configuration
2. Restart TypeScript server in IDE
3. Run `pnpm build` to see all errors

### Header Not Hiding on Scroll
1. Check scroll event listener is attached
2. Verify scroll position calculation
3. Check CSS transition is not disabled

---

## Contact & Support

For questions or issues:
- GitHub Issues: `richard6094/camera_website`
- Project maintained by: Manus AI Agent
- Last updated: 2026-02-28
