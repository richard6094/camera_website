import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/Breadcrumb';
import { ImageLightbox } from '@/components/ImageLightbox';
import { Link } from 'wouter';

/**
 * 35mm F/2 Product Detail Page
 * Design Philosophy: Premium product showcase with detailed specifications
 */

export default function Product35mmF2() {
  const { language } = useLanguage();

  const productImages = [
    '/images/银色镜头+相机+暖色背景.jpg',
    '/images/银色镜头挂机特写2-正面.jpg',
    '/images/银色镜头不挂机特写.jpg',
  ];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartRelX = useRef(0);
  const hasDragged = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextImage = useCallback(() => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  }, [productImages.length]);

  useEffect(() => {
    if (!autoPlay || lightboxOpen) return;
    const timer = setInterval(nextImage, 4000);
    return () => clearInterval(timer);
  }, [autoPlay, lightboxOpen, nextImage]);

  const specifications = language === 'zh' ? {
    title: '技术规格',
    items: [
      { label: '焦距', value: '35mm' },
      { label: '最大光圈', value: 'f/2' },
      { label: '最小光圈', value: 'f/16' },
      { label: '光学结构', value: '5 组 7 片' },
      { label: '光圈叶片', value: '10 片' },
      { label: '光圈调节', value: '预设式，带档位定位，支持半档调节' },
      { label: '对焦范围', value: '约 0.7m 至无穷远' },
      { label: '滤镜尺寸', value: 'E39（39mm）' },
      { label: '镜头卡口', value: 'M 型快速装卸卡口' },
      { label: '遮光罩', value: '卡扣式，圆形、方形可选' },
      { label: '尺寸', value: '直径 52mm × 长度 34mm' },
      { label: '重量', value: '约 150g（铝合金）/ 约 200g（纯铜）' },
    ],
  } : language === 'ja' ? {
    title: '技術仕様',
    items: [
      { label: '焦点距離', value: '35mm' },
      { label: '最大口径', value: 'f/2' },
      { label: '最小絞り', value: 'f/16' },
      { label: '光学設計', value: '5群 7枚' },
      { label: '絞り羽根', value: '10枚' },
      { label: '絞り調整', value: 'プリセット式、クリックストップ付き、半段対応' },
      { label: '合焦範囲', value: '約 0.7m ～ ∞' },
      { label: 'フィルターサイズ', value: 'E39（39mm）' },
      { label: 'マウント', value: 'M 型クイックリリースマウント' },
      { label: 'フード', value: 'クリップ式、ラウンド・スクエア選択可' },
      { label: 'サイズ', value: '直径 52mm × 長さ 34mm' },
      { label: '重量', value: '約 150g（アルミ合金）/ 約 200g（真鍮）' },
    ],
  } : {
    title: 'Technical Specifications',
    items: [
      { label: 'Focal Length', value: '35mm' },
      { label: 'Maximum Aperture', value: 'f/2' },
      { label: 'Minimum Aperture', value: 'f/16' },
      { label: 'Optical Design', value: '7 elements in 5 groups' },
      { label: 'Aperture Blades', value: '10 blades' },
      { label: 'Aperture Control', value: 'Preset, click-stop positioning, half-stop support' },
      { label: 'Focus Range', value: 'Approx. 0.7m to infinity' },
      { label: 'Filter Size', value: 'E39 (39mm)' },
      { label: 'Lens Mount', value: 'M-type quick-release mount' },
      { label: 'Lens Hood', value: 'Clip-on, round or square options' },
      { label: 'Dimensions', value: 'Ø 52mm × 34mm' },
      { label: 'Weight', value: 'Approx. 150g (aluminum) / 200g (brass)' },
    ],
  };

  const features = language === 'zh' ? {
    title: '产品特点',
    items: [
      {
        title: '经典焦段',
        description: '35mm 焦距是街头摄影的黄金标准，既能捕捉环境氛围，又能突出主体细节。',
      },
      {
        title: '大光圈设计',
        description: 'f/2 大光圈带来出色的弱光性能和迷人的焦外虚化效果，10 片光圈叶片呈现柔美散景。',
      },
      {
        title: '精密光学',
        description: '5 组 7 片的光学设计，经典结构带来自然通透的成像风格。',
      },
      {
        title: '轻巧便携',
        description: '铝合金版仅重 150g，纯铜版约 200g，紧凑的设计让您可以随时随地记录生活。',
      },
    ],
  } : language === 'ja' ? {
    title: '製品特徴',
    items: [
      {
        title: 'クラシック焦点距離',
        description: '35mmはストリートフォトのゴールデンスタンダード。環境の雰囲気と被写体のディテールを同時に捕らえます。',
      },
      {
        title: '大口径設計',
        description: 'f/2大口径による優れた低照度性能と美しいボケ。10枚の絞り羽根で滑らかなボケを実現。',
      },
      {
        title: '精密光学',
        description: '5群7枚の光学設計、クラシックな構成で自然で透明感のある描写。',
      },
      {
        title: 'コンパクト・ポータブル',
        description: 'アルミ合金版わずか150g、真鍮版約200g。コンパクトなデザインでいつでもどこでも瞬間を記録。',
      },
    ],
  } : {
    title: 'Key Features',
    items: [
      {
        title: 'Classic Focal Length',
        description: '35mm is the golden standard for street photography, capturing both environmental context and subject details.',
      },
      {
        title: 'Fast Aperture',
        description: 'f/2 maximum aperture delivers excellent low-light performance and beautiful bokeh with 10 aperture blades.',
      },
      {
        title: 'Precision Optics',
        description: '7 elements in 5 groups, a classic design delivering natural and transparent rendering.',
      },
      {
        title: 'Compact & Portable',
        description: 'Weighing only 150g (aluminum) or 200g (brass), the compact design allows you to capture moments anywhere, anytime.',
      },
    ],
  };

  const pricing = language === 'zh' ? {
    price: '¥12,800',
    currency: 'CNY',
    inStock: '现货供应',
    addToCart: '加入购物车',
    buyNow: '立即购买',
    quantityLabel: '数量',
  } : language === 'ja' ? {
    price: '¥278,000',
    currency: 'JPY',
    inStock: '在庫あり',
    addToCart: 'カートに追加',
    buyNow: '今すぐ購入',
    quantityLabel: '数量',
  } : {
    price: '$1,899',
    currency: 'USD',
    inStock: 'In Stock',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    quantityLabel: 'Quantity',
  };

  const storeNotice = language === 'zh'
    ? '在线商城正在准备中，敬请期待！'
    : language === 'ja'
    ? 'オンラインストアは準備中です。お楽しみに！'
    : 'Our online store is in preparation. Stay tuned!';

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      {/* Breadcrumb Navigation */}
      <div className="container py-8">
        <Breadcrumb
          items={[
            { label: language === 'zh' ? '首页' : language === 'ja' ? 'ホーム' : 'Home', href: '/' },
            { label: language === 'zh' ? '产品系列' : language === 'ja' ? '製品シリーズ' : 'Products', href: '/products' },
            { label: '35mm F/2' },
          ]}
        />
      </div>

      {/* Product Hero Section */}
      <section className="container py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="relative">
            {/* Carousel */}
            <div
              ref={containerRef}
              className="bg-muted overflow-hidden relative select-none"
              style={{ borderRadius: '8px' }}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDragging(true);
                setAutoPlay(false);
                dragStartX.current = e.clientX;
                hasDragged.current = false;
                const rect = containerRef.current?.getBoundingClientRect();
                dragStartRelX.current = rect ? (e.clientX - rect.left) / rect.width : 0.5;
              }}
              onMouseMove={(e) => {
                if (!isDragging) return;
                const offset = e.clientX - dragStartX.current;
                if (Math.abs(offset) > 5) hasDragged.current = true;
                setDragOffset(offset);
              }}
              onMouseUp={(e) => {
                if (!isDragging) return;
                if (hasDragged.current) {
                  const rect = containerRef.current?.getBoundingClientRect();
                  const endRelX = rect ? (e.clientX - rect.left) / rect.width : 0.5;
                  // Forward: started right half, ended left half or past left edge
                  if (dragStartRelX.current > 0.5 && endRelX < 0.5 && selectedImage < productImages.length - 1) {
                    setSelectedImage(selectedImage + 1);
                  // Backward: started left half, ended right half or past right edge
                  } else if (dragStartRelX.current < 0.5 && endRelX > 0.5 && selectedImage > 0) {
                    setSelectedImage(selectedImage - 1);
                  }
                } else {
                  setLightboxOpen(true);
                }
                setDragOffset(0);
                setIsDragging(false);
                setAutoPlay(true);
              }}
              onMouseLeave={() => {
                if (isDragging) {
                  setDragOffset(0);
                  setIsDragging(false);
                  setAutoPlay(true);
                }
              }}
              onTouchStart={(e) => {
                setAutoPlay(false);
                setIsDragging(true);
                dragStartX.current = e.touches[0].clientX;
                hasDragged.current = false;
                const rect = containerRef.current?.getBoundingClientRect();
                dragStartRelX.current = rect ? (e.touches[0].clientX - rect.left) / rect.width : 0.5;
              }}
              onTouchMove={(e) => {
                if (!isDragging) return;
                const offset = e.touches[0].clientX - dragStartX.current;
                if (Math.abs(offset) > 5) hasDragged.current = true;
                setDragOffset(offset);
              }}
              onTouchEnd={(e) => {
                if (!isDragging) return;
                if (hasDragged.current) {
                  const rect = containerRef.current?.getBoundingClientRect();
                  const touch = e.changedTouches[0];
                  const endRelX = rect ? (touch.clientX - rect.left) / rect.width : 0.5;
                  if (dragStartRelX.current > 0.5 && endRelX < 0.5 && selectedImage < productImages.length - 1) {
                    setSelectedImage(selectedImage + 1);
                  } else if (dragStartRelX.current < 0.5 && endRelX > 0.5 && selectedImage > 0) {
                    setSelectedImage(selectedImage - 1);
                  }
                } else {
                  setLightboxOpen(true);
                }
                setDragOffset(0);
                setIsDragging(false);
                setAutoPlay(true);
              }}
            >
              <div
                className={`flex ${isDragging ? '' : 'transition-transform duration-500 ease-in-out'}`}
                style={{
                  transform: `translateX(calc(-${selectedImage * 100}% + ${dragOffset}px))`,
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
              >
                {productImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`35mm F/2 view ${idx + 1}`}
                    className="w-full h-auto object-contain flex-shrink-0"
                    draggable={false}
                  />
                ))}
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {productImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSelectedImage(idx); setAutoPlay(true); }}
                  className={`rounded-full transition-all duration-300 ${
                    selectedImage === idx
                      ? 'w-6 h-2 bg-foreground'
                      : 'w-2 h-2 bg-foreground/30 hover:bg-foreground/50'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>

            <ImageLightbox
              images={productImages}
              initialIndex={selectedImage}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title & Price */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                35mm F/2
              </h1>
              <p className="text-lg text-muted-foreground">
                {language === 'zh'
                  ? '经典焦段，纯粹视角'
                  : language === 'ja'
                  ? 'クラシックな焦点距離、ピュアなビジョン'
                  : 'Classic Focal Length, Pure Vision'}
              </p>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-light">{pricing.price}</span>
                <span className="inline-flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <Check className="w-4 h-4" />
                  {pricing.inStock}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-neutral dark:prose-invert">
              <p>
                {language === 'zh'
                  ? '35mm 定焦镜头，街头摄影的理想伴侣。轻巧便携，成像锐利，捕捉生活中每一个真实瞬间。f/2 大光圈设计，在弱光环境下依然能够呈现出色的画质，同时营造迷人的焦外虚化效果。'
                  : language === 'ja'
                  ? '35mm単焦点レンズ、ストリートフォトの理想的なパートナー。コンパクトで携帯性に優れ、シャープな描写で日常のあらゆる真実の瞬間を捕らえます。f/2大口径設計により低照度でも優れた画質と美しいボケを実現。'
                  : '35mm prime lens, the ideal companion for street photography. Compact and portable, with sharp imaging to capture every authentic moment in life. The f/2 fast aperture design delivers excellent image quality even in low-light conditions while creating beautiful bokeh.'}
              </p>
            </div>

            {/* Product Introduction Link */}
            <Link
              href="/products/35mm-f2-intro"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {language === 'zh'
                ? '查看产品介绍'
                : language === 'ja'
                ? '製品紹介を見る'
                : 'View Product Introduction'}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Quantity & Purchase */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">
                  {pricing.quantityLabel}
                </label>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors rounded-l-md"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors rounded-r-md"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2 disabled:cursor-not-allowed"
                  disabled
                >
                  <ShoppingCart className="w-4 h-4" />
                  {pricing.addToCart}
                </Button>
                <Button size="lg" className="flex-1 disabled:cursor-not-allowed" disabled>
                  {pricing.buyNow}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {storeNotice}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 border-t">
        <h2 className="text-3xl font-light mb-12">{features.title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.items.map((feature, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-xl font-medium">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications Section */}
      <section className="container py-16 border-t">
        <h2 className="text-3xl font-light mb-12">{specifications.title}</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
          {specifications.items.map((spec, idx) => (
            <div
              key={idx}
              className="flex justify-between py-3 border-b border-border/50"
            >
              <span className="text-muted-foreground">{spec.label}</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
