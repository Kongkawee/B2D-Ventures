import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";

export default function PopUpTerms({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Terms of Service</DialogTitle>
      <DialogContent>
        <Typography variant="body2" component="p" gutterBottom>
          Welcome to B2D Ventures! These Terms of Service ("Terms") govern your
          access to and use of the B2D Ventures website and services, including
          any content, functionality, and services offered on or through the
          platform (collectively, the "Services").
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          By accessing or using the Services, you acknowledge that you have
          read, understood, and agree to be bound by these Terms. These Terms
          apply to all users of the platform, including visitors, registered
          users, businesses, and investors.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          2. Modification of Terms
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          We reserve the right to modify these Terms at any time. If we make
          material changes, we will provide notice through our Services or by
          other means. Your continued use of the Services after any such changes
          constitutes your acceptance of the updated Terms.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          3. Eligibility
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          You must be at least 18 years old to use our Services. By using the
          Services, you represent and warrant that you are of legal age to form
          a binding contract and meet all the eligibility requirements.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          4. Account Registration
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          To access certain features of our Services, you may be required to
          register for an account. You are responsible for maintaining the
          confidentiality of your account and password.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          5. Use of Services
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          You agree to use the Services only for lawful purposes and in
          accordance with these Terms. You will not engage in any fraudulent
          activity, misrepresent your identity, or interfere with the platform's
          functionality.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          6. Investment Transactions
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          B2D Ventures provides a platform for businesses seeking investment.
          B2D Ventures does not guarantee the success or profitability of any
          investment opportunity presented. All investment decisions are made at
          your own risk.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          7. Fees and Payments
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Some aspects of the Services may be subject to fees. Payment terms
          will be presented to you before you complete any financial
          transactions on the platform.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          8. Termination
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          We may suspend or terminate your access to the Services at any time,
          without prior notice, for any reason, including if you breach these
          Terms.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          9. Limitation of Liability
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          To the fullest extent permitted by law, B2D Ventures shall not be
          liable for any indirect, incidental, or punitive damages resulting
          from your use of the Services.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          11. Contact Information
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          For any questions or concerns, please contact us at
          b2dventures@gmail.com.
        </Typography>
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
