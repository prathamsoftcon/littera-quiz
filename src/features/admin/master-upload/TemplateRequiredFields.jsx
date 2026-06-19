import React from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useTranslation } from "../../../context/TranslationContext";

export default function TemplateRequiredFields({
  uploadType,
  actions,
}) {
  const { t } = useTranslation();
  const downloadTemplate = () => {
    const csv =
      requiredFields[uploadType].join(",") + "\n";

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${uploadType}_template.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" },
          alignItems: "start",
          justifyContent: "space-between",
          p: 1.5,
          border: "1px solid #dbe5f1",
          borderRadius: "12px",
          bgcolor: "#f8fbff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "center",
            justifyContent: { xs: "stretch", md: "flex-start" },
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            onClick={downloadTemplate}
            sx={{
              minHeight: 40,
              px: 2,
              borderRadius: "10px",
              borderColor: "#94a3b8",
              color: "#1e293b",
              bgcolor: "#fff",
              fontWeight: 800,
              textTransform: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
              "&:hover": {
                borderColor: "#0ea5e9",
                bgcolor: "#f0f9ff",
              },
            }}
          >
            {t("masterUploadDownloadTemplate")}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            width: { xs: "100%", md: "auto" },
            justifyContent: { xs: "stretch", md: "flex-end" },
            "& > button": { minWidth: { xs: "100%", sm: "auto" } },
          }}
        >
          {actions}
        </Box>

      </Box>

    </Box>
  );
}
