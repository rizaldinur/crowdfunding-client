import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useFetcher } from "react-router";
import CommentForm from "./CommentsPanel/CommentForm";
import CommentWithReplies from "./CommentsPanel/CommentsBox";

function CommentsPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [canComment, setCanComment] = useState(false);
  const [comments, setComments] = useState([{ replies: [1] }]);

  return (
    <Container maxWidth="md">
      {isLoggedIn ? (
        canComment ? (
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
              Hanya Pendung yang dapat mengirim komentar.&nbsp;
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

      {comments.length > 0 ? (
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
          <CommentWithReplies />
        </Stack>
      ) : (
        <Typography
          color="textPrimary"
          sx={{ textAlign: "center", mt: 3, mb: 5 }}
        >
          Tidak ada komentar.
        </Typography>
      )}
    </Container>
  );
}

export default CommentsPanel;
