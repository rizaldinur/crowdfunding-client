import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { Suspense, useContext, useEffect, useState } from "react";
import {
  Await,
  Link as RouterLink,
  useFetcher,
  useLoaderData,
  useParams,
} from "react-router";
import CommentForm from "./CommentsPanel/CommentForm";
import CommentWithReplies from "./CommentsPanel/CommentsBox";
import { ProjectDetailsLayoutContext } from "../../routes/layouts/ProjectDetailsLayout";
import { getProjectDetails } from "../../api/feed";
import BasicSectionLoading from "../fallback-component/BasicSectionLoading";
import { useCacheStore } from "../../data/store";

function CommentsPanel() {
  const { isAuth, role } = useContext(ProjectDetailsLayoutContext);
  const { commentData } = useLoaderData();

  // // const [comments, setComments] = useState([{ replies: [1] }]);
  // const [comments, setComments] = useState([]);

  return (
    <Container maxWidth="md">
      {isAuth === "true" ? (
        role === "backer" ? (
          <CommentForm />
        ) : (
          <Box
            sx={{
              color: "text.primary",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              px: 3,
              py: 2,
              mt: 5,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              Hanya Pendukung yang dapat mengirim komentar.&nbsp;
            </Typography>
          </Box>
        )
      ) : (
        <Box
          sx={{
            color: "text.primary",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            px: 3,
            py: 2,
            mt: 5,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            Kamu harus masuk untuk mengirim komentar.&nbsp;
            <Link component={RouterLink} to="/login">
              Login sekarang.
            </Link>
          </Typography>
        </Box>
      )}

      <Suspense fallback={<BasicSectionLoading />}>
        <Await resolve={commentData}>
          {(commentData) => {
            const { getData, setData } = useCacheStore.getState();

            useEffect(() => {
              if (commentData.error) {
                return;
              }

              const cached = getData("commentData");
              if (!cached) {
                setData("commentData", commentData);
              }
            }, [commentData]);

            if (commentData.error) {
              return (
                <Typography
                  color="textPrimary"
                  sx={{ textAlign: "center", mt: 3, mb: 5 }}
                >
                  Terjadi kesalahan.
                </Typography>
              );
            }

            if (commentData.data?.commentWithReplies.length === 0) {
              return (
                <Typography
                  color="textPrimary"
                  sx={{ textAlign: "center", mt: 3, mb: 5 }}
                >
                  Tidak ada komentar.
                </Typography>
              );
            }

            return (
              <Stack
                component="section"
                id="comments-section"
                sx={{
                  color: "text.primary",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  p: 3,
                  mt: 3,
                  mb: 5,
                  gap: 3,
                }}
              >
                {commentData.data?.commentWithReplies.map(
                  (commentReplies, i) => {
                    return <CommentWithReplies key={`comment-${index}`} />;
                  }
                )}
              </Stack>
            );
          }}
        </Await>
      </Suspense>
    </Container>
  );
}

export const commentsPanelLoader = ({ request, params }) => {
  const path = new URL(request.url).pathname;
  const { getData, setData } = useCacheStore.getState();

  const cached = getData("commentData");
  if (cached) return { commentData: cached };

  return { commentData: getProjectDetails(path) };
};

export default CommentsPanel;
