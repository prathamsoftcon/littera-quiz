import React from "react";
import {
  Box,
  Button,
  Chip,
  Typography,
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
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" mb={2}>
        Template 
      </Typography>

      <Button
        variant="outlined"
        onClick={downloadTemplate}
      >
        Download Template
      </Button>

      {/* <Box mt={2}>
        {requiredFields[uploadType].map((field) => (
          <Chip
            key={field}
            label={field}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box> */}
    </Box>
  );
}