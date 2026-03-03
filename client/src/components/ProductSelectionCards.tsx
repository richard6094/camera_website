import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface ProductCard {
  id: string;
  name: string;
  image: string;
  available: boolean;
  link?: string;
}

export function ProductSelectionCards() {
  const { t } = useLanguage();
  const sectionRef = useScrollProgress<HTMLDivElement>();

  const products: ProductCard[] = [
    {
      id: '35mm-f2',
      name: '35mm F/2',
      image: '/images/银色镜头挂机特写1.jpg',
      available: true,
      link: '/products/35mm-f2-intro',
    },
    {
      id: 'coming-soon',
      name: t('product.comingSoon'),
      image: '/images/hero-bg.jpg',
      available: false,
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-surface-alt section-raised">
      <div className="container">
        <div className="sp-stagger-children grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group relative overflow-hidden bg-card shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.16),0_4px_12px_rgba(0,0,0,0.1)] damped-transition rounded-xl ${
                product.available ? 'cursor-pointer' : 'cursor-default'
              }`}
              onClick={() => {
                if (product.available && product.link) {
                  window.location.href = product.link;
                }
              }}
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden image-hover-zoom">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    product.available ? 'group-hover:scale-105' : ''
                  }`}
                />
              </div>

              {/* Product Name */}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-light tracking-wide text-foreground">
                  {product.name}
                </h3>
                {!product.available && (
                  <p className="mt-2 text-sm text-muted-foreground tracking-wider">
                    {t('product.stayTuned')}
                  </p>
                )}
              </div>

              {/* Hover Overlay for Available Products */}
              {product.available && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
