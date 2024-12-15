import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Link,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { SitemarkIcon } from "./CustomIcons";
import {
  ACCESS_TOKEN,
  BUSINESS_PROFILE_PATH,
  BUSINESS_REGISTER_PATH,
  HOME_PATH,
  PASSWORD_REQUEST,
  REFRESH_TOKEN,
  SIGN_IN_API,
  INVESTOR_SIGN_UP_PATH,
} from "../../constants";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

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
  const [loginType, setLoginType] = useState("investor");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleLoginTypeChange = (event, newLoginType) => {
    if (newLoginType) {
      setLoginType(newLoginType);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let isValid = true;

    if (!email || !/\S+@\S+.\S+/.test(email)) {
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
        username: data.get("email"),
        password: data.get("password"),
        type: loginType,
      };

      try {
        const response = await api.post(SIGN_IN_API, formData);
        console.log("User logged in successfully:", response.data);
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        localStorage.setItem("role", response.data.role);
        if (response.data.role === "investor") {
          navigate(HOME_PATH);
        } else {
          navigate(BUSINESS_PROFILE_PATH);
        }
      } catch (error) {
        console.error("Error logging in user:", error);
        if (error.response) {
          alert(
            error.response.data.detail || "Login failed. Please try again."
          );
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
      <ToggleButtonGroup
        value={loginType}
        exclusive
        onChange={handleLoginTypeChange}
        sx={{ alignSelf: "center" }}
        aria-label="login type"
      >
        <ToggleButton
          id="investor-sign-in-mode"
          value="investor"
          aria-label="investor login"
        >
          Investor
        </ToggleButton>
        <ToggleButton
          id="business-sign-in-mode"
          value="business"
          aria-label="business login"
        >
          Business
        </ToggleButton>
      </ToggleButtonGroup>
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
            <Link href={PASSWORD_REQUEST} variant="body2">
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggle} edge="end">
                    <Icon icon={icon} size={25} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button id="sign-in-button" type="submit" fullWidth variant="contained">
          Sign in
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <span>
            <Link href={INVESTOR_SIGN_UP_PATH} variant="body2">
              Sign up
            </Link>
          </span>{" "}
          or{" "}
          <span>
            <Link href={BUSINESS_REGISTER_PATH} variant="body2">
              Create fundraise
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
