import React, { useMemo, useState } from "react";
import {
  Box,
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DraggableDialogPaper from "./DraggableDialogPaper";
import { useTranslation } from "../../../context/TranslationContext";

export default function UploadHistory({
  open,
  onOpen,
  onClose,
  hideTrigger = false,
  history,
  onDetails,
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
        fullScreen={fullScreen}
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
          <Box sx={{ flexShrink: 0 }}>
            {t("masterUploadHistory")}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
              flex: 1,
              minWidth: 0,
              flexWrap: "wrap",
              cursor: "default",
              "& .MuiFormControl-root": {
                width: { xs: "100%", sm: 140 },
              },
              "& .MuiInputBase-root": {
                minHeight: 38,
                bgcolor: "#fff",
                fontSize: 13,
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
            sx={{ color: "#667085" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
          <Box sx={{ display: { xs: "grid", sm: "none" }, gap: 1.25 }}>
            {filteredHistory.map((row) => (
              <Paper
                key={row.id}
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderColor: "#d8e3f2",
                  borderRadius: 2,
                  boxShadow: "none",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1.5 }}>
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
              <Typography sx={{ color: "#667085", fontSize: 13, py: 3, textAlign: "center" }}>
                {t("masterUploadNoHistoryRows")}
              </Typography>
            )}
          </Box>

          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              display: { xs: "none", sm: "block" },
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
                    <TableCell colSpan={headers.length} sx={{ py: 4, color: "#667085", textAlign: "center" }}>
                      {t("masterUploadNoHistoryRows")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions sx={{ px: { xs: 1.5, sm: 2.5 }, py: 2, bgcolor: "#f8fbff", borderTop: "1px solid #dbe5f1" }}>
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
            {t("masterUploadClose")}
          </Button>
        </DialogActions>
      </Dialog>
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
  borderColor: "#d7deea",
  color: "#172033",
  bgcolor: "#fff",
  fontWeight: 800,
  textTransform: "none",
  whiteSpace: "nowrap",
  width: { xs: "100%", sm: "auto" },
};

const detailButtonSx = {
  minHeight: 34,
  borderRadius: 1,
  borderColor: "#cbd8ea",
  color: "#172033",
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
