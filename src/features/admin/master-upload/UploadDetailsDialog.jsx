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
import DownloadIcon from "@mui/icons-material/Download";
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

  const handleDownloadReport = () => {
    const reportRows = [
      [t("masterUploadDate"), row.date || ""],
      [t("masterUploadType"), t(`masterUploadType${row.type}`)],
      [t("masterUploadFile"), row.file || ""],
      [t("masterUploadStatus"), t(`masterUploadStatus${row.status}`)],
      [t("masterUploadImported"), row.imported ?? 0],
      [t("masterUploadSkipped"), row.skipped ?? 0],
      [t("masterUploadTotalRecords"), Number(row.imported || 0) + Number(row.skipped || 0)],
      [t("masterUploadReportGeneratedAt", "Generated At"), new Date().toLocaleString()],
    ];
    const csv = [
      ["Field", "Value"],
      ...reportRows,
    ]
      .map((cells) => cells.map(escapeCsvValue).join(","))
      .join("\r\n");
    const blob = new Blob([`${csv}\r\n`], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${getReportFileName(row)}_report.csv`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

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
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadReport}
          sx={secondaryButtonSx}
        >
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

function escapeCsvValue(value) {
  const text = String(value ?? "");

  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function getReportFileName(row) {
  const sourceName = row.file || `${row.type || "upload"}-${row.id || "report"}`;
  const withoutExtension = String(sourceName).replace(/\.[^/.]+$/, "");

  return withoutExtension
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "upload-report";
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
