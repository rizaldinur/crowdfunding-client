import {
  Box,
  Button,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router";
import StoryPanelPreview from "./StoryPanelPreview";
import { Menu } from "@mui/icons-material";
import FaqsPanelPreview from "./FaqsPanelPreview";

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

function ProjectTabsPreview({ data }) {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
              value={value}
              onChange={handleChange}
              aria-label="nav tabs"
              role="navigation"
              variant="scrollable"
            >
              <Tab label="Cerita" {...a11yProps(0)} />
              <Tab label="Update" {...a11yProps(1)} />
              <Tab label="FAQS" {...a11yProps(2)} />
              <Tab label="Komentar" {...a11yProps(3)} />
            </Tabs>
          </Box>
        </Container>
      </Box>
      {value === 0 && (
        <StoryPanelPreview
          story={data.story}
          creator={data.creator}
          open={open}
          setOpen={setOpen}
        />
      )}
      {value === 2 && <FaqsPanelPreview faqs={data.faqs} />}
    </>
  );
}

export default ProjectTabsPreview;
