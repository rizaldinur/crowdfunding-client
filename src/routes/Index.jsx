import FeaturedSection from "../components/index/FeaturedSection";
import HeroSection from "../components/index/HeroSection";
import RecommendedSection from "../components/index/RecommendedSection";

function Index() {
  document.title = "Ruang Modal";
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <RecommendedSection />
    </>
  );
}

export default Index;
