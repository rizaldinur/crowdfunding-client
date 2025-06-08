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
import { useContext, useState } from "react";
import { ProjectDetailsLayoutContext } from "../../../routes/layouts/ProjectDetailsLayout";
import { useCacheStore } from "../../../data/store";
import { useFetcher } from "react-router";
import ReplyBox from "./ReplyBox";
import ReplyForm from "./ReplyForm";

function CommentWithReplies({ comment = {} }) {
  const { getData } = useCacheStore.getState();
  const { isAuth, role } = useContext(ProjectDetailsLayoutContext);
  const [openReply, setOpenReply] = useState(false);
  const user = getData("user") || {};
  const [replies, setReplies] = useState(comment.replies || []);

  return (
    <Box>
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
      <Box component="section" sx={{ pl: 4 }}>
        <ReplyForm
          user={user}
          open={openReply}
          onClose={() => setOpenReply(false)}
          noValidate
        />
        {replies.length > 0 && replies.map((reply, indexReply) => <ReplyBox />)}
      </Box>
    </Box>
  );
}

export default CommentWithReplies;
