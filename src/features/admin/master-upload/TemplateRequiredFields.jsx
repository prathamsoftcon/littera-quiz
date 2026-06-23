import React from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useTranslation } from "../../../context/TranslationContext";

const requiredFields = {
  State: ["state_code", "state_name"],
  District: ["district_code", "district_name", "state_code"],
  Block: ["block_code", "block_name", "state_code", "district_code"],
  CRC: ["crc_code", "crc_name", "state_code", "district_code", "block_code"],
  Village: [
    "village_code",
    "village_name",
    "state_code",
    "district_code",
    "block_code",
    "crc_code",
  ],
  School: [
    "school_code",
    "school_name",
    "school_type",
    "village_code",
    "crc_code",
    "block_code",
    "district_code",
    "state_code",
  ],
};

export default function TemplateRequiredFields({
  uploadType,
  actions,
}) {
  const { t } = useTranslation();
  const downloadTemplate = () => {
    const fields = requiredFields[uploadType] || requiredFields.School;
    const csv = `${fields.join(",")}\n`;

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${uploadType || "School"}_template.csv`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.setTimeout(() => URL.revokeObjectURL(url), 0);
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
