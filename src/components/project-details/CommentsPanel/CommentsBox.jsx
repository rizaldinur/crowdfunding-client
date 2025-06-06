import { Reply } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";

function CommentWithReplies() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [canComment, setCanComment] = useState(true);
  const [openReply, setOpenReply] = useState(false);
  const [comments, setComments] = useState([{ replies: [1] }]);

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
          <Avatar sx={{ width: 60, height: 60 }} />
          <Stack justifyContent="center">
            <Typography variant="body1">Username</Typography>
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
        {isLoggedIn && canComment && (
          <Button
            sx={{ mt: 5 }}
            variant="outlined"
            color="inherit"
            endIcon={<Reply />}
          >
            balas
          </Button>
        )}
      </Box>
      {comments[0].replies.length > 0 && (
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
                <Avatar sx={{ width: 60, height: 60 }} />
                <Stack justifyContent="center" alignItems="start">
                  <Typography variant="body1">User Name</Typography>
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
            </Box>
          )}
          {Array(2)
            .fill(0)
            .map((_, indexReply) => (
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
                    <Typography variant="body1">Creator Name</Typography>
                    <Typography variant="body1" color="textSecondary">
                      Date of creation
                    </Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ mt: 2 }} />
                <Typography sx={{ mt: 5 }}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam doloremque at, fugit similique provident veritatis
                  nostrum enim aliquid sint deleniti voluptate illo natus, iste
                  corrupti, saepe consectetur? Labore, id enim.
                </Typography>
              </Box>
            ))}

          {isLoggedIn && canComment && (
            <Button
              sx={{ mt: 3 }}
              variant="outlined"
              color="inherit"
              onClick={() => setOpenReply(true)}
              endIcon={<Reply />}
            >
              balas john doe
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

export default CommentWithReplies;
