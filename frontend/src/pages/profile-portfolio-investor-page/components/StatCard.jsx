import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function StatCard({ userInvestment }) {
  const [totalInvestment, setTotalInvestment] = useState(0);

  // Calculate the total investment whenever userInvestment changes
  useEffect(() => {
    if (userInvestment && userInvestment.length > 0) {
      const total = userInvestment.reduce((acc, investment) => acc + investment.amount, 0);
      setTotalInvestment(total);
    }
  }, [userInvestment]);

  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total Investment
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}
        >
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Typography id="total-investment" variant="h4" component="p" alignSelf="center">
              {totalInvestment.toFixed(2).toLocaleString()}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default StatCard;
