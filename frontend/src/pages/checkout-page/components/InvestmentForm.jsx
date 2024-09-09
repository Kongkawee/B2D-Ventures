import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function InvesmentForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel required>
          Invest Volume
        </FormLabel>
        <OutlinedInput
          id="invest-amount"
          name="invest-amount"
          placeholder="Investment Amount"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel>
          Capital Gained
        </FormLabel>
        <OutlinedInput
          id="capital-gain"
          name="capital-gain"
          placeholder="Capital Gained"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="read" value="yes" />}
          label="You have read our Terms of Services."
        />
      </FormGrid>
    </Grid>
  );
}
