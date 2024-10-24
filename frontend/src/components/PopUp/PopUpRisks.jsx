import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";

export default function PopUpRisks({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Risks Acceptance</DialogTitle>
      <DialogContent>
        <Typography variant="body2" component="p">
          Investments carry various risks, including but not limited to:
        </Typography>
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            1. Market Risk
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Investments are subject to market fluctuations, which may result in
            a loss of capital.
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            2. Liquidity Risk
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Some investments may not be easily converted into cash without
            substantial loss in value.
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            3. Business Risk
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            The performance and success of the business are not guaranteed, and
            operational challenges could lead to losses.
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            4. Currency Risk
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Fluctuations in exchange rates may affect the value of your
            investment if foreign currencies are involved.
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            5. Credit Risk
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            If the business or entity is unable to meet its obligations, you
            could face losses.
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            6. Regulatory and Political Risk
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Changes in policies, regulations, or political instability could
            affect businesses and your investment returns.
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            7. Cybersecurity Risk
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Cybersecurity breaches could affect business operations and
            financial health.
          </Typography>
        </Box>
      </DialogContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </Box>
    </Dialog>
  );
}
