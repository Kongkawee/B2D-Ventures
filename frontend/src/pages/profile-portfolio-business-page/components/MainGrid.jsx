import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import FundraiseHistory from './FundraiseHistory';
import StatCard from './StatCard';
import { Alert, CircularProgress } from '@mui/material';


export default function MainGrid({userInvestment}) {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Fundraise History
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ md: 12, lg: 9 }}>
          <FundraiseHistory userInvestment={userInvestment}/>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            {/* <CustomizedTreeView /> */}
            {/* <ChartUserByCountry /> */}

            {/* {loading ? (
              <CircularProgress />   // Show loading spinner while fetching data
            ) : error ? (
              <Alert severity="error">{error}</Alert>  // Show error message if fetching fails
            ) : (
              <MainGrid />  // Pass the profile data to MainGrid
            )} */}
            <StatCard userInvestment={userInvestment}/>
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
