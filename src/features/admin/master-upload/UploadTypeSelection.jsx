import React from "react";
import { Box, Button, Chip, Typography } from "@mui/material";

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
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" mb={2}>
         Upload Type Selection
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          mb: 2,
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
          >
            {type}
          </Button>
        ))}
      </Box>

      <Chip
        color="primary"
        label={`Active: ${uploadType}`}
      />
    </Box>
  );
}