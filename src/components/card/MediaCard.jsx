import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
  Link,
  Tooltip,
  Stack,
} from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../routes/layouts/RootLayout";
import { AccessTimeFilled, Person2 } from "@mui/icons-material";
const CustomSubheader = (props) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      color: "text.primary",
    }}
  >
    <Stack>
      <AccessTimeFilled />
    </Stack>
    <Stack sx={{ minWidth: 0 }}>
      <Typography
        variant="body1"
        noWrap
        // sx={{
        //   display: "-webkit-box", // Enables the use of line-clamp
        //   WebkitBoxOrient: "vertical", // Required for multi-line truncation
        //   overflow: "hidden", // Prevents overflow
        //   WebkitLineClamp: 1, // Limits the text to 3 lines
        // }}
      >
        {props.children}
      </Typography>
    </Stack>
  </Box>
);
function MediaCard() {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 350,
        position: "relative",
        transition: "0.2s",
        bgcolor: currentTheme === "dark" ? "background.paper" : "initial",
        boxShadow: "none",
        ":hover": {
          border: "1px solid",
          borderColor: "divider",
          padding: 2,
          margin: -2,
        },
      }}
    >
      <CardMedia
        sx={{
          aspectRatio: "16/9",
          borderRadius: 1,
        }}
        image="https://images2.alphacoders.com/247/247360.jpg"
        title="green iguana"
      />
      <Box sx={{ p: 2 }}>
        <Tooltip title="title here" placement="right-end">
          <Stack sx={{ minWidth: 0, mb: 1 }}>
            <Typography
              variant="h5"
              component={Link}
              underline="hover"
              color="textPrimary"
              href="#"
              noWrap
              // sx={{
              //   mb: 1,
              //   display: "-webkit-box", // Enables the use of line-clamp
              //   WebkitBoxOrient: "vertical", // Required for multi-line truncation
              //   overflow: "hidden", // Prevents overflow
              //   WebkitLineClamp: 1, // Limits the text to 3 lines
              // }}
            >
              Lizard Antarctica Antarctica Antarctica Antarctica
            </Typography>
          </Stack>
        </Tooltip>
        <CardHeader
          disableTypography
          sx={{ p: 0, mb: 3, maxWidth: 1 }}
          avatar={
            <Avatar sx={{ width: 50, height: 50 }}>
              <Person2 />
            </Avatar>
          }
          title={
            <Typography
              variant="body2"
              color="textSecondary"
              component={Link}
              underline="hover"
              href="login"
              sx={{
                display: "-webkit-box", // Enables the use of line-clamp
                WebkitBoxOrient: "vertical", // Required for multi-line truncation
                overflow: "hidden", // Prevents overflow
                WebkitLineClamp: 1, // Limits the text to 3 lines
              }}
            >
              Team Xperience Kadal Gaming
            </Typography>
          }
          subheader={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.primary",
              }}
            >
              <AccessTimeFilled />
              <Stack>
                <Typography
                  variant="body2"
                  sx={{
                    display: "-webkit-box", // Enables the use of line-clamp
                    WebkitBoxOrient: "vertical", // Required for multi-line truncation
                    overflow: "hidden", // Prevents overflow
                    WebkitLineClamp: 1, // Limits the text to 3 lines
                  }}
                >
                  Tersisa 60 hari • 100% tercapai
                </Typography>
              </Stack>
            </Box>
          }
        />
        <CardContent sx={{ p: 0, mb: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.primary",
              display: "-webkit-box", // Enables the use of line-clamp
              WebkitBoxOrient: "vertical", // Required for multi-line truncation
              overflow: "hidden", // Prevents overflow
              WebkitLineClamp: 3, // Limits the text to 3 lines
            }}
          >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica Antarctica
            Antarctica AntarcticaAntarctica Antarctica
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 0 }}>
          <Chip
            label="Share"
            component="a"
            href="#"
            size="medium"
            variant="outlined"
            clickable
            color="inherit"
          />
          <Chip
            label="Share"
            component="a"
            href="#"
            size="medium"
            variant="outlined"
            clickable
            color="inherit"
          />
        </CardActions>
      </Box>
    </Card>
  );
}

export default MediaCard;
