import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function ValidationSummary({
  summary,
  actions,
}) {
  const cards = [
    {
      label: "Total Records",
      value: summary.total,
      help: "Rows read from file",
      bgcolor: "#f4f8ff",
      accent: "#2563eb",
    },
    {
      label: "Valid Records",
      value: summary.valid,
      help: "Ready for import",
      bgcolor: "#eff6ff",
      accent: "#2563eb",
    },
    {
      label: "Missing Fields",
      value: summary.missing,
      help: "Required values blank",
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
            Validation Preview Summary
          </Typography>
          <Typography sx={{ mt: 0.25, color: "#52627a", fontSize: 13.5 }}>
            Summary cards required by the task sheet.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: { xs: "stretch", sm: "flex-end" } }}>
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
