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
import PropTypes from "prop-types";

function MinimalCard({ variant = "basic", data = {} }) {
  const { currentTheme } = useThemeContext();

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
          data.projectImage ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        title={`Gambar proyek ${data.projectName || ""}`}
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
            to={
              variant === "created"
                ? `/${data.profileId}/${data.projectId}/build-overview`
                : `/project/details/${data.profileId}/${data.projectId}`
            }
          >
            {data.projectName || "Proyek tanpa nama"}
          </Link>
          <Typography variant="caption">
            {variant === "created"
              ? `Dibuat pada ${data.createdAt}`
              : variant === "backed"
              ? `Didukung pada ${data.createdAt}`
              : variant === "saved"
              ? `Disimpan pada ${data.createdAt}`
              : null}
          </Typography>
          {variant === "created" &&
            (data.status === "oncampaign" || data.status === "finished") && (
              <Typography variant="caption" color="textSecondary">
                {`Berlangsung pada ${new Date(data.launchDate).toLocaleString(
                  "id-ID",
                  { dateStyle: "full" }
                )} - ${new Date(data.endDate).toLocaleString("id-ID", {
                  dateStyle: "full",
                })}`}
              </Typography>
            )}
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 1 }}>
          <Avatar sx={{ width: 50, height: 50 }} src={data.creatorAvatar} />
          <Stack>
            <Link variant="subtitle2" underline="hover" color="textPrimary">
              {data.creatorName || "Kreator"}
            </Link>
            <Typography variant="caption" color="textSecondary">
              {data.school || "Asal sekolah"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      {variant === "created" ? (
        <Chip
          label={
            typeof data.status === "string"
              ? data.status.toUpperCase()
              : "Label"
          }
          sx={{
            ml: "auto",
            mt: 1,
            mr: 1,
          }}
          color={
            data.status === "onreview"
              ? "warning"
              : data.status === "accept"
              ? "info"
              : data.status === "oncampaign"
              ? "primary"
              : "default"
          }
        />
      ) : variant === "backed" ? (
        <Chip
          label={
            typeof data.transactionStatus === "string"
              ? data.transactionStatus.toUpperCase()
              : "Label"
          }
          sx={{
            ml: "auto",
            mt: 1,
            mr: 1,
          }}
          color={
            data.transactionStatus === "pending"
              ? "info"
              : data.transactionStatus === "settlement"
              ? "success"
              : "default"
          }
        />
      ) : null}
    </Card>
  );
}

MinimalCard.propTypes = {
  variant: PropTypes.oneOf(["created", "saved", "backed", "basic"]),
  data: PropTypes.object,
};

export default MinimalCard;
