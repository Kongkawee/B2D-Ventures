import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { SitemarkIcon } from "./CustomIcons";
import { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateInputs = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      const formData = {
        username: data.get("email"),  // Ensure 'username' corresponds to the backend's expected field
        password: data.get("password")
      };

      try {
        const response = await api.post("/api/token/", formData);
        console.log("User logged in successfully:", response.data);
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate("/"); // Redirect to home or another page after login
      } catch (error) {
        console.error("Error logging in user:", error);
        if (error.response) {
          // Display error message to user
          alert(error.response.data.detail || "Login failed. Please try again.");
        } else {
          alert("Login failed. Please check your network connection.");
        }
      }
    }
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
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
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Sign in
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <span>
            <Link href="/sup" variant="body2">
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
