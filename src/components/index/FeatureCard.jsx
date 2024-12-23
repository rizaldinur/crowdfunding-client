import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Link,
  Typography,
} from "@mui/material";

function FeatureCard() {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: 1,
        position: "relative",
        zIndex: "9999",
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
          width: { xs: 1, sm: 0.5 },
          aspectRatio: "16/9",
        }}
        image="https://images2.alphacoders.com/247/247360.jpg"
        title="green iguana"
      />

      <Box
        sx={{
          padding: 2,
          display: "flex",
          gap: 2,
          width: { xs: "auto", sm: 0.5 },
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ padding: 0, width: 1 }}>
          <Link
            underline="hover"
            color="textPrimary"
            sx={{ cursor: "pointer" }}
          >
            <Typography noWrap gutterBottom variant="h4" component="div">
              LizardLizardLizardLizardLizardLizardLizardLizardLizardLizardLizard
            </Typography>
          </Link>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              display: "-webkit-box", // Enables the use of line-clamp
              WebkitBoxOrient: "vertical", // Required for multi-line truncation
              overflow: "hidden", // Prevents overflow
              WebkitLineClamp: 3, // Limits the text to 3 lines
              lineHeight: 1.5, // Adjust this to match your design
            }}
          >
            Lizards are a widespread group of squamate reptiles, with over
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Chip
            label="Share"
            component="a"
            href="#"
            size="medium"
            variant="outlined"
            clickable
            color="secondary"
          />
          <Chip
            label="Share"
            component="a"
            href="#"
            size="medium"
            variant="outlined"
            clickable
            color="secondary"
          />
        </CardActions>
      </Box>
    </Card>
  );
}
export default FeatureCard;
