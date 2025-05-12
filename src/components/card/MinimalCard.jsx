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
import useThemeContext from "../../hooks/useThemeContext";

function MinimalCard({
  projectImage,
  projectName,
  creatorAvatar,
  creatorName,
  creatorSchool,
  status,
}) {
  const { currentTheme } = useThemeContext();
  console.log(currentTheme);

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
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
          width: 300,
          aspectRatio: "16/9",
        }}
        image="https://images2.alphacoders.com/247/247360.jpg"
        title="green iguana"
      />
      <CardContent sx={{ placeSelf: "center", minWidth: 0 }}>
        <Stack sx={{ minWidth: 0 }}>
          <Link variant="h4" underline="hover" color="textPrimary" noWrap>
            Project name
          </Link>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 1 }}>
          <Avatar sx={{ width: 50, height: 50 }} />
          <Stack>
            <Link variant="subtitle2" underline="hover" color="textPrimary">
              Project creator
            </Link>
            <Typography variant="caption" color="textSecondary">
              School name
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Chip
        label="Draft"
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
