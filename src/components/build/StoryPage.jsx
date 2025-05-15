import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Delete, Info, Link } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useFormSubmitContext } from "../../hooks/useFormSubmitContext";
import { useFetcher, useOutletContext, useParams } from "react-router";
import { Link as RouterLink } from "react-router";
import { putBuildForm } from "../../api/api";
import validator from "validator";
import { getError, setToken } from "../../utils/utils";

function StoryPage() {
  const filledData = useOutletContext();

  const { projectId: currentSlug, profileId } = useParams();
  const { submitFnRef, setLoading, setIsDirty, setNewSlug } =
    useFormSubmitContext();

  let fetcher = useFetcher();

  const [success, setSuccess] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [formErrorData, setFormErrorData] = useState([]);
  const [pathname, setPathname] = useState(
    `/${profileId}/${currentSlug}/build`
  );

  const [initialForm, setInitialForm] = useState({
    detail: filledData.data?.story?.detail || "",
    benefits: filledData.data?.story?.benefits || "",
    challenges: filledData.data?.story?.challenges || "",
    faqs: filledData.data?.story?.faqs || [],
  });

  const [detail, setDetail] = useState(filledData.data?.story?.detail || "");
  const [benefits, setBenefit] = useState(
    filledData.data?.story?.benefits || ""
  );
  const [challenges, setChallenges] = useState(
    filledData.data?.story?.challenges || ""
  );
  const [faqs, setFaqs] = useState(filledData.data?.story?.faqs || []);

  useEffect(() => {
    if (submitFnRef) {
      submitFnRef.current = handleSubmit;
    }
    const object = {
      detail,
      benefits,
      challenges,
      faqs,
    };
    const changed = JSON.stringify(object) !== JSON.stringify(initialForm);
    setIsDirty(changed);
  }, [detail, benefits, challenges, faqs]);

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      console.log(fetcher.data);
      if (fetcher.data?.refreshToken) {
        setToken(fetcher.data?.refreshToken);
      }
      if (!fetcher.data.error) {
        setAlertOpen(true);
        setAlertMsg(fetcher.data.message);
        setSuccess(true);

        setInitialForm({
          detail: fetcher.data?.data?.story?.detail || "",
          benefits: fetcher.data?.data?.story?.benefits || "",
          challenges: fetcher.data?.data?.story?.challenges || "",
          faqs: fetcher.data?.data?.story?.faqs || [],
        });
        setDetail(fetcher.data?.data?.story?.detail || "");
        setBenefit(fetcher.data?.data?.story?.benefits || "");
        setChallenges(fetcher.data?.data?.story?.challenges || "");
        setFaqs(fetcher.data?.data?.story?.faqs || []);
      } else {
        setAlertOpen(true);
        setAlertMsg(fetcher.data.message);
        setSuccess(false);
      }
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (fetcher.state === "idle") {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [fetcher.state]);

  const handleSubmit = () => {
    console.log("Form submitted!");
    const formData = new FormData();
    formData.append("detail", detail);
    formData.append("benefits", benefits);
    formData.append("challenges", challenges);
    formData.append("faqs", JSON.stringify(faqs));

    fetcher.submit(formData, { method: "PUT" });
  };

  const handleAddFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFaqChange = (index, name, value) => {
    const updated = [...faqs];
    updated[index][name] = value;
    setFaqs(updated);
  };

  return (
    <Container maxWidth="lg">
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {
          setAlertOpen(false);
        }}
      >
        <Alert
          variant="filled"
          severity={!success ? "error" : "success"}
          action={
            success ? (
              <Button
                component={RouterLink}
                to={pathname + "/profile"}
                color="inherit"
                size="small"
              >
                Lanjut
              </Button>
            ) : (
              <IconButton
                color="inherit"
                size="small"
                onClick={() => setAlertOpen(false)}
              >
                <Close fontSize="small" />
              </IconButton>
            )
          }
        >
          {alertMsg || "Sukses."}
        </Alert>
      </Snackbar>
      <Box sx={{ py: 6, color: "text.primary" }}>
        <Stack sx={{ mb: 6 }} gap={1}>
          <Typography variant="h4" fontWeight={500}>
            Kenalkan proyekmu
          </Typography>
          <Typography variant="body1">
            Ceritakan proyekmu agar orang tertarik terhadap proyekmu.
            Deskripsikan secara spesifik tapi tetap jelas dan padat.
          </Typography>
        </Stack>
        <Stack gap={6}>
          <Grid
            container
            spacing={3}
            sx={{ pb: 5, borderBottom: "1px solid", borderColor: "divider" }}
          >
            <Grid size={12}>
              <Typography variant="h5" fontWeight={500} mb={1}>
                Cerita
              </Typography>
              <Typography>
                Jelaskan apa tujuan kamu melakukan penggalangan dana, mengapa
                kamu ingin melakukan itu, bagaimana rencanamu untuk
                mewujudkannya, dan siapa kamu.
              </Typography>
            </Grid>
            <Grid size={12}>
              <Stack gap={2}>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ placeSelf: "end" }}
                  startIcon={<Info />}
                  component={RouterLink}
                  to="https://www.markdownguide.org/cheat-sheet/"
                  target="_blank"
                >
                  pelajari tentang markdown
                </Button>
                <TextField
                  label="Cerita"
                  multiline
                  autoFocus
                  name="detail"
                  placeholder="Gunakan format markdown untuk membuat cerita yang menarik."
                  minRows={20}
                  style={{ backgroundColor: "background.default" }}
                  helperText={`${detail.length}/10000`}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  slotProps={{
                    formHelperText: {
                      sx: { ml: "auto" },
                    },
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{ pb: 5, borderBottom: "1px solid", borderColor: "divider" }}
          >
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h5" fontWeight={500} mb={1}>
                Keuntungan
              </Typography>
              <Typography>
                Jelaskan keuntungan apa saja yang kamu berikan kepada investor
                yang mendukung proyekmu. Buat keuntungan yang menarik, sesuai
                perhitungan dan berjenjang berdasarkan jumlah dukungan yang
                diberikan investor.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack
                gap={2}
                sx={{
                  p: 3,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <TextField
                  label="Keuntungan"
                  multiline
                  name="benefits"
                  value={benefits}
                  onChange={(e) => setBenefit(e.target.value)}
                  rows={3}
                  placeholder="Kamu dapat menulis dengan format markdown"
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{ pb: 5, borderBottom: "1px solid", borderColor: "divider" }}
          >
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h5" fontWeight={500} mb={1}>
                Resiko dan tantangan
              </Typography>
              <Typography>
                Terangkan secara jujur tentang potensi risiko dan tantangan
                dalam proyek ini dan bagaimana rencanamu dalam mengatasi itu
                untuk menyelaikan proyekmu.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack
                gap={2}
                sx={{
                  p: 3,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <TextField
                  label="Risiko dan tantangan"
                  multiline
                  name="challenges"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  rows={3}
                  placeholder="Risiko dan tantangan biasanya bersangkutan dengan penganggaran, pemberian benefit, timeline dan tentang proyek itu sendiri..."
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ pb: 5 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h5" fontWeight={500} mb={1}>
                Pertanyaan yang sering diajukan (FAQs)
              </Typography>
              <Typography>
                Tulis jawaban atas pertanyaan-pertanyaan yang sering diajukan.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack
                gap={2}
                sx={{
                  p: 3,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                {faqs.length > 0 &&
                  faqs.map((faq, index) => {
                    return (
                      <Stack
                        key={"faq-" + index}
                        sx={{
                          p: 3,
                          borderRadius: 1,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                        gap={2}
                      >
                        <TextField
                          label="Pertanyaan"
                          name={"question"}
                          value={faq.question}
                          onChange={(e) =>
                            handleFaqChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                        />
                        <TextField
                          label="Jawaban"
                          name={"answer"}
                          value={faq.answer}
                          onChange={(e) =>
                            handleFaqChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                        />
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Delete />}
                          sx={{ placeSelf: "end" }}
                          onClick={() => handleRemoveFaq(index)}
                        >
                          Hapus
                        </Button>
                      </Stack>
                    );
                  })}
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ placeSelf: "center" }}
                  onClick={handleAddFaq}
                >
                  tambahkan pertanyaan dan jawaban
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
}

export const storyBuildAction = async ({ request, params }) => {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  const pathname = window.location.pathname;
  console.log(pathname);

  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  return putBuildForm(postData, pathname);
};

export default StoryPage;
