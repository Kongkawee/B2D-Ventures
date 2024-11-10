import React, { useState, useEffect } from "react";
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
import PitchForm from "./PitchForm";
import CategorySelectForm from "./CategorySelectForm";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { addDays, addMonths, format } from 'date-fns';

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

const FormContainer = styled(Stack)(({ theme }) => ({
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
  const [mode, setMode] = useState("dark");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const navigate = useNavigate();
  const today = new Date();
  const defaultPublishDate = format(addDays(today, 7), 'yyyy-MM-dd');
  const defaultEndDate = format(addMonths(today, 1), 'yyyy-MM-dd');

  const [formData, setFormData] = useState({
    companyName: "",
    businessName: "",
    email: "",
    password: "",
    phoneNumber: "",
    publishDate: defaultPublishDate,
    endDate: defaultEndDate,
    fundraisePurpose: "",
    briefDescription: "",
    pitch: {},
    businessCategory: [],
    goal: "",
    minInvestment: "",
    maxInvestment: "",
    pricePerShare: "",
    countryLocated: "",
    provinceLocated: "",
  });

  // State for managing errors
  const [errors, setErrors] = useState({
    companyNameError: false,
    businessNameError: false,
    emailError: false,
    passwordError: false,
    phoneNumberError: false,
    publishDateError: false,
    endDateError: false,
    fundraisePurposeError: false,
    briefDescriptionError: false,
    pitchError: false,
    businessCategoryError: false,
    goalError: false,
    minInvestmentError: false,
    maxInvestmentError: false,
    PricePerShareError: false,

    companyNameErrorMessage: "",
    businessNameErrorMessage: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    phoneNumberErrorMessage: "",
    publishDateErrorMessage: "",
    endDateErrorMessage: "",
    fundraisePurposeErrorMessage: "",
    briefDescriptionErrorMessage: "",
    pitchErrorMessage: "",
    businessCategoryErrorMessage: "",
    goalErrorMessage: "",
    minInvestmentErrorMessage: "",
    maxInvestmentErrorMessage: "",
    PricePerShareErrorMessage: "",
  });

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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePitchChange = (pitch) => {
    setFormData((prevData) => ({
      ...prevData,
      pitch: pitch.reduce((acc, section, index) => {
        acc[index] = section;
        return acc;
      }, {}),
    }));
  };

  const handleCategoryChange = (categories) => {
    setFormData((prevData) => ({
      ...prevData,
      businessCategory: categories,
    }));
  };

  // Validation function for handling errors
  // const validateInputs = () => {
  //   let isValid = true;
  //   let newErrors = { ...errors }; // Clone the current errors
  //   // General Information Validation
  //   // Company Name validation
  //   if (!formData.companyName.trim()) {
  //     newErrors.companyNameError = true;
  //     newErrors.companyNameErrorMessage = "Company name is required.";
  //     isValid = false;
  //   } else {
  //     newErrors.companyNameError = false;
  //     newErrors.companyNameErrorMessage = "";
  //   }
  //   // Business Name validation
  //   if (!formData.businessName.trim()) {
  //     newErrors.businessNameError = true;
  //     newErrors.businessNameErrorMessage = "Business name is required.";
  //     isValid = false;
  //   } else {
  //     newErrors.businessNameError = false;
  //     newErrors.businessNameErrorMessage = "";
  //   }
  //   // Email validation
  //   if (!formData.email.trim()) {
  //     newErrors.emailError = true;
  //     newErrors.emailErrorMessage = "Email is required.";
  //     isValid = false;
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.emailError = true;
  //     newErrors.emailErrorMessage = "Please enter a valid email address.";
  //     isValid = false;
  //   } else {
  //     newErrors.emailError = false;
  //     newErrors.emailErrorMessage = "";
  //   }
  //   // Phone validation
  //   if (!formData.phone.trim()) {
  //     newErrors.phoneError = true;
  //     newErrors.phoneErrorMessage = "Phone number is required.";
  //     isValid = false;
  //   } else if (!/^\d{3}\d{3}\d{4}$/.test(formData.phone.replace(/-/g, ""))) {
  //     newErrors.phoneError = true;
  //     newErrors.phoneErrorMessage =
  //       "Please enter a valid phone number (e.g., 1234567890).";
  //     isValid = false;
  //   } else {
  //     newErrors.phoneError = false;
  //     newErrors.phoneErrorMessage = "";
  //   }
  //   // Publish Date validation
  //   if (!formData.publishDate) {
  //     newErrors.publishDateError = true;
  //     newErrors.publishDateErrorMessage = "Publish date is required.";
  //     isValid = false;
  //   } else {
  //     newErrors.publishDateError = false;
  //     newErrors.publishDateErrorMessage = "";
  //   }
  //   // Deadline Date validation
  //   if (!formData.deadlineDate) {
  //     newErrors.deadlineDateError = true;
  //     newErrors.deadlineDateErrorMessage = "Deadline date is required.";
  //     isValid = false;
  //   } else if (
  //     formData.publishDate &&
  //     new Date(formData.deadlineDate) < new Date(formData.publishDate)
  //   ) {
  //     newErrors.deadlineDateError = true;
  //     newErrors.deadlineDateErrorMessage =
  //       "Deadline date must be after publish date.";
  //     isValid = false;
  //   } else {
  //     newErrors.deadlineDateError = false;
  //     newErrors.deadlineDateErrorMessage = "";
  //   }
  //   // Fundraise Goal validation
  //   if (!formData.goal.trim()) {
  //     newErrors.goalError = true;
  //     newErrors.goalErrorMessage = "Fundraise goal is required.";
  //     isValid = false;
  //   } else if (isNaN(formData.goal) || Number(formData.goal) <= 0) {
  //     newErrors.goalError = true;
  //     newErrors.goalErrorMessage = "Fundraise goal must be a positive number.";
  //     isValid = false;
  //   } else {
  //     newErrors.goalError = false;
  //     newErrors.goalErrorMessage = "";
  //   }
  //   // Minimum Investment validation
  //   if (!formData.minInvestment.trim()) {
  //     newErrors.minInvestmentError = true;
  //     newErrors.minInvestmentErrorMessage = "Minimum investment is required.";
  //     isValid = false;
  //   } else if (
  //     isNaN(formData.minInvestment) ||
  //     Number(formData.minInvestment) <= 0
  //   ) {
  //     newErrors.minInvestmentError = true;
  //     newErrors.minInvestmentErrorMessage =
  //       "Minimum investment must be a positive number.";
  //     isValid = false;
  //   } else {
  //     newErrors.minInvestmentError = false;
  //     newErrors.minInvestmentErrorMessage = "";
  //   }
  //   // Maximum Investment validation
  //   if (!formData.maxInvestment.trim()) {
  //     newErrors.maxInvestmentError = true;
  //     newErrors.maxInvestmentErrorMessage = "Maximum investment is required.";
  //     isValid = false;
  //   } else if (
  //     isNaN(formData.maxInvestment) ||
  //     Number(formData.maxInvestment) <= 0
  //   ) {
  //     newErrors.maxInvestmentError = true;
  //     newErrors.maxInvestmentErrorMessage =
  //       "Maximum investment must be a positive number.";
  //     isValid = false;
  //   } else if (
  //     Number(formData.maxInvestment) < Number(formData.minInvestment)
  //   ) {
  //     newErrors.maxInvestmentError = true;
  //     newErrors.maxInvestmentErrorMessage =
  //       "Maximum investment must be greater than minimum investment.";
  //     isValid = false;
  //   } else {
  //     newErrors.maxInvestmentError = false;
  //     newErrors.maxInvestmentErrorMessage = "";
  //   }
  //   // Password validation
  //   if (!formData.password) {
  //     newErrors.passwordError = true;
  //     newErrors.passwordErrorMessage = "Password is required.";
  //     isValid = false;
  //   } else if (formData.password.length < 6) {
  //     newErrors.passwordError = true;
  //     newErrors.passwordErrorMessage =
  //       "Password must be at least 6 characters long.";
  //     isValid = false;
  //   } else {
  //     newErrors.passwordError = false;
  //     newErrors.passwordErrorMessage = "";
  //   }
  //   // Terms of Service validation
  //   if (!formData.terms) {
  //     newErrors.termsError = true;
  //     newErrors.termsErrorMessage = "You must agree to the Terms of Service.";
  //     isValid = false;
  //   } else {
  //     newErrors.termsError = false;
  //     newErrors.termsErrorMessage = "";
  //   }
  //   // Business Pitch validation
  //   if (!formData.pitching.trim()) {
  //     newErrors.pitchingError = true;
  //     newErrors.pitchingErrorMessage = "Pitching is required.";
  //     isValid = false;
  //   } else {
  //     newErrors.pitchingError = false;
  //     newErrors.pitchingErrorMessage = "";
  //   }
  //   if (!formData.businessDescription.trim()) {
  //     newErrors.businessDescriptionError = true;
  //     newErrors.businessDescriptionErrorMessage =
  //       "Business description is required.";
  //     isValid = false;
  //   } else {
  //     newErrors.businessDescriptionError = false;
  //     newErrors.businessDescriptionErrorMessage = "";
  //   }
  //   if (!formData.pricePerShare.trim()) {
  //     newErrors.pricePerShareError = true;
  //     newErrors.pricePerShareErrorMessage = "Price per share is required.";
  //     isValid = false;
  //   } else if (isNaN(formData.pricePerShare) || Number(formData.pricePerShare) <= 0) {
  //     newErrors.pricePerShareError = true;
  //     newErrors.pricePerShareErrorMessage = "Price per share must be a positive number.";
  //     isValid = false;
  //   } else {
  //     newErrors.pricePerShareError = false;
  //     newErrors.pricePerShareErrorMessage = "";
  //   }
  //   setErrors(newErrors);
  //   return isValid;
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // if (validateInputs()) {
    // }
    
    const formDataToSend = new FormData();
  
    // Add all the text fields to the FormData
    for (const [key, value] of Object.entries(formData)) {
      // Skip images here, they will be appended separately
      if (key !== "coverImage" && key !== "describeImages") {
        formDataToSend.append(key, value);
      }
    }
  
    // Add the cover image (single file)
    if (formData.coverImage) {
      formDataToSend.append("cover_image", formData.coverImage);
    }
  
    // Add the describe images (multiple files)
    if (formData.describeImages && formData.describeImages.length > 0) {
      Array.from(formData.describeImages).forEach((file, index) => {
        formDataToSend.append(`describe_images_${index}`, file);
      });
    }
  
    try {
      const response = await api.post("/api/business/register/", formDataToSend);
      console.log(formDataToSend)
      console.log("User registered successfully:", response.data);
      navigate("/sin");
    } catch (error) {
      console.error("Registration Failed:", error.response?.data);
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
                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="companyName">Company Name</FormLabel>
                    <TextField
                      autoComplete="organization"
                      name="companyName"
                      required
                      fullWidth
                      id="company-name"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleChange}
                      // error={errors.companyNameError}
                      // helperText={errors.companyNameErrorMessage}
                      // color={errors.companyNameError ? "error" : "primary"}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="businessName">Business Name</FormLabel>
                    <TextField
                      autoComplete="organization"
                      name="businessName"
                      required
                      fullWidth
                      id="business-name"
                      placeholder="Business Name"
                      value={formData.businessName}
                      onChange={handleChange}
                      // error={errors.businessNameError}
                      // helperText={errors.businessNameErrorMessage}
                      // color={errors.businessNameError ? "error" : "primary"}
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
                      value={formData.email}
                      onChange={handleChange}
                      // error={errors.emailError}
                      // helperText={errors.emailErrorMessage}
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
                      value={formData.password}
                      onChange={handleChange}
                      // error={errors.passwordError}
                      // helperText={errors.passwordErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="phoneNumber">
                      Business Phone Number
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="phone-number"
                      placeholder="1234567890"
                      name="phoneNumber"
                      autoComplete="tel"
                      variant="outlined"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      // error={errors.phoneError}
                      // helperText={errors.phoneErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="countryLocated">
                      Country Located
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="country-located"
                      placeholder="Bangkok"
                      name="countryLocated"
                      variant="outlined"
                      value={formData.countryLocated}
                      onChange={handleChange}
                      // error={errors.countryLocatedError}
                      // helperText={errors.countryLocatedErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="provinceLocated">
                      Province Located
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="province-located"
                      placeholder="Bangken"
                      name="provinceLocated"
                      variant="outlined"
                      value={formData.provinceLocated}
                      onChange={handleChange}
                      // error={errors.provinceLocatedError}
                      // helperText={errors.provinceLocatedErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="publishDate">
                      Fundraise Publish Date
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="publish-date"
                      type="date"
                      name="publishDate"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formData.publishDate}
                      onChange={handleChange}
                      // error={errors.publishDateError}
                      // helperText={errors.publishDateErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="endDate">Fundraise End Date</FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="end-date"
                      type="date"
                      name="endDate"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formData.endDate}
                      onChange={handleChange}
                      // error={errors.deadlineDateError}
                      // helperText={errors.deadlineDateErrorMessage}
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
                      value={formData.goal}
                      onChange={handleChange}
                      // error={errors.goalError}
                      // helperText={errors.goalErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="minInvestment">
                      Minimum Investment
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="min-investment"
                      placeholder="1,000"
                      name="minInvestment"
                      autoComplete="off"
                      variant="outlined"
                      value={formData.minInvestment}
                      onChange={handleChange}
                      // error={errors.minInvestmentError}
                      // helperText={errors.minInvestmentErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="maxInvestment">
                      Maximum Investment
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="max-investment"
                      placeholder="10,000"
                      name="maxInvestment"
                      autoComplete="off"
                      variant="outlined"
                      value={formData.maxInvestment}
                      onChange={handleChange}
                      // error={errors.maxInvestmentError}
                      // helperText={errors.maxInvestmentErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="pricePerShare">
                      Price Per Share
                    </FormLabel>
                    <TextField
                      id="price-per-share"
                      name="pricePerShare"
                      type="number"
                      placeholder="e.g. 50"
                      fullWidth
                      variant="outlined"
                      value={formData.pricePerShare}
                      onChange={handleChange}
                      // error={errors.pricePerShareError}
                      // helperText={errors.pricePerShareErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel htmlFor="coverImage">
                      Upload Business Cover Image
                    </FormLabel>
                    <input
                      id="cover-image"
                      name="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          coverImage: e.target.files[0], // Store the file
                        }))
                      }
                    />
                  </FormControl>

                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel htmlFor="describeImages">
                      Upload Describe Images
                    </FormLabel>
                    <input
                      id="describeImages"
                      name="describeImages"
                      type="file"
                      accept="image/*"
                      multiple // Allow multiple images to be uploaded
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          describeImages: e.target.files, // Store the file list (multiple files)
                        }))
                      }
                    />
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 2,
                    width: "100%",
                    alignItems: "flex-start",
                    my: 2,
                  }}
                >
                  <FormControl
                    sx={{ flex: "1 1 calc(50% - 16px)", minWidth: 300 }}
                  >
                    <FormLabel htmlFor="fundraisePurpose">
                      Fundraise Purpose
                    </FormLabel>
                    <TextField
                      id="fundraise-purpose"
                      name="fundraisePurpose"
                      placeholder="Purpose of fundraise"
                      multiline
                      fullWidth
                      variant="outlined"
                      minRows={3}
                      maxRows={10}
                      value={formData.fundraisePurpose}
                      onChange={handleChange}
                      // error={errors.fundraisePurposeError}
                      // helperText={errors.fundraisePurposeErrorMessage}
                      sx={{ resize: "vertical" }}
                    />
                  </FormControl>

                  <FormControl
                    sx={{ flex: "1 1 calc(50% - 16px)", minWidth: 300 }}
                  >
                    <FormLabel htmlFor="briefDescription">
                      Brief Description
                    </FormLabel>
                    <TextField
                      id="brief-description"
                      name="briefDescription"
                      placeholder="Describe your business"
                      multiline
                      fullWidth
                      variant="outlined"
                      minRows={3}
                      maxRows={10}
                      value={formData.briefDescription}
                      onChange={handleChange}
                      // error={errors.briefDescriptionError}
                      // helperText={errors.briefDescriptionErrorMessage}
                    />
                  </FormControl>
                </Box>

                <PitchForm onPitchChange={handlePitchChange} />
                <CategorySelectForm onCategoryChange={handleCategoryChange} />

                <FormControlLabel
                  sx={{ width: "100%" }}
                  control={
                    <Checkbox
                      id="terms"
                      onChange={handleChange}
                      name="terms"
                      color="primary"
                    />
                  }
                  label="I have read and agreed to the Terms of Service."
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                  }}
                >
                  <Button
                    id="register-button"
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Register
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
