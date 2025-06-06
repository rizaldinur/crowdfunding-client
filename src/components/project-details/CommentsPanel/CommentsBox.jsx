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
        {openReply && (
          <Box
            sx={{
              color: "text.primary",
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              p: 4,
              mt: 3,
            }}
          >
            <Stack gap={2} direction="row">
              <Avatar sx={{ width: 60, height: 60 }} src={user.avatarUrl} />
              <Stack justifyContent="center" alignItems="start">
                <Typography variant="body1">
                  {user.name || "User Name"}{" "}
                  {user.role === "creator" && (
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
            <TextField
              sx={{ mt: 3 }}
              placeholder="Balas komentar"
              autoFocus
              multiline
              fullWidth
              rows={4}
            />
            <Button sx={{ mt: 3 }} variant="outlined" color="inherit">
              Kirim balasan
            </Button>
            <Button
              sx={{ ml: 1, mt: 3 }}
              variant="outlined"
              color="error"
              onClick={() => setOpenReply(false)}
            >
              Batal
            </Button>
          </Box>
        )}
        {replies.length > 0 &&
          replies.map((reply, indexReply) => (
            <Box
              key={`replies-section__reply-${indexReply}`}
              id={`replies-section__reply-${indexReply}`}
              sx={{
                color: "text.primary",
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                p: 4,
                mt: 3,
              }}
            >
              <Stack gap={2} direction="row">
                <Avatar sx={{ width: 60, height: 60 }} />
                <Stack justifyContent="center">
                  <Typography variant="body1">{"Creator Name"}</Typography>
                  <Typography variant="body1" color="textSecondary">
                    Date of creation
                  </Typography>
                </Stack>
              </Stack>
              <Divider sx={{ mt: 2 }} />
              <Typography sx={{ mt: 5 }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
                doloremque at, fugit similique provident veritatis nostrum enim
                aliquid sint deleniti voluptate illo natus, iste corrupti, saepe
                consectetur? Labore, id enim.
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default CommentWithReplies;
