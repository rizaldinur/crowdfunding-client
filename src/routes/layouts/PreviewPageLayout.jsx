import { Await, Navigate, useLoaderData, useLocation } from "react-router";
import BuildPageNav from "../../components/navigation/BuildPageNav";
import ProjectHeadPreview from "../../components/preview-page/ProjectHeadPreview";
import ProjectTabsPreview from "../../components/preview-page/ProjectTabsPreview";
import { Suspense, useEffect } from "react";
import LoadingPage from "../../components/LoadingPage";
import { setToken } from "../../utils/utils";
import MainFooter from "../../components/navigation/MainFooter";
import { getPreviewData } from "../../api/build";

function PreviewPageLayout() {
  const { previewData } = useLoaderData();
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={previewData}>
        {(previewData) => {
          useEffect(() => {
            if (previewData) {
              console.log(previewData);
              if (!previewData.data?.error) {
                if (previewData.data?.refreshToken) {
                  setToken(previewData.data?.refreshToken);
                }
              }
            }
          }, [previewData]);
          if (previewData.error) {
            if (
              Object.hasOwn(previewData.data, "authenticated") &&
              !previewData.data?.authenticated
            ) {
              return <Navigate to="/login" state={{ from: location }} />;
            }
            return <Navigate to="/" />;
          }
          return (
            <>
              <BuildPageNav />
              <ProjectHeadPreview data={previewData.data?.headData} />
              <ProjectTabsPreview data={previewData.data?.tabsData} />
              <MainFooter borderTop />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const previewLoader = ({ request }) => {
  const pathname = new URL(request.url).pathname;

  return { previewData: getPreviewData(pathname) };
};

export default PreviewPageLayout;
