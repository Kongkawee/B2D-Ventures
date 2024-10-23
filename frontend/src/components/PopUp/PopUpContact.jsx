import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Link,
} from "@mui/material";

export default function PopUpContact({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Contact Us</DialogTitle>
      <DialogContent>
        <Typography variant="body2" component="p" gutterBottom>
          We are happy to assist you with any inquiries or issues. You can reach
          us through the following contact information:
        </Typography>
        <Typography variant="h6" component="h6" gutterBottom>
          Email:
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          <Link href="mailto:b2dventures@gmail.com" color="primary">
            b2dventures@gmail.com
          </Link>
        </Typography>
        <Typography variant="h6" component="h6" gutterBottom>
          GitHub:
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          <Link
            href="https://github.com/Kongkawee/B2D-Ventures"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            B2D Ventures GitHub Repository
          </Link>
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
