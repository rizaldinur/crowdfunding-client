import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";

function UpdateContentCard({ data = {}, creator = {}, index }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);
  return (
    <Stack
      color="text.primary"
      sx={{
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        p: 4,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        UPDATE #{index || "1"}
      </Typography>
      <Typography variant="h4" fontWeight={600} sx={{ mt: 2 }}>
        {data.title || "Title of update of project's progress"}
      </Typography>
      <Stack gap={2} direction="row" sx={{ mt: 2 }}>
        <Avatar sx={{ width: 60, height: 60 }} src={creator.avatar} />
        <Stack justifyContent="center">
          <Typography variant="body1">
            {creator.creatorName || "Creator Name"}{" "}
            <Box
              component="span"
              sx={{
                py: 0.2,
                px: 0.4,
                bgcolor: "secondary.main",
                color: "secondary.contrastText",
              }}
            >
              Kreator
            </Box>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {data.createdAt
              ? new Date(data.createdAt).toLocaleString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Date of creation"}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{
          mt: 5,
        }}
      >
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: expanded ? "unset" : 3,
            whiteSpace: "normal",
          }}
        >
          {data.content ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
        </Typography>
      </Box>
      <Button
        sx={{ alignSelf: "start", mt: 5 }}
        variant="outlined"
        color="inherit"
        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
        onClick={toggleExpanded}
      >
        {expanded ? "Sembunyikan" : "Tampilkan"}
      </Button>
    </Stack>
  );
}

export default UpdateContentCard;
