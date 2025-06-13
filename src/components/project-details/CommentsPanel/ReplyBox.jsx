import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";

function ReplyBox({ data = {} }) {
  return (
    <Box
      sx={{
        color: "text.primary",
        bgcolor: "background.default",
        border: "1px solid",
        borderColor: "divider",
        p: 4,
      }}
    >
      <Stack gap={2} direction="row">
        <Avatar sx={{ width: 60, height: 60 }} src={data.author?.avatar} />
        <Stack justifyContent="center">
          <Typography variant="body1">
            {data.author?.name || "Creator Name"}{" "}
            {data.author?.role === "creator" && (
              <Box
                component="span"
                sx={{
                  p: 0.5,
                  bgcolor: "secondary.main",
                  color: "secondary.contrastText",
                }}
              >
                Kreator
              </Box>
            )}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 2 }} />
      <Typography sx={{ mt: 5 }}>{data.content || "Reply here"}</Typography>
    </Box>
  );
}

export default ReplyBox;
