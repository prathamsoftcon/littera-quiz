import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useTranslation } from "../../../context/TranslationContext";

export default function ValidationSummary({
  summary,
  actions,
}) {
  const { t } = useTranslation();
  const cards = [
    {
      label: t("masterUploadTotalRecords"),
      value: summary.total,
      help: t("masterUploadRowsReadFromFile"),
      bgcolor: "linear-gradient(120deg, #0369a1, #0ea5e9)",
      accent: "rgba(255, 255, 255, 0.2)",
    },
    {
      label: t("masterUploadValidRecords"),
      value: summary.valid,
      help: t("masterUploadReadyForImport"),
      bgcolor: "linear-gradient(120deg, #166534, #22c55e)",
      accent: "rgba(255, 255, 255, 0.2)",
    },
    {
      label: t("masterUploadMissingFields"),
      value: summary.missing,
      help: t("masterUploadRequiredValuesBlank"),
      bgcolor: "linear-gradient(120deg, #9f1239, #e11d48)",
      accent: "rgba(255, 255, 255, 0.2)",
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2,
          pb: 2,
          borderBottom: "1px solid #dbe5f1",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ color: "#0f172a", fontSize: 17, fontWeight: 900 }}>
            {t("masterUploadValidationPreviewSummary")}
          </Typography>
          <Typography sx={{ mt: 0.25, color: "#52627a", fontSize: 13.5 }}>
            {t("masterUploadValidationPreviewHelp")}
          </Typography>
        </Box>

        {actions ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "stretch", sm: "flex-end" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {actions}
          </Box>
        ) : null}
      </Box>

      <Grid container spacing={1.5}>
        {cards.map((card) => (
          <Grid key={card.label} item xs={12} md={4}>
            <Card
              sx={{
                position: "relative",
                minHeight: 100,
                overflow: "hidden",
                border: "1px solid #cae1f7",
                borderRadius: "14px",
                color: "#fff",
                background: card.bgcolor,
                boxShadow: "0 10px 24px rgba(15, 23, 42, 0.12)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: 86,
                  height: 86,
                  borderRadius: 999,
                  right: -30,
                  top: -20,
                  bgcolor: card.accent,
                },
              }}
            >
              <CardContent sx={{ p: 1.75, position: "relative", zIndex: 1, "&:last-child": { pb: 1.75 } }}>
                <Typography
                  sx={{
                    mb: 0.5,
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {card.label}
                </Typography>
                <Typography sx={{ color: "#fff", fontSize: 30, lineHeight: 1.1, fontWeight: 900 }}>
                  {card.value}
                </Typography>
                <Typography sx={{ mt: 0.35, color: "rgba(255,255,255,0.94)", fontSize: 12, fontWeight: 600 }}>
                  {card.help}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
