import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";

export default function PopUpAboutUs({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>About Us</DialogTitle>
      <DialogContent>
        <Typography variant="body2" component="p">
          At B2D Ventures, we believe in empowering individuals and businesses
          by providing innovative investment solutions that help them achieve
          financial success. Our mission is to democratize investment
          opportunities, making them accessible to everyone, whether you are an
          aspiring entrepreneur or an experienced investor.
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
