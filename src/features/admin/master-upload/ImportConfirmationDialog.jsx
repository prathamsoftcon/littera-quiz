import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import DraggableDialogPaper from "./DraggableDialogPaper";
import { useTranslation } from "../../../context/TranslationContext";

export default function ImportConfirmationDialog({
  open,
  onClose,
  onImport,
  uploadType,
  file,
  summary,
  loading = false,
}) {
  const { t } = useTranslation();
  const typeLabel = t(`masterUploadType${uploadType}`);
  const selectedFile = file?.name || t("masterUploadSelectedFile");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={DraggableDialogPaper}
      PaperProps={{
        sx: {
          width: { xs: "calc(100vw - 32px)", sm: "min(100%, 440px)" },
          maxHeight: { xs: "calc(100dvh - 32px)", sm: "none" },
          borderRadius: "14px",
          border: "1px solid #d4e4f7",
          boxShadow: "0 18px 45px rgba(15, 52, 98, 0.14)",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        data-dialog-drag-handle="true"
        sx={{
          px: 2.5,
          py: 1.75,
          bgcolor: "#f8fbff",
          borderBottom: "1px solid #dbe5f1",
          fontSize: { xs: 16, sm: 18 },
          fontWeight: 900,
          cursor: "move",
          wordBreak: "break-word",
        }}
      >
        {t("masterUploadConfirmImportTitle").replace("{type}", typeLabel)}
      </DialogTitle>

      <DialogContent sx={{ pt: 2, px: { xs: 2, sm: 3 } }}>
        <Typography sx={{ color: "#667085", fontSize: 14 }}>
          {t("masterUploadConfirmImportMessage")
            .replace("{count}", summary.valid)
            .replace("{type}", typeLabel)
            .replace("{file}", selectedFile)}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          bgcolor: "#f8fbff",
          borderTop: "1px solid #dbe5f1",
          gap: 1,
          flexDirection: { xs: "column-reverse", sm: "row" },
          "& > button": { width: { xs: "100%", sm: "auto" }, m: "0 !important" },
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={secondaryButtonSx}
        >
          {t("masterUploadCancel")}
        </Button>

        <Button
          variant="contained"
          onClick={onImport}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
          sx={primaryButtonSx}
        >
          {loading ? t("masterUploadImporting") : t("masterUploadImportRecords")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const secondaryButtonSx = {
  minHeight: 38,
  borderRadius: "10px",
  borderColor: "#94a3b8",
  color: "#1e293b",
  fontWeight: 800,
  textTransform: "none",
};

const primaryButtonSx = {
  minHeight: 38,
  borderRadius: "10px",
  bgcolor: "#0f766e",
  fontWeight: 800,
  textTransform: "none",
  boxShadow: "0 10px 22px rgba(15, 118, 110, 0.22)",
  "&:hover": { bgcolor: "#115e59" },
};
