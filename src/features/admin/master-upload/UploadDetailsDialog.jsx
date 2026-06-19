import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DraggableDialogPaper from "./DraggableDialogPaper";
import { useTranslation } from "../../../context/TranslationContext";

export default function UploadDetailsDialog({
  open,
  row,
  onClose,
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!row) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperComponent={DraggableDialogPaper}
      PaperProps={{
        sx: {
          width: "min(100%, 440px)",
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
          fontSize: 18,
          fontWeight: 900,
          cursor: "move",
        }}
      >
        {t("masterUploadUploadDetails")}
      </DialogTitle>

      <DialogContent sx={{ display: "grid", gap: 1, pt: 2 }}>
        {[
          [t("masterUploadType"), t(`masterUploadType${row.type}`)],
          [t("masterUploadFile"), row.file],
          [t("masterUploadStatus"), t(`masterUploadStatus${row.status}`)],
          [t("masterUploadImported"), t("masterUploadRecordsCount").replace("{count}", row.imported)],
          [t("masterUploadSkipped"), t("masterUploadRecordsCount").replace("{count}", row.skipped)],
        ].map(([label, value]) => (
          <Typography key={label} sx={{ color: "#667085", fontSize: 14, wordBreak: "break-word" }}>
            <Typography component="span" sx={{ color: "#172033", fontWeight: 800 }}>
              {label}:
            </Typography>{" "}
            {value}
          </Typography>
        ))}
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
        <Button variant="outlined" sx={secondaryButtonSx}>
          {t("masterUploadDownloadReport")}
        </Button>

        <Button
          onClick={onClose}
          variant="contained"
          sx={primaryButtonSx}
        >
          {t("masterUploadClose")}
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
