import React from "react";
import {
  Paper,
  Typography,
  Button,
} from "@mui/material";

export default function ImportCompleteScreen() {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5">
        Import Complete
      </Typography>

      <Typography mt={2}>
        Imported Records: 1188
      </Typography>

      <Typography>
        Skipped Records: 58
      </Typography>

      <Button
        sx={{ mt: 2 }}
        variant="contained"
      >
        View Master Data
      </Button>
    </Paper>
  );
}