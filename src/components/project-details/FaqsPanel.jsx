import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";

function FaqsPanel() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 5 }}>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Accordion key={`accordion-${index + 1}`}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography component="span">
                  {"Question " + (index + 1)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </Container>
  );
}

export default FaqsPanel;
