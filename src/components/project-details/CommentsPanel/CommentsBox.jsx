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

function CommentWithReplies({ comment = {} }) {
  const { getData, setData } = useCacheStore.getState();
  const { isAuth, role } = useContext(ProjectDetailsLayoutContext);
  const [openReply, setOpenReply] = useState(false);
  const user = getData("user") || {};
  const [replies, setReplies] = useState(comment.replies || []);
  const [totalReplies, setTotalReplies] = useState(comment.totalReplies || 0);

  useEffect(() => {
    //add first 3 replies to commenData cache
    const oldCommentData = getData("commentData");
    const newCommentData = oldCommentData.map((oldComment) => {
      if (oldComment._id === comment._id) {
        const newReplies = replies.slice(0, 3);
        return {
          ...oldComment,
          totalReplies: totalReplies,
          replies: newReplies,
        };
      }
      return oldComment;
    });
    setData("commentData", newCommentData);
  }, [replies]);

  const handleSuccessPostReply = (newReply) => {
    const newReplies = [newReply, ...replies];
    setReplies(newReplies);
    setTotalReplies((prev) => prev + 1);
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
        sx={{ mb: replies.length > 0 && 3, pl: 4 }}
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
            <ReplyBox key={`reply-${indexReply}`} data={reply} />
          ))}
        {replies.length > 0 && (
          <Typography textAlign="center" variant="body2" color="textDisabled">
            MENAMPILKAN {replies.length} DARI {totalReplies || "X"} BALASAN{" "}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

export default CommentWithReplies;
