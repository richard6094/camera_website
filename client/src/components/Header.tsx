import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ShoppingCart, Menu, X, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Header Navigation Component
 * Design Philosophy: Leica Industrial Aesthetics × Compact Navigation
 * 
 * Features:
 * - Left corner hamburger menu
 * - Compact dropdown navigation panel with submenu support
 * - Center brand logo
 * - Right corner shopping cart
 * - Damped transitions and mechanical precision
 */

interface HeaderProps {
  cartCount?: number;
}

interface NavItem {
  label: string;
  href?: string;
  submenu?: { label: string; href: string; description: string }[];
}

export default function Header({ cartCount = 0 }: HeaderProps) {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language, setLanguage, t } = useLanguage();

  // Auto-hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top of page
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down (after 100px)
      else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
        setMenuOpen(false); // Close menu when hiding header
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const products = [
    {
      label: t('product.m11.title'),
      href: '/products/m11-monochrom',
      description: t('product.m11.tagline'),
    },
    {
      label: t('product.q3.title'),
      href: '/products/q3-classic',
      description: t('product.q3.tagline'),
    },
    {
      label: t('product.sl3.title'),
      href: '/products/sl3-professional',
      description: t('product.sl3.tagline'),
    },
  ];

  const navItems: NavItem[] = [
    { label: t('header.products'), submenu: products },
    { label: t('header.story'), href: '/story' },
    { label: t('header.gallery'), href: '/#gallery' },
    { label: t('header.support'), href: '/#support' },
  ];

  const handleNavigate = (href: string) => {
    if (href.startsWith('/#')) {
      // Scroll to section
      const sectionId = href.substring(2);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      navigate('/');
    } else {
      navigate(href);
    }
    setMenuOpen(false);
    setActiveSubmenu(null);
  };

  const handleMenuItemClick = (item: NavItem) => {
    if (item.submenu) {
      // Toggle submenu
      setActiveSubmenu(activeSubmenu === item.label ? null : item.label);
    } else if (item.href) {
      handleNavigate(item.href);
    }
  };

  return (
    <>
      {/* Fixed Header Bar */}
      <header 
        className={`fixed left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-foreground/10 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{borderBottomWidth: '0.5px', top: 0}}
      >
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-8">
          {/* Left: Hamburger Menu */}
          <div className="flex items-center w-[120px] md:w-[140px]">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-foreground/70 hover:text-foreground damped-transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
              )}
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div
            className="cursor-pointer flex-shrink-0 damped-transition hover:opacity-80"
            onClick={() => navigate('/')}
          >
            <img 
              src="/images/mandler-logo.png" 
              alt="Mandler" 
              className="h-[77px] md:h-[96px] lg:h-[115px] w-auto"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Right: Language Switcher & Shopping Cart */}
          <div className="flex items-center justify-end gap-2 md:gap-3 w-[120px] md:w-[140px]">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center justify-center gap-1.5 w-[60px] md:w-[70px] py-1.5 text-foreground/70 hover:text-foreground damped-transition border border-foreground/10 hover:border-foreground/20 flex-shrink-0"
              style={{ borderRadius: '2px', borderWidth: '0.5px' }}
              title={language === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs md:text-sm font-medium tracking-wider whitespace-nowrap">{language === 'zh' ? 'CN' : 'EN'}</span>
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-foreground/70 hover:text-foreground damped-transition"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground/90 text-background text-xs flex items-center justify-center font-semibold" style={{borderRadius: '1px'}}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Compact Dropdown Menu */}
      {menuOpen && (
        <div className="fixed top-16 md:top-20 left-4 md:left-6 right-4 md:right-auto z-[100] md:flex md:gap-0 md:items-start">
          {/* Main Menu */}
          <div 
            className="bg-[#1a1a1a]/95 backdrop-blur-md border border-[#f5f5f5]/10 transition-all duration-500 ease-out animate-in fade-in slide-in-from-top-4"
            style={{
              minWidth: '280px',
              maxWidth: '100%',
              borderWidth: '0.5px',
            }}
          >
            <nav className="py-2">
              <ul>
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleMenuItemClick(item)}
                      className="w-full text-left px-6 py-3 text-[#f5f5f5]/80 hover:text-[#f5f5f5] hover:bg-[#f5f5f5]/5 damped-transition border-b border-[#f5f5f5]/5 last:border-b-0 flex items-center justify-between"
                      style={{
                        borderBottomWidth: '0.5px',
                        fontSize: '0.9rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      <span>{item.label}</span>
                      {item.submenu && (
                        <ChevronRight 
                          className={`w-4 h-4 damped-transition ${activeSubmenu === item.label ? 'rotate-90 md:rotate-0' : ''}`} 
                          strokeWidth={1.5} 
                        />
                      )}
                    </button>
                    
                    {/* Mobile Submenu (Vertical) */}
                    {item.submenu && activeSubmenu === item.label && (
                      <div className="md:hidden bg-[#1a1a1a]/80 border-t border-[#f5f5f5]/5" style={{ borderTopWidth: '0.5px' }}>
                        <ul>
                          {item.submenu.map((subItem) => (
                            <li key={subItem.href}>
                              <button
                                onClick={() => handleNavigate(subItem.href)}
                                className="w-full text-left px-8 py-3 text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:bg-[#f5f5f5]/5 damped-transition border-b border-[#f5f5f5]/5 last:border-b-0"
                                style={{
                                  borderBottomWidth: '0.5px',
                                }}
                              >
                                <div className="font-medium" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                  {subItem.label}
                                </div>
                                <div className="text-[#f5f5f5]/40 mt-0.5" style={{ fontSize: '0.75rem' }}>
                                  {subItem.description}
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Desktop Submenu (Horizontal) */}
          {activeSubmenu === t('header.products') && (
            <div 
              className="hidden md:block bg-[#1a1a1a]/95 backdrop-blur-md border border-[#f5f5f5]/10 animate-in fade-in slide-in-from-left-2 duration-300"
              style={{
                minWidth: '320px',
                maxWidth: '380px',
                borderWidth: '0.5px',
                borderLeft: 'none',
              }}
            >
              <nav className="py-2">
                <ul>
                  {products.map((product) => (
                    <li key={product.href}>
                      <button
                        onClick={() => handleNavigate(product.href)}
                        className="w-full text-left px-6 py-4 text-[#f5f5f5]/80 hover:text-[#f5f5f5] hover:bg-[#f5f5f5]/5 damped-transition border-b border-[#f5f5f5]/5 last:border-b-0"
                        style={{
                          borderBottomWidth: '0.5px',
                        }}
                      >
                        <div className="font-medium" style={{ fontSize: '0.95rem', letterSpacing: '0.05em' }}>
                          {product.label}
                        </div>
                        <div className="text-[#f5f5f5]/50 mt-1" style={{ fontSize: '0.8rem' }}>
                          {product.description}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      )}

      {/* Backdrop overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm transition-all duration-500 ease-out animate-in fade-in"
          onClick={() => {
            setMenuOpen(false);
            setActiveSubmenu(null);
          }}
        />
      )}
    </>
  );
}
