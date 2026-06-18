import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import DraggableDialogPaper from "./DraggableDialogPaper";

export default function UploadDetailsDialog({
  open,
  row,
  onClose,
}) {
  if (!row) return null;

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
        Upload Details
      </DialogTitle>

      <DialogContent sx={{ display: "grid", gap: 1 }}>
        {[
          ["Type", row.type],
          ["File", row.file],
          ["Status", row.status],
          ["Imported", `${row.imported} records`],
          ["Skipped", `${row.skipped} records`],
        ].map(([label, value]) => (
          <Typography key={label} sx={{ color: "#667085", fontSize: 14 }}>
            <Typography component="span" sx={{ color: "#172033", fontWeight: 800 }}>
              {label}:
            </Typography>{" "}
            {value}
          </Typography>
        ))}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button variant="outlined" sx={secondaryButtonSx}>
          Download Report
        </Button>

        <Button
          onClick={onClose}
          variant="contained"
          sx={primaryButtonSx}
        >
          Close
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
