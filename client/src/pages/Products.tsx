import { useState } from 'react';
import { useLocation } from 'wouter';
import { ShoppingCart, ChevronRight, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

/**
 * Products Page
 * Design Philosophy: Minimalism + Cinematic Aesthetics
 * 
 * Features:
 * - Product grid with filtering
 * - Category navigation
 * - Product detail modal
 * - Quick preview button
 * - Toast notifications
 */

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  specs: string[];
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Classic Film Camera',
    category: 'Film Cameras',
    price: 2499,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/oHZJxwvhISskTVVi.jpg',
    description: 'A timeless mechanical camera with exceptional build quality and optical precision.',
    specs: ['35mm Film', 'Manual Focus', 'Mechanical Shutter', 'All-Metal Body'],
    inStock: true,
  },
  {
    id: 2,
    name: 'Professional Digital SLR',
    category: 'Digital Cameras',
    price: 3999,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/oHZJxwvhISskTVVi.jpg',
    description: 'Full-frame digital camera with advanced autofocus and 4K video capabilities.',
    specs: ['Full-Frame Sensor', '45MP Resolution', '4K Video', 'Weather Sealed'],
    inStock: true,
  },
  {
    id: 3,
    name: 'Compact Travel Camera',
    category: 'Compact Cameras',
    price: 1299,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/oHZJxwvhISskTVVi.jpg',
    description: 'Lightweight and portable camera perfect for travel and street photography.',
    specs: ['APS-C Sensor', '24MP Resolution', 'Compact Design', 'Silent Mode'],
    inStock: true,
  },
  {
    id: 4,
    name: 'Vintage Rangefinder',
    category: 'Film Cameras',
    price: 1899,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/oHZJxwvhISskTVVi.jpg',
    description: 'Beautifully restored vintage rangefinder with pristine optics.',
    specs: ['35mm Film', 'Rangefinder Focus', 'Coated Lens', 'Fully Functional'],
    inStock: true,
  },
  {
    id: 5,
    name: 'Medium Format Camera',
    category: 'Digital Cameras',
    price: 5999,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/oHZJxwvhISskTVVi.jpg',
    description: 'Professional-grade medium format camera for studio and fashion photography.',
    specs: ['Medium Format Sensor', '100MP Resolution', 'Phase Detection AF', 'Tethering Support'],
    inStock: false,
  },
  {
    id: 6,
    name: 'Instant Film Camera',
    category: 'Instant Cameras',
    price: 899,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/oHZJxwvhISskTVVi.jpg',
    description: 'Modern instant camera combining retro aesthetics with digital precision.',
    specs: ['Instant Film', 'Digital Sensor', 'Built-in Flash', 'Manual Controls'],
    inStock: true,
  },
  {
    id: 7,
    name: 'Professional Video Camera',
    category: 'Video Cameras',
    price: 4499,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/oHZJxwvhISskTVVi.jpg',
    description: 'Cinema-grade video camera with professional color science and codec options.',
    specs: ['8K Recording', 'RAW Output', 'Professional Codecs', 'Modular Design'],
    inStock: true,
  },
  {
    id: 8,
    name: 'Mirrorless Hybrid',
    category: 'Digital Cameras',
    price: 2799,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/oHZJxwvhISskTVVi.jpg',
    description: 'Versatile mirrorless camera excelling in both photography and videography.',
    specs: ['Full-Frame Sensor', '61MP Resolution', '8K Video', 'AI Autofocus'],
    inStock: true,
  },
  {
    id: 9,
    name: 'Disposable Film Camera',
    category: 'Film Cameras',
    price: 299,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/oHZJxwvhISskTVVi.jpg',
    description: 'Single-use film camera with simple operation and authentic film aesthetic.',
    specs: ['35mm Film', 'Fixed Focus', 'Built-in Flash', 'Pre-loaded'],
    inStock: true,
  },
  {
    id: 10,
    name: 'Action Camera Pro',
    category: 'Compact Cameras',
    price: 699,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/oHZJxwvhISskTVVi.jpg',
    description: 'Rugged action camera designed for extreme conditions and underwater use.',
    specs: ['4K Recording', 'Waterproof', 'Stabilization', 'Compact Form Factor'],
    inStock: true,
  },
];

export default function Products() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { items, addItem, itemCount } = useCart();

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    toast.success(`${product.name} 已添加到购物车`);
  };

  return (
    <div className="w-full bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-foreground/10">
        <div className="container max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-display text-2xl">Our Collection</h1>
          <div className="flex items-center gap-4">
            <button 
            onClick={() => navigate('/')}
            className="text-sm tracking-widest text-foreground/60 hover:text-foreground transition-colors"
          >
            HOME
          </button>
            <button className="relative">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-foreground text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Category filter */}
          <div className="mb-16">
            <h2 className="text-subtitle text-lg mb-8 tracking-wide">Filter by Category</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 border transition-all duration-300 ${
                    selectedCategory === category
                      ? 'border-foreground bg-foreground text-white'
                      : 'border-foreground/30 text-foreground/60 hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="divider-line w-full h-px bg-foreground/10 mb-16" />

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Product image */}
                <div className="relative overflow-hidden aspect-square mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-sm tracking-widest">OUT OF STOCK</span>
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="space-y-3">
                  <p className="text-xs tracking-widest text-foreground/50 uppercase">
                    {product.category}
                  </p>
                  <h3 className="text-subtitle text-lg group-hover:text-foreground/80 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-body text-foreground/60 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-display text-xl">${product.price}</span>
                    <div className="flex items-center gap-2">
                      {/* Quick Preview Button */}
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="px-3 py-2 border border-foreground/30 text-foreground/60 hover:border-foreground hover:bg-foreground/5 transition-all duration-300 text-xs"
                        title="Quick Preview"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      {/* Add to Cart Button */}
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={!product.inStock}
                        className={`px-4 py-2 border transition-all duration-300 ${
                          product.inStock
                            ? 'border-foreground/30 text-foreground/60 hover:border-foreground hover:bg-foreground/5'
                            : 'border-foreground/10 text-foreground/30 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results count */}
          <div className="text-center text-sm text-foreground/50 tracking-widest">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </main>

      {/* Product detail modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="float-right text-foreground/50 hover:text-foreground transition-colors mb-6"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product image */}
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Product details */}
                <div className="space-y-6">
                  <div>
                    <p className="text-xs tracking-widest text-foreground/50 uppercase mb-2">
                      {selectedProduct.category}
                    </p>
                    <h2 className="text-display text-3xl mb-4">{selectedProduct.name}</h2>
                    <p className="text-body text-foreground/70 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Specs */}
                  <div>
                    <h3 className="text-subtitle text-sm mb-3 tracking-widest">SPECIFICATIONS</h3>
                    <ul className="space-y-2">
                      {selectedProduct.specs.map((spec, i) => (
                        <li key={i} className="text-sm text-foreground/70 flex items-center">
                          <span className="w-1 h-1 bg-foreground/50 rounded-full mr-3" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and stock */}
                  <div className="border-t border-foreground/10 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-display text-2xl">${selectedProduct.price}</span>
                      <span className={`text-xs tracking-widest ${selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedProduct.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      disabled={!selectedProduct.inStock}
                      className={`w-full py-3 border transition-all duration-300 ${
                        selectedProduct.inStock
                          ? 'border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5'
                          : 'border-foreground/10 text-foreground/30 cursor-not-allowed'
                      }`}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
