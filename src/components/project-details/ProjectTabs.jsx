import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router";
import StoryPanel from "./StoryPanel";

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

function ProjectTabs() {
  const location = useLocation();
  console.log(location);
  const tabSegment = location.pathname.split("/")[4];

  console.log(tabSegment);

  const tabValue =
    location.state?.tabValue ||
    (tabSegment === "story"
      ? 0
      : tabSegment === "updates"
      ? 1
      : tabSegment === "faqs"
      ? 2
      : tabSegment === "comments"
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
      <Container maxWidth="xl">
        <Tabs value={tabValue || 0} aria-label="nav tabs" role="navigation">
          <Tab
            label="Cerita"
            component={RouterLink}
            to="story"
            state={{ tabValue: 0 }}
            {...a11yProps(0)}
          />
          <Tab
            label="Update"
            component={RouterLink}
            to="updates"
            state={{ tabValue: 1 }}
            {...a11yProps(1)}
          />
          <Tab
            label="FAQS"
            component={RouterLink}
            to="faqs"
            state={{ tabValue: 2 }}
            {...a11yProps(2)}
          />
          <Tab
            label="Komentar"
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

export default ProjectTabs;
