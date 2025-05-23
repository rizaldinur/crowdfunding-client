import {
  ArrowOutward,
  Dashboard,
  Delete,
  RemoveRedEye,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  Form,
  useLocation,
  useNavigation,
  Link as RouterLink,
  useParams,
} from "react-router";

function OverviewHead({ projectName, creatorName, status }) {
  const params = useParams();
  const location = useLocation();
  const navigation = useNavigation();
  let busy = navigation.state !== "idle";
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Form id="formDeleteProject" method="delete">
        <input type="hidden" name="_action" value="delete" />
      </Form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Konfirmasi hapus proyek"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah kamu yakin ingin menghapus proyek? Aksi ini tidak bisa
            dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            autoFocus
          >
            batalkan
          </Button>
          <Button
            type="submit"
            loading={busy}
            form="formDeleteProject"
            variant="outlined"
            color="error"
          >
            hapus
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          color: "text.primary",
          pt: 6,
        }}
      >
        <Typography variant="h3">
          {projectName || "Proyek tanpa nama"}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
          oleh {creatorName || "Kreator"}
        </Typography>
        <Stack direction="row" gap={2} sx={{ mt: 4 }}>
          {status !== "oncampaign" && status !== "finished" ? (
            <>
              <Button
                startIcon={<RemoveRedEye />}
                color="inherit"
                component={RouterLink}
                to={location.pathname + "/preview"}
              >
                pratinjau
              </Button>
              <Button startIcon={<Delete />} color="error" onClick={handleOpen}>
                hapus proyek
              </Button>
            </>
          ) : (
            <>
              <Button
                startIcon={<ArrowOutward />}
                color="inherit"
                component={RouterLink}
                to={`/project/details/${params.profileId}/${params.projectId}`}
                target="blank"
              >
                Ke halaman proyek
              </Button>
              <Button
                startIcon={<Dashboard />}
                color="primary"
                variant="contained"
                // onClick={handleOpen}
              >
                dashboard proyek
              </Button>
            </>
          )}
        </Stack>
        <Divider />
      </Box>
    </Container>
  );
}

export default OverviewHead;
