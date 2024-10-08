import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";
import TemplateFrame from "./TemplateFrame";
import LogoLight from "../../images/LogoLight.png";
import LogoDark from "../../images/LogoDark.png";
import GeneralInformationForm from "./components/GeneralInformationForm";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const steps = [
  "General information",
  "Business insight",
  "Review registration order",
];

function getStepContent(step, formData, handleChange, errors) {
  switch (step) {
    case 0:
      return (
        <GeneralInformationForm
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      );
    case 1:
      return <Typography>Business Insight Form (Placeholder)</Typography>;
    case 2:
      return <Typography>Review Registration (Placeholder)</Typography>;
    default:
      throw new Error("Unknown step");
  }
}

// Styled Card for form layout
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

// Container styling
const FormContainer = styled(Stack)(({ theme }) => ({
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

// Logo styling
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
  const [activeStep, setActiveStep] = React.useState(0);

  // State for managing form data
  const [formData, setFormData] = React.useState({
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  // Validation function for handling errors based on the current step
  const validateInputs = () => {
    let isValid = true;
    let newErrors = { ...errors }; // Clone the current errors

    if (activeStep === 0) {
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
      } else if (!/^\d{3}\d{3}\d{4}$/.test(formData.phone)) {
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
        formData.deadlineDate < formData.publishDate
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
        newErrors.goalErrorMessage =
          "Fundraise goal must be a positive number.";
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
        newErrors.termsErrorMessage =
          "You must agree to the Terms of Service.";
        isValid = false;
      } else {
        newErrors.termsError = false;
        newErrors.termsErrorMessage = "";
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit handler for the form
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      // Save the form data to a persistent store (e.g., backend or global state)
      // For demonstration, we'll log it to the console
      console.log("Form Data Submitted:", formData);

      // Proceed to the next step
      handleNext();
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
        <FormContainer direction="column" justifyContent="space-between">
          <Stack
            sx={{
              justifyContent: "center",
              p: 2,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Card variant="outlined" sx={{ width: { xs: "100%", sm: "100%" }, maxWidth: "none" }}>
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

              {/* Step Content */}
              <Box component="form" onSubmit={handleFormSubmit} id="general-information-form">
                {getStepContent(activeStep, formData, handleChange, errors)}
              </Box>

              {/* Navigation Buttons */}
              <Box
                sx={[
                  {
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    alignItems: "end",
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                  },
                  activeStep !== 0
                    ? { justifyContent: "space-between" }
                    : { justifyContent: "flex-end" },
                ]}
              >
                {/* Previous Button */}
                {activeStep > 0 && (
                  <>
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                      Previous
                    </Button>
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: "flex", sm: "none" } }}
                    >
                      Previous
                    </Button>
                  </>
                )}

                {/* Next Button */}
                {activeStep < steps.length - 1 && (
                  <Button
                    type="submit"
                    form="general-information-form"
                    endIcon={<ChevronRightRoundedIcon />}
                    variant="contained"
                    sx={{ display: { xs: "none", sm: "flex" } }}
                  >
                    Next
                  </Button>
                )}

                {/* Add "Submit" button on the final step */}
                {activeStep === steps.length - 1 && (
                  <Button
                    type="submit"
                    form="final-submit-form" // Assuming you have a final form
                    endIcon={<ChevronRightRoundedIcon />}
                    variant="contained"
                    sx={{ display: { xs: "none", sm: "flex" } }}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            </Card>
          </Stack>
        </FormContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
