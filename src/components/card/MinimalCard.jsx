import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import useThemeContext from "../../hooks/useThemeContext";

function MinimalCard({
  profileId,
  projectId,
  projectImage,
  projectName,
  creatorAvatar,
  creatorName,
  school,
  status,
  createdAt,
}) {
  const { currentTheme } = useThemeContext();
  console.log(currentTheme);

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        position: "relative",
        width: 1,
        bgcolor: currentTheme === "dark" ? "background.paper" : "initial",
        transition: "0.2s",
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
          width: { xs: 1, sm: 300 },
          aspectRatio: "16/9",
        }}
        image={
          projectImage ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        title="green iguana"
      />
      <CardContent
        sx={{ placeSelf: { xs: "start", sm: "center" }, minWidth: 0 }}
      >
        <Stack sx={{ minWidth: 0 }}>
          <Link
            variant="h4"
            underline="hover"
            color="textPrimary"
            noWrap
            component={RouterLink}
            to={`/${profileId}/${projectId}/build-overview`}
          >
            {projectName || "Proyek tanpa nama"}
          </Link>
          <Typography variant="caption">{`Dibuat pada ${createdAt}`}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 1 }}>
          <Avatar sx={{ width: 50, height: 50 }} src={creatorAvatar} />
          <Stack>
            <Link variant="subtitle2" underline="hover" color="textPrimary">
              {creatorName || "Kreator"}
            </Link>
            <Typography variant="caption" color="textSecondary">
              {school || "Asal sekolah"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Chip
        label={typeof status === "string" ? status.toUpperCase() : "Label"}
        sx={{
          ml: "auto",
          mt: 1,
          mr: 1,
        }}
        color={
          status === "onreview"
            ? "info"
            : status === "accept"
            ? "success"
            : status === "campaign"
            ? "primary"
            : "default"
        }
      />
    </Card>
  );
}

export default MinimalCard;
