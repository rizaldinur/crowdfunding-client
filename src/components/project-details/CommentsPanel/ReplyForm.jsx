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
import { useFetcher } from "react-router";
import { ProjectDetailsLayoutContext } from "../../../routes/layouts/ProjectDetailsLayout";

function ReplyForm({
  commentId = "",
  onClose,
  onError,
  onSuccess,
  open = false,
  user = {},
  ...props
}) {
  const { setAlertOpen, setAlertMsg, setAlertStatus } = useContext(
    ProjectDetailsLayoutContext
  );
  let fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
  const [content, setContent] = useState("");

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        setAlertOpen(true);
        setAlertMsg(fetcher.data?.message || "Terjadi kesalahan.");
        setAlertStatus("error");
        onError();
      } else {
        setAlertOpen(true);
        setAlertMsg(fetcher.data?.message || "Sukses.");
        setAlertStatus("success");
        onSuccess(fetcher.data?.data?.newReply);
      }
    }
  }, [fetcher.data]);

  const handleChange = (e) => {
    const { value } = e.target;
    setContent(value);
  };

  if (!open) {
    return null;
  }

  return (
    <fetcher.Form method="post" onChange={handleChange} {...props}>
      <input type="hidden" name="_action" value="post-reply" />
      <input type="hidden" name="commentId" value={commentId} />
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
          name="reply"
          value={content}
          autoFocus
          multiline
          fullWidth
          rows={4}
        />
        <Button
          type="submit"
          loading={busy}
          sx={{ mt: 3 }}
          variant="outlined"
          color="inherit"
        >
          Kirim balasan
        </Button>
        <Button
          sx={{ ml: 1, mt: 3 }}
          variant="outlined"
          color="error"
          onClick={() => onClose()}
        >
          Batal
        </Button>
      </Box>
    </fetcher.Form>
  );
}

export default ReplyForm;
