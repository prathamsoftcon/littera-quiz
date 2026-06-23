import React, { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";

import UploadTypeSelection from "./master-upload/UploadTypeSelection";
import FileUpload from "./master-upload/FileUpload";
import TemplateRequiredFields from "./master-upload/TemplateRequiredFields";
import ValidationSummary from "./master-upload/ValidationSummary";
import ImportConfirmationDialog from "./master-upload/ImportConfirmationDialog";
import ImportCompleteScreen from "./master-upload/ImportCompleteScreen";
import UploadHistory from "./master-upload/UploadHistory";
import UploadDetailsDialog from "./master-upload/UploadDetailsDialog";
import DraggableDialogPaper from "./master-upload/DraggableDialogPaper";
import { useTranslation } from "../../context/TranslationContext";

export default function MasterUpload() {
  const { t } = useTranslation();
  // Upload Type
  const [uploadType, setUploadType] = useState("School");

  // File Upload
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [rowCount, setRowCount] = useState(0);

  // Validation Summary
  const [summary, setSummary] = useState({
    total: 0,
    valid: 0,
    missing: 0,
  });

  // Import Dialog
  const [confirmOpen, setConfirmOpen] =
    useState(false);

  // Import Complete
  const [importComplete, setImportComplete] =
    useState(false);

  // Upload Details Dialog
  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [selectedHistory, setSelectedHistory] =
    useState(null);
  const [historyLoading, setHistoryLoading] =
    useState(false);
  const [historyError, setHistoryError] =
    useState("");
  const [notifications, setNotifications] =
    useState([]);
  const [notificationOpen, setNotificationOpen] =
    useState(false);
  const [toastOpen, setToastOpen] =
    useState(false);
  const [toastMessage, setToastMessage] =
    useState("");
  const [importLoading, setImportLoading] =
    useState(false);

  // Upload History Data
  const [history, setHistory] = useState([
    {
      id: 1,
      date: "17-Jun-2026",
      type: "School",
      file: "school_master_jaipur.csv",
      status: "Complete",
      imported: 1188,
      skipped: 58,
    },
  ]);

  // Validate File
 // Allowed file types
const normalize = (str) =>
  str?.toString().trim().toLowerCase();

const REQUIRED_COLUMNS = [
  "school_code",
  "school_name",
  "school_type",
  "village_code",
  "crc_code",
  "block_code",
  "district_code",
  "state_code",
];

const handleValidate = async () => {
  setError("");

  const isValidFile =
    file?.name?.endsWith(".csv") ||
    file?.name?.endsWith(".xlsx") ||
    file?.name?.endsWith(".xls");

  if (!isValidFile) {
    setError("Unsupported file type");
    return;
  }

  if (!file) {
    setError("Upload file first");
    return;
  }

  try {
    setImportLoading(true);

    let rows = [];
    let headers = [];

    // ================= CSV =================
    if (file.name.endsWith(".csv")) {
      const text = await file.text();

      const lines = text.split("\n").filter(Boolean);

      headers = lines[0]
        .split(",")
        .map(normalize);

      rows = lines.slice(1).map((line) => {
        const values = line.split(",");
        const obj = {};

        headers.forEach((h, i) => {
          obj[h] = values[i]?.trim() || "";
        });

        return obj;
      });
    }

    // ================= XLSX =================
    else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rawRows = XLSX.utils.sheet_to_json(sheet, {
        defval: "",
        raw: false,
      });

      rows = rawRows.map((row) => {
        const obj = {};
        Object.keys(row).forEach((k) => {
          obj[normalize(k)] = row[k];
        });
        return obj;
      });

      headers = Object.keys(rows[0] || {});
    }

    // ================= EMPTY CHECK =================
    if (!rows.length) {
      setError("No data found in file");
      return;
    }

    // ================= COLUMN VALIDATION =================
    const missingColumns = REQUIRED_COLUMNS.filter(
      (col) => !headers.includes(col)
    );

    if (missingColumns.length) {
      setError(`Missing columns: ${missingColumns.join(", ")}`);
      return;
    }

    // ================= ROW VALIDATION =================
    let validCount = 0;
    let missingCount = 0;

    rows.forEach((row) => {
      const isValid = REQUIRED_COLUMNS.every(
        (col) => row[col] && row[col].toString().trim() !== ""
      );

      if (isValid) validCount++;
      else missingCount++;
    });

    setSummary({
      total: rows.length,
      valid: validCount,
      missing: missingCount,
    });

    setRowCount(rows.length);
  } catch (err) {
    console.error(err);
    setError("File validation failed");
  } finally {
    setImportLoading(false);
  }
};

  const handleOpenHistory = () => {
    setHistoryOpen(true);
    setHistoryError("");
    setHistoryLoading(true);

    window.setTimeout(() => {
      setHistoryLoading(false);
    }, 500);
  };

  const handleRetryHistory = () => {
    setHistoryError("");
    setHistoryLoading(true);

    window.setTimeout(() => {
      setHistoryLoading(false);
    }, 500);
  };

  // Import Records
  const handleImport = () => {
    setImportLoading(true);

    window.setTimeout(() => {
      setConfirmOpen(false);
      setImportComplete(true);
      setImportLoading(false);

      const newHistory = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        type: uploadType,
        file: file?.name || "",
        status: "Complete",
        imported: summary.valid,
        skipped: summary.total - summary.valid,
      };

      setHistory((prev) => [newHistory, ...prev]);

      const message = t("masterUploadImportSuccessToast")
        .replace("{file}", newHistory.file || t("masterUploadSelectedFile"))
        .replace("{count}", newHistory.imported);
      const notification = {
        id: newHistory.id,
        title: t("masterUploadImportSuccessTitle"),
        message,
        time: new Date().toLocaleString(),
      };

      setNotifications((prev) => [notification, ...prev]);
      setToastMessage(message);
      setToastOpen(true);
    }, 600);
  };

  // View Details
  const handleViewDetails = (row) => {
    setSelectedHistory(row);
    setDetailsOpen(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gap: 1.75,
        color: "#172033",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          p: { xs: 2, md: 2.25 },
          border: "1px solid #d2e3f7",
          borderRadius: "14px",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 16px 34px rgba(15, 52, 98, 0.08)",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#48617d",
              fontSize: 12,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0,
            }}
          >
            {t("adminMasterUploadEyebrow")}
          </Typography>
          <Typography
            component="h2"
            sx={{
              mt: 0.5,
              color: "#0f172a",
              fontSize: { xs: 22, md: 28 },
              lineHeight: 1.15,
              fontWeight: 900,
            }}
          >
            {t("adminMasterUploadTitle")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "stretch", md: "flex-end" },
            gap: 1,
            width: { xs: "100%", md: "auto" },
            flexWrap: "wrap",
          }}
        >
          <IconButton
            aria-label={t("masterUploadNotifications")}
            onClick={() => setNotificationOpen(true)}
            sx={{
              width: { xs: "100%", sm: 42 },
              minHeight: 40,
              border: "1px solid #94a3b8",
              borderRadius: "10px",
              color: "#132238",
              bgcolor: "#fff",
              "&:hover": {
                borderColor: "#0ea5e9",
                bgcolor: "#f0f9ff",
              },
            }}
          >
            <Badge
              badgeContent={notifications.length}
              color="error"
              max={99}
            >
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>

          <Button
            variant="outlined"
            onClick={handleOpenHistory}
            sx={secondaryButtonSx}
          >
            {t("masterUploadHistory")}
          </Button>
        </Box>
      </Box>

      <Section>
        <ValidationSummary
          summary={summary}
        />
      </Section>

      <Section>
        <UploadTypeSelection
          uploadType={uploadType}
          setUploadType={setUploadType}
        />
      </Section>

      <Section>
        <FileUpload
          file={file}
          setFile={setFile}
          error={error}
          setError={setError}
          rowCount={rowCount}
          setRowCount={setRowCount}
        />
      </Section>

      <Section>
        <TemplateRequiredFields
          uploadType={uploadType}
          actions={
            <>
              <Button
                variant="outlined"
                onClick={handleValidate}
                sx={secondaryButtonSx}
              >
                {t("masterUploadValidateFile")}
              </Button>

              <Button
                variant="contained"
                onClick={() => setConfirmOpen(true)}
                disabled={!summary.valid}
                sx={primaryButtonSx}
              >
                {t("masterUploadImportRecords")}
              </Button>
            </>
          }
        />
      </Section>

      <UploadHistory
        hideTrigger
        open={historyOpen}
        onOpen={handleOpenHistory}
        onClose={() => setHistoryOpen(false)}
        history={history}
        loading={historyLoading}
        error={historyError}
        onRetry={handleRetryHistory}
        onDetails={handleViewDetails}
      />

      <NotificationDialog
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        notifications={notifications}
        onClear={() => setNotifications([])}
        t={t}
      />

      {/* Import Confirmation Dialog */}
      <ImportConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onImport={handleImport}
        uploadType={uploadType}
        file={file}
        summary={summary}
        loading={importLoading}
      />

      {/* Upload Details Dialog */}
      <UploadDetailsDialog
        open={detailsOpen}
        row={selectedHistory}
        onClose={() => setDetailsOpen(false)}
      />

      <ImportCompleteScreen
        open={importComplete}
        onClose={() => setImportComplete(false)}
        imported={summary.valid}
        skipped={
          summary.total - summary.valid
        }
      />

      <Snackbar
        open={toastOpen}
        autoHideDuration={3500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setToastOpen(false)}
          sx={{ fontWeight: 700 }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function NotificationDialog({
  open,
  onClose,
  notifications,
  onClear,
  t,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperComponent={DraggableDialogPaper}
      PaperProps={{
        sx: {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          bgcolor: "#f8fbff",
          borderBottom: "1px solid #dbe5f1",
          fontSize: 18,
          fontWeight: 900,
          cursor: "move",
        }}
      >
        {t("masterUploadNotifications")}
        <IconButton
          aria-label={t("masterUploadClose")}
          onClick={onClose}
          size="small"
          sx={{ color: "#667085" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        {notifications.length ? (
          <Box
            sx={{
              display: "grid",
              gap: 1.25,
              maxHeight: 210,
              overflowY: notifications.length > 2 ? "auto" : "visible",
              pr: notifications.length > 2 ? 0.75 : 0,
            }}
          >
            {notifications.map((item, index) => (
              <Paper
                key={item.id}
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderColor: "#d8e3f2",
                  borderRadius: "12px",
                  bgcolor: "#f8fbff",
                }}
              >
                <Typography sx={{ color: "#0f172a", fontSize: 14, fontWeight: 900 }}>
                  {index + 1}. {item.title}
                </Typography>
                <Typography sx={{ mt: 0.5, color: "#52627a", fontSize: 13 }}>
                  {item.message}
                </Typography>
                <Typography sx={{ mt: 0.75, color: "#667085", fontSize: 12 }}>
                  {item.time}
                </Typography>
              </Paper>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              minHeight: 160,
              display: "grid",
              placeItems: "center",
              textAlign: "center",
              color: "#667085",
            }}
          >
            <Box>
              <NotificationsIcon sx={{ mb: 1, color: "#94a3b8", fontSize: 38 }} />
              <Typography sx={{ color: "#172033", fontWeight: 900 }}>
                {t("masterUploadNoNotifications")}
              </Typography>
              <Typography sx={{ mt: 0.5, fontSize: 13 }}>
                {t("masterUploadNoNotificationsHelp")}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 2, py: 1.75, bgcolor: "#f8fbff", borderTop: "1px solid #dbe5f1" }}>
        <Button
          variant="outlined"
          disabled={!notifications.length}
          onClick={onClear}
          sx={secondaryButtonSx}
        >
          {t("masterUploadClearNotifications")}
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={primaryButtonSx}
        >
          {t("masterUploadClose")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Section({ children }) {
  return (
    <Box
      sx={{
        p: { xs: 1.5, md: 2 },
        border: "1px solid #d4e4f7",
        borderRadius: "14px",
        bgcolor: "rgba(255, 255, 255, 0.92)",
        boxShadow: "0 16px 34px rgba(15, 52, 98, 0.08)",
      }}
    >
      {children}
    </Box>
  );
}

const secondaryButtonSx = {
  minHeight: 40,
  px: 2,
  width: { xs: "100%", sm: "auto" },
  borderRadius: "10px",
  borderColor: "#94a3b8",
  color: "#1e293b",
  bgcolor: "#ffffff",
  fontWeight: 800,
  textTransform: "none",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  "&:hover": {
    borderColor: "#0ea5e9",
    bgcolor: "#f0f9ff",
  },
};

const primaryButtonSx = {
  minHeight: 40,
  px: 2,
  width: { xs: "100%", sm: "auto" },
  borderRadius: "10px",
  bgcolor: "#0f766e",
  fontWeight: 800,
  textTransform: "none",
  boxShadow: "0 10px 22px rgba(15, 118, 110, 0.22)",
  "&:hover": {
    bgcolor: "#115e59",
    boxShadow: "0 12px 24px rgba(15, 118, 110, 0.28)",
  },
};
