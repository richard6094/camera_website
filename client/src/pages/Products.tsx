import { useState, type MouseEvent } from 'react';
import { useLocation } from 'wouter';
import { ShoppingCart, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
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
  id: '35mm-f2' | '35mm-f2-special';
  route: string;
  categoryKey: 'standard' | 'special';
  name: string;
  categoryLabel: string;
  price: number;
  priceLabel: string;
  image: string;
  description: string;
  specs: string[];
  inStock: boolean;
  stockLabel: string;
}

export default function Products() {
  const [, navigate] = useLocation();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'standard' | 'special'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  const copy = language === 'zh'
    ? {
      pageTitle: '产品系列',
      home: '首页',
      filterTitle: '按产品筛选',
      categoryAll: '全部',
      categoryStandard: '标准版',
      categorySpecial: '特别版',
      quickPreview: '快速预览',
      outOfStock: '缺货',
      inStock: '现货供应',
      limitedStock: '限量供应',
      specifications: '规格参数',
      addToCart: '加入购物车',
      addedToCart: '已加入购物车',
      storeComingSoon: '商城正在开发中，敬请期待',
      resultsText: (shown: number, total: number) => `显示 ${shown} / ${total} 款产品`,
      closePreview: '关闭预览',
    }
    : language === 'ja'
    ? {
      pageTitle: '製品シリーズ',
      home: 'ホーム',
      filterTitle: '製品で絞り込む',
      categoryAll: 'すべて',
      categoryStandard: 'スタンダード',
      categorySpecial: '特別版',
      quickPreview: 'クイックプレビュー',
      outOfStock: '在庫なし',
      inStock: '在庫あり',
      limitedStock: '限定供給',
      specifications: 'スペック',
      addToCart: 'カートに追加',
      addedToCart: 'カートに追加しました',
      storeComingSoon: 'ストアは開発中です。お楽しみに',
      resultsText: (shown: number, total: number) => `${total}点中${shown}点を表示`,
      closePreview: 'プレビューを閉じる',
    }
    : {
      pageTitle: 'Our Collection',
      home: 'Home',
      filterTitle: 'Filter by Product',
      categoryAll: 'All',
      categoryStandard: 'Standard',
      categorySpecial: 'Special Edition',
      quickPreview: 'Quick Preview',
      outOfStock: 'Out of Stock',
      inStock: 'In Stock',
      limitedStock: 'Limited Availability',
      specifications: 'Specifications',
      addToCart: 'Add to Cart',
      addedToCart: 'Added to cart',
      storeComingSoon: 'Store is under development, coming soon',
      resultsText: (shown: number, total: number) => `Showing ${shown} of ${total} products`,
      closePreview: 'Close preview',
    };

  const products: Product[] = language === 'zh'
    ? [
      {
        id: '35mm-f2',
        route: '/products/35mm-f2-intro',
        categoryKey: 'standard',
        name: '35mm F/2',
        categoryLabel: copy.categoryStandard,
        price: 12800,
        priceLabel: '¥12,800',
        image: '/images/银色镜头+相机+暖色背景.jpg',
        description: '35mm 定焦镜头，兼顾环境叙事与主体表现，是街头与日常拍摄的理想选择。',
        specs: ['35mm 焦距', 'f/1.4 最大光圈', '8 组 11 片', '约 320g'],
        inStock: true,
        stockLabel: copy.inStock,
      },
      {
        id: '35mm-f2-special',
        route: '/products/35mm-f2-special-intro',
        categoryKey: 'special',
        name: '35mm F/2 特别版',
        categoryLabel: copy.categorySpecial,
        price: 28800,
        priceLabel: '¥28,800',
        image: '/images/3色镜头+相机+木质背景.jpg',
        description: '限量特别版，黄铜与钛合金机身，强化光学结构与收藏价值。',
        specs: ['35mm 焦距', 'f/1.4 ASPH', '9 组 12 片（含非球面）', '全球限量 500 支'],
        inStock: true,
        stockLabel: copy.limitedStock,
      },
    ]
    : language === 'ja'
    ? [
      {
        id: '35mm-f2',
        route: '/products/35mm-f2-intro',
        categoryKey: 'standard',
        name: '35mm F/2',
        categoryLabel: copy.categoryStandard,
        price: 278000,
        priceLabel: '¥278,000',
        image: '/images/银色镜头+相机+暖色背景.jpg',
        description: '35mm単焦点レンズ、環境描写と被写体表現のバランスに優れ、ストリートや日常撮影に最適。',
        specs: ['35mm 焦点距離', 'f/1.4 最大口径', '8群11枚', '約320g'],
        inStock: true,
        stockLabel: copy.inStock,
      },
      {
        id: '35mm-f2-special',
        route: '/products/35mm-f2-special-intro',
        categoryKey: 'special',
        name: '35mm F/2 特別版',
        categoryLabel: copy.categorySpecial,
        price: 628000,
        priceLabel: '¥628,000',
        image: '/images/3色镜头+相机+木质背景.jpg',
        description: '限定特別版、真鍮とチタン合金ボディ、強化光学構造とコレクション価値。',
        specs: ['35mm 焦点距離', 'f/1.4 ASPH', '9群12枚（非球面あり）', '世界限定500本'],
        inStock: true,
        stockLabel: copy.limitedStock,
      },
    ]
    : [
      {
        id: '35mm-f2',
        route: '/products/35mm-f2-intro',
        categoryKey: 'standard',
        name: '35mm F/2',
        categoryLabel: copy.categoryStandard,
        price: 1899,
        priceLabel: '$1,899',
        image: '/images/银色镜头+相机+暖色背景.jpg',
        description: 'A 35mm prime lens balancing environmental storytelling and subject emphasis for street and everyday photography.',
        specs: ['35mm focal length', 'f/1.4 max aperture', '11 elements in 8 groups', 'Approx. 320g'],
        inStock: true,
        stockLabel: copy.inStock,
      },
      {
        id: '35mm-f2-special',
        route: '/products/35mm-f2-special-intro',
        categoryKey: 'special',
        name: '35mm F/2 Special Edition',
        categoryLabel: copy.categorySpecial,
        price: 4299,
        priceLabel: '$4,299',
        image: '/images/3色镜头+相机+木质背景.jpg',
        description: 'A limited special edition with brass and titanium alloy construction, upgraded optics, and collector appeal.',
        specs: ['35mm focal length', 'f/1.4 ASPH', '12 elements in 9 groups (aspherical)', 'Limited to 500 units worldwide'],
        inStock: true,
        stockLabel: copy.limitedStock,
      },
    ];

  const categories = [
    { key: 'all' as const, label: copy.categoryAll },
    { key: 'standard' as const, label: copy.categoryStandard },
    { key: 'special' as const, label: copy.categorySpecial },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.categoryKey === selectedCategory);

  const handleStoreComingSoon = () => {
    toast.info(copy.storeComingSoon);
  };

  return (
    <div className="w-full bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="container max-w-6xl mx-auto px-4 pt-20 md:pt-24">
        <Breadcrumb
          items={[
            { label: language === 'zh' ? '首页' : language === 'ja' ? 'ホーム' : 'Home', href: '/' },
            { label: language === 'zh' ? '产品' : language === 'ja' ? '製品' : 'Products' },
          ]}
        />
      </div>

      {/* Main content */}
      <main className="pt-8 pb-16 md:pb-24">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Category filter */}
          <div className="mb-16">
            <h2 className="text-subtitle text-lg mb-8 tracking-wide">{copy.filterTitle}</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-6 py-2 border transition-all duration-300 ${
                    selectedCategory === category.key
                      ? 'border-foreground bg-foreground text-white'
                      : 'border-foreground/30 text-foreground/60 hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {category.label}
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
                onClick={() => {
                  navigate(product.route);
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                  });
                }}
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
                      <span className="text-white text-sm tracking-widest">{copy.outOfStock}</span>
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="space-y-3">
                  <p className="text-xs tracking-widest text-foreground/50 uppercase">
                    {product.categoryLabel}
                  </p>
                  <h3 className="text-subtitle text-lg group-hover:text-foreground/80 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-body text-foreground/60 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-display text-xl">{product.priceLabel}</span>
                    <div className="flex items-center gap-2">
                      {/* Quick Preview Button */}
                      <button
                        onClick={(e: MouseEvent) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="px-3 py-2 border border-foreground/30 text-foreground/60 hover:border-foreground hover:bg-foreground/5 transition-all duration-300 text-xs"
                        title={copy.quickPreview}
                        aria-label={copy.quickPreview}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      {/* Add to Cart Button */}
                      <button
                        onClick={(e: MouseEvent) => {
                          e.stopPropagation();
                          handleStoreComingSoon();
                        }}
                        className="px-4 py-2 border transition-all duration-300 border-foreground/30 text-foreground/60 hover:border-foreground hover:bg-foreground/5"
                        title={copy.addToCart}
                        aria-label={copy.addToCart}
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
            {copy.resultsText(filteredProducts.length, products.length)}
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
                title={copy.closePreview}
                aria-label={copy.closePreview}
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
                      {selectedProduct.categoryLabel}
                    </p>
                    <h2 className="text-display text-3xl mb-4">{selectedProduct.name}</h2>
                    <p className="text-body text-foreground/70 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Specs */}
                  <div>
                    <h3 className="text-subtitle text-sm mb-3 tracking-widest">{copy.specifications}</h3>
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
                      <span className="text-display text-2xl">{selectedProduct.priceLabel}</span>
                      <span className={`text-xs tracking-widest ${selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedProduct.inStock ? selectedProduct.stockLabel : copy.outOfStock}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleStoreComingSoon();
                        setSelectedProduct(null);
                      }}
                      className="w-full py-3 border transition-all duration-300 border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5"
                    >
                      {copy.addToCart}
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
