import { Info } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useFetcher } from "react-router";
import { setToken } from "../../../utils/utils";
import { UpdatePanelContext } from "../UpdatePanel";

function UpdateFormPost() {
  const { setAlertMsg, setAlertOpen, setAlertStatus, setOpen } =
    useContext(UpdatePanelContext);

  let fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setForm((form) => {
      return { ...form, [name]: value };
    });
  };

  useEffect(() => {
    const { data } = fetcher;
    if (data) {
      if (!data.error) {
        if (data.refreshToken) {
          setToken(data.refreshToken);
        }
        const { message = "Sukses." } = data;
        setOpen(false);
        setAlertMsg(message);
        setAlertOpen(true);
        setAlertStatus("success");
      } else {
        const { message = "Terjadi kesalahan." } = data;
        setAlertMsg(message);
        setAlertOpen(true);
        setAlertStatus("error");
      }
    }
  }, [fetcher]);
  return (
    <fetcher.Form noValidate method="post" onChange={handleChange}>
      <input type="hidden" name="_action" value="post-update" />
      <Stack
        component={Paper}
        elevation={1}
        gap={6}
        sx={{
          p: 4,
          mb: 3,
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        <Grid container spacing={3} sx={{ pb: 5 }}>
          <Grid size={12}>
            <Typography variant="h4" fontWeight={500} mb={1}>
              Update perkembangan proyek
            </Typography>
            <Typography>
              Buat update secara berkala dengan jujur, padat, jelas, agar
              kepercayaan pendukung tetap terjaga.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{ pb: 5, borderBottom: "1px solid", borderColor: "divider" }}
        >
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h5" fontWeight={500} mb={1}>
              Judul Update
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Stack
              gap={2}
              sx={{
                p: 3,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <TextField
                label="Judul"
                name="title"
                value={form.title}
                slotProps={{
                  formHelperText: {
                    sx: { display: "flex" },
                    component: Box,
                  },
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{ pb: 5, borderBottom: "1px solid", borderColor: "divider" }}
        >
          <Grid size={12}>
            <Stack gap={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight={500}>
                  Konten
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ placeSelf: "end" }}
                  startIcon={<Info />}
                  component={RouterLink}
                  to="https://www.markdownguide.org/cheat-sheet/"
                  target="_blank"
                >
                  pelajari tentang markdown
                </Button>
              </Stack>
              <TextField
                label="Konten"
                name="content"
                value={form.content}
                multiline
                autoFocus
                placeholder="Gunakan format markdown untuk membuat format tulisan yang menarik."
                minRows={20}
                style={{ backgroundColor: "background.default" }}
                slotProps={{
                  formHelperText: {
                    sx: { ml: "auto" },
                  },
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        <Button
          type="submit"
          loading={busy}
          loadingPosition="start"
          variant="contained"
          sx={{ alignSelf: "start" }}
        >
          {busy ? "menyimpan" : "Simpan"}
        </Button>
      </Stack>
    </fetcher.Form>
  );
}

export default UpdateFormPost;
