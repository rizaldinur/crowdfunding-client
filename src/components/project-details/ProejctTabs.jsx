import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation } from "react-router";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Container maxWidth="xl">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <CustomTabPanel value={value} index={0}>
          <Typography color="textPrimary">Item One</Typography>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}></CustomTabPanel>
        <CustomTabPanel value={value} index={2}></CustomTabPanel>
      </Container>
    </Box>
  );
}

export default ProjectTabs;
