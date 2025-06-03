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

function MediaCard({ data = {}, sx }) {
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
      <Box sx={{ p: 2 }}>
        {data.projectStatus && data.projectStatus === "finished" && (
          <Chip variant="filled" label="Sudah selesai" size="small" />
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
          sx={{ p: 0, mb: 3, maxWidth: 1 }}
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
        <CardActions sx={{ p: 0 }}>
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

export default MediaCard;
