import * as React from 'react';
import { useState } from 'react';
import { Typography, Stack, Divider, Button } from '@mui/material';
import PopUpRisks from '../../../components/PopUp/PopUpRisks';

export default function RisksAcceptance() {
  const [openRisksDialog, setOpenRisksDialog] = useState(false);

  const handleOpenRisksDialog = () => {
    setOpenRisksDialog(true);
  };

  const handleCloseRisksDialog = () => {
    setOpenRisksDialog(false);
  };

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
            By clicking "Next" you acknowledge that you have read, understood, and agree to the risks and disclaimers outlined. 
            You accept that certain risks may arise in the future, and you agree to proceed with full awareness of these potential uncertainties.
          </Typography>
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenRisksDialog}
            sx={{ mt: 2 }}
          >
            View Risks
          </Button>
        </div>
      </Stack>

      <PopUpRisks open={openRisksDialog} handleClose={handleCloseRisksDialog} />
    </Stack>
  );
}
