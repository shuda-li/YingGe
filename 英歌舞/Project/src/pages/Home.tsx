import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeatureCards from '@/components/home/FeatureCards';
import GalleryPreview from '@/components/home/GalleryPreview';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeatureCards />
        <GalleryPreview />
      </main>
      <Footer />
    </div>
  );
}
