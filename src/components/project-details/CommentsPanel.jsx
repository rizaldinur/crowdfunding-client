import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Await,
  Link as RouterLink,
  useLoaderData,
  useParams,
} from "react-router";
import CommentForm from "./CommentsPanel/CommentForm";
import CommentWithReplies from "./CommentsPanel/CommentsBox";
import { ProjectDetailsLayoutContext } from "../../routes/layouts/ProjectDetailsLayout";
import { getComments, postComment, postReply } from "../../api/feed";
import BasicSectionLoading from "../fallback-component/BasicSectionLoading";
import { useCacheStore } from "../../data/store";

export const CommentPanelContext = createContext();

function CommentsPanel() {
  const { commentData } = useLoaderData();
  const params = useParams();
  const { getData, setData } = useCacheStore.getState();
  const {
    isAuth,
    role,
    alertOpen,
    setAlertOpen,
    alertMsg,
    setAlertMsg,
    alertStatus,
    setAlertStatus,
  } = useContext(ProjectDetailsLayoutContext);
  const [commentWithReplies, setCommentWithReplies] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (commentWithReplies.length >= totalComments) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [totalComments, commentWithReplies]);

  const handleClose = () => {
    setAlertOpen(false);
  };

  const handleLoadMore = () => {
    (async () => {
      setLoadingMore(true);
      const data = await getComments(params.projectId, `?offset=${offset}`);
      setLoadingMore(false);
      if (!data || data.error) {
        setAlertOpen(true);
        setAlertMsg(data.message || "Terjadi kesalahan.");
        setAlertStatus("error");
        return;
      }
      const newComments = data.data?.commentWithReplies;
      const commentData = getData("commentData");
      const newCommentData = [...commentData, ...newComments];
      setData("commentData", newCommentData);
      setCommentWithReplies(newCommentData);
      setOffset((prev) => prev + newComments.length);
      if (newComments.length < 3) setHasMore(false);
    })();
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
            useEffect(() => {
              if (commentData && !commentData.error) {
                const cached = getData("commentData");
                const cachedTotalComments = getData("totalComments");

                if (!cached) {
                  setData("commentData", commentData.data?.commentWithReplies);
                  setCommentWithReplies(commentData.data?.commentWithReplies);
                  setOffset(commentData.data?.commentWithReplies.length);
                  return;
                }
                if (cachedTotalComments == null) {
                  setData("totalComments", commentData.data?.totalComments);
                  setTotalComments(commentData.data?.totalComments);
                  return;
                }

                setOffset(cached.length);
                setTotalComments(cachedTotalComments);
                setCommentWithReplies(cached);
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
                <Typography
                  textAlign="center"
                  variant="body2"
                  color="textDisabled"
                >
                  MENAMPILKAN {commentWithReplies.length} DARI{" "}
                  {totalComments || "X"} KOMENTAR{" "}
                </Typography>
                {hasMore && (
                  <Button
                    variant="outlined"
                    loading={loadingMore}
                    color="inherit"
                    sx={{ placeSelf: "center" }}
                    onClick={handleLoadMore}
                  >
                    Tampilkan komentar lain
                  </Button>
                )}
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

  if (postData._action === "post-reply") {
    const { commentId, reply } = postData;
    console.log(reply);

    const data = await postReply({ reply }, commentId);
    return data;
  }

  const data = await postComment(postData, projectId);

  if (data.error) {
    return data;
  }

  const commentData = getData("commentData");
  let newComments = [data.data?.newComment, ...(commentData || [])];
  const totalComments =
    getData("totalComments") >= 0
      ? getData("totalComments")
      : newComments.length;
  setData("totalComments", totalComments + 1);
  setData("commentData", newComments);

  return data;
};

export const commentsPanelLoader = ({ request, params }) => {
  const { getData } = useCacheStore.getState();

  const cached = getData("commentData");
  if (cached) return { commentData: cached };

  return { commentData: getComments(params.projectId) };
};

export default CommentsPanel;
