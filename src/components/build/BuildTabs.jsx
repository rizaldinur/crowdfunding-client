import { RemoveRedEye, Save } from "@mui/icons-material";
import { Box, Button, Container, Stack, Tab, Tabs } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router";
import { useFormSubmitContext } from "../../hooks/useFormSubmitContext";

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    value: index,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function BuildTabs({}) {
  const { submitFnRef, loading } = useFormSubmitContext();
  const handleClick = () => {
    if (submitFnRef?.current) {
      submitFnRef.current();
    } else {
      console.warn("No submit function registered");
    }
  };

  const location = useLocation();
  const tabSegment = location.pathname.split("/")[3];
  const tabMap = {
    basic: 0,
    story: 1,
    profile: 2,
    payment: 3,
  };
  const tabValue = location.state?.tabValue ?? tabMap[tabSegment] ?? null;

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderTop: 1,
        borderColor: "divider",
        position: "sticky",
        top: "0",
        zIndex: 10,
        bgcolor: "inherit",
        color: "text.primary",
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between">
          <Tabs value={tabValue || 0} aria-label="nav tabs" role="navigation">
            <Tab
              label="Dasar"
              component={RouterLink}
              to="basic"
              state={{ tabValue: 0 }}
              {...a11yProps(0)}
            />
            <Tab
              label="Cerita"
              component={RouterLink}
              to="story"
              state={{ tabValue: 1 }}
              {...a11yProps(1)}
            />
            <Tab
              label="Profil"
              component={RouterLink}
              to="profile"
              state={{ tabValue: 2 }}
              {...a11yProps(2)}
            />
            <Tab
              label="Pembayaran"
              component={RouterLink}
              to="payment"
              state={{ tabValue: 3 }}
              {...a11yProps(3)}
            />
          </Tabs>
          <Stack direction="row" gap={1} alignItems="center">
            <Button
              startIcon={<RemoveRedEye />}
              color="inherit"
              variant="outlined"
            >
              Pratinjau
            </Button>
            <Button
              startIcon={<Save />}
              loading={loading}
              variant="contained"
              color="secondary"
              onClick={handleClick}
            >
              Simpan & Lanjut
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default BuildTabs;
