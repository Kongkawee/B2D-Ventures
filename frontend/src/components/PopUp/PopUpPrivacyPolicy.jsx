import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";

export default function PopUpPrivacyPolicy({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Privacy Policy</DialogTitle>
      <DialogContent>
        <Typography variant="body2" component="p" gutterBottom>
          At B2D Ventures, we are committed to protecting your privacy. This
          Privacy Policy outlines the types of information we collect, how we
          use and safeguard that information, and your rights regarding your
          personal data.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          We may collect personal information such as your name, email address,
          contact information, and payment details when you register, invest, or
          interact with our platform. Additionally, we may collect non-personal
          information such as browser type, device information, and usage data.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          We use your personal information to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" component="p">
              Provide and improve our services.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" component="p">
              Process transactions and send related information.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" component="p">
              Communicate with you about updates, promotions, and services.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" component="p">
              Ensure compliance with applicable legal obligations.
            </Typography>
          </li>
        </ul>

        <Typography variant="h6" component="h6" gutterBottom>
          3. Sharing Your Information
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          We do not share your personal information with third parties except as
          necessary to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" component="p">
              Process payments or provide related services.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" component="p">
              Comply with legal requirements.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" component="p">
              Protect the rights and safety of B2D Ventures and our users.
            </Typography>
          </li>
        </ul>

        <Typography variant="h6" component="h6" gutterBottom>
          4. Data Security
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          We take the security of your personal information seriously. We use
          various technologies and procedures to safeguard your data, including
          encryption and secure servers. However, no method of transmission over
          the internet or electronic storage is 100% secure.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          5. Your Rights
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          You have the right to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" component="p">
              Access, correct, or delete your personal information.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" component="p">
              Opt out of marketing communications.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" component="p">
              Withdraw your consent to data processing, where applicable.
            </Typography>
          </li>
        </ul>

        <Typography variant="h6" component="h6" gutterBottom>
          6. Changes to this Privacy Policy
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal obligations. Any updates will be posted on
          this page, and we encourage you to review it periodically.
        </Typography>

        <Typography variant="h6" component="h6" gutterBottom>
          7. Contact Us
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at b2dventures@gmail.com
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
