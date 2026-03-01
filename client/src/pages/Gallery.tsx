import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImageLightbox } from '@/components/ImageLightbox';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

/** Image component with shimmer placeholder while loading */
function GalleryImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    // If already cached by the browser, onLoad may not fire
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div
      className="mb-3 sm:mb-4 break-inside-avoid cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden" style={{ borderRadius: '2px' }}>
        {/* Shimmer placeholder */}
        {!loaded && (
          <div className="w-full bg-foreground/[0.06] animate-pulse" style={{ borderRadius: '2px', aspectRatio: '4/3' }}>
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(128,128,128,0.08) 50%, transparent 100%)',
                animation: 'shimmer 1.8s ease-in-out infinite',
              }}
            />
          </div>
        )}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto block transition-all duration-500 ${loaded ? 'opacity-100 group-hover:scale-[1.03]' : 'opacity-0 absolute top-0 left-0'}`}
          style={{ borderRadius: '2px' }}
        />
        {loaded && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
        )}
      </div>
    </div>
  );
}

const BLOB_BASE = 'https://mandlergallery.blob.core.windows.net/gallery';

/** URL-encode each path segment for Chinese characters in blob storage paths.
 *  Serves compressed WebP versions with long-term browser caching. */
function blobUrl(path: string): string {
  const webpPath = path.replace(/\.jpe?g$/i, '.webp');
  return `${BLOB_BASE}/${webpPath.split('/').map(s => encodeURIComponent(s)).join('/')}`;
}

/** Natural sort: "1.jpg" before "10.jpg" */
function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

type Lang3 = { zh: string; en: string; ja: string };

interface GallerySection {
  title: Lang3;
  subtitle?: Lang3;
  /** Raw blob paths relative to container root (using /) */
  images: string[];
}

interface GalleryChapter {
  id: string;
  title: Lang3;
  tabLabel: Lang3;
  sections: GallerySection[];
}

const galleryData: GalleryChapter[] = [
  {
    id: 'geography',
    title: { zh: '第一章 · 地域', en: 'Chapter I · Geography', ja: '第一章 · 地域' },
    tabLabel: { zh: '地域', en: 'Geography', ja: '地域' },
    sections: [
      {
        title: { zh: '英国', en: 'England', ja: 'イギリス' },
        subtitle: {
          zh: '风拂白崖，海映晴空',
          en: 'Wind sweeps the white cliffs, sea mirrors clear skies',
          ja: '風が白い崖を撫で、海が晴天を映す',
        },
        images: Array.from({ length: 8 }, (_, i) =>
          `第1章  地域/1彩色-英国 风拂白崖，海映晴空。/${i + 1}.jpg`
        ),
      },
      {
        title: { zh: '新西兰', en: 'New Zealand', ja: 'ニュージーランド' },
        subtitle: {
          zh: '异域相遇，帧藏多元',
          en: 'Exotic encounters, frames preserve diversity',
          ja: '異国の出会い、フレームに多様性を刻む',
        },
        images: Array.from({ length: 7 }, (_, i) =>
          `第1章  地域/2彩色-新西兰 异域相遇，帧藏多元/${i + 1}.jpg`
        ),
      },
      {
        title: { zh: '埃及', en: 'Egypt', ja: 'エジプト' },
        subtitle: {
          zh: '沙漠与海相拥，烟火与古迹共生',
          en: 'Desert and sea embrace, life and ruins coexist',
          ja: '砂漠と海が抱き合い、暮らしと遺跡が共存する',
        },
        images: [
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/1.jpg',
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/2.jpg',
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/3.jpg',
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/4.jpg',
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/5.jpg',
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/7.jpg',
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/8.jpg',
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/9.jpg',
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/10.jpg',
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/11.jpg',
          '第1章  地域/3彩色-埃及  沙漠与海相拥，烟火与古迹共生/12.jpg',
        ],
      },
      {
        title: { zh: '葡萄牙', en: 'Portugal', ja: 'ポルトガル' },
        subtitle: {
          zh: '从里斯本到波尔图，镜头记录伊比利亚双城的街巷、电车与山海光影',
          en: 'From Lisbon to Porto — streets, trams, and light across two Iberian cities',
          ja: 'リスボンからポルトへ — イベリア二都市の路地、路面電車、山海の光',
        },
        images: [
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/1.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/2.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/3.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/4.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/5.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/6.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/7.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/9.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/10.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/11.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/12.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/14.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/15.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/16.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/17.jpg',
          '第1章  地域/4彩色、黑白   葡萄牙  里斯本&波尔图  从里斯本塔霍河到波尔图杜罗河，镜头记录伊比利亚双城的街巷、电车与山海光影。/18.jpg',
        ],
      },
      {
        title: { zh: '康沃尔', en: 'Cornwall', ja: 'コーンウォール' },
        subtitle: {
          zh: '康沃尔旷野的圣皮兰之约——沙丘之上，黑白十字旗迎风舒展',
          en: "St Piran's Day on Cornwall's moors — the black-and-white cross unfurls above the dunes",
          ja: 'コーンウォールの荒野でのセント・ピランの日 — 砂丘の上に白黒の十字旗がはためく',
        },
        images: Array.from({ length: 9 }, (_, i) =>
          `第1章  地域/5 黑白-康沃尔 康沃尔旷野的圣皮兰之约   沃尔沙丘之上，黑白十字旗迎风舒展。人们以风笛与吟诵，纪念矿工守护神，让锡矿传奇在胶片里延续。/${i + 1}.jpg`
        ),
      },
      {
        title: { zh: '三峡', en: 'Three Gorges', ja: '三峡' },
        subtitle: {
          zh: '舟行三峡，山河里的人间日常',
          en: 'Sailing the Three Gorges — everyday life amid mountains and rivers',
          ja: '三峡を船で行く — 山河の中の日常',
        },
        images: Array.from({ length: 7 }, (_, i) =>
          `第1章  地域/6 黑白-三峡 舟行三峡，山河里的人间日常。  江轮载着酣眠的旅人、凭栏的身影，穿行在巫山云雨之间。/${i + 1}.jpg`
        ),
      },
    ],
  },
  {
    id: 'color',
    title: { zh: '第二章 · 色彩乐园', en: 'Chapter II · Color Paradise', ja: '第二章 · カラーパラダイス' },
    tabLabel: { zh: '色彩乐园', en: 'Color', ja: 'カラー' },
    sections: [
      {
        title: { zh: '负暄', en: 'Basking in Sun', ja: '日向ぼっこ' },
        images: [
          '第2章  色彩乐园/色彩乐园-1 负暄/1大.jpg',
          '第2章  色彩乐园/色彩乐园-1 负暄/2.jpg',
          '第2章  色彩乐园/色彩乐园-1 负暄/3和2一起.jpg',
          '第2章  色彩乐园/色彩乐园-1 负暄/4.jpg',
          '第2章  色彩乐园/色彩乐园-1 负暄/5和4一起.jpg',
          '第2章  色彩乐园/色彩乐园-1 负暄/6删.jpg',
          '第2章  色彩乐园/色彩乐园-1 负暄/7删.jpg',
          '第2章  色彩乐园/色彩乐园-1 负暄/8删.jpg',
        ],
      },
      {
        title: { zh: '绮梦', en: 'Colorful Dreams', ja: '綺夢' },
        images: [
          '第2章  色彩乐园/色彩乐园2  绮梦/1.jpg',
          '第2章  色彩乐园/色彩乐园2  绮梦/2.jpg',
          '第2章  色彩乐园/色彩乐园2  绮梦/3.jpg',
          '第2章  色彩乐园/色彩乐园2  绮梦/4.jpg',
          '第2章  色彩乐园/色彩乐园2  绮梦/5.jpg',
          '第2章  色彩乐园/色彩乐园2  绮梦/6.jpg',
          '第2章  色彩乐园/色彩乐园2  绮梦/7.jpg',
          '第2章  色彩乐园/色彩乐园2  绮梦/8.jpg',
          '第2章  色彩乐园/色彩乐园2  绮梦/9.jpg',
          '第2章  色彩乐园/色彩乐园2  绮梦/10和9一起.jpg',
        ],
      },
      {
        title: { zh: '乐园', en: 'Paradise', ja: '楽園' },
        images: Array.from({ length: 4 }, (_, i) =>
          `第2章  色彩乐园/色彩乐园3  乐园/${i + 1}.jpg`
        ),
      },
    ],
  },
  {
    id: 'rhythm',
    title: { zh: '第三章 · 韵律', en: 'Chapter III · Rhythm', ja: '第三章 · リズム' },
    tabLabel: { zh: '韵律', en: 'Rhythm', ja: 'リズム' },
    sections: [
      {
        title: { zh: '韵律', en: 'Rhythm', ja: 'リズム' },
        images: [
          '第3章  韵律/1（换了新的）.jpg',
          '第3章  韵律/2.jpg',
          '第3章  韵律/2换了新的删.jpg',
          '第3章  韵律/3.jpg',
          '第3章  韵律/5.jpg',
          '第3章  韵律/6.jpg',
          '第3章  韵律/7.jpg',
          '第3章  韵律/8和7一起.jpg',
          '第3章  韵律/9.jpg',
          '第3章  韵律/10.jpg',
          '第3章  韵律/11.jpg',
          '第3章  韵律/12.jpg',
        ],
      },
    ],
  },
  {
    id: 'neon',
    title: { zh: '第四章 · 霓虹', en: 'Chapter IV · Neon', ja: '第四章 · ネオン' },
    tabLabel: { zh: '霓虹', en: 'Neon', ja: 'ネオン' },
    sections: [
      {
        title: { zh: '霓虹', en: 'Neon', ja: 'ネオン' },
        images: [
          '第4章 霓虹/1.JPG',
          '第4章 霓虹/2.JPG',
          '第4章 霓虹/3.jpg',
          '第4章 霓虹/4.jpg',
          '第4章 霓虹/5.jpg',
          '第4章 霓虹/6.jpg',
          '第4章 霓虹/7删.JPG',
          '第4章 霓虹/8删.jpg',
        ],
      },
    ],
  },
  {
    id: 'monochrome',
    title: { zh: '第五章 · 黑白之间', en: 'Chapter V · Between Black & White', ja: '第五章 · モノクロームの間' },
    tabLabel: { zh: '黑白之间', en: 'Monochrome', ja: 'モノクローム' },
    sections: [
      {
        title: { zh: '黑白之间', en: 'Between Black & White', ja: 'モノクロームの間' },
        images: [
          '第5章  黑白之间/1.jpg',
          '第5章  黑白之间/2.jpg',
          '第5章  黑白之间/3.jpg',
          '第5章  黑白之间/4.jpg',
          '第5章  黑白之间/5.jpg',
          '第5章  黑白之间/6.jpg',
          '第5章  黑白之间/7.jpg',
          '第5章  黑白之间/8.jpg',
          '第5章  黑白之间/10.jpg',
          '第5章  黑白之间/11.jpg',
          '第5章  黑白之间/12.jpg',
          '第5章  黑白之间/13.jpg',
          '第5章  黑白之间/14删.jpg',
          '第5章  黑白之间/15删.jpg',
          '第5章  黑白之间/16删.jpg',
          '第5章  黑白之间/17删.jpg',
        ],
      },
    ],
  },
  {
    id: 'people',
    title: { zh: '第六章 · 人・物', en: 'Chapter VI · People & Objects', ja: '第六章 · 人と物' },
    tabLabel: { zh: '人・物', en: 'People', ja: '人と物' },
    sections: [
      {
        title: { zh: '人・物', en: 'People & Objects', ja: '人と物' },
        images: [
          '第6章 人・物/1.jpg',
          '第6章 人・物/2.jpg',
          '第6章 人・物/3.jpg',
          '第6章 人・物/4.jpg',
          '第6章 人・物/5.jpg',
          '第6章 人・物/6.jpg',
          '第6章 人・物/7.jpg',
          '第6章 人・物/8.jpg',
          '第6章 人・物/9.jpg',
          '第6章 人・物/10.JPG',
          '第6章 人・物/12.jpg',
          '第6章 人・物/13.jpg',
          '第6章 人・物/15.jpg',
          '第6章 人・物/16.jpg',
          '第6章 人・物/17.jpg',
        ],
      },
    ],
  },
];

export default function Gallery() {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  const currentChapter = galleryData[activeChapter];
  const currentSection = currentChapter.sections[activeSection];

  /** Images of the currently active section for lightbox */
  const currentImages = useMemo(
    () => currentSection.images.map(blobUrl),
    [activeChapter, activeSection]
  );

  const openLightbox = (imageIdx: number) => {
    setLightboxIndex(imageIdx);
    setLightboxOpen(true);
  };

  /** Navigate to a specific chapter + section */
  const navigateTo = useCallback((chapterIdx: number, sectionIdx: number) => {
    setActiveChapter(chapterIdx);
    setActiveSection(sectionIdx);
  }, []);

  /** Go to next section (wraps across chapters) */
  const goNext = useCallback(() => {
    if (activeSection < currentChapter.sections.length - 1) {
      navigateTo(activeChapter, activeSection + 1);
    } else if (activeChapter < galleryData.length - 1) {
      navigateTo(activeChapter + 1, 0);
    }
  }, [activeChapter, activeSection, currentChapter, navigateTo]);

  /** Go to previous section */
  const goPrev = useCallback(() => {
    if (activeSection > 0) {
      navigateTo(activeChapter, activeSection - 1);
    } else if (activeChapter > 0) {
      const prevChapter = galleryData[activeChapter - 1];
      navigateTo(activeChapter - 1, prevChapter.sections.length - 1);
    }
  }, [activeChapter, activeSection, navigateTo]);

  const isFirst = activeChapter === 0 && activeSection === 0;
  const isLast = activeChapter === galleryData.length - 1 && activeSection === currentChapter.sections.length - 1;

  /** Compute total section count and current position */
  const totalSections = useMemo(() => galleryData.reduce((n, c) => n + c.sections.length, 0), []);
  const currentPosition = useMemo(() => {
    let pos = 0;
    for (let c = 0; c < activeChapter; c++) pos += galleryData[c].sections.length;
    return pos + activeSection + 1;
  }, [activeChapter, activeSection]);

  // Reset section when chapter changes externally
  useEffect(() => {
    if (activeSection >= currentChapter.sections.length) {
      setActiveSection(0);
    }
  }, [activeChapter, activeSection, currentChapter]);

  const pageTitle = {
    zh: '用户样片',
    en: 'User Gallery',
    ja: 'ユーザーギャラリー',
  };
  const pageSubtitle = {
    zh: '由世界各地的摄影师使用 Mandler 镜头拍摄',
    en: 'Shot by photographers worldwide with Mandler lenses',
    ja: '世界中の写真家がMandlerレンズで撮影',
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="container max-w-7xl mx-auto px-6 pt-20 md:pt-24">
        <Breadcrumb
          items={[
            { label: language === 'zh' ? '首页' : language === 'ja' ? 'ホーム' : 'Home', href: '/' },
            { label: pageTitle[language] },
          ]}
        />
      </div>

      {/* Page Header */}
      <section className="pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-10 bg-background">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12 text-center">
          <p className="text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 text-foreground/60 uppercase">
            {pageTitle[language]}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground">
            {pageTitle[language]}
          </h1>
          <div className="w-12 sm:w-14 md:w-16 h-px mx-auto mb-6 bg-foreground/20" style={{ height: '0.5px' }} />
          <p className="text-base sm:text-lg leading-relaxed text-foreground/70 max-w-3xl mx-auto">
            {pageSubtitle[language]}
          </p>
        </div>
      </section>

      {/* Chapter Tabs */}
      <nav className="border-y border-foreground/10 bg-background/80 backdrop-blur-sm sticky top-16 z-30">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="flex items-center justify-center gap-x-1 sm:gap-x-2 flex-wrap py-0">
            {galleryData.map((chapter, cIdx) => (
              <button
                key={chapter.id}
                onClick={() => navigateTo(cIdx, 0)}
                className={`relative py-3 px-3 sm:px-4 text-xs sm:text-sm tracking-wide whitespace-nowrap cursor-pointer ${
                  cIdx === activeChapter
                    ? 'text-foreground font-medium'
                    : 'text-foreground/40'
                }`}
              >
                {chapter.tabLabel[language]}
                {/* Active indicator line */}
                {cIdx === activeChapter && (
                  <span className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-[1.5px] bg-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Section Selector (if chapter has multiple sections) */}
      {currentChapter.sections.length > 1 && (
        <div className="border-b border-foreground/5 bg-background">
          <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
            <div className="flex items-center justify-center gap-x-1 flex-wrap py-0">
              {currentChapter.sections.map((section, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => navigateTo(activeChapter, sIdx)}
                  className={`relative py-2.5 px-3 sm:px-4 text-xs tracking-wide whitespace-nowrap cursor-pointer ${
                    sIdx === activeSection
                      ? 'text-foreground/80 font-medium'
                      : 'text-foreground/30'
                  }`}
                >
                  {section.title[language]}
                  {sIdx === activeSection && (
                    <span className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-[1px] bg-foreground/40" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Current Section Content */}
      <div id="gallery-content" className="py-10 sm:py-14 md:py-16">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Section title & subtitle */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
              {currentChapter.sections.length > 1
                ? `${currentChapter.title[language]} — ${currentSection.title[language]}`
                : currentChapter.title[language]
              }
            </h2>
            {currentSection.subtitle && (
              <p className="text-sm sm:text-base text-foreground/50 max-w-2xl leading-relaxed">
                {currentSection.subtitle[language]}
              </p>
            )}
            <div className="flex items-center gap-3 mt-4">
              <div className="h-px flex-1 bg-foreground/10" />
              <span className="text-[11px] tracking-widest text-foreground/30 tabular-nums">
                {currentSection.images.length} {language === 'zh' ? '张' : language === 'ja' ? '枚' : currentSection.images.length === 1 ? 'photo' : 'photos'}
              </span>
              <div className="h-px flex-1 bg-foreground/10" />
            </div>
          </div>

          {/* Masonry Image Grid */}
          <div className="columns-2 sm:columns-3 gap-3 sm:gap-4">
            {currentSection.images.map((imgPath, imageIdx) => (
              <GalleryImage
                key={`${activeChapter}-${activeSection}-${imageIdx}`}
                src={blobUrl(imgPath)}
                alt={`${currentSection.title[language]} - ${imageIdx + 1}`}
                onClick={() => openLightbox(imageIdx)}
              />
            ))}
          </div>

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between mt-12 sm:mt-14 md:mt-16 pt-8 border-t border-foreground/10">
            {/* Previous */}
            <button
              onClick={goPrev}
              disabled={isFirst}
              className={`inline-flex items-center gap-2 text-sm transition-colors cursor-pointer group ${
                isFirst ? 'text-foreground/15 cursor-default' : 'text-foreground/50 hover:text-foreground'
              }`}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${!isFirst ? 'group-hover:-translate-x-0.5' : ''}`} strokeWidth={1.5} />
              <span className="tracking-wide">
                {language === 'zh' ? '上一组' : language === 'ja' ? '前へ' : 'Previous'}
              </span>
            </button>

            {/* Position indicator */}
            <span className="text-[11px] tracking-widest text-foreground/30 tabular-nums">
              {currentPosition} / {totalSections}
            </span>

            {/* Next */}
            <button
              onClick={goNext}
              disabled={isLast}
              className={`inline-flex items-center gap-2 text-sm transition-colors cursor-pointer group ${
                isLast ? 'text-foreground/15 cursor-default' : 'text-foreground/50 hover:text-foreground'
              }`}
            >
              <span className="tracking-wide">
                {language === 'zh' ? '下一组' : language === 'ja' ? '次へ' : 'Next'}
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${!isLast ? 'group-hover:translate-x-0.5' : ''}`} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={currentImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <Footer />
    </div>
  );
}
