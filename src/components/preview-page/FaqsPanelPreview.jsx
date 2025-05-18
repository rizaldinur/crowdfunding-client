import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";

function FaqsPanelPreview({ faqs = [] }) {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 5, color: "text.primary" }}>
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <Accordion key={`accordion-${index + 1}`}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography variant="h6">
                  {faq.question || "Question"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer || "An answer"}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography color="textSecondary" sx={{ placeSelf: "center" }}>
            Tidak ada FAQs.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default FaqsPanelPreview;
