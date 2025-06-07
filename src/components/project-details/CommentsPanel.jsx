import {
  Alert,
  Box,
  Container,
  Link,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Suspense, useContext, useEffect, useState } from "react";
import { Await, Link as RouterLink, useLoaderData } from "react-router";
import CommentForm from "./CommentsPanel/CommentForm";
import CommentWithReplies from "./CommentsPanel/CommentsBox";
import { ProjectDetailsLayoutContext } from "../../routes/layouts/ProjectDetailsLayout";
import { getProjectDetails, postComment } from "../../api/feed";
import BasicSectionLoading from "../fallback-component/BasicSectionLoading";
import { useCacheStore } from "../../data/store";

function CommentsPanel() {
  const { isAuth, role, alertOpen, setAlertOpen, alertMsg, alertStatus } =
    useContext(ProjectDetailsLayoutContext);
  const { commentData } = useLoaderData();

  const handleClose = () => {
    setAlertOpen(false);
  };
  return (
    <Container maxWidth="md">
      <Snackbar
        open={alertOpen}
        onClose={handleClose}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          open={alertOpen}
          onClose={handleClose}
          variant="filled"
          severity={alertStatus}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
      {isAuth ? (
        role === "backer" || role === "creator" ? (
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
            const [commentWithReplies, setCommentWithReplies] = useState([]);

            useEffect(() => {
              if (commentData.error) {
                return;
              }

              const cached = getData("commentData");
              if (!cached) {
                setData("commentData", commentData.data?.commentWithReplies);
                setCommentWithReplies(commentData.data?.commentWithReplies);
                return;
              }
              setCommentWithReplies(cached);
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

            if (commentWithReplies.length === 0) {
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
                {commentWithReplies.map((commentReplies, i) => {
                  return (
                    <CommentWithReplies
                      key={`comment-${i}`}
                      comment={commentReplies}
                    />
                  );
                })}
              </Stack>
            );
          }}
        </Await>
      </Suspense>
    </Container>
  );
}

export const commentsPanelAction = async ({ request, params }) => {
  const { getData, setData } = useCacheStore.getState();

  const { projectId } = params;
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  const data = await postComment(postData, projectId);

  if (data.error) {
    return data;
  }

  const commentData = getData("commentData");
  if (!commentData) {
    return data;
  }

  let newComments = [data.data?.newComment, ...(commentData || [])];
  setData("commentData", newComments);

  return data;
};

export const commentsPanelLoader = ({ request, params }) => {
  const path = new URL(request.url).pathname;

  const { getData } = useCacheStore.getState();

  const cached = getData("commentData");
  if (cached) return { commentData: cached };

  return { commentData: getProjectDetails(path) };
};

export default CommentsPanel;
