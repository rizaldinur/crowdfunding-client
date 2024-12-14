import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function Test() {
  const [isHover, setIsHover] = useState(false);
  const boxRef = useRef(null);
  const boxContainerRef = useRef(null);
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
              boxContainerRef.current.scrollLeft
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
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ mx: "auto", width: "fit-content" }}>
        Test page
      </Typography>
      <Box>
        <Button
          variant="text"
          color="inherit"
          disabled={!canScrollLeft}
          onClick={() => {
            boxContainerRef.current.scrollLeft -= boxScrollWidth;
          }}
        >
          Left
        </Button>
        <Button
          variant="text"
          color="inherit"
          disabled={!canScrollRight}
          onClick={() => (boxContainerRef.current.scrollLeft += boxScrollWidth)}
        >
          Right
        </Button>
      </Box>
      <Box
        ref={boxContainerRef}
        sx={{
          overflowX: "scroll",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          whiteSpace: "nowrap",
          // padding: 2,
          bgcolor: "grey.500",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((val) => {
          return (
            <Box
              ref={val === 1 ? boxRef : null}
              key={val}
              id={"Box" + val}
              sx={{
                display: "inline-block",
                minWidth: 0.5,
                bgcolor: "blue",
                color: "white",
                mx: 1,
                marginLeft: val === 1 ? 0 : 1,
                scrollMarginLeft: "16px",
                scrollSnapAlign: "start",
              }}
              onMouseEnter={() => {
                if (val === 1) setIsHover(true);
              }}
              onMouseLeave={() => {
                if (val === 1) setIsHover(false);
              }}
            >
              <Box sx={{ height: 100, zIndex: 1 }}>Box {val}</Box>
              {val === 1 && isHover && (
                <Box
                  bgcolor="green"
                  sx={{
                    position: "absolute",
                    minWidth: boxScrollWidth,
                    zIndex: "9999",
                  }}
                >
                  <Typography> Hello</Typography>
                  <Typography> Hello</Typography>
                  <Typography> Hello</Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          height: 200,
          bgcolor: "yellow",
          mb: 1,
          mt: 1,
          padding: 3,
          display: "flex",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            height: 1,
            aspectRatio: "1/1",
            bgcolor: "red",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              gap: 2,
              transition: "0.5s",
              width: 1,
              height: 1,
              bgcolor: "firebrick",
              transition: "all 0.2s",
              ":hover": {
                borderRadius: 2,
                height: "fit-content",
                transform: "translate(-16px,-16px)",
                padding: 2,
              },
            }}
          >
            <Box
              sx={{
                // opacity: 0,
                width: 1,
                aspectRatio: "1/1",
                bgcolor: "maroon",
              }}
            >
              Card #1
            </Box>
            <Box
              sx={{
                width: 1,
                aspectRatio: "1/1",
                bgcolor: "maroon",
                // visibility: "hidden",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              iusto libero, cum nemo quidem voluptate nisi accusantium odit quos
              perspiciatis, neque cupiditate ipsa eligendi laboriosam modi dicta
              facere praesentium ut.
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            gap: 2,
            width: 200,
            bgcolor: "red",
            transition: "all 0.2s",
            // boxSizing: "border-box",
            ":hover": {
              border: "1px solid black",
              padding: 2,
              borderRadius: 2,
              height: "fit-content",
              transform: "translate(-16px, -16px)",
            },
          }}
        >
          <Box
            sx={{
              width: 1,
              aspectRatio: "1/1",
            }}
          >
            Card #2
          </Box>
          <Box
            sx={{
              width: 1,
              aspectRatio: "1/1",
              bgcolor: "maroon",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            iusto libero, cum nemo quidem voluptate nisi accusantium odit quos
            perspiciatis, neque cupiditate ipsa eligendi laboriosam modi dicta
            facere praesentium ut.
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: 200, bgcolor: "orange" }}></Box>
    </Container>
  );
}

export default Test;
