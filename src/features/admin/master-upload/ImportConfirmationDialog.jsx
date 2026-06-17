import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function ImportConfirmationDialog({
  open,
  onClose,
  onImport,
  uploadType,
  file,
  summary,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Confirm {uploadType} Import
      </DialogTitle>

      <DialogContent>
        <Typography>
          Import {summary.valid} valid records?
        </Typography>

        <Typography mt={2}>
          File: {file?.name}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onImport}
        >
          Import Records
        </Button>
      </DialogActions>
    </Dialog>
  );
}