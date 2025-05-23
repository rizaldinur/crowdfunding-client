import { Suspense, useEffect } from "react";
import FeaturedSection from "../components/index/FeaturedSection";
import HeroSection from "../components/index/HeroSection";
import RecommendedSection from "../components/index/RecommendedSection";
import { Await, useLoaderData } from "react-router";
import BasicSectionLoading from "../components/fallback-component/BasicSectionLoading";

function Index() {
  const { featured } = useLoaderData();
  useEffect(() => {
    document.title = "Ruang Modal";
  }, []);
  return (
    <>
      <HeroSection />
      <Suspense fallback={<BasicSectionLoading />}>
        <Await resolve={featured}>
          {(featured) => {
            return <FeaturedSection data={featured} />;
          }}
        </Await>
      </Suspense>
      <RecommendedSection />
    </>
  );
}

export const getFeaturedProject = async () => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + "/index/featured-project";

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const indexLoader = ({ request, params }) => {
  return {
    featured: getFeaturedProject(),
  };
};

export default Index;
