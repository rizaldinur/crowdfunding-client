import {
  Avatar,
  Button,
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
import { numericFormatter } from "react-number-format";

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
                : `/project/details/${data.creatorSlug || data.profileId}/${
                    data.projectId
                  }`
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
          {variant === "backed" && data.supportAmount >= 0 && (
            <Typography variant="caption">
              Jumlah dukungan:{" "}
              <strong>
                {data.supportAmount >= 0
                  ? numericFormatter(data.supportAmount.toString(), {
                      thousandSeparator: ".",
                      prefix: "Rp",
                    })
                  : "Rp0"}
              </strong>
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
        <Button
          size="small"
          variant="outlined"
          component={RouterLink}
          to={`/support/status?order_id=${data.supportId}&status_code=${data.transactionStatusCode}&status=${data.transactionStatus}`}
          sx={{ mt: 2 }}
        >
          Informasi pembayaran
        </Button>
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
              : data.status === "accept" || data.status === "launching"
              ? "info"
              : data.status === "oncampaign"
              ? "primary"
              : "default"
          }
        />
      ) : variant === "backed" ? (
        <Chip
          label={
            data.transactionStatus === "pending"
              ? "Menunggu pembayaran"
              : ["settlement", "capture"].includes(data.transactionStatus)
              ? "Sudah dibayar"
              : ["cancel", "failure", "expire", "deny"].includes(
                  data.transactionStatus
                )
              ? "Gagal"
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
              : ["settlement", "capture"].includes(data.transactionStatus)
              ? "success"
              : ["cancel", "failure", "expire", "deny"].includes(
                  data.transactionStatus
                )
              ? "error"
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
