import { Box, Button, Container, Stack, TextField } from "@mui/material";
import CustomPasswordTextField from "../input/CustomPasswordTextField";
import { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSearchParams,
} from "react-router";
import { getError, setToken } from "../../utils/utils";
import { putUpdateAccount } from "../../api/account";

function AccountSettings() {
  const { accountTabData, setAlertMsg, setAlertOpen, setAlertStatus } =
    useOutletContext();
  const data = useActionData();
  const [isDirty, setIsDirty] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  let busy = navigation.state !== "idle";
  const [search, setSearch] = useSearchParams();
  const [formErrorData, setFormErrorData] = useState([]);

  useEffect(() => {
    if (data) {
      if (data.error) {
        if (data.authorized === false) {
          navigate("/login", { state: { from: location } });
        }
        if (data.data?.errors?.length > 0) {
          setFormErrorData(data.data?.errors);
        }
        setSearch({});
        setAlertOpen(true);
        setAlertStatus("error");
        setAlertMsg(data.message);
      }
    }
  }, [data]);

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
    setFormErrorData((formErrors) => {
      return formErrors.filter((error) => {
        return error.path !== name;
      });
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 3 }}>
        <Form noValidate method="put">
          <Stack gap={3} sx={{ width: { xs: 1, md: 500 } }}>
            <TextField
              label="Email"
              name="email"
              error={Boolean(getError("email", formErrorData, "path"))}
              helperText={
                Boolean(getError("email", formErrorData, "path")) &&
                getError("email", formErrorData, "path").msg
              }
              value={form.email}
              onChange={handleChange}
            />
            <CustomPasswordTextField
              label="Password baru"
              error={Boolean(getError("newPassword", formErrorData, "path"))}
              helperText="Password harus terdiri atas 8 huruf, huruf kapital, huruf kecil, simbol, angka, dan tidak sama dengan password lama."
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
            />
            <CustomPasswordTextField
              type="password"
              label="Konfirmasi password baru"
              error={Boolean(
                getError("confirmPassword", formErrorData, "path")
              )}
              helperText={"Pastikan sama dengan password baru-mu."}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <CustomPasswordTextField
              label="Password sekarang"
              error={Boolean(getError("password", formErrorData, "path"))}
              helperText="Masukkan passwordmu yang sekarang untuk menyimpan perubahan."
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              loading={busy}
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

export const accountSettingsAction = async ({ request, params }) => {
  const { profileId } = params;
  const url = new URL(request.url);
  url.search = "";

  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  const data = await putUpdateAccount(profileId, postData);

  if (data.error) {
    return data;
  }

  if (data && data.data?.refreshToken) {
    setToken(data.data?.refreshToken);
  }

  return redirect(
    `/settings/${data.data?.userSlug}/account?success=true&message=${data.message}`
  );
};
export default AccountSettings;
