import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Play } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

/**
 * Media Reviews Page
 * - zh: Bilibili review video cards (3 real videos)
 * - en/ja: YouTube review video cards (2 real videos)
 */

// ── Real zh Bilibili review videos ──
const zhBilibiliReviews = [
  {
    bvid: 'BV115xzziEHi',
    platform: 'Bilibili',
    author: 'HEMO 林庚辰',
    title: '一分钟售空的国产手动镜头，是富士附体还是真有东西？up自费测评Mandler曼德勒国产复刻七枚玉',
    url: 'https://www.bilibili.com/video/BV115xzziEHi/',
    cover: '/images/bilibili-cover-BV115xzziEHi.jpg',
  },
  {
    bvid: 'BV1bydUYYEiF',
    platform: 'Bilibili',
    author: '相机操作员xhs',
    title: '曼德勒Mandler 35mm f2国产七枚玉 买得起！徕卡M口高颜值小巧镜头',
    url: 'https://www.bilibili.com/video/BV1bydUYYEiF/',
    cover: '/images/bilibili-cover-BV1bydUYYEiF.jpg',
  },
  {
    bvid: 'BV16VUaBCETq',
    platform: 'Bilibili',
    author: 'Bilibili UP 主',
    title: '靓镜｜曼德勒35/F2复刻七枚玉，不完美但足够有诚意~',
    url: 'https://www.bilibili.com/video/BV16VUaBCETq/',
    cover: '/images/bilibili-cover-BV16VUaBCETq.jpg',
  },
] as const;

// ── Real en/ja YouTube review videos ──
const youtubeReviews = [
  {
    videoId: 'VuZLgSqOxrU',
    platform: 'YouTube',
    author: 'Matt Osborne',
    title: 'Get the Leica Look for £254!! Mandler 35mm f2 7-Elements',
    url: 'https://youtu.be/VuZLgSqOxrU?si=PfwoMrgkAfMZLk70',
    cover: '/images/youtube-cover-VuZLgSqOxrU.jpg',
  },
  {
    videoId: 'QgWP0CPNnow',
    platform: 'YouTube',
    author: 'Jimmy Cheng',
    title: 'Mandler 35mm f2.0 Review (compared to Leica summicron v4 KOB)',
    url: 'https://youtu.be/QgWP0CPNnow?si=lZSp38JHsA6x8I2R',
    cover: '/images/youtube-cover-QgWP0CPNnow.jpg',
  },
] as const;

export default function MediaReviews() {
  const { language, t } = useLanguage();

  const breadcrumbItems = [
    {
      label: language === 'zh' ? '首页' : language === 'ja' ? 'ホーム' : 'Home',
      href: '/',
    },
    { label: t('reviews.heroTitle') },
  ];

  const reviews = language === 'zh' ? zhBilibiliReviews : youtubeReviews;
  const watchLabel = language === 'zh' ? '在 Bilibili 观看' : language === 'ja' ? 'YouTube で視聴' : 'Watch on YouTube';

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
          <div className="w-16 sm:w-24 h-px bg-foreground/20 mx-auto mb-6" style={{ height: '0.5px' }} />
          <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('reviews.heroDesc')}
          </p>
        </div>
      </section>

      {/* ── Review card grid ── */}
      <section className="pb-20 md:pb-32">
        <div className={`container mx-auto px-6 ${language === 'zh' ? 'max-w-6xl' : 'max-w-4xl'}`}>
          <div className={`grid grid-cols-1 gap-6 md:gap-8 ${language === 'zh' ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {reviews.map((item) => {
              const key = 'bvid' in item ? item.bvid : item.videoId;
              return (
                <a
                  key={key}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-xl overflow-hidden border border-foreground/10 bg-card shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.16),0_4px_12px_rgba(0,0,0,0.1)] damped-transition"
                >
                  {/* Cover image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                    {/* Platform badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs tracking-wider uppercase">
                      <Play className="w-2.5 h-2.5" fill="white" /> Video
                    </div>
                  </div>
                  {/* Card footer */}
                  <div className="flex flex-col flex-1 p-4">
                    <div className="flex items-center gap-2 mb-2 text-xs text-foreground/40 tracking-wider uppercase">
                      <span>{item.platform}</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/20" />
                      <span className="normal-case">{item.author}</span>
                    </div>
                    <p className="text-sm font-medium leading-snug text-foreground/85 mb-3 line-clamp-2 group-hover:text-foreground/70 transition-colors">{item.title}</p>
                    <div className="mt-auto inline-flex items-center gap-1.5 text-xs text-foreground/50 group-hover:text-foreground transition-colors">
                      {watchLabel}
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
