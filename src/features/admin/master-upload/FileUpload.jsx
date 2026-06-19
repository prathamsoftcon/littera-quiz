import React, { useState } from "react";
import UploadBox from "../../question-bank/UploadBox";
import {
  Box,
  Paper,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTranslation } from "../../../context/TranslationContext";

const muted = "#667085";
const brand = "#2563eb";

export default function FileUpload({
  file: externalFile,
  setFile,
  setError,
  setRowCount,
}) {
  const { t } = useTranslation();
  const [localFile, setLocalFile] = useState(null);
  const [previewLines, setPreviewLines] = useState(null);
  const file = externalFile || localFile;

  function handleFile(f) {
    setLocalFile(f);
    setFile && setFile(f);

    if (!f) {
      setPreviewLines(null);
      setRowCount && setRowCount(0);
      return;
    }

    const extension = f.name.split(".").pop().toLowerCase();
    const unsupported = !["csv", "xlsx"].includes(extension);
    setError && setError(unsupported ? t("masterUploadUnsupportedFileNamed").replace("{file}", f.name) : "");

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result || "";
      const lines = text.split(/\r?\n/).filter(Boolean);
      setPreviewLines(lines.slice(0, 6));
      setRowCount && setRowCount(Math.max(lines.length - 1, 0));
    };
    reader.readAsText(f);
  }

  const extension = file?.name.split(".").pop().toLowerCase();
  const isUnsupported = file && !["csv", "xlsx"].includes(extension);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2,
          pb: 2,
          borderBottom: `1px solid #dbe5f1`,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ color: "#0f172a", fontSize: 18, fontWeight: 900 }}>
            {t("masterUploadFileUpload")}
          </Typography>
          <Typography sx={{ mt: 0.25, color: "#52627a", fontSize: 13.5 }}>
            {t("masterUploadFileUploadHelp")}
          </Typography>
        </Box>
        <Box
          component="span"
          sx={{
            px: 1.25,
            py: 0.75,
            borderRadius: 999,
            color: "#b45309",
            bgcolor: "#fef3c7",
            border: "1px solid #fde68a",
            fontSize: 12,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          {t("masterUploadCsvXlsxOnly")}
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Box
          sx={{
            minHeight: 236,
            p: { xs: 2.5, md: 3 },
            border: "1.5px dashed #86a6d5",
            borderRadius: 2,
            bgcolor: "#f8fbff",
            background: "linear-gradient(180deg, #ffffff 0%, #f6fbff 100%)",
            textAlign: "center",
            display: "grid",
            placeItems: "center",
            transition: "border-color 160ms ease, background 160ms ease, box-shadow 160ms ease",
            "&:hover": {
              borderColor: "#2563eb",
              boxShadow: "inset 0 0 0 1px rgba(37, 99, 235, 0.08)",
            },
            "& .upload-box": {
              width: "100%",
              border: "0 !important",
              background: "transparent !important",
              padding: "0 !important",
            },
            "& .upload-box > div": {
              alignItems: "center",
              gap: "8px !important",
            },
            "& strong": {
              color: "#0f172a",
              fontSize: 18,
              fontWeight: 900,
            },
            "& span": {
              color: "#52627a",
            },
            "& button": {
              minHeight: 40,
              px: 2,
              py: 1,
              border: `1px solid ${brand}`,
              borderRadius: 1.25,
              color: "#fff",
              bgcolor: brand,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 8px 18px rgba(37, 99, 235, 0.22)",
            },
          }}
        >
          <Box>
            <Box
              sx={{
                width: 58,
                height: 58,
                mx: "auto",
                mb: 1.5,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                color: "#1d4ed8",
                bgcolor: "#eff6ff",
                border: "1px solid #bfdbfe",
              }}
            >
              <CloudUploadIcon />
            </Box>
            <UploadBox
              onFile={handleFile}
              title={t("masterUploadCsvXlsx")}
              chooseLabel={t("masterUploadChooseFile")}
              emptyLabel={t("masterUploadDragFileHere")}
            />
          </Box>
        </Box>

        <Box sx={{ display: "grid", gap: 1.5, alignContent: "start" }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              minHeight: 104,
              borderColor: "#d9e4f2",
              borderRadius: 2,
              bgcolor: "#ffffff",
              boxShadow: "0 6px 16px rgba(15, 23, 42, 0.04)",
            }}
          >
            <Typography
              sx={{
                mb: 0.75,
                color: "#5d6b82",
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              {t("masterUploadFileInformation")}
            </Typography>
            {file ? (
              <>
                <Typography sx={{ color: "#0f172a", fontSize: { xs: 20, sm: 24 }, lineHeight: 1.2, fontWeight: 900, wordBreak: "break-word" }}>
                  {file.name}
                </Typography>
                <Typography sx={{ mt: 0.75, color: "#52627a", fontSize: 13 }}>
                  {(file.size / 1024).toFixed(0)} KB - {extension.toUpperCase()}
                  {previewLines && ` - ${t("masterUploadRowsDetected").replace("{count}", previewLines.length)}`}
                </Typography>
              </>
            ) : (
              <Typography sx={{ color: muted, fontSize: 13 }}>
                {t("masterUploadFileDetailsEmpty")}
              </Typography>
            )}
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              minHeight: 104,
              borderColor: isUnsupported ? "#fda4af" : "#d9e4f2",
              borderRadius: 2,
              bgcolor: isUnsupported ? "#fff7f8" : "#ffffff",
              boxShadow: "0 6px 16px rgba(15, 23, 42, 0.04)",
            }}
          >
            <Typography
              sx={{
                mb: 0.75,
                color: "#5d6b82",
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              {t("masterUploadUnsupportedFileTypeError")}
            </Typography>
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                px: 1.1,
                py: 0.65,
                borderRadius: 999,
                color: isUnsupported ? "#be123c" : muted,
                bgcolor: isUnsupported ? "#ffe4e6" : "#eef2f7",
                fontSize: 12,
                fontWeight: 800,
                maxWidth: "100%",
                wordBreak: "break-word",
              }}
            >
              {isUnsupported
                ? t("masterUploadUnsupportedFileNamed").replace("{file}", file.name)
                : t("masterUploadNoFileTypeError")}
            </Box>
            <Typography sx={{ mt: 1, color: "#52627a", fontSize: 13 }}>
              {t("masterUploadUnsupportedFileHelp")}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
