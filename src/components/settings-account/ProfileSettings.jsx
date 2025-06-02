import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LocationAutocomplete from "../input/LocationAutocomplete";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "@mui/icons-material";
import {
  Form,
  Navigate,
  redirect,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSearchParams,
} from "react-router";
import { putUpdateProfile } from "../../api/account";
import { getError, setToken } from "../../utils/utils";

function ProfileSettings() {
  const data = useActionData();
  const { profileTabData, setAlertOpen, setAlertMsg, setAlertStatus } =
    useOutletContext();
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

  const [isDirty, setIsDirty] = useState(false);

  const [initialForm, setInitialForm] = useState({
    name: "",
    avatarUrl: "",
    biography: "",
    location: "",
    uniqueUrl: "",
  });
  const [form, setForm] = useState({
    name: "",
    avatarUrl: "",
    biography: "",
    location: "",
    uniqueUrl: "",
  });

  useEffect(() => {
    if (profileTabData) {
      const {
        name = "",
        biography = "",
        avatarUrl = "",
      } = profileTabData || {};
      setForm((form) => {
        return { ...form, name, avatarUrl, biography };
      });
      setInitialForm((initialForm) => {
        return { ...initialForm, name, avatarUrl, biography };
      });
    }
  }, [profileTabData]);

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
              label="Nama tampilan"
              name="name"
              error={Boolean(getError("name", formErrorData, "path"))}
              helperText={
                Boolean(getError("name", formErrorData, "path")) &&
                getError("name", formErrorData, "path").msg
              }
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              label="Link foto profil"
              name="avatarUrl"
              error={Boolean(getError("avatarUrl", formErrorData, "path"))}
              helperText={
                Boolean(getError("avatarUrl", formErrorData, "path")) &&
                getError("avatarUrl", formErrorData, "path").msg
              }
              value={form.avatarUrl}
              onChange={handleChange}
            />
            <TextField
              label="Biografi"
              multiline
              name="biography"
              error={Boolean(getError("biography", formErrorData, "path"))}
              value={form.biography}
              onChange={handleChange}
              rows={3}
              slotProps={{
                formHelperText: {
                  sx: { display: "flex" },
                  component: Box,
                },
              }}
              helperText={
                <>
                  {Boolean(getError("biography", formErrorData, "path")) && (
                    <Box component="span">
                      {getError("biography", formErrorData, "path").msg}
                    </Box>
                  )}
                  <Box component="span" sx={{ ml: "auto" }}>
                    {form.biography.length}/300
                  </Box>
                </>
              }
            />
            <LocationAutocomplete
              label="Lokasi"
              name="location"
              value={form.location}
              onChange={(e, value) => {
                setForm((form) => {
                  return { ...form, location: value || "" };
                });
              }}
            />
            <TextField
              label="URL unik"
              name="uniqueUrl"
              error={Boolean(getError("uniqueUrl", formErrorData, "path"))}
              value={form.uniqueUrl}
              onChange={handleChange}
              slotProps={{
                formHelperText: {
                  sx: { display: "flex" },
                  component: Box,
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Link />
                      <Typography
                        variant="input.value"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        htttps://ruangmodal.com/profile/
                      </Typography>
                    </InputAdornment>
                  ),
                },
              }}
              helperText={
                <>
                  {Boolean(getError("uniqueUrl", formErrorData, "path")) && (
                    <Box component="span">
                      {getError("uniqueUrl", formErrorData, "path").msg}
                    </Box>
                  )}
                  <Box component="span" sx={{ ml: "auto" }}>
                    {form.uniqueUrl.length}/20
                  </Box>
                </>
              }
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

export const profileSecttingsAction = async ({ request, params }) => {
  const { profileId } = params;
  const url = new URL(request.url);
  url.search = "";

  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  const data = await putUpdateProfile(profileId, postData);

  if (data.error) {
    return data;
  }

  if (data && data.data?.refreshToken) {
    setToken(data.data?.refreshToken);
  }

  return redirect(
    `/settings/${data.data?.userSlug}?success=true&message=${data.message}`
  );
};

export default ProfileSettings;
