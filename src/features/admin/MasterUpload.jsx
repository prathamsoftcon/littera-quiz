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
  const handleValidate = () => {
    if (!file) {
      alert(t("masterUploadUploadFileFirst"));
      return;
    }

    // Temporary mock data
    setSummary({
      total: rowCount || 1246,
      valid: 1188,
      missing: 24,
    });
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
        gap: 2,
        color: "#172033",
      }}
    >
      <Section>
        <ValidationSummary
          summary={summary}
          actions={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "stretch", sm: "flex-end" },
                gap: 1,
                width: { xs: "100%", sm: "auto" },
                flexWrap: "wrap",
              }}
            >
              <IconButton
                aria-label={t("masterUploadNotifications")}
                onClick={() => setNotificationOpen(true)}
                sx={{
                  width: { xs: "100%", sm: 40 },
                  minHeight: 40,
                  border: "1px solid #cbd8ea",
                  borderRadius: 1.25,
                  color: "#132238",
                  bgcolor: "#fff",
                  "&:hover": {
                    borderColor: "#2563eb",
                    bgcolor: "#eff6ff",
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
          }
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
          borderRadius: 2,
          border: "1px solid #d8e3f2",
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
                  borderRadius: 2,
                  bgcolor: "#ffffff",
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
        p: { xs: 2, md: 2.25 },
        border: "1px solid #d8e3f2",
        borderRadius: 2,
        bgcolor: "rgba(255, 255, 255, 0.96)",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
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
  borderRadius: 1.25,
  borderColor: "#cbd8ea",
  color: "#132238",
  bgcolor: "#ffffff",
  fontWeight: 800,
  textTransform: "none",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  "&:hover": {
    borderColor: "#2563eb",
    bgcolor: "#eff6ff",
  },
};

const primaryButtonSx = {
  minHeight: 40,
  px: 2,
  width: { xs: "100%", sm: "auto" },
  borderRadius: 1.25,
  bgcolor: "#2563eb",
  fontWeight: 800,
  textTransform: "none",
  boxShadow: "0 8px 18px rgba(37, 99, 235, 0.22)",
  "&:hover": {
    bgcolor: "#1d4ed8",
    boxShadow: "0 10px 22px rgba(37, 99, 235, 0.28)",
  },
};
