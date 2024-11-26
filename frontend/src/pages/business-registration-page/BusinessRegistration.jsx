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
import { addDays, addMonths, format } from "date-fns";
import { validateInputs } from "./formValidation";
import { SIGN_IN_PATH } from "../../constants";

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
  const defaultPublishDate = format(addDays(today, 7), "yyyy-MM-dd");
  const defaultEndDate = format(addMonths(today, 1), "yyyy-MM-dd");

  const [formData, setFormData] = useState({
    companyName: "",
    businessName: "",
    email: "",
    password: "",
    phoneNumber: "",
    publishDate: defaultPublishDate,
    endDate: defaultEndDate,
    fundraisingPurpose: "",
    briefDescription: "",
    pitch: {},
    businessCategory: [],
    goal: "",
    minInvestment: "",
    maxInvestment: "",
    stockAmount: "",
    countryLocated: "",
    cityLocated: "",
  });

  const [errors, setErrors] = useState({
    companyNameError: false,
    businessNameError: false,
    emailError: false,
    passwordError: false,
    phoneNumberError: false,
    publishDateError: false,
    endDateError: false,
    fundraisingPurposeError: false,
    briefDescriptionError: false,
    pitchError: false,
    businessCategoryError: false,
    goalError: false,
    minInvestmentError: false,
    maxInvestmentError: false,
    stockAmountError: false,

    companyNameErrorMessage: "",
    businessNameErrorMessage: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    phoneNumberErrorMessage: "",
    publishDateErrorMessage: "",
    endDateErrorMessage: "",
    fundraisingPurposeErrorMessage: "",
    briefDescriptionErrorMessage: "",
    pitchErrorMessage: "",
    businessCategoryErrorMessage: "",
    goalErrorMessage: "",
    minInvestmentErrorMessage: "",
    maxInvestmentErrorMessage: "",
    stockAmountErrorMessage: "",
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { isValid, newErrors } = validateInputs(formData, errors);
    setErrors(newErrors);

    if (isValid) {

      try {
        const response = await api.post(
          "/api/business/register/",
          formData
        );
        console.log("User registered successfully:", response.data);
        navigate(SIGN_IN_PATH);
      } catch (error) {
        console.error("Registration Failed:", error.response?.data);
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
                      error={errors.companyNameError}
                      helperText={errors.companyNameErrorMessage}
                      color={errors.companyNameError ? "error" : "primary"}
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
                      error={errors.businessNameError}
                      helperText={errors.businessNameErrorMessage}
                      color={errors.businessNameError ? "error" : "primary"}
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
                      error={errors.emailError}
                      helperText={errors.emailErrorMessage}
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
                      error={errors.passwordError}
                      helperText={errors.passwordErrorMessage}
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
                      error={errors.phoneError}
                      helperText={errors.phoneErrorMessage}
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
                      error={errors.countryLocatedError}
                      helperText={errors.countryLocatedErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="cityLocated">
                      City Located
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="city-located"
                      placeholder="Bangkok"
                      name="cityLocated"
                      variant="outlined"
                      value={formData.provinceLocated}
                      onChange={handleChange}
                      error={errors.provinceLocatedError}
                      helperText={errors.provinceLocatedErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="publishDate">
                      Fundraising Publish Date
                    </FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="publish-date"
                      type="date"
                      name="publishDate"
                      variant="outlined"
                      InputLabel={{
                        shrink: true,
                      }}
                      value={formData.publishDate}
                      onChange={handleChange}
                      error={errors.publishDateError}
                      helperText={errors.publishDateErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="endDate">Fundraising End Date</FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="end-date"
                      type="date"
                      name="endDate"
                      variant="outlined"
                      InputLabel={{
                        shrink: true,
                      }}
                      value={formData.endDate}
                      onChange={handleChange}
                      error={errors.deadlineDateError}
                      helperText={errors.deadlineDateErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="goal">Fundraising Goal</FormLabel>
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
                      error={errors.minInvestmentError}
                      helperText={errors.minInvestmentErrorMessage}
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
                      error={errors.maxInvestmentError}
                      helperText={errors.maxInvestmentErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <FormLabel htmlFor="stockAmount">
                      Stock Amount
                    </FormLabel>
                    <TextField
                      id="stock-amount"
                      name="stockAmount"
                      type="number"
                      placeholder="e.g. 50"
                      fullWidth
                      variant="outlined"
                      value={formData.stockAmount}
                      onChange={handleChange}
                      error={errors.stockAmountError}
                      helperText={errors.stockAmountErrorMessage}
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
                          coverImage: e.target.files[0],
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
                      multiple
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          describeImages: e.target.files,
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
                    <FormLabel htmlFor="fundraisingPurpose">
                      Fundraising Purpose
                    </FormLabel>
                    <TextField
                      id="fundraising-purpose"
                      name="fundraisingPurpose"
                      placeholder="Purpose of fundraising"
                      multiline
                      fullWidth
                      variant="outlined"
                      minRows={3}
                      maxRows={10}
                      value={formData.fundraisingPurpose}
                      onChange={handleChange}
                      error={errors.fundraisingPurposeError}
                      helperText={errors.fundraisingPurposeErrorMessage}
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
                      error={errors.briefDescriptionError}
                      helperText={errors.briefDescriptionErrorMessage}
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
