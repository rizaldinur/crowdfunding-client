import {
  Box,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useMemo, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router";
import StoryPanel from "./StoryPanel";
import { ProjectDetailsLayoutContext } from "../../routes/layouts/ProjectDetailsLayout";
import { Menu } from "@mui/icons-material";

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
  const { setOpen } = useContext(ProjectDetailsLayoutContext);
  const location = useLocation();
  const tabSegment = location.pathname.split("/")[5];
  const tabMap = {
    story: 0,
    updates: 1,
    faqs: 2,
    comments: 3,
  };
  const tabValue = location.state?.tabValue ?? tabMap[tabSegment] ?? null;

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        position: "sticky",
        top: "0",
        zIndex: 100,
        bgcolor: "inherit",
      }}
    >
      <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{
            display: { xs: "flex", sm: "none" },
            color: "text.secondary",
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Menu />
        </IconButton>
        <Tabs
          value={tabValue || 0}
          aria-label="nav tabs"
          role="navigation"
          variant="scrollable"
        >
          <Tab
            label="Cerita"
            component={RouterLink}
            to="."
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
