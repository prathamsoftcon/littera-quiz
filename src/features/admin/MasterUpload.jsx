import React, { useState } from "react";
import {
  Box,
  Button,
} from "@mui/material";

import UploadTypeSelection from "./master-upload/UploadTypeSelection";
import FileUpload from "./master-upload/FileUpload";
import TemplateRequiredFields from "./master-upload/TemplateRequiredFields";
import ValidationSummary from "./master-upload/ValidationSummary";
import ImportConfirmationDialog from "./master-upload/ImportConfirmationDialog";
import ImportCompleteScreen from "./master-upload/ImportCompleteScreen";
import UploadHistory from "./master-upload/UploadHistory";
import UploadDetailsDialog from "./master-upload/UploadDetailsDialog";

export default function MasterUpload() {
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
      alert("Please upload a file first.");
      return;
    }

    // Temporary mock data
    setSummary({
      total: rowCount || 1246,
      valid: 1188,
      missing: 24,
    });
  };

  // Import Records
  const handleImport = () => {
    setConfirmOpen(false);
    setImportComplete(true);

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
            <Button
              variant="outlined"
              onClick={() => setHistoryOpen(true)}
              sx={secondaryButtonSx}
            >
              Upload History
            </Button>
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
                Validate File
              </Button>

              <Button
                variant="contained"
                onClick={() => setConfirmOpen(true)}
                disabled={!summary.valid}
                sx={primaryButtonSx}
              >
                Import Records
              </Button>
            </>
          }
        />
      </Section>

      <UploadHistory
        hideTrigger
        open={historyOpen}
        onOpen={() => setHistoryOpen(true)}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onDetails={handleViewDetails}
      />

      {/* Import Confirmation Dialog */}
      <ImportConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onImport={handleImport}
        uploadType={uploadType}
        file={file}
        summary={summary}
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
    </Box>
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
