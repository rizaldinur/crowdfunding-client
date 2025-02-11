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

function ProfileTabs() {
  const location = useLocation();
  console.log(location);
  const tabSegment = location.pathname.split("/")[3];

  console.log(location.pathname.split("/"));

  const tabValue =
    location.state?.tabValue ||
    (tabSegment === "about"
      ? 0
      : tabSegment === "backed"
      ? 1
      : tabSegment === "saved"
      ? 2
      : tabSegment === "projects"
      ? 3
      : null);

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
          value={tabValue}
          aria-label="nav tabs"
          role="navigation"
          sx={{ placeSelf: "center" }}
        >
          <Tab
            label="Tentang"
            component={RouterLink}
            to="about"
            state={{ tabValue: 0 }}
            {...a11yProps(0)}
          />
          <Tab
            label="Didukung"
            component={RouterLink}
            to="updates"
            state={{ tabValue: 1 }}
            {...a11yProps(1)}
          />
          <Tab
            label="Disimpan"
            component={RouterLink}
            to="faqs"
            state={{ tabValue: 2 }}
            {...a11yProps(2)}
          />
          <Tab
            label="Proyek buatanmu"
            component={RouterLink}
            to="comments"
            state={{ tabValue: 3 }}
            {...a11yProps(3)}
          />
        </Tabs>
      </Container>
    </Box>
  );
}

export default ProfileTabs;
