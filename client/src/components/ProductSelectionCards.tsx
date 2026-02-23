import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCard {
  id: string;
  name: string;
  image: string;
  available: boolean;
  link?: string;
}

export function ProductSelectionCards() {
  const { t, language } = useLanguage();

  const products: ProductCard[] = [
    {
      id: 'e39',
      name: 'E39',
      image: '/images/银色镜头挂机特写1.jpg',
      available: true,
      link: '/products/e39-intro',
    },
    {
      id: 'e39-special',
      name: language === 'zh' ? 'E39 特别版' : 'E39 Special Edition',
      image: '/images/3色镜头+相机+木质背景.jpg',
      available: true,
      link: '/products/e39-special-intro',
    },
    {
      id: 'coming-soon',
      name: t('product.comingSoon'),
      image: '/images/hero-bg.jpg',
      available: false,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group relative overflow-hidden bg-card ${
                product.available ? 'cursor-pointer' : 'cursor-default'
              }`}
              onClick={() => {
                if (product.available && product.link) {
                  window.location.href = product.link;
                }
              }}
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    product.available ? 'group-hover:scale-105' : ''
                  }`}
                />
              </div>

              {/* Product Name */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-light tracking-wide text-foreground">
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
