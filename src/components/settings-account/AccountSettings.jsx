import { Box, Button, Container, Stack, TextField } from "@mui/material";
import CustomPasswordTextField from "../input/CustomPasswordTextField";
import { useEffect, useState } from "react";
import { Form, useOutletContext } from "react-router";

function AccountSettings() {
  const { accountTabData } = useOutletContext();
  const [isDirty, setIsDirty] = useState(false);
  const [initialForm, setInitialForm] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (accountTabData) {
      setForm((form) => {
        return { ...form, email: accountTabData.email || "" };
      });
      setInitialForm((form) => {
        return { ...form, email: accountTabData.email || "" };
      });
    }
  }, [accountTabData]);

  useEffect(() => {
    if (JSON.stringify(form) !== JSON.stringify(initialForm)) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [form, initialForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => {
      return { ...form, [name]: value };
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 3 }}>
        <Form noValidate>
          <Stack gap={3} sx={{ width: { xs: 1, md: 500 } }}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <CustomPasswordTextField
              label="Password baru"
              helperText="Password harus terdiri atas 8 huruf, huruf kapital, huruf kecil, dan angka."
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
            />
            <CustomPasswordTextField
              type="password"
              label="Konfirmasi password baru"
              helperText="Pastikan sama dengan password baru-mu."
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <CustomPasswordTextField
              label="Password sekarang"
              helperText="Masukkan passwordmu yang sekarang untuk menyimpan perubahan."
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              disabled={!isDirty}
              variant="contained"
              sx={{ alignSelf: "start" }}
            >
              Simpan perubahan
            </Button>
          </Stack>
        </Form>
      </Box>
    </Container>
  );
}

export default AccountSettings;
