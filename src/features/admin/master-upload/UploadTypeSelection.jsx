import React from "react";
import { Box, Button, Typography } from "@mui/material";

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
            Upload Type Selection
          </Typography>
          <Typography sx={{ mt: 0.25, color: "#52627a", fontSize: 13.5 }}>
            Selected upload type is highlighted and required fields update dynamically.
          </Typography>
        </Box>

        <Box
          component="span"
          sx={{
            px: 1.25,
            py: 0.75,
            borderRadius: 999,
            color: "#1d4ed8",
            bgcolor: "#eff6ff",
            border: "1px solid #bfdbfe",
            fontSize: 12,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          Active: {uploadType}
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
          borderRadius: 2,
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
              minHeight: 42,
              borderRadius: 1.25,
              borderColor: uploadType === type ? "#2563eb" : "transparent",
              bgcolor: uploadType === type ? "#2563eb" : "transparent",
              color: uploadType === type ? "#fff" : "#172033",
              fontWeight: 800,
              textTransform: "none",
              boxShadow: uploadType === type ? "0 8px 18px rgba(37, 99, 235, 0.22)" : "none",
              "&:hover": {
                borderColor: "#2563eb",
                bgcolor: uploadType === type ? "#1d4ed8" : "#eff6ff",
              },
            }}
          >
            {type}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
