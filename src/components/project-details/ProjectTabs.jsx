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
  const lastSegment = location.pathname.split("/").filter(Boolean).pop();
  const tabValue = useMemo(() => {
    if (lastSegment === "story") return 0;
    else if (lastSegment === "updates") return 1;
    else if (lastSegment === "faqs") return 2;

    return 3;
  }, [lastSegment]);

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
        <Tabs value={tabValue} aria-label="nav tabs" role="navigation">
          <Tab
            label="Cerita"
            component={RouterLink}
            to="story"
            {...a11yProps(0)}
          />
          <Tab
            label="Update"
            component={RouterLink}
            to="updates"
            {...a11yProps(1)}
          />
          <Tab label="FAQS" {...a11yProps(2)} />
          <Tab label="Komentar" {...a11yProps(3)} />
        </Tabs>
      </Container>
    </Box>
  );
}

export default ProjectTabs;
