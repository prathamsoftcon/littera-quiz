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
      bgcolor: "#f4f8ff",
      accent: "#2563eb",
    },
    {
      label: t("masterUploadValidRecords"),
      value: summary.valid,
      help: t("masterUploadReadyForImport"),
      bgcolor: "#eff6ff",
      accent: "#2563eb",
    },
    {
      label: t("masterUploadMissingFields"),
      value: summary.missing,
      help: t("masterUploadRequiredValuesBlank"),
      bgcolor: "#fff7f8",
      accent: "#be123c",
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
          <Typography variant="h6" sx={{ color: "#0f172a", fontSize: 18, fontWeight: 900 }}>
            {t("masterUploadValidationPreviewSummary")}
          </Typography>
          <Typography sx={{ mt: 0.25, color: "#52627a", fontSize: 13.5 }}>
            {t("masterUploadValidationPreviewHelp")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "stretch", sm: "flex-end" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {actions}
        </Box>
      </Box>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid key={card.label} item xs={12} md={4}>
            <Card
              variant="outlined"
              sx={{
                position: "relative",
                minHeight: 116,
                overflow: "hidden",
                borderColor: "#d9e4f2",
                borderRadius: 2,
                bgcolor: card.bgcolor,
                boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "0 auto 0 0",
                  width: 4,
                  bgcolor: card.accent,
                },
              }}
            >
              <CardContent sx={{ p: 2, pl: 2.25, "&:last-child": { pb: 2 } }}>
                <Typography
                  sx={{
                    mb: 0.75,
                    color: "#5d6b82",
                    fontSize: 12,
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  {card.label}
                </Typography>
                <Typography sx={{ color: "#0f172a", fontSize: 28, lineHeight: 1, fontWeight: 900 }}>
                  {card.value}
                </Typography>
                <Typography sx={{ mt: 0.75, color: "#52627a", fontSize: 13 }}>
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
