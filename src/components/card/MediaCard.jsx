import {
  Avatar,
  Box,
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
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router";

const MediaCard = forwardRef(function MediaCard({ data = {}, sx }, ref) {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <Card
      ref={ref}
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
        ...sx,
      }}
    >
      <CardMedia
        sx={{
          aspectRatio: "16/9",
          borderRadius: 1,
          filter:
            data.projectStatus &&
            data.projectStatus === "finished" &&
            "grayscale(100%)",
        }}
        image={
          data.imageUrl ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        title={data.title || "image here"}
      />
      <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
        {data.projectStatus && data.projectStatus === "finished" && (
          <Chip
            variant="filled"
            label="Sudah selesai"
            size="small"
            sx={{ alignSelf: "start" }}
          />
        )}
        <Tooltip title={data.title || "title here"} placement="right-end">
          <Stack sx={{ minWidth: 0, mb: 1 }}>
            <Typography
              variant="h5"
              component={Link}
              underline="hover"
              color="textPrimary"
              href={`/project/details/${data.creatorSlug}/${data.projectSlug}`}
              target="_blank"
              noWrap
            >
              {data.title || "Proyek tanpa nama"}
            </Typography>
          </Stack>
        </Tooltip>
        <CardHeader
          disableTypography
          sx={{ p: 0, mb: 3 }}
          avatar={
            <Avatar sx={{ width: 50, height: 50 }} src={data.avatar}>
              <Person2 />
            </Avatar>
          }
          title={
            <Typography
              variant="body2"
              color="textSecondary"
              component={Link}
              underline="hover"
              href={`/profile/${data.creatorSlug}`}
              sx={{
                whiteSpace: "normal",
                wordBreak: "break-word",
                display: "-webkit-box", // Enables the use of line-clamp
                WebkitBoxOrient: "vertical", // Required for multi-line truncation
                overflow: "hidden", // Prevents overflow
                WebkitLineClamp: 1, // Limits the text to 3 lines
              }}
            >
              {data.creator || "Kreator proyek"}
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
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    display: "-webkit-box", // Enables the use of line-clamp
                    WebkitBoxOrient: "vertical", // Required for multi-line truncation
                    overflow: "hidden", // Prevents overflow
                    WebkitLineClamp: 1, // Limits the text to 3 lines
                  }}
                >
                  Tersisa {data.timeLeft || "X"} {data.timeFormat || "hari"} •{" "}
                  {data.fundingProgress >= 0 ? data.fundingProgress : "100"}%
                  tercapai
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
              whiteSpace: "normal",
              wordBreak: "break-word",
              display: "-webkit-box", // Enables the use of line-clamp
              WebkitBoxOrient: "vertical", // Required for multi-line truncation
              overflow: "hidden", // Prevents overflow
              WebkitLineClamp: 3, // Limits the text to 3 lines
            }}
          >
            {data.subtitle ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nobis repudiandae sed perspiciatis, ducimus aliquam fugiat quo ipsum consectetur, possimus cum blanditiis, exercitationem corporis ut dignissimos deserunt alias similique sit?"}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 0, mt: "auto" }}>
          <Chip
            label={data.location || "Lokasi"}
            component={RouterLink}
            to={{
              pathname: "/discover",
              search: `?location=${data.location}`,
            }}
            size="medium"
            variant="outlined"
            clickable
            color="inherit"
          />
          <Chip
            label={data.category || "Kategori"}
            component={RouterLink}
            to={{
              pathname: "/discover",
              search: `?category=${data.category}`,
            }}
            size="medium"
            variant="outlined"
            clickable
            color="inherit"
          />
        </CardActions>
      </Box>
    </Card>
  );
});

export default MediaCard;
