import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFetcher } from "react-router";
import { useCacheStore } from "../../../data/store";
import { useContext, useEffect, useState } from "react";
import { ProjectDetailsLayoutContext } from "../../../routes/layouts/ProjectDetailsLayout";

function CommentForm() {
  const { setAlertOpen, setAlertMsg, setAlertStatus } = useContext(
    ProjectDetailsLayoutContext
  );
  const { getData } = useCacheStore.getState();
  const user = getData("user") || {};
  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!fetcher.data) {
      return;
    }

    if (fetcher.data.error) {
      setAlertOpen(true);
      setAlertMsg(fetcher.data?.message);
      setAlertStatus("error");
      return;
    }

    if (!fetcher.data.data) {
      return;
    }

    setAlertOpen(true);
    setAlertMsg(fetcher.data?.message);
    setAlertStatus("success");
  }, [fetcher.data]);

  const handleChange = (e) => {
    const { value } = e.target;
    setContent(value);
  };
  return (
    <fetcher.Form method="post" onChange={handleChange}>
      <Box
        sx={{
          color: "text.primary",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          p: 4,
          mt: 5,
        }}
      >
        <Stack gap={2} direction="row">
          <Avatar sx={{ width: 60, height: 60 }} src={user.avatarUrl} />
          <Stack justifyContent="center" alignItems="start">
            <Typography variant="body1">
              {user.name || "Username"}{" "}
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
          placeholder="Tulis komentarmu, minimal 2 karakter"
          multiline
          fullWidth
          rows={4}
          name="content"
          value={content}
        />
        <Button
          loading={busy}
          type="submit"
          sx={{ mt: 3 }}
          variant="outlined"
          color="inherit"
        >
          Kirim Komentar
        </Button>
      </Box>
    </fetcher.Form>
  );
}

export default CommentForm;
