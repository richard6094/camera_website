import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart, Check, ChevronLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

/**
 * E39 Product Detail Page
 * Design Philosophy: Premium product showcase with detailed specifications
 */

export default function ProductE39() {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const productImages = [
    '/images/银色镜头+相机+暖色背景.jpg',
    '/images/银色镜头挂机特写2-正面.jpg',
    '/images/银色镜头不挂机特写.jpg',
  ];

  const specifications = language === 'zh' ? {
    title: '技术规格',
    items: [
      { label: '焦距', value: '35mm' },
      { label: '最大光圈', value: 'f/1.4' },
      { label: '最小光圈', value: 'f/16' },
      { label: '光学结构', value: '8 组 11 片' },
      { label: '光圈叶片', value: '11 片（圆形光圈）' },
      { label: '最近对焦距离', value: '0.3m' },
      { label: '滤镜尺寸', value: '52mm' },
      { label: '尺寸', value: '直径 65mm × 长度 52mm' },
      { label: '重量', value: '约 320g' },
      { label: '镜头卡口', value: 'M 卡口' },
    ],
  } : language === 'ja' ? {
    title: '技術仕様',
    items: [
      { label: '焦点距離', value: '35mm' },
      { label: '最大口径', value: 'f/1.4' },
      { label: '最小絞り', value: 'f/16' },
      { label: '光学設計', value: '8群 11枚' },
      { label: '絞り羽根', value: '11枚（円形絞り）' },
      { label: '最短撮影距離', value: '0.3m' },
      { label: 'フィルターサイズ', value: '52mm' },
      { label: 'サイズ', value: '直径 65mm × 長さ 52mm' },
      { label: '重量', value: '約 320g' },
      { label: 'マウント', value: 'M マウント' },
    ],
  } : {
    title: 'Technical Specifications',
    items: [
      { label: 'Focal Length', value: '35mm' },
      { label: 'Maximum Aperture', value: 'f/1.4' },
      { label: 'Minimum Aperture', value: 'f/16' },
      { label: 'Optical Design', value: '11 elements in 8 groups' },
      { label: 'Aperture Blades', value: '11 blades (circular aperture)' },
      { label: 'Minimum Focus Distance', value: '0.3m' },
      { label: 'Filter Size', value: '52mm' },
      { label: 'Dimensions', value: 'Ø 65mm × 52mm' },
      { label: 'Weight', value: 'Approx. 320g' },
      { label: 'Lens Mount', value: 'M Mount' },
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
        description: 'f/1.4 大光圈带来出色的弱光性能和迷人的焦外虚化效果。',
      },
      {
        title: '精密光学',
        description: '8 组 11 片的光学设计，配合 11 片圆形光圈叶片，呈现柔美的散景。',
      },
      {
        title: '轻巧便携',
        description: '仅重 320g，紧凑的设计让您可以随时随地记录生活。',
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
        description: 'f/1.4大口径による優れた低照度性能と美しいボケ。',
      },
      {
        title: '精密光学',
        description: '8群11枚の光学設計、11枚の円形絞り羽根で滑らかでクリーミーなボケを実現。',
      },
      {
        title: 'コンパクト・ポータブル',
        description: 'わずか320g、コンパクトなデザインでいつでもどこでも瞬間を記録。',
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
        description: 'f/1.4 maximum aperture delivers excellent low-light performance and beautiful bokeh.',
      },
      {
        title: 'Precision Optics',
        description: '11 elements in 8 groups with 11 circular aperture blades for smooth, creamy bokeh.',
      },
      {
        title: 'Compact & Portable',
        description: 'Weighing only 320g, the compact design allows you to capture moments anywhere, anytime.',
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
      {/* Back Navigation */}
      <div className="container py-8">
        <Link to="/">
          <Button variant="outline" size="lg" className="gap-2 hover:bg-muted">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">{language === 'zh' ? '返回首页' : language === 'ja' ? 'ホームに戻る' : 'Back to Home'}</span>
          </Button>
        </Link>
      </div>

      {/* Product Hero Section */}
      <section className="container py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage]}
                  alt="35mm F/2"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-foreground'
                      : 'border-transparent hover:border-foreground/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`35mm F/2 view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
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
                  ? '35mm 定焦镜头，街头摄影的理想伴侣。轻巧便携，成像锐利，捕捉生活中每一个真实瞬间。f/1.4 大光圈设计，在弱光环境下依然能够呈现出色的画质，同时营造迷人的焦外虚化效果。'
                  : language === 'ja'
                  ? '35mm単焦点レンズ、ストリートフォトの理想的なパートナー。コンパクトで携帯性に優れ、シャープな描写で日常のあらゆる真実の瞬間を捕らえます。f/1.4大口径設計により低照度でも優れた画質と美しいボケを実現。'
                  : '35mm prime lens, the ideal companion for street photography. Compact and portable, with sharp imaging to capture every authentic moment in life. The f/1.4 fast aperture design delivers excellent image quality even in low-light conditions while creating beautiful bokeh.'}
              </p>
            </div>

            {/* Quantity & Purchase */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">
                  {pricing.quantityLabel}
                </label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors"
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
