import { ChevronRight, Info } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { Await, Link as RouterLink, useLoaderData } from "react-router";
import { ProjectDetailsLayoutContext } from "../../routes/layouts/ProjectDetailsLayout";
import UpdateContentCard from "./UpdatePanel/UpdateContentCard";
import UpdateFormPost from "./UpdatePanel/UpdateFormPost";
import { getProjectDetails, postUpdateProject } from "../../api/feed";
import BasicSectionLoading from "../fallback-component/BasicSectionLoading";

export const UpdatePanelContext = createContext();

function UpdatePanel() {
  const { role } = useContext(ProjectDetailsLayoutContext);
  const { updateData } = useLoaderData();
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("Sukses.");
  const [alertStatus, setAlertStatus] = useState("success");

  const toggleOpen = () => setOpen((prev) => !prev);
  const handleClose = () => {
    setAlertOpen(false);
  };

  return (
    <UpdatePanelContext.Provider
      value={{ setAlertMsg, setAlertOpen, setAlertStatus, setOpen }}
    >
      <Container maxWidth="md">
        <Snackbar
          open={alertOpen}
          onClose={handleClose}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            open={alertOpen}
            onClose={handleClose}
            variant="filled"
            severity={alertStatus}
          >
            {alertMsg}
          </Alert>
        </Snackbar>
        {role === "creator" && (
          <Button
            variant={open ? "outlined" : "contained"}
            color={open ? "error" : "primary"}
            sx={{ mt: 5, mb: 3, alignSelf: "start" }}
            onClick={toggleOpen}
          >
            {open ? "batalkan" : "Buat update"}
          </Button>
        )}
        {role === "creator" && open && <UpdateFormPost />}
        <Stack
          gap={3}
          sx={{ mt: role === "creator" ? 0 : 5, mb: 5, color: "text.primary" }}
        >
          <Suspense fallback={<BasicSectionLoading />}>
            <Await resolve={updateData}>
              {(updateData) => {
                useEffect(() => {
                  console.log(updateData);
                }, [updateData]);

                if (updateData) {
                  if (!updateData.error) {
                    if (updateData.data?.updates.length > 0) {
                      const {
                        updates = [],
                        creatorName,
                        avatar,
                      } = updateData.data;

                      return updates.map((update, index, arr) => {
                        return (
                          <UpdateContentCard
                            key={`update-${index}`}
                            data={update}
                            creator={{ creatorName, avatar }}
                            index={arr.length - index}
                          />
                        );
                      });
                    } else {
                      return (
                        <Typography color="textSecondary" textAlign="center">
                          Belum ada update.
                        </Typography>
                      );
                    }
                  } else {
                    return (
                      <Typography color="textSecondary" textAlign="center">
                        Terjadi kesalahan.
                      </Typography>
                    );
                  }
                }
              }}
            </Await>
          </Suspense>
        </Stack>
      </Container>
    </UpdatePanelContext.Provider>
  );
}

export const updatePanelLoader = async ({ request, params }) => {
  const { profileId, projectId } = params;
  const path = `/project/details/${profileId}/${projectId}/updates`;

  return { updateData: getProjectDetails(path) };
};

export const updatePanelAction = async ({ request, params }) => {
  const { profileId, projectId } = params;
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  const { _action } = postData;
  if (_action === "post-update") {
    const data = await postUpdateProject(postData, profileId, projectId);
    return data;
  }
};

export default UpdatePanel;
