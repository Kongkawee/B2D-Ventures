import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import LogoLight from "../../images/LogoLight.png";
import LogoDark from "../../images/LogoDark.png";
import { PASSWORD_REQUEST_API } from "../../constants";
import api from "../../api";



const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const logoStyle = {
  width: "100px",
  margin: "10px",
  height: "auto",
  cursor: "pointer",
};

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function RequestResetPasswordCard({ mode }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const validateInputs = () => {
    const email = document.getElementById("email").value;
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const email = document.getElementById("email").value;
  
      try {
        const response = await api.post(PASSWORD_REQUEST_API, { email });
  
        if (response.status === 200) {
          alert("Password reset link has been sent to your email.");
        }
      } catch (error) {
        console.error("Error during password reset request:", error);
        if (error.response) {
          alert(
            error.response.data.error ||
              "Failed to request password reset. Please try again."
          );
        } else {
          alert("Network error. Please try again later.");
        }
      }
    }
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <img
          src={mode === "light" ? LogoLight : LogoDark}
          style={logoStyle}
          alt="logo of b2d"
        />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)", textAlign: "center", fontWeight: 'bold' }}
      >
        Reset Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email for password reset</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "8px",
                },
              },
            }}
          />
        </FormControl>
        <SubmitButton id="sign-in-button" type="submit" fullWidth>
          Submit Email
        </SubmitButton>
      </Box>
    </Card>
  );
}