import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";
import TemplateFrame from "./TemplateFrame";
import LogoLight from "../../images/LogoLight.png";
import LogoDark from "../../images/LogoDark.png";

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
  height: "100%",
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

export default function BusinessRegistration() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    });
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
              flexDirection: "row", // Set the Stack to row direction
              flexWrap: "wrap", // Allow wrapping to create two columns
              gap: 2, // Add some gap between the items
            }}
          >
            <Card
              variant="outlined"
              sx={{ width: { xs: "100%", sm: "100%" }, maxWidth: "none" }}
            >
              {" "}
              {/* Ensure card takes full width */}
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
                Business Register
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <FormControl sx={{ width: "calc(50% - 16px)" }}>
                  {" "}
                  {/* Adjust width for 2-column layout */}
                  <FormLabel htmlFor="name">Company name</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    placeholder="Company Name"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl sx={{ width: "calc(50% - 16px)" }}>
                  <FormLabel htmlFor="name">Business name</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    placeholder="Business Name"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? "error" : "primary"}
                  />
                </FormControl>

                <FormControl sx={{ width: "calc(50% - 16px)" }}>
                  <FormLabel htmlFor="email">Business Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl sx={{ width: "calc(50% - 16px)" }}>
                  <FormLabel htmlFor="phone">Business Phone Number</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    placeholder="123-456-7890"
                    name="phone"
                    autoComplete="tel"
                    variant="outlined"
                  />
                </FormControl>

                <FormControl sx={{ width: "calc(50% - 16px)" }}>
                  <FormLabel htmlFor="publishDate">
                    Fundraise Publish Date
                  </FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="publishDate"
                    type="date"
                    name="publishDate"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl sx={{ width: "calc(50% - 16px)" }}>
                  <FormLabel htmlFor="deadlineDate">
                    Fundraise Deadline Date
                  </FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="deadlineDate"
                    type="date"
                    name="deadlineDate"
                    variant="outlined"
                  />
                </FormControl>

                <FormControl sx={{ width: "calc(50% - 16px)" }}>
                  <FormLabel htmlFor="goal">Fundraise Goal</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="goal"
                    placeholder="100,000"
                    name="goal"
                    autoComplete="off"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl sx={{ width: "calc(50% - 16px)" }}>
                  <FormLabel htmlFor="minInvestment">
                    Minimum Investment
                  </FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="minInvestment"
                    placeholder="1,000"
                    name="minInvestment"
                    autoComplete="off"
                    variant="outlined"
                  />
                </FormControl>

                <FormControl sx={{ width: "calc(50% - 16px)" }}>
                  <FormLabel htmlFor="maxInvestment">
                    Maximum Investment
                  </FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="maxInvestment"
                    placeholder="10,000"
                    name="maxInvestment"
                    autoComplete="off"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl sx={{ width: "calc(50% - 16px)" }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                  />
                </FormControl>

                <FormControlLabel
                  sx={{ width: "100%" }} // Full width for the checkbox
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I have read and agreed the Terms of Service."
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={validateInputs}
                  href="/"
                >
                  Register
                </Button>
              </Box>
            </Card>
          </Stack>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
