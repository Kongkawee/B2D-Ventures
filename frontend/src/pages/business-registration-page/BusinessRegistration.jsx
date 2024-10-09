import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import getSignUpTheme from "./theme/getBusinessRegistrationTheme";
import TemplateFrame from "./TemplateFrame";
import LogoLight from "../../images/LogoLight.png";
import LogoDark from "../../images/LogoDark.png";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  marginTop: "20vh",
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

const FormContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
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

  // State for managing form data
  const [formData, setFormData] = React.useState({
    // General Information
    companyName: "",
    businessName: "",
    email: "",
    phone: "",
    publishDate: "",
    deadlineDate: "",
    goal: "",
    minInvestment: "",
    maxInvestment: "",
    password: "",
    terms: false,
    pitching: "",
    businessImage: null,
    businessDescription: "",
    pricePerShare: "",
  });

  // State for managing errors
  const [errors, setErrors] = React.useState({
    companyNameError: false,
    companyNameErrorMessage: "",
    businessNameError: false,
    businessNameErrorMessage: "",
    emailError: false,
    emailErrorMessage: "",
    phoneError: false,
    phoneErrorMessage: "",
    publishDateError: false,
    publishDateErrorMessage: "",
    deadlineDateError: false,
    deadlineDateErrorMessage: "",
    goalError: false,
    goalErrorMessage: "",
    minInvestmentError: false,
    minInvestmentErrorMessage: "",
    maxInvestmentError: false,
    maxInvestmentErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    termsError: false,
    termsErrorMessage: "",
    pitchingError: false,
    pitchingErrorMessage: "",
    businessDescriptionError: false,
    businessDescriptionErrorMessage: "",
    pricePerShareError: false,
    pricePerShareErrorMessage: "",
  });

  // Set the initial theme mode based on system or saved preference
  React.useEffect(() => {
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation function for handling errors
  const validateInputs = () => {
    let isValid = true;
    let newErrors = { ...errors }; // Clone the current errors

    // General Information Validation

    // Company Name validation
    if (!formData.companyName.trim()) {
      newErrors.companyNameError = true;
      newErrors.companyNameErrorMessage = "Company name is required.";
      isValid = false;
    } else {
      newErrors.companyNameError = false;
      newErrors.companyNameErrorMessage = "";
    }

    // Business Name validation
    if (!formData.businessName.trim()) {
      newErrors.businessNameError = true;
      newErrors.businessNameErrorMessage = "Business name is required.";
      isValid = false;
    } else {
      newErrors.businessNameError = false;
      newErrors.businessNameErrorMessage = "";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.emailError = true;
      newErrors.emailErrorMessage = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.emailError = true;
      newErrors.emailErrorMessage = "Please enter a valid email address.";
      isValid = false;
    } else {
      newErrors.emailError = false;
      newErrors.emailErrorMessage = "";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phoneError = true;
      newErrors.phoneErrorMessage = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{3}\d{3}\d{4}$/.test(formData.phone.replace(/-/g, ""))) {
      newErrors.phoneError = true;
      newErrors.phoneErrorMessage =
        "Please enter a valid phone number (e.g., 1234567890).";
      isValid = false;
    } else {
      newErrors.phoneError = false;
      newErrors.phoneErrorMessage = "";
    }

    // Publish Date validation
    if (!formData.publishDate) {
      newErrors.publishDateError = true;
      newErrors.publishDateErrorMessage = "Publish date is required.";
      isValid = false;
    } else {
      newErrors.publishDateError = false;
      newErrors.publishDateErrorMessage = "";
    }

    // Deadline Date validation
    if (!formData.deadlineDate) {
      newErrors.deadlineDateError = true;
      newErrors.deadlineDateErrorMessage = "Deadline date is required.";
      isValid = false;
    } else if (
      formData.publishDate &&
      new Date(formData.deadlineDate) < new Date(formData.publishDate)
    ) {
      newErrors.deadlineDateError = true;
      newErrors.deadlineDateErrorMessage =
        "Deadline date must be after publish date.";
      isValid = false;
    } else {
      newErrors.deadlineDateError = false;
      newErrors.deadlineDateErrorMessage = "";
    }

    // Fundraise Goal validation
    if (!formData.goal.trim()) {
      newErrors.goalError = true;
      newErrors.goalErrorMessage = "Fundraise goal is required.";
      isValid = false;
    } else if (isNaN(formData.goal) || Number(formData.goal) <= 0) {
      newErrors.goalError = true;
      newErrors.goalErrorMessage = "Fundraise goal must be a positive number.";
      isValid = false;
    } else {
      newErrors.goalError = false;
      newErrors.goalErrorMessage = "";
    }

    // Minimum Investment validation
    if (!formData.minInvestment.trim()) {
      newErrors.minInvestmentError = true;
      newErrors.minInvestmentErrorMessage = "Minimum investment is required.";
      isValid = false;
    } else if (
      isNaN(formData.minInvestment) ||
      Number(formData.minInvestment) <= 0
    ) {
      newErrors.minInvestmentError = true;
      newErrors.minInvestmentErrorMessage =
        "Minimum investment must be a positive number.";
      isValid = false;
    } else {
      newErrors.minInvestmentError = false;
      newErrors.minInvestmentErrorMessage = "";
    }

    // Maximum Investment validation
    if (!formData.maxInvestment.trim()) {
      newErrors.maxInvestmentError = true;
      newErrors.maxInvestmentErrorMessage = "Maximum investment is required.";
      isValid = false;
    } else if (
      isNaN(formData.maxInvestment) ||
      Number(formData.maxInvestment) <= 0
    ) {
      newErrors.maxInvestmentError = true;
      newErrors.maxInvestmentErrorMessage =
        "Maximum investment must be a positive number.";
      isValid = false;
    } else if (
      Number(formData.maxInvestment) < Number(formData.minInvestment)
    ) {
      newErrors.maxInvestmentError = true;
      newErrors.maxInvestmentErrorMessage =
        "Maximum investment must be greater than minimum investment.";
      isValid = false;
    } else {
      newErrors.maxInvestmentError = false;
      newErrors.maxInvestmentErrorMessage = "";
    }

    // Password validation
    if (!formData.password) {
      newErrors.passwordError = true;
      newErrors.passwordErrorMessage = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.passwordError = true;
      newErrors.passwordErrorMessage =
        "Password must be at least 6 characters long.";
      isValid = false;
    } else {
      newErrors.passwordError = false;
      newErrors.passwordErrorMessage = "";
    }

    // Terms of Service validation
    if (!formData.terms) {
      newErrors.termsError = true;
      newErrors.termsErrorMessage = "You must agree to the Terms of Service.";
      isValid = false;
    } else {
      newErrors.termsError = false;
      newErrors.termsErrorMessage = "";
    }

    // Business Pitch validation
    if (!formData.pitching.trim()) {
      newErrors.pitchingError = true;
      newErrors.pitchingErrorMessage = "Pitching is required.";
      isValid = false;
    } else {
      newErrors.pitchingError = false;
      newErrors.pitchingErrorMessage = "";
    }

    if (!formData.businessDescription.trim()) {
      newErrors.businessDescriptionError = true;
      newErrors.businessDescriptionErrorMessage =
        "Business description is required.";
      isValid = false;
    } else {
      newErrors.businessDescriptionError = false;
      newErrors.businessDescriptionErrorMessage = "";
    }

    if (!formData.pricePerShare.trim()) {
      newErrors.pricePerShareError = true;
      newErrors.pricePerShareErrorMessage = "Price per share is required.";
      isValid = false;
    } else if (isNaN(formData.pricePerShare) || Number(formData.pricePerShare) <= 0) {
      newErrors.pricePerShareError = true;
      newErrors.pricePerShareErrorMessage = "Price per share must be a positive number.";
      isValid = false;
    } else {
      newErrors.pricePerShareError = false;
      newErrors.pricePerShareErrorMessage = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit handler for the form
  // Submit handler for the form (mock version)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      try {
        // Mock submission for testing purposes
        console.log("Form submitted with data:", formData);

        // Uncomment this block to enable actual submission to backend
        /*
      // Create a FormData object to handle form data
      const submissionData = new FormData();

      // Append General Information
      submissionData.append("companyName", formData.companyName);
      submissionData.append("businessName", formData.businessName);
      submissionData.append("email", formData.email);
      submissionData.append("phone", formData.phone);
      submissionData.append("publishDate", formData.publishDate);
      submissionData.append("deadlineDate", formData.deadlineDate);
      submissionData.append("goal", formData.goal);
      submissionData.append("minInvestment", formData.minInvestment);
      submissionData.append("maxInvestment", formData.maxInvestment);
      submissionData.append("password", formData.password);
      submissionData.append("terms", formData.terms);

      // Send the data to the backend
      const response = await fetch("/api/register-business", {
        method: "POST",
        body: submissionData,
      });

      if (response.ok) {
        // Handle successful registration (e.g., show a success message, redirect)
        alert("Registration successful! Awaiting admin approval.");
        // Optionally, reset the form or navigate away
        setFormData({
          companyName: "",
          businessName: "",
          email: "",
          phone: "",
          publishDate: "",
          deadlineDate: "",
          goal: "",
          minInvestment: "",
          maxInvestment: "",
          password: "",
          terms: false,
        });
      } else {
        // Handle server errors
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
      */
      } catch (error) {
        // Handle any unexpected errors during the mock submission
        console.error("Error during form submission:", error);
        alert("An unexpected error occurred during mock submission.");
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
        <FormContainer direction="column" justifyContent="center">
          <Stack
            sx={{
              justifyContent: "center",
              p: 2,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Card
              variant="outlined"
              sx={{ width: { xs: "100%", sm: "100%" }, maxWidth: "none" }}
            >
              {/* Header with logo and title */}
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%", position: "relative" }}
              >
                <img
                  src={mode === "light" ? LogoLight : LogoDark}
                  style={logoStyle}
                  alt="logo of b2d"
                />
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    fontSize: "clamp(2rem, 10vw, 2.15rem)",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                  }}
                >
                  Business Register
                </Typography>
              </Box>
              {/* Form Content */}
              <Box
                component="form"
                onSubmit={handleFormSubmit}
                id="business-registration-form"
                sx={{ 
                  mt: 2,
                 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {/* Company Name Field */}
                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="companyName">Company Name</FormLabel>
                    <TextField
                      autoComplete="organization"
                      name="companyName"
                      required
                      fullWidth
                      id="companyName"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleChange}
                      error={errors.companyNameError}
                      helperText={errors.companyNameErrorMessage}
                      color={errors.companyNameError ? "error" : "primary"}
                    />
                  </FormControl>
                  {/* Business Name Field */}
                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="businessName">Business Name</FormLabel>
                    <TextField
                      autoComplete="organization"
                      name="businessName"
                      required
                      fullWidth
                      id="businessName"
                      placeholder="Business Name"
                      value={formData.businessName}
                      onChange={handleChange}
                      error={errors.businessNameError}
                      helperText={errors.businessNameErrorMessage}
                      color={errors.businessNameError ? "error" : "primary"}
                    />
                  </FormControl>
                  {/* Business Email Field */}
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
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.emailError}
                      helperText={errors.emailErrorMessage}
                    />
                  </FormControl>
                  {/* Password Field */}
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
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.passwordError}
                      helperText={errors.passwordErrorMessage}
                    />
                  </FormControl>
                  {/* Business Phone Number */}
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
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phoneError}
                      helperText={errors.phoneErrorMessage}
                    />
                  </FormControl>
                  {/* Fundraise Publish Date */}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formData.publishDate}
                      onChange={handleChange}
                      error={errors.publishDateError}
                      helperText={errors.publishDateErrorMessage}
                    />
                  </FormControl>
                  {/* Fundraise Deadline Date */}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formData.deadlineDate}
                      onChange={handleChange}
                      error={errors.deadlineDateError}
                      helperText={errors.deadlineDateErrorMessage}
                    />
                  </FormControl>
                  {/* Fundraise Goal */}
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
                      value={formData.goal}
                      onChange={handleChange}
                      error={errors.goalError}
                      helperText={errors.goalErrorMessage}
                    />
                  </FormControl>
                  {/* Minimum Investment */}
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
                      value={formData.minInvestment}
                      onChange={handleChange}
                      error={errors.minInvestmentError}
                      helperText={errors.minInvestmentErrorMessage}
                    />
                  </FormControl>
                  {/* Maximum Investment */}
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
                      value={formData.maxInvestment}
                      onChange={handleChange}
                      error={errors.maxInvestmentError}
                      helperText={errors.maxInvestmentErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="pricePerShare">
                      Price Per Share
                    </FormLabel>
                    <TextField
                      id="pricePerShare"
                      name="pricePerShare"
                      type="number"
                      placeholder="e.g. 50"
                      fullWidth
                      variant="outlined"
                      value={formData.pricePerShare}
                      onChange={handleChange}
                      error={errors.pricePerShareError}
                      helperText={errors.pricePerShareErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="businessDescription">
                      Business Description
                    </FormLabel>
                    <TextField
                      id="businessDescription"
                      name="businessDescription"
                      placeholder="Describe your business"
                      multiline
                      fullWidth
                      variant="outlined"
                      value={formData.businessDescription}
                      onChange={handleChange}
                      error={errors.businessDescriptionError}
                      helperText={errors.businessDescriptionErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel htmlFor="pitching">
                      Pitch Your Business
                    </FormLabel>
                    <TextField
                      id="pitching"
                      name="pitching"
                      placeholder="Write a compelling pitch for your business"
                      multiline
                      fullWidth
                      variant="outlined"
                      value={formData.pitching}
                      onChange={handleChange}
                      error={errors.pitchingError}
                      helperText={errors.pitchingErrorMessage}
                    />
                  </FormControl>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel htmlFor="businessImage">
                      Upload Business Pictures
                    </FormLabel>
                    <TextField
                      id="businessImage"
                      name="businessImage"
                      type="file"
                      inputProps={{ accept: "image/*" }}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          businessImage: e.target.files[0], // Store the file
                        }))
                      }
                      error={errors.businessImageError}
                      helperText={errors.businessImageErrorMessage}
                    />
                  </FormControl>
                  {/* Terms of Service Checkbox */}
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    control={
                      <Checkbox
                        checked={formData.terms}
                        onChange={handleChange}
                        name="terms"
                        color="primary"
                      />
                    }
                    label="I have read and agreed to the Terms of Service."
                  />
                </Box>

                {/* Submit Button */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Card>
          </Stack>
        </FormContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
