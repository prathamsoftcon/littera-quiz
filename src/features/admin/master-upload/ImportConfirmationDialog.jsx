import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import DraggableDialogPaper from "./DraggableDialogPaper";

export default function ImportConfirmationDialog({
  open,
  onClose,
  onImport,
  uploadType,
  file,
  summary,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={DraggableDialogPaper}
      PaperProps={{
        sx: {
          width: "min(100%, 440px)",
          borderRadius: 1.5,
          border: "1px solid #d7deea",
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <DialogTitle
        data-dialog-drag-handle="true"
        sx={{ pb: 0.5, fontSize: 18, fontWeight: 800, cursor: "move" }}
      >
        Confirm {uploadType} Import
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ color: "#667085", fontSize: 14 }}>
          Import {summary.valid} valid {uploadType} records from {file?.name || "selected file"}?
          Skipped records will remain in the error report.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={secondaryButtonSx}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onImport}
          sx={primaryButtonSx}
        >
          Import Records
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const secondaryButtonSx = {
  minHeight: 38,
  borderRadius: 1,
  borderColor: "#d7deea",
  color: "#172033",
  fontWeight: 800,
  textTransform: "none",
};

const primaryButtonSx = {
  minHeight: 38,
  borderRadius: 1,
  bgcolor: "#2563eb",
  fontWeight: 800,
  textTransform: "none",
  boxShadow: "0 8px 18px rgba(37, 99, 235, 0.22)",
  "&:hover": { bgcolor: "#1d4ed8" },
};
