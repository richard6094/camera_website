import { useEffect, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { ChevronLeft, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';

/**
 * Product Detail Page
 * Design Philosophy: Leica Industrial Aesthetics × Product Showcase
 * 
 * Features:
 * - High-resolution image gallery
 * - Technical specifications
 * - User reviews
 * - Purchase options
 */

interface ProductData {
  id: string;
  name: string;
  taglineKey: string;
  descriptionKey: string;
  price: string;
  images: string[];
  specsKeys: { labelKey: string; valueKey: string }[];
  featureKeys: string[];
  reviewKeys: { authorKey: string; rating: number; commentKey: string; date: string }[];
}

const productsConfig: Record<string, ProductData> = {
  'm11-monochrom': {
    id: 'm11-monochrom',
    name: 'M11 Monochrom',
    taglineKey: 'product.m11.tagline',
    descriptionKey: 'product.m11.detail.description',
    price: '¥68,000',
    images: [
      'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/RUoxiVydxVKbmaZL.jpg',
      'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/qIjVXgTYnyqlkEee.jpg',
      'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/xPJzPulQrgUbYHaT.jpg',
      'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/OZKQCLXhUvJitQHI.jpg',
    ],
    specsKeys: [
      { labelKey: 'product.m11.spec.sensor', valueKey: 'product.m11.spec.sensor.value' },
      { labelKey: 'product.m11.spec.mount', valueKey: 'product.m11.spec.mount.value' },
      { labelKey: 'product.m11.spec.shutter', valueKey: 'product.m11.spec.shutter.value' },
      { labelKey: 'product.m11.spec.iso', valueKey: 'product.m11.spec.iso.value' },
      { labelKey: 'product.m11.spec.burst', valueKey: 'product.m11.spec.burst.value' },
      { labelKey: 'product.m11.spec.video', valueKey: 'product.m11.spec.video.value' },
      { labelKey: 'product.m11.spec.weight', valueKey: 'product.m11.spec.weight.value' },
      { labelKey: 'product.m11.spec.protection', valueKey: 'product.m11.spec.protection.value' },
    ],
    featureKeys: [
      'product.m11.feature.1',
      'product.m11.feature.2',
      'product.m11.feature.3',
      'product.m11.feature.4',
      'product.m11.feature.5',
      'product.m11.feature.6',
    ],
    reviewKeys: [
      {
        authorKey: 'product.m11.review.1.author',
        rating: 5,
        commentKey: 'product.m11.review.1.comment',
        date: '2026-01-15',
      },
      {
        authorKey: 'product.m11.review.2.author',
        rating: 5,
        commentKey: 'product.m11.review.2.comment',
        date: '2026-01-10',
      },
      {
        authorKey: 'product.m11.review.3.author',
        rating: 4,
        commentKey: 'product.m11.review.3.comment',
        date: '2026-01-05',
      },
    ],
  },
  'q3-classic': {
    id: 'q3-classic',
    name: 'Q3 Classic',
    taglineKey: 'product.q3.tagline',
    descriptionKey: 'product.q3.detail.description',
    price: '¥52,000',
    images: [
      'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/SaoNsZgdGxgySPBt.jpg',
      'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/kwEHPsIOLNFGFTOW.jpg',
      'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/kWieMCVZYbNhXQqi.jpg',
    ],
    specsKeys: [
      { labelKey: 'product.q3.spec.sensor', valueKey: 'product.q3.spec.sensor.value' },
      { labelKey: 'product.q3.spec.lens', valueKey: 'product.q3.spec.lens.value' },
      { labelKey: 'product.q3.spec.shutter', valueKey: 'product.q3.spec.shutter.value' },
      { labelKey: 'product.q3.spec.iso', valueKey: 'product.q3.spec.iso.value' },
      { labelKey: 'product.q3.spec.burst', valueKey: 'product.q3.spec.burst.value' },
      { labelKey: 'product.q3.spec.video', valueKey: 'product.q3.spec.video.value' },
      { labelKey: 'product.q3.spec.weight', valueKey: 'product.q3.spec.weight.value' },
      { labelKey: 'product.q3.spec.protection', valueKey: 'product.q3.spec.protection.value' },
    ],
    featureKeys: [
      'product.q3.feature.1',
      'product.q3.feature.2',
      'product.q3.feature.3',
      'product.q3.feature.4',
      'product.q3.feature.5',
      'product.q3.feature.6',
    ],
    reviewKeys: [
      {
        authorKey: 'product.q3.review.1.author',
        rating: 5,
        commentKey: 'product.q3.review.1.comment',
        date: '2026-01-20',
      },
      {
        authorKey: 'product.q3.review.2.author',
        rating: 5,
        commentKey: 'product.q3.review.2.comment',
        date: '2026-01-12',
      },
      {
        authorKey: 'product.q3.review.3.author',
        rating: 4,
        commentKey: 'product.q3.review.3.comment',
        date: '2026-01-08',
      },
    ],
  },
  'sl3-professional': {
    id: 'sl3-professional',
    name: 'SL3 Professional',
    taglineKey: 'product.sl3.tagline',
    descriptionKey: 'product.sl3.detail.description',
    price: '¥78,000',
    images: [
      'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/PtCGeSPBGqoqxYLl.jpg',
      'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/lBJOMWzNjnWnJDwx.jpg',
      'https://files.manuscdn.com/user_upload_by_module/session_file/310519663314029101/VHanNGjuzYlUbPqf.jpg',
    ],
    specsKeys: [
      { labelKey: 'product.sl3.spec.sensor', valueKey: 'product.sl3.spec.sensor.value' },
      { labelKey: 'product.sl3.spec.mount', valueKey: 'product.sl3.spec.mount.value' },
      { labelKey: 'product.sl3.spec.shutter', valueKey: 'product.sl3.spec.shutter.value' },
      { labelKey: 'product.sl3.spec.iso', valueKey: 'product.sl3.spec.iso.value' },
      { labelKey: 'product.sl3.spec.burst', valueKey: 'product.sl3.spec.burst.value' },
      { labelKey: 'product.sl3.spec.video', valueKey: 'product.sl3.spec.video.value' },
      { labelKey: 'product.sl3.spec.weight', valueKey: 'product.sl3.spec.weight.value' },
      { labelKey: 'product.sl3.spec.protection', valueKey: 'product.sl3.spec.protection.value' },
    ],
    featureKeys: [
      'product.sl3.feature.1',
      'product.sl3.feature.2',
      'product.sl3.feature.3',
      'product.sl3.feature.4',
      'product.sl3.feature.5',
      'product.sl3.feature.6',
    ],
    reviewKeys: [
      {
        authorKey: 'product.sl3.review.1.author',
        rating: 5,
        commentKey: 'product.sl3.review.1.comment',
        date: '2026-01-18',
      },
      {
        authorKey: 'product.sl3.review.2.author',
        rating: 5,
        commentKey: 'product.sl3.review.2.comment',
        date: '2026-01-08',
      },
      {
        authorKey: 'product.sl3.review.3.author',
        rating: 4,
        commentKey: 'product.sl3.review.3.comment',
        date: '2026-01-03',
      },
    ],
  },
};

export default function ProductDetail() {
  const [, params] = useRoute('/products/:id');
  const [, navigate] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t, language } = useLanguage();

  const productId = params?.id || '';
  const product = productsConfig[productId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">{t('detail.notfound') || '产品未找到'}</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-foreground hover:bg-foreground/10 damped-transition text-sm tracking-widest"
            style={{ borderWidth: '0.5px' }}
          >
            {t('detail.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="container max-w-7xl mx-auto px-6 pt-20 md:pt-24">
        <Breadcrumb 
          items={[
            { label: language === 'zh' ? '首页' : 'Home', href: '/' },
            { label: language === 'zh' ? '产品系列' : 'Products', href: '/products' },
            { label: product.name }
          ]}
        />
      </div>

      {/* Product Content */}
      <div className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          {/* Product Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-14 lg:gap-16 mb-12 sm:mb-14 md:mb-16">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-[4/3] mb-4 sm:mb-5 md:mb-6 overflow-hidden bg-foreground/5">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative aspect-[4/3] overflow-hidden border damped-transition ${
                      currentImageIndex === idx
                        ? 'border-foreground'
                        : 'border-foreground/10 hover:border-foreground/30'
                    }`}
                    style={{ borderWidth: '0.5px' }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <p className="text-foreground/60 text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 uppercase">{t(product.taglineKey)}</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-5 sm:mb-6">{product.name}</h1>
              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-6 sm:mb-7 md:mb-8">{t(product.descriptionKey)}</p>
              <p className="text-2xl sm:text-3xl font-light mb-6 sm:mb-7 md:mb-8">{product.price}</p>
              <button
                className="w-full md:w-auto px-10 sm:px-12 py-3 sm:py-4 bg-foreground text-background hover:bg-foreground/90 damped-transition text-xs sm:text-sm tracking-widest"
              >
                {t('detail.buy')}
              </button>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="mb-12 sm:mb-14 md:mb-16 pt-12 sm:pt-14 md:pt-16 border-t border-foreground/10" style={{ borderTopWidth: '0.5px' }}>
            <h2 className="text-xl sm:text-2xl font-light mb-6 sm:mb-7 md:mb-8">{t('detail.specs')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {product.specsKeys.map((spec, idx) => (
                <div key={idx} className="flex justify-between items-start py-3 sm:py-4 border-b border-foreground/10" style={{ borderBottomWidth: '0.5px' }}>
                  <span className="text-foreground/60 text-xs sm:text-sm">{t(spec.labelKey)}</span>
                  <span className="text-foreground text-xs sm:text-sm text-right ml-3 sm:ml-4">{t(spec.valueKey)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12 sm:mb-14 md:mb-16 pt-12 sm:pt-14 md:pt-16 border-t border-foreground/10" style={{ borderTopWidth: '0.5px' }}>
            <h2 className="text-xl sm:text-2xl font-light mb-6 sm:mb-7 md:mb-8">{t('detail.features')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {product.featureKeys.map((featureKey, idx) => (
                <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                  <Check className="w-4 sm:w-5 h-4 sm:h-5 text-foreground/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-foreground/70 text-xs sm:text-sm">{t(featureKey)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Reviews */}
          <div className="pt-12 sm:pt-14 md:pt-16 border-t border-foreground/10" style={{ borderTopWidth: '0.5px' }}>
            <h2 className="text-xl sm:text-2xl font-light mb-6 sm:mb-7 md:mb-8">{t('detail.reviews')}</h2>
            <div className="space-y-6 sm:space-y-7 md:space-y-8">
              {product.reviewKeys.map((review, idx) => (
                <div key={idx} className="pb-6 sm:pb-7 md:pb-8 border-b border-foreground/10 last:border-b-0" style={{ borderBottomWidth: '0.5px' }}>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <div>
                      <p className="text-foreground font-medium text-xs sm:text-sm">{t(review.authorKey)}</p>
                      <p className="text-foreground/50 text-xs mt-1">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-foreground' : 'text-foreground/20'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">{t(review.commentKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
