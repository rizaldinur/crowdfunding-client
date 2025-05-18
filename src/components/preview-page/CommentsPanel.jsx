import { Reply } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router";

function CommentsPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [canComment, setCanComment] = useState(true);
  const [openReply, setOpenReply] = useState(false);
  const [comments, setComments] = useState([{ replies: [1] }]);

  return (
    <Container maxWidth="md">
      {isLoggedIn ? (
        canComment ? (
          <>
            <Box
              sx={{
                color: "text.primary",
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                p: 4,
                mt: 5,
              }}
            >
              <Stack gap={2} direction="row">
                <Avatar sx={{ width: 60, height: 60 }} />
                <Stack justifyContent="center" alignItems="start">
                  <Typography variant="body1">Username</Typography>
                </Stack>
              </Stack>
              <Divider sx={{ mt: 2 }} />
              <TextField
                sx={{ mt: 3 }}
                placeholder="Tulis komentarmu"
                multiline
                fullWidth
                rows={4}
              />
              <Button sx={{ mt: 3 }} variant="outlined" color="inherit">
                Kirim Komentar
              </Button>
            </Box>
            {comments.length === 0 && (
              <Typography
                color="textPrimary"
                sx={{ textAlign: "center", mt: 3, mb: 5 }}
              >
                Tidak ada komentar.
              </Typography>
            )}
          </>
        ) : (
          <>
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
            {comments.length === 0 && (
              <Typography
                color="textPrimary"
                sx={{ textAlign: "center", mt: 3, mb: 5 }}
              >
                Tidak ada komentar.
              </Typography>
            )}
          </>
        )
      ) : (
        <>
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
          {comments.length === 0 && (
            <Typography
              color="textPrimary"
              sx={{ textAlign: "center", mt: 3, mb: 5 }}
            >
              Tidak ada komentar.
            </Typography>
          )}
        </>
      )}

      {comments.length > 0 && (
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
          {Array(1)
            .fill(0)
            .map((_, index) => (
              <Box key={`comment-${index}`} id={`comment-${index}`}>
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
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam doloremque at, fugit similique provident veritatis
                    nostrum enim aliquid sint deleniti voluptate illo natus,
                    iste corrupti, saepe consectetur? Labore, id enim.
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
                {comments[_].replies.length > 0 && (
                  <Box
                    component="section"
                    id={`replies-section-${index}`}
                    sx={{ pl: 4 }}
                  >
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
                        <Button
                          sx={{ mt: 3 }}
                          variant="outlined"
                          color="inherit"
                        >
                          Kirim balasan
                        </Button>
                      </Box>
                    )}
                    {Array(2)
                      .fill(0)
                      .map((_, indexReply) => (
                        <Box
                          key={`replies-section${index}__reply-${indexReply}`}
                          id={`replies-section${index}__reply-${indexReply}`}
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
                              <Typography variant="body1">
                                Creator Name
                              </Typography>
                              <Typography variant="body1" color="textSecondary">
                                Date of creation
                              </Typography>
                            </Stack>
                          </Stack>
                          <Divider sx={{ mt: 2 }} />
                          <Typography sx={{ mt: 5 }}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Magnam doloremque at, fugit similique
                            provident veritatis nostrum enim aliquid sint
                            deleniti voluptate illo natus, iste corrupti, saepe
                            consectetur? Labore, id enim.
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
            ))}
        </Stack>
      )}
    </Container>
  );
}

export default CommentsPanel;
