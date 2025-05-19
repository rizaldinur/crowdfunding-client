import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Drawer,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import MuiMarkdown, { defaultOverrides } from "mui-markdown";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

function a11yProps(index) {
  return {
    id: `simple-subtab-${index}`,
    value: index,
    "aria-controls": `simple-subtabpanel-${index}`,
  };
}

function StoryPanelPreview({ story, creator, open, setOpen }) {
  const [value, setValue] = useState(0);
  const [headings, setHeadings] = useState([]);
  const headingRefs = useRef([]);
  const storyContainerRef = useRef();
  const location = useLocation();

  useEffect(() => {
    if (storyContainerRef) {
      const mainHeadingsEl =
        storyContainerRef.current.getElementsByTagName("h4");

      if (mainHeadingsEl.length > 0) {
        Array.from(mainHeadingsEl).forEach((heading, index) => {
          if (index > 0) {
            heading.style.marginTop = "24px";
          }
        });
        const headingArray = Array.from(mainHeadingsEl || []);
        setHeadings(headingArray);
        headingRefs.current = headingArray;
      }
    }
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

      if (topMostHeading) {
        setValue(topMostHeading.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    const subTabValue = parseInt(location.hash.split("-").pop()[0] - 1) || 0;
    setValue(subTabValue);

    const offset = 72;
    const headingEl = document.querySelector(hash);
    const topPosition = headingEl.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: topPosition - offset,
      behavior: "smooth", // Smooth scrolling effect
    });

    return () => {
      window.scrollTo({
        top: topPosition - offset,
        behavior: "smooth", // Smooth scrolling effect
      });
    };
  }, [location.hash]);

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

      window.scrollTo({
        top: topPosition - offset,
        behavior: "smooth", // Smooth scrolling effect
      });
    }

    window.history.pushState(null, "", `#${heading}`);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", gap: 3, py: 5 }}>
        {story && (
          <Drawer
            open={open}
            onClick={() => {
              setOpen(false);
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              orientation="vertical"
              sx={{
                width: 200,
              }}
            >
              {headings.map((heading, index) => {
                return (
                  <Tab
                    key={"sidetab-" + heading.id}
                    label={heading.innerText}
                    component="a"
                    href={"#" + heading.id}
                    onClick={(e) => handleTabClick(e, heading.id)}
                    {...a11yProps(index)}
                  />
                );
              })}
            </Tabs>
          </Drawer>
        )}
        {story && (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            orientation="vertical"
            sx={{
              display: { xs: "none", sm: "initial" },
              flexShrink: 0,
              width: 200,
              position: "sticky",
              top: "80px",
              alignSelf: "flex-start",
              zIndex: 10,
            }}
          >
            {headings.map((heading, index) => {
              return (
                <Tab
                  key={"sidetab-" + heading.id}
                  label={heading.innerText}
                  component="a"
                  href={"#" + heading.id}
                  onClick={(e) => handleTabClick(e, heading.id)}
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
        )}
        <Box
          component="article"
          id="story-detail-container"
          sx={{ color: "text.primary", flexGrow: 1 }}
          ref={storyContainerRef}
        >
          {story ? (
            <>
              <MuiMarkdown
                hideLineNumbers
                options={{
                  wrapper: Fragment,
                  overrides: {
                    ...defaultOverrides, // This will keep the other default overrides.
                    h1: {
                      component: Typography,
                      props: {
                        variant: "h4",
                        color: "textPrimary",
                      },
                    },
                    h2: {
                      component: Typography,
                      props: {
                        variant: "h5",
                        color: "textPrimary",
                      },
                    },
                    h3: {
                      component: Typography,
                      props: {
                        variant: "h6",
                        color: "textPrimary",
                      },
                    },
                    img: {
                      props: {
                        style: {
                          width: "100%",
                        },
                      },
                    },
                  },
                }}
              >
                {story}
              </MuiMarkdown>
              <Stack
                sx={{
                  display: { xs: "flex", md: "none" },
                  mt: 3,
                  gap: 3,
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      p: 2,
                      bgcolor: yellow["100"],
                      color: "InfoText",
                    }}
                  >
                    Penting!
                  </Typography>
                  <Box component="ul" sx={{ color: "text.primary" }}>
                    <li>
                      <ListItemText
                        primary="Ruang Modal menghubungkan kreator dengan investor"
                        slotProps={{ primary: { variant: "body2" } }}
                      />
                    </li>
                    <li>
                      <ListItemText
                        primary=" Benefit tidak terjamin, tapi kreator tetap harus update
                perkembangan proyeknya"
                        slotProps={{ primary: { variant: "body2" } }}
                      />
                    </li>
                    <li>
                      <ListItemText
                        primary="Dana diteruskan ke kreator hanya jika target pendanaan terpenuhi"
                        slotProps={{ primary: { variant: "body2" } }}
                      />
                    </li>
                    <li>
                      <ListItemText
                        primary="Jika target tidak tercapai, dana akan dikembalikan sepenuhnya"
                        slotProps={{ primary: { variant: "body2" } }}
                      />
                    </li>
                  </Box>
                </Box>
                <Card>
                  <CardHeader
                    title={<Typography variant="h5">Dukung Proyek</Typography>}
                  />
                  <CardContent>
                    <TextField
                      type="number"
                      fullWidth
                      label="Jumlah dukungan"
                    />
                    <Button sx={{ mt: 4 }} variant="contained" fullWidth>
                      Lanjutkan
                    </Button>
                  </CardContent>
                </Card>
                <Card sx={{ height: 270 }}>
                  <CardHeader
                    avatar={<Avatar src={creator.avatarUrl || null} />}
                    title={creator.name || "Creator Name"}
                    subheader={creator.school || "Asal sekolah"}
                  />
                  <CardContent>
                    <Typography variant="body2">
                      {creator.biography ||
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae corporis dolor, illum quisquam aspernatur, architecto suscipit nulla commodi animi mollitia, provident reiciendis quia enim molestias. Fuga neque veniam nulla ab."}
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </>
          ) : (
            <Typography color="textSecondary" sx={{ placeSelf: "center" }}>
              Belum ada cerita
            </Typography>
          )}
        </Box>
        {story && (
          <Stack
            sx={{
              display: { xs: "none", md: "flex" },
              width: 250,
              flexShrink: 0,
              position: "sticky",
              top: "80px",
              alignSelf: "start",
              gap: 3,
            }}
          >
            <Card sx={{ height: 270 }}>
              <CardHeader
                avatar={<Avatar src={creator.avatarUrl || null} />}
                title={creator.name || "Creator Name"}
                subheader={creator.school || "Asal sekolah"}
              />
              <CardContent>
                <Typography variant="body2">
                  {creator.biography ||
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae corporis dolor, illum quisquam aspernatur, architecto suscipit nulla commodi animi mollitia, provident reiciendis quia enim molestias. Fuga neque veniam nulla ab."}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title={<Typography variant="h5">Dukung Proyek</Typography>}
              />
              <CardContent>
                <TextField type="number" fullWidth label="Jumlah dukungan" />
                <Button sx={{ mt: 4 }} variant="contained" fullWidth>
                  Lanjutkan
                </Button>
              </CardContent>
            </Card>
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ p: 2, bgcolor: yellow["100"] }}
              >
                Penting!
              </Typography>
              <Box component="ul" sx={{ color: "text.primary" }}>
                <li>
                  <ListItemText
                    primary="Ruang Modal menghubungkan kreator dengan investor"
                    slotProps={{ primary: { variant: "body2" } }}
                  />
                </li>
                <li>
                  <ListItemText
                    primary=" Benefit tidak terjamin, tapi kreator tetap harus update
                perkembangan proyeknya"
                    slotProps={{ primary: { variant: "body2" } }}
                  />
                </li>
                <li>
                  <ListItemText
                    primary="Dana diteruskan ke kreator hanya jika target pendanaan terpenuhi"
                    slotProps={{ primary: { variant: "body2" } }}
                  />
                </li>
                <li>
                  <ListItemText
                    primary="Jika target tidak tercapai, dana akan dikembalikan sepenuhnya"
                    slotProps={{ primary: { variant: "body2" } }}
                  />
                </li>
              </Box>
            </Box>
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default StoryPanelPreview;
