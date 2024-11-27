import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
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
import api from "../../api";
import { PASSWORD_RESET_API, SIGN_IN_PATH } from "../../constants";


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

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function ResetPasswordCard() {
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
  const { token } = useParams();

  const validateInputs = () => {
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    let isValid = true;

    if (!newPassword || newPassword.length < 6) {
      setNewPasswordError(true);
      setNewPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setNewPasswordError(false);
      setNewPasswordErrorMessage("");
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }

    return isValid;
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      // Handle the password change logic
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      try {
        const response = await api.post(`${PASSWORD_RESET_API}${token}/`, {
          new_password: newPassword,
          confirm_password: confirmPassword,
        });

      if (response.status === 200) {
        alert("Password reset successful. You can now log in.");
        Navigate(SIGN_IN_PATH);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Password reset failed. Please try again.");
    }
  }
};

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)", textAlign: "center", fontWeight: 'bold' }}
      >
        Change Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="new-password">New Password</FormLabel>
          <TextField
            error={newPasswordError}
            helperText={newPasswordErrorMessage}
            id="new-password"
            name="new-password"
            type="password"
            placeholder="Enter new password"
            required
            fullWidth
            variant="outlined"
            color={newPasswordError ? "error" : "primary"}
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
        <FormControl>
          <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
          <TextField
            error={confirmPasswordError}
            helperText={confirmPasswordErrorMessage}
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="Confirm new password"
            required
            fullWidth
            variant="outlined"
            color={confirmPasswordError ? "error" : "primary"}
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
        <SubmitButton id ="change-password-button" type="submit" fullWidth>
          Change Password
        </SubmitButton>
      </Box>
    </Card>
  );
}
