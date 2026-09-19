import React, { useState, useEffect } from 'react';
import { Outfit, CatalogProduct } from './types';
import { OFFICIAL_CATALOG_PRODUCTS } from './data/products';
import { OUTFITS } from './data/outfits';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { ConceptCardsSection } from './components/ConceptCardsSection';
import { GuaranteeBannerSection } from './components/GuaranteeBannerSection';
import { EditorialModelSplitSection } from './components/EditorialModelSplitSection';
import { DedicatedPricingSection } from './components/DedicatedPricingSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { StickyBottomCta } from './components/StickyBottomCta';
import { OutfitModal } from './components/OutfitModal';
import { OutfitGuideModal } from './components/OutfitGuideModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { LegalModal } from './components/LegalModal';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { LookDetailPage } from './components/LookDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CartCheckoutModal } from './components/CartCheckoutModal';
import { AnalyticsProvider, useAnalytics } from './components/TrackingToast';

const AppContent: React.FC = () => {
  const { trackEvent } = useAnalytics();
  const { cartCheckoutModalOpen, setCartCheckoutModalOpen } = useCart();

  const [currentView, setCurrentView] = useState<'home' | 'products' | 'product-detail' | 'look-detail'>('home');
  const [selectedCatalogProduct, setSelectedCatalogProduct] = useState<CatalogProduct | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

  const [selectedOutfitForOrder, setSelectedOutfitForOrder] = useState<Outfit | null>(null);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [sizeChartModalOpen, setSizeChartModalOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    type: 'terms' | 'privacy';
  }>({
    isOpen: false,
    type: 'terms',
  });

  // Ensure initial view is always Home (الرئيسية) on site load as requested
  useEffect(() => {
    // If a stale hash was lingering from a previous session, reset to clean home
    if (window.location.hash && window.location.hash !== '' && window.location.hash !== '#home') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setCurrentView('home');

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'products') {
        setCurrentView('products');
        setSelectedCatalogProduct(null);
        setSelectedOutfit(null);
      } else if (hash.startsWith('prod-')) {
        const found = OFFICIAL_CATALOG_PRODUCTS.find((p) => p.id === hash);
        if (found) {
          setSelectedCatalogProduct(found);
          setCurrentView('product-detail');
          setSelectedOutfit(null);
        }
      } else if (hash === 'after-class' || hash === 'after-dark' || hash === 'day-out' || hash.startsWith('look-')) {
        const cleanId = hash.replace('look-', '');
        const foundOutfit = OUTFITS.find((o) => o.id === cleanId || o.slug === cleanId || o.id === hash);
        if (foundOutfit) {
          setSelectedOutfit(foundOutfit);
          setCurrentView('look-detail');
        }
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const performScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 72;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    };

    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
      setTimeout(performScroll, 100);
    } else {
      performScroll();
    }
  };

  const handleNavigateToOutfits = () => {
    setCurrentView('home');
    setSelectedOutfit(null);
    setSelectedCatalogProduct(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOutfitsSection = () => {
    trackEvent('hero_cta_click', { target: 'concept-cards-section' });
    handleScrollToSection('concept-cards-section');
  };

  const handleNavigateToProducts = () => {
    trackEvent('navigation_click', { target: 'products_page' });
    setCurrentView('products');
    setSelectedCatalogProduct(null);
    window.location.hash = 'products';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetails = (product: CatalogProduct) => {
    trackEvent('product_view', { productId: product.id, productName: product.name });
    setSelectedCatalogProduct(product);
    setCurrentView('product-detail');
    window.location.hash = product.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setSelectedCatalogProduct(null);
    window.location.hash = 'products';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToOrderSection = () => {
    trackEvent('order_section_scroll', { target: 'dedicated-pricing-section' });
    handleScrollToSection('dedicated-pricing-section');
  };

  const handleOpenGuide = () => {
    trackEvent('outfit_guide_click', { source: 'nav_button' });
    setGuideModalOpen(true);
  };

  const handleOpenSizeChart = () => {
    trackEvent('size_chart_opened');
    setSizeChartModalOpen(true);
  };

  const handleSelectOutfit = (outfit: Outfit) => {
    trackEvent('outfit_cta_click', {
      outfitId: outfit.id,
      outfitName: outfit.name,
      totalPrice: outfit.totalPrice,
    });
    setSelectedOutfit(outfit);
    setCurrentView('look-detail');
    window.location.hash = outfit.slug || outfit.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOutfitOrderCompleted = (orderData: any) => {
    trackEvent('purchase', orderData);
  };

  const handleCloseOrderModal = () => {
    if (selectedOutfitForOrder) {
      trackEvent('abandoned_checkout', {
        outfitId: selectedOutfitForOrder.id,
      });
    }
    setSelectedOutfitForOrder(null);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-[#1C1C1C] selection:text-[#FFFFFF] ${
      currentView === 'home' ? 'bg-[#1C1C1C] text-[#EAEAEA]' : 'bg-[#FFFFFF] text-[#1C1C1C]'
    }`}>
      {/* 01. Top Floating Navigation Card */}
      <Header
        currentView={currentView}
        onNavigateToOutfits={handleNavigateToOutfits}
        onNavigateToProducts={handleNavigateToProducts}
        onScrollToSection={handleScrollToSection}
        onScrollToOrderSection={handleScrollToOrderSection}
      />

      {/* Main Content Conditional Views */}
      <main>
        {currentView === 'home' && (
          <div className="bg-[#1C1C1C] text-[#EAEAEA]">
            {/* Hero Section */}
            <Hero
              onScrollToOutfits={handleOpenOutfitsSection}
              onOpenGuide={handleOpenGuide}
            />

            {/* Problem Recognition + Reframing Section */}
            <ProblemSection />

            {/* Solution Section */}
            <SolutionSection
              onScrollToOutfits={handleOpenOutfitsSection}
            />

            {/* 3 Concept Cards (After Class, Everyday, After Dark) */}
            <ConceptCardsSection
              onSelectOutfit={handleSelectOutfit}
              onOpenGuide={handleOpenGuide}
            />

            {/* Bold Risk-Reversal Guarantee Banner */}
            <GuaranteeBannerSection
              onScrollToOutfits={handleOpenOutfitsSection}
              onOpenGuide={handleOpenGuide}
            />

            {/* Editorial Model & Fit Split */}
            <EditorialModelSplitSection
              onOpenSizeChart={handleOpenSizeChart}
            />

            {/* Dedicated Pricing Conversion Box */}
            <DedicatedPricingSection
              onSelectOutfit={handleSelectOutfit}
            />

            {/* FAQ Accordion */}
            <FaqSection
              onScrollToOutfits={handleOpenOutfitsSection}
              onOpenGuide={handleOpenGuide}
            />

            {/* Final CTA Banner */}
            <FinalCta
              onScrollToOutfits={handleOpenOutfitsSection}
              onOpenGuide={handleOpenGuide}
            />
          </div>
        )}

        {currentView === 'look-detail' && selectedOutfit && (
          <LookDetailPage
            outfit={selectedOutfit}
            onBackToOutfits={handleNavigateToOutfits}
            onOpenSizeChart={handleOpenSizeChart}
            onOpenProductDetails={handleOpenProductDetails}
            onSelectOtherOutfit={handleSelectOutfit}
          />
        )}

        {currentView === 'products' && (
          <ProductsPage
            onOpenProductDetails={handleOpenProductDetails}
            onNavigateToOutfits={handleNavigateToOutfits}
          />
        )}

        {currentView === 'product-detail' && selectedCatalogProduct && (
          <ProductDetailPage
            product={selectedCatalogProduct}
            onBackToProducts={handleBackToProducts}
            onNavigateToOutfits={handleNavigateToOutfits}
            onOpenSizeChart={handleOpenSizeChart}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenGuide={handleOpenGuide}
        onOpenSizeChart={handleOpenSizeChart}
        onScrollToOutfits={handleOpenOutfitsSection}
        onScrollToOrderSection={handleScrollToOrderSection}
        onOpenTerms={() => setLegalModalState({ isOpen: true, type: 'terms' })}
        onOpenPrivacy={() => setLegalModalState({ isOpen: true, type: 'privacy' })}
        onNavigateToProducts={handleNavigateToProducts}
        onNavigateToOutfits={handleNavigateToOutfits}
      />

      {/* Persistent Floating Sticky Bottom Bar on Home View */}
      {currentView === 'home' && (
        <StickyBottomCta
          onScrollToOrderSection={handleScrollToOrderSection}
          onOpenGuide={handleOpenGuide}
        />
      )}

      {/* Cart Drawer Component */}
      <CartDrawer
        onProceedToCheckout={() => setCartCheckoutModalOpen(true)}
        onNavigateToProducts={handleNavigateToProducts}
      />

      {/* Cart Checkout Modal */}
      <CartCheckoutModal
        isOpen={cartCheckoutModalOpen}
        onClose={() => setCartCheckoutModalOpen(false)}
      />

      {/* Interactive Modal: 3-Piece Outfit Order & Cairo Checkout */}
      <OutfitModal
        outfit={selectedOutfitForOrder}
        onClose={handleCloseOrderModal}
        onOrderCompleted={handleOutfitOrderCompleted}
      />

      {/* Interactive Modal: Outfit Guide */}
      <OutfitGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        onSelectCustomOutfit={(customOutfit) => {
          setGuideModalOpen(false);
          handleSelectOutfit(customOutfit);
        }}
      />

      {/* Interactive Modal: Size Chart */}
      <SizeGuideModal
        isOpen={sizeChartModalOpen}
        onClose={() => setSizeChartModalOpen(false)}
      />

      {/* Interactive Modal: Terms & Privacy Policies */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        type={legalModalState.type}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default function App() {
  return (
    <AnalyticsProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AnalyticsProvider>
  );
}
