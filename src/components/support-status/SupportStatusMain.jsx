import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { numericFormatter } from "react-number-format";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router";
import { updateSupportStatus } from "../../api/support";

function SupportStatusMain({ data = {} }) {
  const [imgError, setImgError] = useState(false);
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();
  const [transactionStatus, setTransactionStatus] = useState(
    search.get("transaction_status") || search.get("status")
  );

  const handleClick = (e) => {
    if (data && data.transactionToken) {
      window.snap.pay(data.transactionToken, {
        // onSuccess: function (result) {
        //   window.location.href = `../support/status?order_id=${result.order_id}&status_code=${result.status_code}&transaction_status=${result.transaction_status}`;
        //   updateSupportStatus(data.supportId);
        // },
        // onPending: function (result) {
        //   window.location.href = `../support/status?order_id=${result.order_id}&status_code=${result.status_code}&transaction_status=${result.transaction_status}`;
        //   updateSupportStatus(data.supportId);
        // },
        // onError: function (result) {
        //   window.location.href = `../support/status?order_id=${result.order_id}&status_code=${result.status_code}&transaction_status=${result.transaction_status}`;
        //   updateSupportStatus(data.supportId);
        // },
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Stack gap={2} sx={{ color: "text.primary", py: 10 }}>
        <Stack>
          <Typography variant="h4" fontWeight={500}>
            Informasi dukungan
          </Typography>
          <Typography>Support ID {data.supportId || "#someId"}</Typography>
        </Stack>
        <Divider />
        <Stack gap={1} direction={{ xs: "column", sm: "row" }}>
          {!imgError ? (
            <Box
              component="img"
              sx={{
                width: { xs: 1, sm: 200 },
                aspectRatio: "16/9",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={
                data.imageUrl ||
                "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              }
              onError={() => setImgError(true)}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              animation={false}
              width={200}
              height={100}
            ></Skeleton>
          )}
          <Stack sx={{ minWidth: 0 }}>
            <Tooltip title={data.title || "Proyek tanpa nama"}>
              <Link
                variant="h5"
                fontWeight={500}
                noWrap
                color="inherit"
                href={`/project/details/${data.creatorSlug}/${data.projectSlug}`}
              >
                {data.title || "Proyek tanpa nama"}
              </Link>
            </Tooltip>
            <Link variant="body2" color="inherit" underline="hover">
              {data.creatorName || "Kreator proyek"}
            </Link>
          </Stack>
        </Stack>
        <Divider />
        <Stack>
          <Typography variant="subtitle2">Jumlah dukungan</Typography>
          <Typography variant="h4" fontWeight={700} color="primary">
            {numericFormatter(data.supportAmount.toString() || "1000", {
              thousandSeparator: ".",
              prefix: "Rp",
            })}
          </Typography>
        </Stack>
        <Divider />
        {["settlement", "capture"].includes(transactionStatus) && (
          <Alert severity="success" variant="outlined">
            Pembayaran berhasil
          </Alert>
        )}
        {transactionStatus === "pending" && (
          <Alert severity="warning" variant="outlined">
            Selesaikan pembayaran sebelum{" "}
            {data.expiryTime
              ? new Date(data.expiryTime).toLocaleString("id-ID", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  timeZoneName: "short",
                })
              : null}
          </Alert>
        )}
        {["cancel", "failure", "expire", "deny"].includes(
          transactionStatus
        ) && (
          <Alert severity="error" variant="outlined">
            Pembayaran tidak selesai.
          </Alert>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={1}
          sx={{ justifyContent: { xs: "stretch", sm: "center" } }}
        >
          <Button
            variant="outlined"
            color="inherit"
            component={RouterLink}
            to={`/profile/${data.supporterSlug}/backed`}
          >
            Kembali
          </Button>
          {transactionStatus === "pending" && (
            <Button variant="contained" onClick={handleClick}>
              selesaikan pembayaran
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default SupportStatusMain;
