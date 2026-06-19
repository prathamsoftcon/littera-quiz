import React, { useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InboxIcon from "@mui/icons-material/Inbox";
import RefreshIcon from "@mui/icons-material/Refresh";
import DraggableDialogPaper from "./DraggableDialogPaper";
import { useTranslation } from "../../../context/TranslationContext";

export default function UploadHistory({
  open,
  onOpen,
  onClose,
  hideTrigger = false,
  history,
  loading = false,
  error = "",
  onRetry,
  onDetails,
}) {
  const { t } = useTranslation();
  const [dateFilter, setDateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const headers = [
    t("masterUploadDate"),
    t("masterUploadUploadType"),
    t("masterUploadFile"),
    t("masterUploadStatus"),
    t("masterUploadImported"),
    t("masterUploadSkipped"),
    t("masterUploadDetails"),
  ];
  const typeOptions = ["State", "District", "Block", "CRC", "Village", "School"];
  const statusOptions = ["Complete", "Pending", "Reject"];
  const filteredHistory = useMemo(
    () =>
      history.filter((row) => {
        const rowDate = toInputDate(row.date);
        const matchesDate = !dateFilter || rowDate === dateFilter;
        const matchesType = typeFilter === "all" || row.type === typeFilter;
        const matchesStatus =
          statusFilter === "all" || normalizeStatus(row.status) === normalizeStatus(statusFilter);

        return matchesDate && matchesType && matchesStatus;
      }),
    [dateFilter, history, statusFilter, typeFilter]
  );

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
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 800 }}>
              {t("masterUploadHistory")}
            </Typography>
            <Typography sx={{ color: "#667085", fontSize: 13 }}>
              {t("masterUploadHistoryHelp")}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            onClick={onOpen}
            sx={triggerButtonSx}
          >
            {t("masterUploadHistory")}
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
            width: { xs: "calc(100vw - 32px)", sm: "calc(100vw - 64px)" },
            maxWidth: { xs: "calc(100vw - 32px)", sm: 1100 },
            maxHeight: { xs: "calc(100dvh - 32px)", sm: "calc(100dvh - 64px)" },
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
            display: "grid",
            gridTemplateColumns: { xs: "1fr auto", md: "auto minmax(0, 1fr) auto" },
            alignItems: { xs: "start", md: "center" },
            gap: 2,
            px: { xs: 2, sm: 2.5 },
            py: { xs: 1.5, sm: 1.75 },
            bgcolor: "#f8fbff",
            borderBottom: "1px solid #dbe5f1",
            fontSize: 18,
            fontWeight: 900,
            cursor: "move",
          }}
        >
          <Box sx={{ flexShrink: 0, minHeight: 38, display: "flex", alignItems: "center" }}>
            {t("masterUploadHistory")}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "stretch", md: "flex-end" },
              gap: 1,
              gridColumn: { xs: "1 / -1", md: "auto" },
              gridRow: { xs: 2, md: "auto" },
              minWidth: 0,
              flexWrap: "wrap",
              cursor: "default",
              "& .MuiFormControl-root": {
                width: { xs: "100%", sm: "calc(33.333% - 8px)", md: 140 },
              },
              "& .MuiInputBase-root": {
                minHeight: 38,
                bgcolor: "#fff",
                fontSize: 13,
                borderRadius: "10px",
              },
              "& .MuiInputLabel-root": {
                fontSize: 13,
              },
            }}
          >
            <TextField
              label={t("masterUploadDateFilter")}
              type="date"
              size="small"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              onMouseDown={(event) => event.stopPropagation()}
              InputLabelProps={{ shrink: true }}
            />

            <FormControl size="small">
              <InputLabel id="master-upload-type-filter-label">
                {t("masterUploadTypeFilter")}
              </InputLabel>
              <Select
                labelId="master-upload-type-filter-label"
                label={t("masterUploadTypeFilter")}
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <MenuItem value="all">{t("masterUploadAll")}</MenuItem>
                {typeOptions.map((type) => (
                  <MenuItem key={type} value={type}>
                    {t(`masterUploadType${type}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel id="master-upload-status-filter-label">
                {t("masterUploadStatusFilter")}
              </InputLabel>
              <Select
                labelId="master-upload-status-filter-label"
                label={t("masterUploadStatusFilter")}
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <MenuItem value="all">{t("masterUploadAll")}</MenuItem>
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {t(`masterUploadStatus${status}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <IconButton
            aria-label={t("masterUploadCloseHistory")}
            onClick={onClose}
            size="small"
            sx={{ color: "#667085", justifySelf: "end" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 1.5, sm: 2.5 }, overflow: "auto" }}>
          {loading && (
            <StatePanel
              icon={
                <CircularProgress
                  size={34}
                  thickness={4}
                  sx={{ color: "#2563eb" }}
                />
              }
              title={t("masterUploadHistoryLoading")}
              message={t("masterUploadHistoryLoadingHelp")}
            />
          )}

          {!loading && error && (
            <Box
              sx={{
                display: "grid",
                gap: 1.5,
                p: { xs: 1.5, sm: 2 },
                border: "1px solid #fecdd3",
                borderRadius: 2,
                bgcolor: "#fff7f8",
              }}
            >
              <Alert
                severity="error"
                icon={<ErrorOutlineIcon />}
                sx={{
                  alignItems: "center",
                  border: "1px solid #fecdd3",
                  bgcolor: "#fff1f2",
                  color: "#9f1239",
                  fontWeight: 700,
                }}
              >
                {error || t("masterUploadHistoryError")}
              </Alert>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "stretch", sm: "flex-end" },
                }}
              >
                <Button
                  variant="outlined"
                  onClick={onRetry}
                  startIcon={<RefreshIcon />}
                  sx={{ ...detailButtonSx, minHeight: 38, width: { xs: "100%", sm: "auto" } }}
                >
                  {t("masterUploadRetry")}
                </Button>
              </Box>
            </Box>
          )}

          {!loading && !error && !history.length && (
            <StatePanel
              icon={<InboxIcon sx={{ color: "#94a3b8", fontSize: 42 }} />}
              title={t("masterUploadNoHistoryTitle")}
              message={t("masterUploadNoHistoryHelp")}
            />
          )}

          {!loading && !error && Boolean(history.length) && (
            <>
          <Box sx={{ display: { xs: "grid", sm: "none" }, gap: 1.25, maxHeight: "calc(100dvh - 238px)", overflowY: "auto", pr: 0.25 }}>
            {filteredHistory.map((row) => (
              <Paper
                key={row.id}
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderColor: "#d8e3f2",
                  borderRadius: "12px",
                  bgcolor: "#f8fbff",
                  boxShadow: "none",
                }}
              >
                <Box sx={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", alignItems: "start", gap: 1.5 }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ color: "#0f172a", fontSize: 14, fontWeight: 900, wordBreak: "break-word" }}>
                      {row.file}
                    </Typography>
                    <Typography sx={{ mt: 0.25, color: "#667085", fontSize: 12 }}>
                      {row.date} - {t(`masterUploadType${row.type}`)}
                    </Typography>
                  </Box>
                  <Box component="span" sx={statusChipSx(row.status)}>
                    {t(`masterUploadStatus${normalizeStatus(row.status)}`)}
                  </Box>
                </Box>

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mt: 1.25 }}>
                  <Typography sx={{ color: "#667085", fontSize: 12 }}>
                    {t("masterUploadImported")}: <Box component="span" sx={{ color: "#172033", fontWeight: 800 }}>{row.imported}</Box>
                  </Typography>
                  <Typography sx={{ color: "#667085", fontSize: 12 }}>
                    {t("masterUploadSkipped")}: <Box component="span" sx={{ color: "#172033", fontWeight: 800 }}>{row.skipped}</Box>
                  </Typography>
                </Box>

                <Button
                  onClick={() => onDetails(row)}
                  variant="outlined"
                  sx={{ ...detailButtonSx, width: "100%", mt: 1.25 }}
                >
                  {t("masterUploadOpen")}
                </Button>
              </Paper>
            ))}
            {!filteredHistory.length && (
              <StatePanel
                compact
                icon={<InboxIcon sx={{ color: "#94a3b8", fontSize: 36 }} />}
                title={t("masterUploadNoHistoryRowsTitle")}
                message={t("masterUploadNoHistoryRows")}
              />
            )}
          </Box>

          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              display: { xs: "none", sm: "block" },
              borderColor: "#d8e3f2",
              borderRadius: "12px",
              boxShadow: "none",
              maxHeight: 315,
              overflowX: "auto",
              overflowY: "auto",
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {headers.map((head) => (
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
                {filteredHistory.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ borderColor: "#eef2f7" }}>{row.date}</TableCell>
                    <TableCell sx={{ borderColor: "#eef2f7" }}>{t(`masterUploadType${row.type}`)}</TableCell>
                    <TableCell sx={{ borderColor: "#eef2f7", fontWeight: 700, maxWidth: 280, wordBreak: "break-word" }}>{row.file}</TableCell>
                    <TableCell sx={{ borderColor: "#eef2f7" }}>
                      <Box
                        component="span"
                        sx={statusChipSx(row.status)}
                      >
                        {t(`masterUploadStatus${normalizeStatus(row.status)}`)}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderColor: "#eef2f7" }}>{row.imported}</TableCell>
                    <TableCell sx={{ borderColor: "#eef2f7" }}>{row.skipped}</TableCell>

                    <TableCell sx={{ borderColor: "#eef2f7" }}>
                      <Button
                        onClick={() => onDetails(row)}
                        variant="outlined"
                        sx={detailButtonSx}
                      >
                        {t("masterUploadOpen")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!filteredHistory.length && (
                  <TableRow>
                    <TableCell colSpan={headers.length} sx={{ p: 0, borderColor: "#eef2f7" }}>
                      <StatePanel
                        compact
                        icon={<InboxIcon sx={{ color: "#94a3b8", fontSize: 36 }} />}
                        title={t("masterUploadNoHistoryRowsTitle")}
                        message={t("masterUploadNoHistoryRows")}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
            </>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 1.5, sm: 2.5 },
            py: 2,
            bgcolor: "#f8fbff",
            borderTop: "1px solid #dbe5f1",
            "& > button": { width: { xs: "100%", sm: "auto" } },
          }}
        >
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              minHeight: 38,
              borderRadius: 1,
              bgcolor: "#0f766e",
              fontWeight: 800,
              textTransform: "none",
              boxShadow: "0 10px 22px rgba(15, 118, 110, 0.22)",
              "&:hover": { bgcolor: "#115e59" },
            }}
          >
            {t("masterUploadClose")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function StatePanel({
  icon,
  title,
  message,
  compact = false,
}) {
  return (
    <Box
      sx={{
        minHeight: compact ? 170 : 260,
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        p: { xs: 2, sm: compact ? 3 : 4 },
        border: "1px dashed #cbd8ea",
        borderRadius: "12px",
        bgcolor: "#f8fbff",
      }}
    >
      <Box sx={{ maxWidth: 420 }}>
        <Box
          sx={{
            width: 58,
            height: 58,
            mx: "auto",
            mb: 1.25,
            display: "grid",
            placeItems: "center",
            borderRadius: 2,
            bgcolor: "#ffffff",
            border: "1px solid #dbe5f1",
          }}
        >
          {icon}
        </Box>
        <Typography sx={{ color: "#0f172a", fontSize: 16, fontWeight: 900 }}>
          {title}
        </Typography>
        <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

function toInputDate(value) {
  if (!value) return "";

  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const text = String(value).trim();
  const shortDateMatch = text.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);

  if (shortDateMatch) {
    const [, day, month, year] = shortDateMatch;
    return `${year}-${months[month] || ""}-${day.padStart(2, "0")}`;
  }

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeStatus(status) {
  const text = String(status || "").toLowerCase();

  if (text === "complete") return "Complete";
  if (text === "pending") return "Pending";
  if (text === "reject" || text === "rejected") return "Reject";

  return status || "";
}

const triggerButtonSx = {
  minHeight: 38,
  borderRadius: 1,
  borderColor: "#94a3b8",
  color: "#1e293b",
  bgcolor: "#fff",
  fontWeight: 800,
  textTransform: "none",
  whiteSpace: "nowrap",
  width: { xs: "100%", sm: "auto" },
};

const detailButtonSx = {
  minHeight: 34,
  borderRadius: 1,
  borderColor: "#94a3b8",
  color: "#1e293b",
  fontWeight: 800,
  textTransform: "none",
};

function statusChipSx(status) {
  const normalizedStatus = String(status).toLowerCase();
  const isComplete = normalizedStatus === "complete";
  const isRejected = normalizedStatus === "reject" || normalizedStatus === "rejected";

  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    px: 1,
    py: 0.625,
    borderRadius: 999,
    color: isComplete ? "#15803d" : isRejected ? "#be123c" : "#b45309",
    bgcolor: isComplete ? "#dcfce7" : isRejected ? "#ffe4e6" : "#fef3c7",
    fontSize: 12,
    fontWeight: 800,
    whiteSpace: "nowrap",
  };
}
