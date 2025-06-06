import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function CommentForm() {
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
  </Box>;
}

export default CommentForm;
