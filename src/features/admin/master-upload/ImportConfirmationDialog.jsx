import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
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
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const typeLabel = t(`masterUploadType${uploadType}`);
  const selectedFile = file?.name || t("masterUploadSelectedFile");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
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
        {t("masterUploadConfirmImportTitle").replace("{type}", typeLabel)}
      </DialogTitle>

      <DialogContent>
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
          pb: 2,
          gap: 1,
          flexDirection: { xs: "column-reverse", sm: "row" },
          "& > button": { width: { xs: "100%", sm: "auto" }, m: "0 !important" },
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={secondaryButtonSx}
        >
          {t("masterUploadCancel")}
        </Button>

        <Button
          variant="contained"
          onClick={onImport}
          sx={primaryButtonSx}
        >
          {t("masterUploadImportRecords")}
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
