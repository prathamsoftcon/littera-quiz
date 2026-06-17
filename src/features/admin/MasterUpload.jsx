import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Divider,
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
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ p: 3 }}>
        {/* Upload Type Selection */}
        <UploadTypeSelection
          uploadType={uploadType}
          setUploadType={setUploadType}
        />

        <Divider sx={{ my: 3 }} />

        {/* File Upload */}
        <FileUpload
          file={file}
          setFile={setFile}
          error={error}
          setError={setError}
          rowCount={rowCount}
          setRowCount={setRowCount}
        />

        <Divider sx={{ my: 3 }} />

        {/* Template & Required Fields */}
        <TemplateRequiredFields
          uploadType={uploadType}
        />

        <Divider sx={{ my: 3 }} />

        {/* Validation Summary */}
        <ValidationSummary summary={summary} />

        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleValidate}
          >
            Validate File
          </Button>

          <Button
            variant="contained"
            onClick={() => setConfirmOpen(true)}
            disabled={!summary.valid}
          >
            Import Records
          </Button>
        </Box>

        {/* Import Complete */}
        {importComplete && (
          <>
            <Divider sx={{ my: 3 }} />

            <ImportCompleteScreen
              imported={summary.valid}
              skipped={
                summary.total - summary.valid
              }
            />
          </>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Upload History */}
        <UploadHistory
          history={history}
          onDetails={handleViewDetails}
        />
      </Paper>

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
    </Box>
  );
}