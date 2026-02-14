import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart, Check, ChevronLeft, Award } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

/**
 * E35 Special Edition Product Detail Page
 * Design Philosophy: Premium limited edition showcase
 */

export default function ProductE35Special() {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const productImages = [
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/dbkHWzIemGfChxZS.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/rSqFyXSHzVYsqTci.jpg',
    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/RUCXspLnsSdMKWPE.jpg',
  ];

  const specifications = language === 'zh' ? {
    title: '技术规格',
    items: [
      { label: '焦距', value: '35mm' },
      { label: '最大光圈', value: 'f/1.4 ASPH' },
      { label: '最小光圈', value: 'f/16' },
      { label: '光学结构', value: '9 组 12 片（含 2 片非球面镜片）' },
      { label: '光圈叶片', value: '11 片（圆形光圈）' },
      { label: '最近对焦距离', value: '0.25m' },
      { label: '滤镜尺寸', value: '52mm' },
      { label: '尺寸', value: '直径 66mm × 长度 54mm' },
      { label: '重量', value: '约 340g' },
      { label: '镜头卡口', value: 'M 卡口' },
      { label: '镜身材质', value: '黄铜 + 钛合金' },
      { label: '限量编号', value: '全球限量 500 支' },
    ],
  } : {
    title: 'Technical Specifications',
    items: [
      { label: 'Focal Length', value: '35mm' },
      { label: 'Maximum Aperture', value: 'f/1.4 ASPH' },
      { label: 'Minimum Aperture', value: 'f/16' },
      { label: 'Optical Design', value: '12 elements in 9 groups (2 aspherical)' },
      { label: 'Aperture Blades', value: '11 blades (circular aperture)' },
      { label: 'Minimum Focus Distance', value: '0.25m' },
      { label: 'Filter Size', value: '52mm' },
      { label: 'Dimensions', value: 'Ø 66mm × 54mm' },
      { label: 'Weight', value: 'Approx. 340g' },
      { label: 'Lens Mount', value: 'M Mount' },
      { label: 'Body Material', value: 'Brass + Titanium Alloy' },
      { label: 'Limited Edition', value: 'Limited to 500 units worldwide' },
    ],
  };

  const features = language === 'zh' ? {
    title: '特别版特点',
    items: [
      {
        title: '限量典藏',
        description: '全球限量 500 支，每支镜头均刻有独立编号，配有收藏证书。',
      },
      {
        title: '顶级材质',
        description: '黄铜镜身配合钛合金部件，手工打磨抛光，呈现独特的质感和重量感。',
      },
      {
        title: '升级光学',
        description: '采用 2 片非球面镜片，进一步提升边缘锐度和色差控制，成像更加出色。',
      },
      {
        title: '更近对焦',
        description: '最近对焦距离缩短至 0.25m，为创作提供更多可能性。',
      },
      {
        title: '精密校准',
        description: '每支镜头都经过严格的光学校准和测试，确保最佳成像品质。',
      },
      {
        title: '专属配件',
        description: '配备定制皮革镜头袋、金属遮光罩和 52mm UV 滤镜。',
      },
    ],
  } : {
    title: 'Special Edition Features',
    items: [
      {
        title: 'Limited Collection',
        description: 'Limited to 500 units worldwide, each lens is individually numbered with a certificate of authenticity.',
      },
      {
        title: 'Premium Materials',
        description: 'Brass body with titanium alloy components, hand-polished for unique texture and substantial feel.',
      },
      {
        title: 'Enhanced Optics',
        description: '2 aspherical elements further improve edge sharpness and chromatic aberration control for superior imaging.',
      },
      {
        title: 'Closer Focus',
        description: 'Minimum focus distance reduced to 0.25m, opening up more creative possibilities.',
      },
      {
        title: 'Precision Calibration',
        description: 'Each lens undergoes rigorous optical calibration and testing to ensure optimal image quality.',
      },
      {
        title: 'Exclusive Accessories',
        description: 'Includes custom leather lens pouch, metal lens hood, and 52mm UV filter.',
      },
    ],
  };

  const pricing = language === 'zh' ? {
    price: '¥28,800',
    originalPrice: '¥32,000',
    currency: 'CNY',
    inStock: '限量供应',
    remaining: '仅剩 12 支',
    addToCart: '加入购物车',
    buyNow: '立即购买',
    quantityLabel: '数量',
    limitedBadge: '限量版',
  } : {
    price: '$4,299',
    originalPrice: '$4,799',
    currency: 'USD',
    inStock: 'Limited Availability',
    remaining: 'Only 12 left',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    quantityLabel: 'Quantity',
    limitedBadge: 'Limited Edition',
  };

  const handleAddToCart = () => {
    toast.success(
      language === 'zh'
        ? `已将 ${quantity} 件 E35 特别版加入购物车`
        : `Added ${quantity} E35 Special Edition to cart`
    );
  };

  const handleBuyNow = () => {
    toast.info(
      language === 'zh'
        ? '即将跳转到结账页面...'
        : 'Redirecting to checkout...'
    );
  };

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      {/* Back Navigation */}
      <div className="container py-8">
        <Link to="/">
          <Button variant="outline" size="lg" className="gap-2 hover:bg-muted">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">{language === 'zh' ? '返回首页' : 'Back to Home'}</span>
          </Button>
        </Link>
      </div>

      {/* Product Hero Section */}
      <section className="container py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
              <img
                src={productImages[selectedImage]}
                alt="E35 Special Edition"
                className="w-full h-full object-cover"
              />
              {/* Limited Edition Badge */}
              <div className="absolute top-4 right-4 bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <Award className="w-4 h-4" />
                {pricing.limitedBadge}
              </div>
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
                    alt={`E35 Special Edition view ${idx + 1}`}
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                {pricing.limitedBadge}
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                {language === 'zh' ? 'E35 特别版' : 'E35 Special Edition'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {language === 'zh'
                  ? '匠心之作，限量典藏'
                  : 'Masterpiece, Limited Collection'}
              </p>
              <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-light">{pricing.price}</span>
                  <span className="text-xl text-muted-foreground line-through">
                    {pricing.originalPrice}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-medium">
                    <Check className="w-4 h-4" />
                    {pricing.inStock}
                  </span>
                  <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                    {pricing.remaining}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-neutral dark:prose-invert">
              <p>
                {language === 'zh'
                  ? '精选材质，手工打磨。每一支镜头都经过严格的光学校准，呈现无与伦比的成像品质。全球限量 500 支，每支镜头均刻有独立编号，配有收藏证书。黄铜镜身配合钛合金部件，采用 2 片非球面镜片，进一步提升边缘锐度和色差控制。'
                  : 'Premium materials, hand-polished. Each lens undergoes rigorous optical calibration for unparalleled imaging quality. Limited to 500 units worldwide, each individually numbered with a certificate of authenticity. Brass body with titanium alloy components, featuring 2 aspherical elements for enhanced edge sharpness and chromatic aberration control.'}
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
                    onClick={() => setQuantity(Math.min(3, quantity + 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {language === 'zh' ? '每人限购 3 支' : 'Max 3 per customer'}
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {pricing.addToCart}
                </Button>
                <Button size="lg" className="flex-1" onClick={handleBuyNow}>
                  {pricing.buyNow}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 border-t">
        <h2 className="text-3xl font-light mb-12">{features.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* What's Included */}
      <section className="container py-16 border-t">
        <h2 className="text-3xl font-light mb-12">
          {language === 'zh' ? '包装清单' : "What's Included"}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {(language === 'zh'
            ? [
                'E35 特别版镜头 × 1',
                '定制皮革镜头袋 × 1',
                '金属遮光罩 × 1',
                '52mm UV 滤镜 × 1',
                '前后镜头盖 × 各 1',
                '限量版收藏证书 × 1',
                '产品保修卡 × 1',
                '清洁布 × 1',
              ]
            : [
                'E35 Special Edition Lens × 1',
                'Custom Leather Lens Pouch × 1',
                'Metal Lens Hood × 1',
                '52mm UV Filter × 1',
                'Front & Rear Lens Caps × 1 each',
                'Limited Edition Certificate × 1',
                'Product Warranty Card × 1',
                'Cleaning Cloth × 1',
              ]
          ).map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
