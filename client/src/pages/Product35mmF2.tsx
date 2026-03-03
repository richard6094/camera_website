import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart, Check, ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/Breadcrumb';
import { ImageLightbox } from '@/components/ImageLightbox';
import { Link } from 'wouter';

/**
 * 35mm F/2 Product Detail Page
 * Design Philosophy: Premium product showcase with detailed specifications
 *
 * Includes variant selector for material (Aluminum vs Brass Special Edition)
 */

type Variant = 'standard' | 'special';

export default function Product35mmF2() {
  const { language } = useLanguage();
  const [variant, setVariant] = useState<Variant>('standard');

  const standardImages = [
    '/images/银色镜头+相机+暖色背景.jpg',
    '/images/银色镜头挂机特写2-正面.jpg',
    '/images/银色镜头不挂机特写.jpg',
  ];

  const specialImages = [
    '/images/4种颜色镜头产品照-带包装.jpg',
    '/images/4种颜色镜头产品照-不带包装.jpg',
    '/images/3色镜头+相机+白色背景.jpg',
  ];

  const productImages = variant === 'standard' ? standardImages : specialImages;

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
      { label: '重量', value: variant === 'standard' ? '约 150g（铝合金）' : '约 200g（纯铜）' },
      ...(variant === 'special' ? [
        { label: '镜身材质', value: '纯铜 + 多色阳极氧化工艺' },
        { label: '限量编号', value: '全球限量 500 支' },
      ] : []),
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
      { label: '重量', value: variant === 'standard' ? '約 150g（アルミ合金）' : '約 200g（真鍮）' },
      ...(variant === 'special' ? [
        { label: 'ボディ素材', value: '真鍮 + 多色アノダイズ仕上げ' },
        { label: '限定ナンバリング', value: '世界限定 500本' },
      ] : []),
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
      { label: 'Weight', value: variant === 'standard' ? 'Approx. 150g (aluminum)' : 'Approx. 200g (brass)' },
      ...(variant === 'special' ? [
        { label: 'Body Material', value: 'Brass + multi-color anodized finish' },
        { label: 'Limited Edition', value: 'Limited to 500 units worldwide' },
      ] : []),
    ],
  };

  const features = language === 'zh' ? {
    title: variant === 'standard' ? '产品特点' : '特别版特点',
    items: [
      ...(variant === 'special' ? [{
        title: '限量典藏',
        description: '全球限量 500 支，每支镜头均刻有独立编号，配有收藏证书。',
      }, {
        title: '顶级材质',
        description: '纯铜镜身，多色阳极氧化工艺，手工打磨抛光，呈现独特的质感和重量感。',
      }] : []),
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
        title: variant === 'standard' ? '轻巧便携' : '精密校准',
        description: variant === 'standard'
          ? '铝合金版仅重 150g，纯铜版约 200g，紧凑的设计让您可以随时随地记录生活。'
          : '每支镜头都经过严格的光学校准和测试，确保最佳成像品质。',
      },
      ...(variant === 'special' ? [{
        title: '专属配件',
        description: '配备定制皮革镜头袋和 E39 UV 滤镜。',
      }] : []),
    ],
  } : language === 'ja' ? {
    title: variant === 'standard' ? '製品特徴' : '特別版の特徴',
    items: [
      ...(variant === 'special' ? [{
        title: '限定コレクション',
        description: '世界限定500本、各レンズに個別番号と真正性証明書が付属。',
      }, {
        title: 'プレミアム素材',
        description: '真鍮ボディ、多色アノダイズ仕上げ、手作業で磨き上げた独自の質感と重量感。',
      }] : []),
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
        title: variant === 'standard' ? 'コンパクト・ポータブル' : '精密校正',
        description: variant === 'standard'
          ? 'アルミ合金版わずか150g、真鍮版約200g。コンパクトなデザインでいつでもどこでも瞬間を記録。'
          : '各レンズは厳密な光学校正とテストを経て最高の描写品質を保証。',
      },
      ...(variant === 'special' ? [{
        title: '専用アクセサリー',
        description: 'カスタムレザーレンズポーチ、E39 UVフィルター付属。',
      }] : []),
    ],
  } : {
    title: variant === 'standard' ? 'Key Features' : 'Special Edition Features',
    items: [
      ...(variant === 'special' ? [{
        title: 'Limited Collection',
        description: 'Limited to 500 units worldwide, each lens is individually numbered with a certificate of authenticity.',
      }, {
        title: 'Premium Materials',
        description: 'Brass body with multi-color anodized finish, hand-polished for unique texture and substantial feel.',
      }] : []),
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
        title: variant === 'standard' ? 'Compact & Portable' : 'Precision Calibration',
        description: variant === 'standard'
          ? 'Weighing only 150g (aluminum) or 200g (brass), the compact design allows you to capture moments anywhere, anytime.'
          : 'Each lens undergoes rigorous optical calibration and testing to ensure optimal image quality.',
      },
      ...(variant === 'special' ? [{
        title: 'Exclusive Accessories',
        description: 'Includes custom leather lens pouch and E39 UV filter.',
      }] : []),
    ],
  };

  const pricing = language === 'zh' ? {
    price: variant === 'standard' ? '¥12,800' : '¥28,800',
    originalPrice: variant === 'special' ? '¥32,000' : undefined,
    currency: 'CNY',
    inStock: variant === 'standard' ? '现货供应' : '限量供应',
    remaining: variant === 'special' ? '仅剩 12 支' : undefined,
    addToCart: '加入购物车',
    buyNow: '立即购买',
    quantityLabel: '数量',
    limitedBadge: '限量版',
  } : language === 'ja' ? {
    price: variant === 'standard' ? '¥278,000' : '¥628,000',
    originalPrice: variant === 'special' ? '¥698,000' : undefined,
    currency: 'JPY',
    inStock: variant === 'standard' ? '在庫あり' : '限定供給',
    remaining: variant === 'special' ? '残り 12本' : undefined,
    addToCart: 'カートに追加',
    buyNow: '今すぐ購入',
    quantityLabel: '数量',
    limitedBadge: '限定版',
  } : {
    price: variant === 'standard' ? '$1,899' : '$4,299',
    originalPrice: variant === 'special' ? '$4,799' : undefined,
    currency: 'USD',
    inStock: variant === 'standard' ? 'In Stock' : 'Limited Availability',
    remaining: variant === 'special' ? 'Only 12 left' : undefined,
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    quantityLabel: 'Quantity',
    limitedBadge: 'Limited Edition',
  };

  const variantLabels = language === 'zh'
    ? { standard: '铝合金', special: '纯铜 · 特别版' }
    : language === 'ja'
    ? { standard: 'アルミ合金', special: '真鍮 · 特別版' }
    : { standard: 'Aluminum', special: 'Brass · Special Edition' };

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
              {/* Limited Edition Badge on carousel */}
              {variant === 'special' && (
                <div className="absolute top-4 right-4 bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 z-10 pointer-events-none">
                  <Award className="w-4 h-4" />
                  {pricing.limitedBadge}
                </div>
              )}
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
              {variant === 'special' && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 rounded-full text-sm font-medium">
                  <Award className="w-4 h-4" />
                  {pricing.limitedBadge}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                35mm F/2
                {variant === 'special' && (
                  <>
                    <br />
                    <span className="text-2xl md:text-3xl opacity-70">
                      {language === 'zh' ? '特别版' : language === 'ja' ? '特別版' : 'Special Edition'}
                    </span>
                  </>
                )}
              </h1>
              <p className="text-lg text-muted-foreground">
                {variant === 'standard'
                  ? (language === 'zh' ? '经典焦段，纯粹视角' : language === 'ja' ? 'クラシックな焦点距離、ピュアなビジョン' : 'Classic Focal Length, Pure Vision')
                  : (language === 'zh' ? '匠心之作，限量典藏' : language === 'ja' ? '匠の技、限定コレクション' : 'Masterpiece, Limited Collection')
                }
              </p>
              <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-light">{pricing.price}</span>
                  {pricing.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">{pricing.originalPrice}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className={`inline-flex items-center gap-2 text-sm font-medium ${
                    variant === 'special' ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'
                  }`}>
                    <Check className="w-4 h-4" />
                    {pricing.inStock}
                  </span>
                  {pricing.remaining && (
                    <span className="text-sm text-red-600 dark:text-red-400 font-medium">{pricing.remaining}</span>
                  )}
                </div>
              </div>
            </div>

            {/* ── Material / Variant Selector ── */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground tracking-wide">
                {language === 'zh' ? '材质' : language === 'ja' ? '素材' : 'Material'}
              </p>
              <div className="flex gap-3">
                {(['standard', 'special'] as Variant[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => { setVariant(v); setSelectedImage(0); }}
                    className={`px-5 py-2.5 text-sm rounded-md border transition-all duration-200 ${
                      variant === v
                        ? 'border-foreground bg-foreground text-background font-medium'
                        : 'border-foreground/20 text-foreground/60 hover:border-foreground/50 hover:text-foreground'
                    }`}
                  >
                    {variantLabels[v]}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-neutral dark:prose-invert">
              <p>
                {variant === 'standard'
                  ? (language === 'zh'
                    ? '35mm 定焦镜头，街头摄影的理想伴侣。轻巧便携，成像锐利，捕捉生活中每一个真实瞬间。f/2 大光圈设计，在弱光环境下依然能够呈现出色的画质，同时营造迷人的焦外虚化效果。'
                    : language === 'ja'
                    ? '35mm単焦点レンズ、ストリートフォトの理想的なパートナー。コンパクトで携帯性に優れ、シャープな描写で日常のあらゆる真実の瞬間を捕らえます。f/2大口径設計により低照度でも優れた画質と美しいボケを実現。'
                    : '35mm prime lens, the ideal companion for street photography. Compact and portable, with sharp imaging to capture every authentic moment in life. The f/2 fast aperture design delivers excellent image quality even in low-light conditions while creating beautiful bokeh.')
                  : (language === 'zh'
                    ? '精选材质，手工打磨。每一支镜头都经过严格的光学校准，呈现无与伦比的成像品质。全球限量 500 支，每支镜头均刻有独立编号，配有收藏证书。5 组 7 片经典光学设计，纯铜镜身配合多色阳极氧化工艺，兼具收藏与实用价值。'
                    : language === 'ja'
                    ? '厳選素材、手作業で磨き上げ。各レンズは厳密な光学校正を経て比類なき描写品質を実現。世界限定500本、各レンズに個別番号と真正性証明書付き。5群7枚のクラシック光学設計、真鍮ボディに多色アノダイズ仕上げ。'
                    : 'Premium materials, hand-polished. Each lens undergoes rigorous optical calibration for unparalleled imaging quality. Limited to 500 units worldwide, each individually numbered with a certificate of authenticity. Classic 7-element-in-5-groups optical design, brass body with multi-color anodized finish, combining collectible and practical value.')
                }
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
                    onClick={() => setQuantity(variant === 'special' ? Math.min(3, quantity + 1) : quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors rounded-r-md"
                  >
                    +
                  </button>
                </div>
                {variant === 'special' && (
                  <span className="text-sm text-muted-foreground">
                    {language === 'zh' ? '每人限购 3 支' : language === 'ja' ? 'お一人様最大3本まで' : 'Max 3 per customer'}
                  </span>
                )}
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
        <div className={`grid gap-8 ${variant === 'special' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
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

      {/* What's Included (Special Edition only) */}
      {variant === 'special' && (
        <section className="container py-16 border-t">
          <h2 className="text-3xl font-light mb-12">
            {language === 'zh' ? '包装清单' : language === 'ja' ? 'パッケージ内容' : "What's Included"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(language === 'zh'
              ? [
                '35mm F/2 特别版镜头 × 1',
                '定制皮革镜头袋 × 1',
                '金属遮光罩 × 1',
                '52mm UV 滤镜 × 1',
                '前后镜头盖 × 各 1',
                '限量版收藏证书 × 1',
                '产品保修卡 × 1',
                '清洁布 × 1',
              ]
              : language === 'ja'
              ? [
                '35mm F/2 特別版レンズ × 1',
                'カスタムレザーレンズポーチ × 1',
                '金属レンズフード × 1',
                '52mm UVフィルター × 1',
                '前後レンズキャップ × 各1',
                '限定版コレクター証明書 × 1',
                '製品保証書 × 1',
                'クリーニングクロス × 1',
              ]
              : [
                '35mm F/2 Special Edition Lens × 1',
                'Custom Leather Lens Pouch × 1',
                'Metal Lens Hood × 1',
                '52mm UV Filter × 1',
                'Front & Rear Lens Caps × 1 each',
                'Limited Edition Certificate × 1',
                'Product Warranty Card × 1',
                'Cleaning Cloth × 1',
              ]
            ).map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 py-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
