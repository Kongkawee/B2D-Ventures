import * as React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, Link } from '@mui/material';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function InvestmentForm({ business, onDetailsChange, handleOpenTermsDialog }) {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [capitalGain, setCapitalGain] = useState('');

  const calculateCapitalGain = (amount) => {
    const pricePerShare = parseFloat(business.price_per_share);
    if (pricePerShare && !isNaN(amount)) {
      return amount / pricePerShare;
    }
    return 0;
  };

  const handleInvestmentChange = (e) => {
    const value = e.target.value; 
    if (!/^\d*\.?\d*$/.test(value)) {
      return; 
    }

    const amount = parseFloat(value);
    setInvestmentAmount(value);

    if (!isNaN(amount)) {
      const gain = calculateCapitalGain(amount);
      setCapitalGain(gain.toFixed(2)); 
      onDetailsChange({ amount, capitalGain: gain });
    } else {
      setCapitalGain('');
      onDetailsChange({ amount: 0, capitalGain: 0 });
    }
  };

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel required>
          Invest Volume
        </FormLabel>
        <OutlinedInput
          id="invest-amount"
          name="invest-amount"
          placeholder="Investment Amount"
          required
          size="small"
          value={investmentAmount}
          onChange={handleInvestmentChange}
          type="text" 
        />
      </FormGrid>
      <FormGrid item xs={12} md={10}>
        <FormLabel>
          Capital Gained
        </FormLabel>
        <OutlinedInput
          id="capital-gain"
          name="capital-gain"
          placeholder="Capital Gained"
          required
          size="small"
          value={capitalGain}
          readOnly
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox id="terms-button" name="read" value="yes" />}
          label={
            <>
              You have read our&nbsp;
              <Link
                onClick={handleOpenTermsDialog}
                color="primary"
                sx={{ cursor: 'pointer' }}
              >
                Terms of Services
              </Link>.
            </>
          }
        />
      </FormGrid>
    </Grid>
  );
}
