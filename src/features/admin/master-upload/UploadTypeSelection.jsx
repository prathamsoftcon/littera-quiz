import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "../../../context/TranslationContext";

const uploadTypes = [
  "State",
  "District",
  "Block",
  "CRC",
  "Village",
  "School",
];

export default function UploadTypeSelection({
  uploadType,
  setUploadType,
}) {
  const { t } = useTranslation();
  const typeLabel = (type) => t(`masterUploadType${type}`);

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
            {t("masterUploadTypeSelection")}
          </Typography>
          <Typography sx={{ mt: 0.25, color: "#52627a", fontSize: 13.5 }}>
            {t("masterUploadTypeSelectionHelp")}
          </Typography>
        </Box>

        <Box
          component="span"
          sx={{
            px: 1.25,
            py: 0.75,
            borderRadius: 999,
            color: "#075985",
            bgcolor: "#e0f2fe",
            border: "1px solid #7dd3fc",
            fontSize: 12,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          {t("masterUploadActive")}: {typeLabel(uploadType)}
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            md: "repeat(6, minmax(0, 1fr))",
          },
          gap: 1,
          p: 0.75,
          border: "1px solid #dbe5f1",
          borderRadius: "12px",
          bgcolor: "#f8fbff",
        }}
      >
        {uploadTypes.map((type) => (
          <Button
            key={type}
            variant={
              uploadType === type
                ? "contained"
                : "outlined"
            }
            onClick={() => setUploadType(type)}
            sx={{
              minHeight: 40,
              borderRadius: "10px",
              borderColor: uploadType === type ? "#0ea5e9" : "#d6e4f4",
              bgcolor: uploadType === type ? "#e0f2fe" : "#ffffff",
              color: uploadType === type ? "#075985" : "#1e293b",
              fontWeight: 800,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#0ea5e9",
                bgcolor: "#f0f9ff",
              },
            }}
          >
            {typeLabel(type)}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
