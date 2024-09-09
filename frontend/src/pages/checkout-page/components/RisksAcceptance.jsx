import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type:', detail: 'Visa' },
  { name: 'Card holder:', detail: 'Mr. John Smith' },
  { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date:', detail: '04/2024' },
];

export default function RisksAcceptance() {
  return (
    <Stack spacing={2}>
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            Risk Acceptance
          </Typography>
          <Typography variant="subtitle4" gutterBottom sx={{ color: 'text.secondary' }}>
          By clicking "Next" you acknowledge that you have read, understood, and agree 
          to the risks and disclaimers outlined. You accept that certain risks may arise 
          in the future, and you agree to proceed with full awareness of these potential 
          uncertainties.
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Risks
          </Typography>
          <Grid container>
            <React.Fragment>
            <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: '100%', mb: 1 }}
            >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                -
                </Typography>
                <Typography 
                variant="body2" 
                component="a"
                href="/"
                target="_blank"
                sx={{
                    textDecoration: 'none',
                    color: '#1976d2',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                Risk from changes of exchange rate
                </Typography>
            </Stack>
            </React.Fragment>
            <React.Fragment>
            <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: '100%', mb: 1 }}
            >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                -
                </Typography>
                <Typography 
                variant="body2" 
                component="a"
                href="/"
                target="_blank"
                sx={{
                    textDecoration: 'none',
                    color: '#1976d2',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                Risk from transaction charge
                </Typography>
            </Stack>
            </React.Fragment>
            <React.Fragment>
            <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: '100%', mb: 1 }}
            >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                -
                </Typography>
                <Typography 
                variant="body2" 
                component="a"
                href="/"
                target="_blank"
                sx={{
                    textDecoration: 'none',
                    color: '#1976d2',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                Risk from business
                </Typography>
            </Stack>
            </React.Fragment>
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
