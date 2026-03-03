import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Play, FileText, Star } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

/**
 * Media Reviews Page
 * Design: Clean editorial layout showcasing press reviews & creator videos
 *
 * Features:
 * - Hero section with elegant typography
 * - Filter tabs (All / Video / Article)
 * - Featured review card (large, prominent)
 * - Grid of review cards with hover effects
 * - External link out to original source
 */

interface ReviewItem {
  id: string;
  type: 'video' | 'article';
  featured?: boolean;
  platform: string;
  author: string;
  title: string;
  excerpt: string;
  url: string;
  thumbnail?: string;
  date: string;
  lang: string;
  product?: string;
}

// ── Placeholder review data (replace with real links later) ──
const reviewData: ReviewItem[] = [
  {
    id: '1',
    type: 'video',
    featured: true,
    platform: 'YouTube',
    author: 'Camera Review Weekly',
    title: 'Mandler 35mm F/2 — A Modern Classic?',
    excerpt: 'We put the Mandler 35mm F/2 through its paces on the streets of Tokyo. The double-Gaussian design delivers beautiful rendering with a character rarely seen in modern lenses.',
    url: '#',
    thumbnail: '/images/银色镜头挂机特写2-正面.jpg',
    date: '2026-02-15',
    lang: 'en',
    product: '35mm F/2',
  },
  {
    id: '2',
    type: 'article',
    platform: '摄影笔记',
    author: '李明远',
    title: 'Mandler 35mm F/2 深度评测：双高斯结构的现代演绎',
    excerpt: '从光学设计到机械做工，这颗来自南阳的 35mm 镜头展现了令人惊喜的品质。紫金镀膜在逆光下的表现尤为出色，色散抑制令人满意。',
    url: '#',
    thumbnail: '/images/银色镜头不挂机特写.jpg',
    date: '2026-02-20',
    lang: 'zh',
    product: '35mm F/2',
  },
  {
    id: '3',
    type: 'video',
    platform: 'Bilibili',
    author: '光影实验室',
    title: 'Mandler 35mm F/2 特别版开箱 & 上手体验',
    excerpt: '限量 500 枚的特别版终于到手！钛合金+黄铜机身带来的质感无与伦比，实拍样片展示了这颗镜头独特的成像个性。',
    url: '#',
    thumbnail: '/images/银色镜头套装.jpg',
    date: '2026-01-28',
    lang: 'zh',
    product: '35mm F/2 Special Edition',
  },
  {
    id: '4',
    type: 'article',
    platform: 'LensRentals',
    author: 'Roger Cicala',
    title: 'Optical Bench Test: Mandler 35mm F/2 vs Summicron',
    excerpt: 'Our optical bench data shows the Mandler 35mm F/2 trading blows with the Summicron 35mm in MTF performance, with notably lower distortion and a more pleasing bokeh signature.',
    url: '#',
    thumbnail: '/images/银色镜头+相机+暖色背景.jpg',
    date: '2026-03-01',
    lang: 'en',
    product: '35mm F/2',
  },
  {
    id: '5',
    type: 'video',
    platform: 'YouTube',
    author: 'カメラ部TV',
    title: 'Mandler 35mm F/2 レビュー — ライカMマウントの新星',
    excerpt: '東京の街でMandler 35mmを試写。ダブルガウス設計による自然なボケ味と、コンパクトな鏡筒設計が印象的でした。',
    url: '#',
    thumbnail: '/images/银色镜头挂机特写1.jpg',
    date: '2026-02-10',
    lang: 'ja',
    product: '35mm F/2',
  },
  {
    id: '6',
    type: 'article',
    platform: '色影无忌',
    author: '张伟光',
    title: '国产光学的新高度：Mandler 35mm F/2 全面解析',
    excerpt: '作为南阳光学产业的代表之作，Mandler 镜头在光学性能与制造工艺上都达到了国际一线水准。本文从设计理念到实拍表现进行全方位评测。',
    url: '#',
    thumbnail: '/images/3色镜头+相机+白色背景.jpg',
    date: '2026-02-05',
    lang: 'zh',
    product: '35mm F/2',
  },
];

type FilterType = 'all' | 'video' | 'article';

export default function MediaReviews() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all'
    ? reviewData
    : reviewData.filter((r) => r.type === filter);

  const featuredItem = filtered.find((r) => r.featured) || filtered[0];
  const gridItems = filtered.filter((r) => r !== featuredItem);

  const breadcrumbItems = [
    {
      label: language === 'zh' ? '首页' : language === 'ja' ? 'ホーム' : 'Home',
      href: '/',
    },
    {
      label: t('reviews.heroTitle'),
    },
  ];

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('reviews.filterAll') },
    { key: 'video', label: t('reviews.filterVideo') },
    { key: 'article', label: t('reviews.filterArticle') },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="container max-w-7xl mx-auto px-6 pt-20 md:pt-24">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* ── Hero Section ── */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs sm:text-sm tracking-widest text-foreground/50 mb-4 uppercase">
            {t('reviews.heroSubtitle')}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            {t('reviews.heroTitle')}
          </h1>
          <div className="w-16 sm:w-24 h-px bg-foreground/20 mx-auto mb-6" style={{height: '0.5px'}} />
          <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('reviews.heroDesc')}
          </p>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="pb-8">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`
                  px-5 py-2 text-sm tracking-wide rounded-md transition-all duration-200
                  ${filter === f.key
                    ? 'bg-foreground text-background font-medium'
                    : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5 border border-foreground/10'
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Review ── */}
      {featuredItem && (
        <section className="pb-12 md:pb-16">
          <div className="container max-w-6xl mx-auto px-6">
            <a
              href={featuredItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.16),0_4px_12px_rgba(0,0,0,0.1)] damped-transition">
                {/* Background image */}
                <div className="relative aspect-[21/9] overflow-hidden">
                  {featuredItem.thumbnail && (
                    <img
                      src={featuredItem.thumbnail}
                      alt={featuredItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Featured badge */}
                  {featuredItem.featured && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-white text-xs tracking-wide">
                      <Star className="w-3 h-3" />
                      {t('reviews.featured')}
                    </div>
                  )}

                  {/* Play icon for videos */}
                  {featuredItem.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                        <Play className="w-7 h-7 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs tracking-widest text-white/50 uppercase">
                      {featuredItem.platform}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-xs text-white/50">
                      {featuredItem.author}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-xs text-white/40">
                      {featuredItem.date}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3 leading-tight tracking-tight">
                    {featuredItem.title}
                  </h2>
                  <p className="text-white/70 text-sm md:text-base max-w-2xl leading-relaxed line-clamp-2">
                    {featuredItem.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-white/80 text-sm group-hover:text-white transition-colors">
                    {featuredItem.type === 'video' ? t('reviews.watchVideo') : t('reviews.readMore')}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* ── Reviews Grid ── */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-6xl mx-auto px-6">
          {gridItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridItems.map((item) => (
                <ReviewCard key={item.id} item={item} t={t} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-foreground/40">
              <p className="text-lg">{t('reviews.emptyState')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ── Review Card ── */
function ReviewCard({ item, t }: { item: ReviewItem; t: (key: string) => string }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.16),0_4px_12px_rgba(0,0,0,0.1)] damped-transition"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-10 h-10 text-foreground/20" />
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
          {item.type === 'video' ? (
            <>
              <Play className="w-3 h-3" fill="white" />
              Video
            </>
          ) : (
            <>
              <FileText className="w-3 h-3" />
              Article
            </>
          )}
        </div>

        {/* Product tag */}
        {item.product && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs tracking-wide">
            {item.product}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-3 text-xs text-foreground/40">
          <span className="tracking-widest uppercase">{item.platform}</span>
          <span className="w-1 h-1 rounded-full bg-foreground/20" />
          <span>{item.author}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold mb-2 leading-snug group-hover:text-foreground/80 transition-colors line-clamp-2">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3 mb-4">
          {item.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-foreground/30">{item.date}</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground/50 group-hover:text-foreground transition-colors">
            {item.type === 'video' ? t('reviews.watchVideo') : t('reviews.readMore')}
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  );
}
