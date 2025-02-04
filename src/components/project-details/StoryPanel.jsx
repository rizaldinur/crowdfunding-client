import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

function a11yProps(index) {
  return {
    id: `simple-subtab-${index}`,
    value: index,
    "aria-controls": `simple-subtabpanel-${index}`,
  };
}

function StoryPanel() {
  const [value, setValue] = useState(0);
  const headingRefs = useRef([]);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabClick = (e, heading) => {
    e.preventDefault();

    const newHeading = document.getElementById(heading);
    if (newHeading) {
      const offset = 72;
      const topPosition =
        newHeading.getBoundingClientRect().top + window.scrollY;
      console.log(newHeading.getBoundingClientRect().top);

      window.scrollTo({
        top: topPosition - offset,
        behavior: "smooth", // Smooth scrolling effect
      });
    }

    window.history.pushState(null, "", `#${heading}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const topMostHeading = headingRefs.current
        .map((ref, index) => {
          return {
            id: index,
            text: ref.id,
            offsetTop: ref.getBoundingClientRect().top,
          };
        })
        .filter(({ offsetTop }) => offsetTop >= 0) // Only headings in the viewport or above
        .sort((a, b) => a.offsetTop - b.offsetTop)[0]; // Sort by closest to the top

      console.log(topMostHeading);

      if (topMostHeading) {
        setValue(topMostHeading.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", gap: 3, py: 5 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          orientation="vertical"
          sx={{
            flexShrink: 0,
            position: "sticky",
            top: "96px",
            alignSelf: "flex-start",
            zIndex: 10,
          }}
        >
          <Tab
            label="Heading One"
            component="a"
            href="#heading-1"
            onClick={(e) => handleTabClick(e, "heading-1")}
            {...a11yProps(0)}
          />
          <Tab
            label="Heading Two"
            component="a"
            href="#heading-2"
            onClick={(e) => handleTabClick(e, "heading-2")}
            {...a11yProps(1)}
          />
          <Tab
            label="Heading Three"
            component="a"
            href="#heading-3"
            onClick={(e) => handleTabClick(e, "heading-3")}
            {...a11yProps(2)}
          />
          <Tab
            label="Heading Four"
            component="a"
            href="#heading-4"
            onClick={(e) => handleTabClick(e, "heading-4")}
            {...a11yProps(3)}
          />
        </Tabs>
        <Box sx={{ height: 4000 }}>
          <Typography
            color="textPrimary"
            variant="h4"
            id="heading-1"
            ref={(el) => (headingRefs.current[0] = el)}
          >
            Heading 1
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
            repudiandae voluptatum ipsam, dolor itaque quos perspiciatis
            reiciendis quod repellat odio, quaerat sit eius. Aspernatur sit
            fugit eligendi eveniet omnis cupiditate. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. In incidunt itaque cupiditate alias
            eum accusantium asperiores! Vitae ad deserunt dolor suscipit, atque
            repellendus perspiciatis tempora aspernatur voluptatibus ipsum
            pariatur soluta?
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            id="heading-2"
            sx={{ mt: 3 }}
            ref={(el) => (headingRefs.current[1] = el)}
          >
            Heading 2
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
            repudiandae voluptatum ipsam, dolor itaque quos perspiciatis
            reiciendis quod repellat odio, quaerat sit eius. Aspernatur sit
            fugit eligendi eveniet omnis cupiditate. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. In incidunt itaque cupiditate alias
            eum accusantium asperiores! Vitae ad deserunt dolor suscipit, atque
            repellendus perspiciatis tempora aspernatur voluptatibus ipsum
            pariatur soluta?
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            id="heading-3"
            sx={{ mt: 3 }}
            ref={(el) => (headingRefs.current[2] = el)}
          >
            Heading 3
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
            repudiandae voluptatum ipsam, dolor itaque quos perspiciatis
            reiciendis quod repellat odio, quaerat sit eius. Aspernatur sit
            fugit eligendi eveniet omnis cupiditate. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. In incidunt itaque cupiditate alias
            eum accusantium asperiores! Vitae ad deserunt dolor suscipit, atque
            repellendus perspiciatis tempora aspernatur voluptatibus ipsum
            pariatur soluta?
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            id="heading-4"
            sx={{ mt: 3 }}
            ref={(el) => (headingRefs.current[3] = el)}
          >
            Heading 4
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
            repudiandae voluptatum ipsam, dolor itaque quos perspiciatis
            reiciendis quod repellat odio, quaerat sit eius. Aspernatur sit
            fugit eligendi eveniet omnis cupiditate. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. In incidunt itaque cupiditate alias
            eum accusantium asperiores! Vitae ad deserunt dolor suscipit, atque
            repellendus perspiciatis tempora aspernatur voluptatibus ipsum
            pariatur soluta?
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default StoryPanel;
