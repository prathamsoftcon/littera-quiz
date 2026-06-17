import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function ValidationSummary({
  summary,
}) {
  return (
    <Grid container spacing={2} mb={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography>
              Total Records
            </Typography>
            <Typography variant="h5">
              {summary.total}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography>
              Valid Records
            </Typography>
            <Typography variant="h5">
              {summary.valid}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography>
              Missing Fields
            </Typography>
            <Typography variant="h5">
              {summary.missing}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}