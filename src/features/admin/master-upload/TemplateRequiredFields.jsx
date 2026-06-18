import React from "react";
import {
  Box,
  Button,
} from "@mui/material";

const requiredFields = {
  State: ["state_code", "state_name"],
  District: [
    "district_code",
    "district_name",
    "state_code",
  ],
  Block: [
    "block_code",
    "block_name",
    "state_code",
    "district_code",
  ],
  CRC: [
    "crc_code",
    "crc_name",
    "state_code",
    "district_code",
    "block_code",
  ],
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          flexWrap: "wrap",
          p: 1.5,
          border: "1px solid #dbe5f1",
          borderRadius: 2,
          bgcolor: "#f8fbff",
        }}
      >
        <Button
          variant="outlined"
          onClick={downloadTemplate}
          sx={{
            minHeight: 40,
            px: 2,
            borderRadius: 1.25,
            borderColor: "#cbd8ea",
            color: "#132238",
            bgcolor: "#fff",
            fontWeight: 800,
            textTransform: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
            "&:hover": {
              borderColor: "#2563eb",
              bgcolor: "#eff6ff",
            },
          }}
        >
          Download Template
        </Button>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.25,
            justifyContent: { xs: "stretch", sm: "flex-end" },
            "& > button": {
              minWidth: { xs: "100%", sm: "auto" },
            },
          }}
        >
          {actions}
        </Box>
      </Box>

    </Box>
  );
}
