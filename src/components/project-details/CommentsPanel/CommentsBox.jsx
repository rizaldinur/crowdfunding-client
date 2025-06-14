import { Reply } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProjectDetailsLayoutContext } from "../../../routes/layouts/ProjectDetailsLayout";
import { useCacheStore } from "../../../data/store";
import { useFetcher } from "react-router";
import ReplyBox from "./ReplyBox";
import ReplyForm from "./ReplyForm";
import { getReplies } from "../../../api/feed";

function CommentWithReplies({ comment = {} }) {
  const { getData, setData } = useCacheStore.getState();
  const { isAuth, role } = useContext(ProjectDetailsLayoutContext);
  const [openReply, setOpenReply] = useState(false);
  const user = getData("user") || {};
  const [replies, setReplies] = useState(comment.replies || []);
  const [totalReplies, setTotalReplies] = useState(comment.totalReplies || 0);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(comment.replies.length || 3);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (replies.length > 0) {
      console.log(replies);
    }
    if (replies.length < totalReplies) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }

    setOffset(replies.length);
  }, [replies, totalReplies]);

  const handleSuccessPostReply = (newReply) => {
    const newReplies = [newReply, ...replies];
    const oldCommentData = getData("commentData");
    const newCommentData = oldCommentData.map((oldComment) => {
      if (oldComment._id === comment._id) {
        return {
          ...oldComment,
          totalReplies: oldComment.totalReplies + 1,
          replies: newReplies.slice(0, 3),
        };
      }
      return oldComment;
    });

    setData("commentData", newCommentData);
    setReplies(newReplies);
    setTotalReplies((prev) => prev + 1);
  };

  const handleLoadMore = () => {
    (async () => {
      setLoadingMore(true);
      const data = await getReplies(comment._id, `?offset=${offset}`);
      setLoadingMore(false);
      if (!data || data.error) {
        setAlertOpen(true);
        setAlertMsg(data.message || "Terjadi kesalahan.");
        setAlertStatus("error");
        return;
      }

      const newReplies = data.data?.replies;

      setReplies((prev) => {
        return [...prev, ...newReplies];
      });
    })();
  };

  return (
    <Stack gap={3}>
      <Box
        sx={{
          color: "text.primary",
          bgcolor: "background.default",
          border: "1px solid",
          borderColor: "divider",
          p: 4,
        }}
      >
        <Stack gap={2} direction="row">
          <Avatar sx={{ width: 60, height: 60 }} src={comment.author?.avatar} />
          <Stack justifyContent="center">
            <Typography variant="body1">
              {comment.author?.name || "Username"}{" "}
              {comment.author?.role === "creator" && (
                <Box
                  component="span"
                  sx={{
                    p: 0.5,
                    bgcolor: "secondary.main",
                    color: "secondary.contrastText",
                  }}
                >
                  Kreator
                </Box>
              )}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ mt: 2 }} />
        <Typography sx={{ mt: 5 }}>
          {comment.content || "Content here"}
        </Typography>
        {isAuth && (role === "backer" || role === "creator") && (
          <Button
            sx={{ mt: 5 }}
            variant="outlined"
            color="inherit"
            onClick={() => setOpenReply(true)}
            endIcon={<Reply />}
          >
            balas
          </Button>
        )}
      </Box>
      <Stack
        component="section"
        gap={3}
        sx={{ mb: replies.length > 0 ? 3 : 0, pl: 4 }}
      >
        <ReplyForm
          user={user}
          open={openReply}
          commentId={comment._id}
          onClose={() => setOpenReply(false)}
          onSuccess={handleSuccessPostReply}
          noValidate
        />
        {replies.length > 0 &&
          replies.map((reply, indexReply) => (
            <ReplyBox key={`reply-${reply._id}`} data={reply} />
          ))}
        {replies.length > 0 && (
          <Typography variant="body2" color="textDisabled">
            MENAMPILKAN {replies.length} DARI {totalReplies || "X"} BALASAN{" "}
          </Typography>
        )}
        {hasMore && (
          <Button
            variant="outlined"
            loading={loadingMore}
            color="inherit"
            sx={{ placeSelf: "start" }}
            onClick={handleLoadMore}
          >
            Tampilkan balasan lain
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

export default CommentWithReplies;
