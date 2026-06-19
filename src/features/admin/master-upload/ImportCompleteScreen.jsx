import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DraggableDialogPaper from "./DraggableDialogPaper";
import { useTranslation } from "../../../context/TranslationContext";

export default function ImportCompleteScreen({
  open,
  onClose,
  imported = 1188,
  skipped = 58,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return undefined;

    const timer = setTimeout(() => {
      onClose && onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={DraggableDialogPaper}
      PaperProps={{
        sx: {
          width: { xs: "calc(100vw - 32px)", sm: "min(100%, 620px)" },
          maxHeight: { xs: "calc(100dvh - 32px)", sm: "none" },
          borderRadius: "14px",
          border: "1px solid #d4e4f7",
          boxShadow: "0 18px 45px rgba(15, 52, 98, 0.14)",
          overflow: "hidden",
        },
      }}
    >
      <Box
        data-dialog-drag-handle="true"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "90px minmax(0, 1fr)", md: "90px minmax(0, 1fr) auto" },
          gap: 2,
          alignItems: { xs: "stretch", sm: "center" },
          p: { xs: 2, sm: 2.25 },
          bgcolor: "#f8fbff",
          cursor: "move",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            mx: { xs: "auto", sm: 0 },
            display: "grid",
            placeItems: "center",
            borderRadius: 999,
            color: "#fff",
            bgcolor: "#0f766e",
          }}
        >
          <CheckIcon sx={{ fontSize: 38 }} />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 800 }}>
            {t("masterUploadImportComplete")}
          </Typography>
          <Typography sx={{ color: "#667085", fontSize: 13 }}>
            {t("masterUploadImportCompleteMessage")
              .replace("{imported}", imported)
              .replace("{skipped}", skipped)}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.25, justifyContent: { xs: "center", sm: "flex-start" } }}>
            <Box component="span" sx={chipSx}>
              {t("masterUploadImportedRecords")}: {imported}
            </Box>
            <Box component="span" sx={chipSx}>
              {t("masterUploadSkippedRecords")}: {skipped}
            </Box>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            minHeight: 38,
            borderRadius: "10px",
            bgcolor: "#0f766e",
            fontWeight: 800,
            textTransform: "none",
            whiteSpace: { xs: "normal", sm: "nowrap" },
            width: { xs: "100%", md: "auto" },
            mt: { xs: 0.5, md: 0 },
            boxShadow: "0 10px 22px rgba(15, 118, 110, 0.22)",
            "&:hover": { bgcolor: "#115e59" },
          }}
        >
          {t("masterUploadViewMasterData")}
        </Button>
      </Box>

      <Box sx={{ height: 4, bgcolor: "#ccfbf1" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "#0f766e",
            animation: "masterUploadCompleteTimeout 5s linear forwards",
            "@keyframes masterUploadCompleteTimeout": {
              from: { width: "100%" },
              to: { width: 0 },
            },
          }}
        />
      </Box>
    </Dialog>
  );
}

const chipSx = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: 30,
  px: 1.25,
  border: "1px solid #d7deea",
  borderRadius: 999,
  bgcolor: "#f8fafc",
  color: "#172033",
  fontSize: 12,
  fontWeight: 800,
};
