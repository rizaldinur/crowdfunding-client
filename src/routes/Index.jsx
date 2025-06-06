import { Suspense, useEffect } from "react";
import FeaturedSection from "../components/index/FeaturedSection";
import HeroSection from "../components/index/HeroSection";
import RecommendedSection from "../components/index/RecommendedSection";
import { Await, useLoaderData } from "react-router";
import BasicSectionLoading from "../components/fallback-component/BasicSectionLoading";
import { getFeaturedProject, getRecommendedProjects } from "../api/feed";

function Index() {
  const { featured, recommended } = useLoaderData();
  useEffect(() => {
    document.title = "Ruang Modal";
  }, []);
  return (
    <>
      <HeroSection />
      <Suspense fallback={<BasicSectionLoading />}>
        <Await resolve={featured}>
          {(featured) => {
            return <FeaturedSection data={featured.data?.featuredProject} />;
          }}
        </Await>
      </Suspense>
      <Suspense fallback={<BasicSectionLoading />}>
        <Await resolve={recommended}>
          {(recommended) => {
            return (
              <RecommendedSection
                data={recommended.data?.recommendedProjects}
              />
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export const indexLoader = ({ request, params }) => {
  return {
    featured: getFeaturedProject(),
    recommended: getRecommendedProjects(),
  };
};

export default Index;
