import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export default function UploadDetailsDialog({
  open,
  row,
  onClose,
}) {
  if (!row) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Upload Details
      </DialogTitle>

      <DialogContent>
        <Typography>
          Type: {row.type}
        </Typography>

        <Typography>
          File: {row.file}
        </Typography>

        <Typography>
          Status: {row.status}
        </Typography>

        <Typography>
          Imported: {row.imported}
        </Typography>

        <Typography>
          Skipped: {row.skipped}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button>
          Download Report
        </Button>

        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}