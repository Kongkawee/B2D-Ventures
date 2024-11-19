import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "./ChartUserByCountry";
import FundraiseHistory from "./FundraiseHistory";
import StatCard from "./StatCard";
import { Alert, CircularProgress } from "@mui/material";

export default function MainGrid({ currentInvestment, userInvestment }) {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Grid container spacing={2} columns={12}>
        <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
          Fundraise Status
        </Typography>
        <Grid size={{ xs: 12, lg: 12 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "row" }}>
            {/* <CustomizedTreeView /> */}
            {/* <ChartUserByCountry /> */}
            <StatCard currentInvestment={currentInvestment} />
            {/* <StatCard currentInvestment={currentInvestment} /> */}
            {/* <StatCard currentInvestment={currentInvestment} /> */}
          </Stack>
        </Grid>
        <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
          Fundraise History
        </Typography>
        <Grid size={{ xs: 12, lg: 12 }}>
          <FundraiseHistory userInvestment={userInvestment} />
        </Grid>
        {/* <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
          Investor
        </Typography>
        <Grid size={{ xs: 12, lg: 12 }}>
          <FundraiseHistory userInvestment={userInvestment} />
        </Grid> */}
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
