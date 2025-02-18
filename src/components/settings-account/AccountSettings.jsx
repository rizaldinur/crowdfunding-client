import { Box, Button, Container, Stack, TextField } from "@mui/material";
import CustomPasswordTextField from "../input/CustomPasswordTextField";
import { useState } from "react";

function AccountSettings() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 3 }}>
        <Stack gap={3} sx={{ width: { xs: 1, md: 500 } }}>
          <TextField label="Email" defaultValue={"johndoe@gmail.com"} />
          <CustomPasswordTextField
            label="Password baru"
            helperText="Password harus terdiri atas 8 huruf, huruf kapital, huruf kecil, dan angka."
            value={newPassword}
            onChange={(e) => {
              const { value } = e.target;
              setNewPassword(value);
            }}
          />
          <CustomPasswordTextField
            type="password"
            label="Konfirmasi password baru"
            helperText="Pastikan sama dengan password baru-mu."
            value={confirmPassword}
            onChange={(e) => {
              const { value } = e.target;
              setConfirmPassword(value);
            }}
          />
          <CustomPasswordTextField
            label="Password sekarang"
            helperText="Masukkan passwordmu yang sekarang untuk menyimpan perubahan."
            value={password}
            onChange={(e) => {
              const { value } = e.target;
              setPassword(value);
            }}
          />
          <Button variant="contained" sx={{ alignSelf: "start" }}>
            Simpan perubahan
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default AccountSettings;
