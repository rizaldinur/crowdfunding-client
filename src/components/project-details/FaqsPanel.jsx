import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { getProjectDetails } from "../../api/feed";
import { Await, useLoaderData } from "react-router";
import BasicSectionLoading from "../loading-template/BasicSectionLoading";

function FaqsPanel() {
  const { faqsData } = useLoaderData();
  const [faqs, setFaqs] = useState([]);
  return (
    <Suspense fallback={<BasicSectionLoading />}>
      <Await resolve={faqsData}>
        {(faqsData) => {
          useEffect(() => {
            if (faqsData && !faqsData.error) {
              setFaqs(faqsData.data.faqs);
            }
          }, [faqsData]);

          if (faqsData && faqsData.error) {
            return <BasicSectionLoading />;
          }

          return (
            <Container maxWidth="md">
              <Box sx={{ my: 5 }}>
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
                  <Typography
                    color="textSecondary"
                    sx={{ placeSelf: "center" }}
                  >
                    Tidak ada FAQs.
                  </Typography>
                )}
              </Box>
            </Container>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const faqsPanelLoader = ({ request }) => {
  const pathname = new URL(request.url).pathname;

  return { faqsData: getProjectDetails(pathname) };
};

export default FaqsPanel;
