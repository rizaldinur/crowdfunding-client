import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useLocation, Link as RouterLink } from "react-router";

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    value: index,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function SettingsTabs() {
  const location = useLocation();
  console.log(location);
  const tabSegment = location.pathname.split("/")[3];

  console.log(location.pathname.split("/"));

  const tabValue =
    location.state?.tabValue ||
    (tabSegment === "profile" ? 0 : tabSegment === "account" ? 1 : null);

  console.log(tabValue);

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        position: "sticky",
        top: "0",
        zIndex: 10,
        bgcolor: "inherit",
      }}
    >
      <Container maxWidth="md">
        <Tabs
          value={tabValue ? tabValue : 0}
          aria-label="nav tabs"
          role="navigation"
          sx={{ placeSelf: "center" }}
        >
          <Tab
            label="Edit Profil"
            component={RouterLink}
            to="profile"
            state={{ tabValue: 0 }}
            {...a11yProps(0)}
          />
          <Tab
            label="Pengaturan akun"
            component={RouterLink}
            to="account"
            state={{ tabValue: 1 }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Container>
    </Box>
  );
}

export default SettingsTabs;
