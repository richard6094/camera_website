# Component Guide

## Overview

This guide provides detailed information about custom components in the Mandler project, including usage examples, props, and best practices.

## Core Components

### HorizontalProductShowcase

**Location**: `client/src/components/HorizontalProductShowcase.tsx`

**Purpose**: Unified horizontal scrolling showcase for hero sections and product cards with parallax effects.

**Features**:
- Horizontal scroll with snap points
- Auto-scroll every 5 seconds (pauses 10s on manual interaction)
- Parallax background effects
- Bottom thumbnail navigation
- Gradient mask for ultra-wide screens
- Responsive height (100vh, min 700px, max 1080px)

**Props**:
```typescript
interface HorizontalProductShowcaseProps {
  items: ShowcaseItem[];           // Array of hero/product items
  onItemClick?: (itemId: string | number) => void;  // Click handler
  videoLoaded?: boolean;           // Video loading state
  videoProgress?: number;          // Video load progress (0-100)
  onVideoLoadProgress?: (progress: number) => void; // Progress callback
}

interface ShowcaseItem {
  id: string | number;
  type: 'hero' | 'product';
  name: string;
  // Hero-specific
  title?: string;
  subtitle?: string;
  description?: string;
  videoSrc?: string;
  image?: string;
  // Product-specific
  tagline?: string;
  productDescription?: string;
}
```

**Usage Example**:
```tsx
const showcaseItems = [
  {
    id: 'mandler',
    type: 'hero',
    name: 'Mandler',
    title: 'Mandler',
    subtitle: '光，拥有自己的语言',
    description: '续写传奇光学设计师的经典...',
    image: 'https://cdn.example.com/hero.jpg',
  },
  {
    id: 'e35',
    type: 'product',
    name: 'E35',
    tagline: '经典焦段，纯粹视角',
    image: 'https://cdn.example.com/e35.jpg',
    productDescription: '35mm 定焦镜头...',
  },
];

<HorizontalProductShowcase 
  items={showcaseItems}
  onItemClick={(id) => navigate(`/products/${id}`)}
/>
```

**Important Notes**:
- Images should use CDN URLs (via `manus-upload-file`)
- Hero items display logo, subtitle, description, and CTA button
- Product items display tagline, description, and "发现更多" button
- Auto-scroll can be paused by user interaction (touch/mouse)

---

### Header

**Location**: `client/src/components/Header.tsx`

**Purpose**: Fixed header with auto-hide on scroll, navigation menu, language switcher, and shopping cart.

**Features**:
- Auto-hides on scroll down (after 100px)
- Reappears on scroll up
- Always visible at page top (< 10px scroll)
- Smooth 300ms transition
- Responsive product dropdown menu
- Language toggle (CN/EN)
- Shopping cart icon with count badge

**Props**: None (uses contexts: `LanguageContext`, `CartContext`)

**Usage**:
```tsx
<Header />
```

**Customization**:
The product menu is defined internally:
```tsx
const products = [
  {
    label: 'E35',
    href: '/products/e35',
    description: language === 'zh' ? '经典焦段，纯粹视角' : 'Classic Focal Length, Pure Perspective',
  },
  {
    label: 'E35 ' + (language === 'zh' ? '特别版' : 'Special Edition'),
    href: '/products/e35-special',
    description: language === 'zh' ? '匠心之作，限量典藏' : 'Crafted Excellence, Limited Collection',
  },
];
```

**Scroll Behavior**:
```tsx
// Hide header when scrolling down
if (scrollY > lastScrollY && scrollY > 100) {
  setIsVisible(false);
  setIsMenuOpen(false); // Auto-close menu
}
// Show header when scrolling up
else if (scrollY < lastScrollY) {
  setIsVisible(true);
}
// Always show at top
if (scrollY < 10) {
  setIsVisible(true);
}
```

---

### Footer

**Location**: `client/src/components/Footer.tsx`

**Purpose**: Site footer with navigation links, contact info, and social media.

**Features**:
- Multi-column layout (responsive)
- Quick links to main pages
- Contact email
- Social media icons (Instagram, Facebook, YouTube)
- Copyright notice

**Props**: None (uses `LanguageContext`)

**Usage**:
```tsx
<Footer />
```

---

### ProductSelectionCards

**Location**: `client/src/components/ProductSelectionCards.tsx`

**Purpose**: Grid of square product cards for product selection.

**Features**:
- Square aspect ratio (`aspect-square`)
- Responsive grid (2 cols mobile, 3 cols desktop)
- Hover effects (scale, border highlight)
- "Coming Soon" placeholder cards

**Props**:
```typescript
interface ProductSelectionCardsProps {
  products: Array<{
    id: string;
    name: string;
    image: string;
    available: boolean;
  }>;
}
```

**Usage**:
```tsx
<ProductSelectionCards 
  products={[
    { id: 'e35', name: 'E35', image: '/images/e35.jpg', available: true },
    { id: 'coming-soon', name: '敬请期待', image: '', available: false },
  ]}
/>
```

**Layout**:
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  <div className="aspect-square overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all">
    {/* Card content */}
  </div>
</div>
```

---

### ParallaxQuote

**Location**: `client/src/components/ParallaxQuote.tsx`

**Purpose**: Full-width quote section with parallax background image.

**Props**:
```typescript
interface ParallaxQuoteProps {
  quote: string;
  author?: string;
  backgroundImage: string;
}
```

**Usage**:
```tsx
<ParallaxQuote 
  quote="光，拥有自己的语言"
  author="Mandler"
  backgroundImage="https://cdn.example.com/quote-bg.jpg"
/>
```

---

### UserGallery

**Location**: `client/src/components/UserGallery.tsx`

**Purpose**: Masonry-style gallery of user-submitted photos.

**Features**:
- Responsive masonry layout
- Lightbox on image click
- Lazy loading
- Hover effects

**Props**:
```typescript
interface UserGalleryProps {
  images: Array<{
    id: string;
    src: string;
    alt: string;
    photographer?: string;
  }>;
}
```

**Usage**:
```tsx
<UserGallery 
  images={[
    { id: '1', src: '/images/sample-1.jpg', alt: 'Street photography', photographer: 'John Doe' },
    { id: '2', src: '/images/sample-2.jpg', alt: 'Portrait', photographer: 'Jane Smith' },
  ]}
/>
```

---

### ImageLightbox

**Location**: `client/src/components/ImageLightbox.tsx`

**Purpose**: Full-screen image viewer with navigation.

**Features**:
- Full-screen overlay
- Previous/Next navigation
- Close button (X) and ESC key support
- Click outside to close
- Smooth transitions

**Props**:
```typescript
interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}
```

**Usage**:
```tsx
const [lightboxOpen, setLightboxOpen] = useState(false);
const [currentImage, setCurrentImage] = useState(0);

<ImageLightbox 
  images={['/img1.jpg', '/img2.jpg', '/img3.jpg']}
  currentIndex={currentImage}
  onClose={() => setLightboxOpen(false)}
  onNavigate={(index) => setCurrentImage(index)}
/>
```

---

### Breadcrumb

**Location**: `client/src/components/Breadcrumb.tsx`

**Purpose**: Navigation breadcrumb trail.

**Props**:
```typescript
interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}
```

**Usage**:
```tsx
<Breadcrumb 
  items={[
    { label: '首页', href: '/' },
    { label: '产品系列', href: '/products' },
    { label: 'E35' }, // Current page (no href)
  ]}
/>
```

---

## Contexts

### LanguageContext

**Location**: `client/src/contexts/LanguageContext.tsx`

**Purpose**: Global language state management (Chinese/English).

**API**:
```typescript
const { language, setLanguage, t } = useLanguage();

// language: 'zh' | 'en'
// setLanguage: (lang: 'zh' | 'en') => void
// t: (key: string) => string  // Translation function
```

**Usage**:
```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <p>{t('header.products')}</p>
      <button onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}>
        {language === 'zh' ? 'EN' : 'CN'}
      </button>
    </div>
  );
}
```

**Translation Keys** (see `client/src/lib/translations.ts`):
- `header.*` - Header navigation
- `hero.*` - Hero section
- `product.*` - Product pages
- `footer.*` - Footer
- `cart.*` - Shopping cart

---

### CartContext

**Location**: `client/src/contexts/CartContext.tsx`

**Purpose**: Shopping cart state management.

**API**:
```typescript
const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

// items: CartItem[]
// addItem: (product: Product, quantity: number) => void
// removeItem: (productId: string) => void
// updateQuantity: (productId: string, quantity: number) => void
// clearCart: () => void
// totalItems: number
// totalPrice: number
```

**Usage**:
```tsx
import { useCart } from '@/contexts/CartContext';

function ProductPage() {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    addItem({
      id: 'e35',
      name: 'E35',
      price: 12800,
      image: '/images/e35.jpg',
    }, quantity);
  };
  
  return <button onClick={handleAddToCart}>加入购物车</button>;
}
```

---

## shadcn/ui Components

The project uses shadcn/ui components from `client/src/components/ui/`:

### Button
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dialog
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <div>Content</div>
  </DialogContent>
</Dialog>
```

### Select
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

**Important**: Never use empty string `""` as SelectItem value. Always provide a non-empty value.

---

## Best Practices

### Component Structure
```tsx
// 1. Imports
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

// 2. Type definitions
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

// 3. Component
export default function MyComponent({ title, onAction }: MyComponentProps) {
  // 4. Hooks
  const { t } = useLanguage();
  const [state, setState] = useState(false);
  
  // 5. Event handlers
  const handleClick = () => {
    setState(true);
    onAction?.();
  };
  
  // 6. Render
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button onClick={handleClick}>{t('common.action')}</Button>
    </div>
  );
}
```

### State Management
- Use `useState` for local component state
- Use contexts (`LanguageContext`, `CartContext`) for global state
- Avoid prop drilling - use contexts for deeply nested data

### Styling
- Prefer Tailwind utilities over custom CSS
- Use responsive classes: `sm:`, `md:`, `lg:`, `xl:`
- Follow spacing patterns: `mb-8 sm:mb-10 md:mb-12`
- Use semantic color tokens: `bg-background`, `text-foreground`

### Performance
- Lazy load images with `loading="lazy"`
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to children
- Avoid inline object/array creation in render

### Accessibility
- Always provide `alt` text for images
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Ensure keyboard navigation works
- Add ARIA labels where needed
- Test with screen readers

### Error Handling
- Use try-catch for async operations
- Provide fallback UI for errors
- Show user-friendly error messages
- Log errors for debugging

---

## Common Patterns

### Responsive Image
```tsx
<img 
  src={imageSrc}
  alt="Descriptive alt text"
  className="w-full h-auto object-cover"
  loading="lazy"
/>
```

### Conditional Rendering
```tsx
{isLoading ? (
  <div>Loading...</div>
) : error ? (
  <div>Error: {error.message}</div>
) : (
  <div>Content</div>
)}
```

### List Rendering
```tsx
{items.map((item) => (
  <div key={item.id}>
    {item.name}
  </div>
))}
```

### Form Handling
```tsx
const [formData, setFormData] = useState({ name: '', email: '' });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Submit logic
};

<form onSubmit={handleSubmit}>
  <input name="name" value={formData.name} onChange={handleChange} />
  <input name="email" value={formData.email} onChange={handleChange} />
  <button type="submit">Submit</button>
</form>
```
