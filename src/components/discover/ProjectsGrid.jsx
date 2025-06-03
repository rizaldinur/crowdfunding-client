import {
  Box,
  Container,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import MediaCard from "../card/MediaCard";
import { useSearchParams, Link as RouterLink } from "react-router";
import { useEffect } from "react";

function ProjectsGrid({ totalPages, projects = [] }) {
  const [search, setSearch] = useSearchParams();
  let page = search.get("page") ? parseInt(search.get("page")) : 1;

  return (
    <Box
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "divider",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ my: 5 }}>
          {projects.map((project, i) => (
            <Grid
              key={`grid-${i}`}
              size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <MediaCard data={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="xl" sx={{ mt: "auto" }}>
        <Stack sx={{ mb: 5 }}>
          <Pagination
            count={totalPages || 10}
            page={page}
            color="secondary"
            sx={{ placeSelf: "center" }}
            renderItem={(item) => {
              return (
                <PaginationItem
                  component={RouterLink}
                  to={{
                    pathname: "/discover",
                    search: (() => {
                      const params = new URLSearchParams(search);
                      params.set("page", item.page); // update the page
                      return `?${params.toString()}`;
                    })(),
                  }}
                  {...item}
                />
              );
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default ProjectsGrid;
