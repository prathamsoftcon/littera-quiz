import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DraggableDialogPaper from "./DraggableDialogPaper";

export default function UploadHistory({
  open,
  onOpen,
  onClose,
  hideTrigger = false,
  history,
  onDetails,
}) {
  return (
    <Box>
      {!hideTrigger && (
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
            pb: 1.5,
            borderBottom: "1px solid #d7deea",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 800 }}>
              Upload History
            </Typography>
            <Typography sx={{ color: "#667085", fontSize: 13 }}>
              Open the upload history table in a popup.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            onClick={onOpen}
            sx={triggerButtonSx}
          >
            Upload History
          </Button>
        </Box>
      )}

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperComponent={DraggableDialogPaper}
        PaperProps={{
          sx: {
            borderRadius: 2,
            border: "1px solid #d8e3f2",
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.16)",
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
            px: 2.5,
            py: 1.75,
            bgcolor: "#f8fbff",
            borderBottom: "1px solid #dbe5f1",
            fontSize: 18,
            fontWeight: 900,
            cursor: "move",
          }}
        >
          Upload History
          <IconButton
            aria-label="Close upload history"
            onClick={onClose}
            size="small"
            sx={{ color: "#667085" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 2.5 }}>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              borderColor: "#d8e3f2",
              borderRadius: 2,
              boxShadow: "none",
              maxHeight: 315,
              overflowX: "auto",
              overflowY: "auto",
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {["Date", "Upload Type", "File", "Status", "Imported", "Skipped", "Details"].map((head) => (
                    <TableCell
                      key={head}
                      sx={{
                        color: "#667085",
                        fontSize: 11,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        borderColor: "#dbe5f1",
                        bgcolor: "#f8fbff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {history.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ borderColor: "#eef2f7" }}>{row.date}</TableCell>
                    <TableCell sx={{ borderColor: "#eef2f7" }}>{row.type}</TableCell>
                    <TableCell sx={{ borderColor: "#eef2f7", fontWeight: 700 }}>{row.file}</TableCell>
                    <TableCell sx={{ borderColor: "#eef2f7" }}>
                      <Box
                        component="span"
                        sx={{
                          display: "inline-flex",
                          px: 1,
                          py: 0.625,
                          borderRadius: 999,
                          color: row.status === "Complete" ? "#15803d" : "#b45309",
                          bgcolor: row.status === "Complete" ? "#dcfce7" : "#fef3c7",
                          fontSize: 12,
                          fontWeight: 800,
                        }}
                      >
                        {row.status}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderColor: "#eef2f7" }}>{row.imported}</TableCell>
                    <TableCell sx={{ borderColor: "#eef2f7" }}>{row.skipped}</TableCell>

                    <TableCell sx={{ borderColor: "#eef2f7" }}>
                      <Button
                        onClick={() => onDetails(row)}
                        variant="outlined"
                        sx={{
                          minHeight: 34,
                          borderRadius: 1,
                          borderColor: "#cbd8ea",
                          color: "#172033",
                          fontWeight: 800,
                          textTransform: "none",
                        }}
                      >
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions sx={{ px: 2.5, py: 2, bgcolor: "#f8fbff", borderTop: "1px solid #dbe5f1" }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              minHeight: 38,
              borderRadius: 1,
              bgcolor: "#2563eb",
              fontWeight: 800,
              textTransform: "none",
              boxShadow: "0 8px 18px rgba(37, 99, 235, 0.22)",
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const triggerButtonSx = {
  minHeight: 38,
  borderRadius: 1,
  borderColor: "#d7deea",
  color: "#172033",
  bgcolor: "#fff",
  fontWeight: 800,
  textTransform: "none",
  whiteSpace: "nowrap",
};
