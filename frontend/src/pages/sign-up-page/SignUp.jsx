import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import api from "../../api";
import getSignUpTheme from "./theme/getSignUpTheme";
import TemplateFrame from "./TemplateFrame";
import LogoLight from "../../images/LogoLight.png";
import LogoDark from "../../images/LogoDark.png";
import { useNavigate } from "react-router-dom";
import {
  ACCESS_TOKEN,
  INVESTOR_REGISTER_API,
  REFRESH_TOKEN,
  SIGN_IN_PATH,
} from "../../constants";
import PopUpTerms from "../../components/PopUp/PopUpTerms";
import PopUpPrivacyPolicy from "../../components/PopUp/PopUpPrivacyPolicy";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  padding: 4,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

const logoStyle = {
  width: "100px",
  margin: "10px",
  height: "auto",
  cursor: "pointer",
};

export default function SignUp() {
  const [mode, setMode] = useState("dark");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [dataSharingConsent, setDataSharingConsent] = useState(false);
  const [dataSharingConsentError, setDataSharingConsentError] = useState(false);

  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const handleOpenTerms = () => {
    setOpenTerms(true);
  };

  const handleCloseTerms = () => {
    setOpenTerms(false);
  };

  const handleOpenPrivacy = () => {
    setOpenPrivacy(true);
  };

  const handleClosePrivacy = () => {
    setOpenPrivacy(false);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const validateInputs = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const phoneNumber = document.getElementById("phonenumber").value;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }

    if (!firstname || firstname.length < 1) {
      setNameError(true);
      setNameErrorMessage("First name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!lastname || lastname.length < 1) {
      setNameError(true);
      setNameErrorMessage("Last name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      setPhoneError(true);
      setPhoneErrorMessage("Please enter a valid 10-digit phone number.");
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    if (!dataSharingConsent) {
      setDataSharingConsentError(true);
      isValid = false;
    } else {
      setDataSharingConsentError(false);
    }

    return isValid;
  };

  const navigate = useNavigate();
  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const formData = new FormData();
      formData.append("username", document.getElementById("email").value);
      formData.append("firstName", document.getElementById("firstname").value);
      formData.append("lastName", document.getElementById("lastname").value);

      formData.append(
        "phoneNumber",
        document.getElementById("phonenumber").value
      );
      formData.append("email", document.getElementById("email").value);
      formData.append("password", document.getElementById("password").value);
      if (profilePicture) {
        formData.append("profile_picture", profilePicture);
      }

      try {
        const response = await api.post(INVESTOR_REGISTER_API, formData);
        console.log("User registered successfully:", response.data);
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        localStorage.setItem("role", response.data.role);
        navigate(SIGN_IN_PATH);
      } catch (error) {
        console.error("Error registering user:", error);
        if (error.response) {
          alert(
            error.response.data.detail ||
              error.response.data.error ||
              "Register failed. Please try again."
          );
        } else {
          alert("Register failed. Please check your network connection.");
        }
      }
    }
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Stack
            sx={{
              justifyContent: "center",
              p: 2,
            }}
          >
            <Card variant="outlined" sx={{ maxWidth: "none" }}>
              <img
                src={mode === "light" ? LogoLight : LogoDark}
                style={logoStyle}
                alt="logo of b2d"
              />
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                Sign up
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                encType="multipart/form-data"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel htmlFor="firstname">First Name</FormLabel>
                    <TextField
                      autoComplete="firstname"
                      name="firstname"
                      required
                      fullWidth
                      id="firstname"
                      placeholder="First Name"
                      error={nameError}
                      helperText={nameErrorMessage}
                    />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel htmlFor="lastname">Last Name</FormLabel>
                    <TextField
                      autoComplete="lastname"
                      name="lastname"
                      required
                      fullWidth
                      id="lastname"
                      placeholder="Last Name"
                      error={nameError}
                      helperText={nameErrorMessage}
                    />
                  </FormControl>
                </Box>
                <FormControl>
                  <FormLabel htmlFor="phonenumber">Phone Number</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="phonenumber"
                    placeholder="0123456789"
                    name="phonenumber"
                    autoComplete="phonenumber"
                    variant="outlined"
                    error={phoneError}
                    helperText={phoneErrorMessage}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    error={emailError}
                    helperText={emailErrorMessage}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="•••••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="confirm_password">
                    Confirm Password
                  </FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="confirm_password"
                    placeholder="•••••••••"
                    type="password"
                    id="confirm_password"
                    variant="outlined"
                    error={confirmPasswordError}
                    helperText={confirmPasswordErrorMessage}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="profile_picture">
                    Profile Picture
                  </FormLabel>
                  <input
                    type="file"
                    id="profile_picture"
                    name="profile_picture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </FormControl>
                <FormControlLabel
                  sx={{ width: "100%" }}
                  control={
                    <Checkbox
                      checked={dataSharingConsent}
                      onChange={(event) =>
                        setDataSharingConsent(event.target.checked)
                      }
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I have read and agreed to the{" "}
                      <Link
                        variant="body2"
                        onClick={handleOpenTerms}
                        sx={{ textDecoration: "underline", cursor: "pointer" }}
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        variant="body2"
                        onClick={handleOpenPrivacy}
                        sx={{ textDecoration: "underline", cursor: "pointer" }}
                      >
                        Privacy Notice
                      </Link>
                    </Typography>
                  }
                />
                {dataSharingConsentError && (
                  <Typography color="error">
                    You must agree to the Privacy Notice
                  </Typography>
                )}

                <PopUpTerms open={openTerms} handleClose={handleCloseTerms} />
                <PopUpPrivacyPolicy
                  open={openPrivacy}
                  handleClose={handleClosePrivacy}
                />

                <Button
                  id="sign-up-button"
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={validateInputs}
                >
                  Sign up
                </Button>
                <Typography sx={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <Link href={SIGN_IN_PATH} variant="body2">
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Card>
          </Stack>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
