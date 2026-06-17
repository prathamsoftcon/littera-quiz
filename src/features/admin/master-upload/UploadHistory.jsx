import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import {
  Typography,
} from "@mui/material";

export default function UploadHistory({
  history,
  onDetails,
}) {
  return (
    <Table>
      <TableHead>
        <Typography variant="h6" mb={2}>
            Master Upload History
        </Typography>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>File</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Imported</TableCell>
          <TableCell>Skipped</TableCell>
          <TableCell>Details</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {history.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.file}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.imported}</TableCell>
            <TableCell>{row.skipped}</TableCell>

            <TableCell>
              <Button
                onClick={() => onDetails(row)}
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}