import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      fullScreen={fullScreen}
      PaperComponent={DraggableDialogPaper}
      PaperProps={{
        sx: {
          width: "min(100%, 620px)",
          borderRadius: 1.5,
          border: "1px solid #bfdbfe",
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.16)",
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
          alignItems: "center",
          p: 2,
          bgcolor: "#eff6ff",
          cursor: "move",
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            display: "grid",
            placeItems: "center",
            borderRadius: 999,
            color: "#fff",
            bgcolor: "#2563eb",
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
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.25 }}>
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
            borderRadius: 1,
            bgcolor: "#2563eb",
            fontWeight: 800,
            textTransform: "none",
            whiteSpace: { xs: "normal", sm: "nowrap" },
            width: { xs: "100%", md: "auto" },
            boxShadow: "0 8px 18px rgba(37, 99, 235, 0.22)",
            "&:hover": { bgcolor: "#1d4ed8" },
          }}
        >
          {t("masterUploadViewMasterData")}
        </Button>
      </Box>

      <Box sx={{ height: 4, bgcolor: "#bfdbfe" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "#2563eb",
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
