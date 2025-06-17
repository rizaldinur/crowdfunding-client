import { IconButton, Typography } from "@mui/material";
import { Box, Container, Grid, width } from "@mui/system";
import MediaCard from "../card/MediaCard";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

function RecommendedSection({ data = [] }) {
  const boxContainerRef = useRef(null);
  const boxRef = useRef(null);
  const [boxScrollWidth, setBoxScrollWidth] = useState(0); // State to store the scrollWidth
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (boxContainerRef.current) {
        setCanScrollLeft(boxContainerRef.current.scrollLeft > 0); // Update state based on current scrollLeft
        setCanScrollRight(
          boxContainerRef.current.scrollLeft <
            boxContainerRef.current.scrollWidth -
              boxContainerRef.current.clientWidth
        );
      }
    };

    // Initial check
    checkScrollPosition();

    // Optional: Update width on window resize
    const handleResize = () => {
      if (boxRef.current) {
        setBoxScrollWidth(boxRef.current.scrollWidth);
      }
    };

    //initial setWidth
    handleResize();

    window.addEventListener("resize", handleResize);

    const container = boxContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
    };
  });

  return (
    <Box
      id="recommended"
      component="section"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ paddingTop: 5, paddingBottom: 5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ position: "relative", mb: 3 }}
              variant="h6"
              color="textSecondary"
            >
              REKOMENDASI
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                color: "text.primary",
              }}
            >
              <IconButton
                size="small"
                sx={{ border: "1px solid" }}
                disabled={!canScrollLeft}
                onClick={() => {
                  boxContainerRef.current.scrollLeft -= boxScrollWidth;
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                size="small"
                sx={{ border: "1px solid" }}
                disabled={!canScrollRight}
                onClick={() => {
                  boxContainerRef.current.scrollLeft += boxScrollWidth;
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>
          {data.length > 0 ? (
            <Box
              ref={boxContainerRef}
              sx={{
                display: "flex",
                gap: 3,
                overflowX: "auto",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                whiteSpace: "nowrap",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                ":hover": {
                  p: 2,
                  m: -2,
                },
              }}
            >
              {data.map((project, i) => {
                return (
                  <MediaCard
                    ref={i === 0 ? boxRef : null}
                    key={`featured-${i}`}
                    data={project}
                    sx={{
                      flexShrink: 0,
                      scrollMarginLeft: 2,
                      scrollSnapAlign: "start",
                    }}
                  />
                );
              })}
            </Box>
          ) : (
            <Typography color="textSecondary" sx={{ mx: "auto" }}>
              Tidak ada data.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default RecommendedSection;
