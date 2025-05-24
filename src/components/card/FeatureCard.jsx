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

function FeatureCard({ data }) {
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
          flexShrink: 0,
          width: { xs: 1, sm: 0.5 },
          height: { xs: 300, sm: "auto" },
          aspectRatio: "16/9",
        }}
        image={
          data.imageUrl ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        title={data.title || "placeholder"}
      />

      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tooltip title={data.title || "title here"}>
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
            href={`/project/details/${data.creatorSlug}/${data.projectSlug}`}
            target="_blank"
          >
            {data.title || "Proyek tanpa nama"}
          </Typography>
        </Tooltip>
        <CardHeader
          sx={{ p: 0, mb: 4 }}
          avatar={
            <Avatar sx={{ width: 50, height: 50 }} src={data.avatarUrl}>
              <Person2 />
            </Avatar>
          }
          title={
            <Typography
              variant="body2"
              color="textSecondary"
              component={Link}
              underline="hover"
              href="#"
              sx={{
                display: "-webkit-box", // Enables the use of line-clamp
                WebkitBoxOrient: "vertical", // Required for multi-line truncation
                overflow: "hidden", // Prevents overflow
                WebkitLineClamp: 1, // Limits the text to 3 lines
              }}
            >
              {data.creator || "Kreator Proyek"}
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
                Tersisa {data.timeLeft || "X"} {data.timeFormat || "hari"} •{" "}
                {data.fundingProgress}% tercapai
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
            {data.subtitle
              ? data.subtitle
              : "Subtitle proyek yang mendeskripsikan proyek secara singkat, padat, dan jelas"}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Chip
            label={data.location || "Lokasi"}
            component="a"
            href="#"
            size="medium"
            variant="outlined"
            clickable
            color="inherit"
          />
          <Chip
            label={data.category || "Kategori"}
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
