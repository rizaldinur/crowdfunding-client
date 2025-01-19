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
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { ThemeContext } from "../../routes/layouts/RootLayout";
import { useContext } from "react";
import { AccessTime, AccessTimeFilled, Person2 } from "@mui/icons-material";
import { Link as RouterLink } from "react-router";

function FeatureCard() {
  const { currentTheme } = useContext(ThemeContext);
  console.log(typeof currentTheme);

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: 1,
        gap: 1,
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
          borderRadius: 1,
          width: { xs: 1, sm: 0.6 },
          height: { xs: 300, sm: "auto" },
          aspectRatio: "16/9",
        }}
        image="https://images2.alphacoders.com/247/247360.jpg"
        title="green iguana"
      />

      <Box
        sx={{
          padding: 2,
          display: "flex",
          width: { xs: "auto", sm: 0.5 },
          flexDirection: "column",
        }}
      >
        <Tooltip title="title here">
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              display: "-webkit-box", // Enables the use of line-clamp
              WebkitBoxOrient: "vertical", // Required for multi-line truncation
              overflow: "hidden", // Prevents overflow
              WebkitLineClamp: 2, // Limits the text to 3 lines
              mb: 1,
              cursor: "pointer",
            }}
            component={Link}
            underline="hover"
            href="#"
          >
            Kadal Gaming: Your Ultimate Gaming AI Companion Hardware
          </Typography>
        </Tooltip>
        <CardHeader
          sx={{ p: 0, mb: 4 }}
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
              <Typography
                variant="body1"
                sx={{
                  display: "-webkit-box", // Enables the use of line-clamp
                  WebkitBoxOrient: "vertical", // Required for multi-line truncation
                  overflow: "hidden", // Prevents overflow
                  WebkitLineClamp: 1, // Limits the text to 3 lines
                }}
              >
                Tersisa H hari • X% tercapai
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ padding: 0, width: 1, mb: 10 }}>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              display: "-webkit-box", // Enables the use of line-clamp
              WebkitBoxOrient: "vertical", // Required for multi-line truncation
              overflow: "hidden", // Prevents overflow
              WebkitLineClamp: 3, // Limits the text to 3 lines
              // lineHeight: "normal", // Adjust this to match your design
            }}
          >
            Lizards are a widespread group of squamate reptiles, with over
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
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
export default FeatureCard;
