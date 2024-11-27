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
import { Link, useNavigate } from "react-router-dom";
import { addDays, addMonths, format } from "date-fns";
import { validateInputs } from "./formValidation";
import {
  BUSINESS_REGISTER_API,
  COUNTRY_CHOICES,
  SIGN_IN_PATH,
} from "../../constants";
import PopUpTerms from "../../components/PopUp/PopUpTerms";
import {
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

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
  const [open, setOpen] = useState(false);

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
    terms: "",
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
    countryLocatedError: false,
    cityLocatedError: false,
    phoneError: false,
    termsError: false,

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
    countryLocatedErrorMessage: "",
    cityLocatedErrorMessage: "",
    phoneErrorMessage: "",
    termsErrorMessage: "",
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const processPitchImages = async (pitch) => {
    const processedPitch = {};

    const entries = Object.entries(pitch);
    for (const [key, section] of entries) {
      if (section.image instanceof File || section.image instanceof Blob) {
        const base64Image = await convertToBase64(section.image);
        processedPitch[key] = { ...section, image: base64Image };
      } else {
        processedPitch[key] = section;
      }
    }

    return processedPitch;
  };

  const handleFormSubmit = async (event) => {
    console.log("Attempt to Send");
    event.preventDefault();

    const { isValid, newErrors } = validateInputs(formData, errors);
    setErrors(newErrors);

    if (isValid) {
      const formDataToSend = new FormData();

      // Append primitive data to FormData
      for (const key in formData) {
        const value = formData[key];
        if (value instanceof File || value instanceof FileList) {
          // Skip files here, we'll handle them separately
          continue;
        } else if (Array.isArray(value)) {
          // If it's an array, append each item
          value.forEach((item) => {
            formDataToSend.append(key, item);
          });
        } else if (typeof value === "object") {
          // If it's an object, convert it to JSON and append
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          // For primitive types, append directly
          formDataToSend.append(key, value);
        }
      }

      // Append cover image if it exists
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      // Append describe images if they exist
      if (formData.describeImages) {
        for (let i = 0; i < formData.describeImages.length; i++) {
          formDataToSend.append("describeImages", formData.describeImages[i]);
        }
      }

      try {
        const processedPitch = await processPitchImages(formData.pitch);
        const payload = {
          ...formData,
          pitch: processedPitch,
        };
        const response = await api.post(BUSINESS_REGISTER_API, payload);
        console.log("User registered successfully:", response.data);
        navigate(SIGN_IN_PATH);
      } catch {
        console.log("Error to Register business");
      }
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const countryOptions = COUNTRY_CHOICES.map(([code, name]) => ({
    value: code,
    label: name,
  }));

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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="businessName" sx={{ flexGrow: 1 }}>
                        Business Name
                      </FormLabel>
                      <Tooltip
                        title="Enter the registered name of your business."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="companyName" sx={{ flexGrow: 1 }}>
                        Company Name
                      </FormLabel>
                      <Tooltip
                        title="Enter the official legal name of your company."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="email" sx={{ flexGrow: 1 }}>
                        Business Email
                      </FormLabel>
                      <Tooltip
                        title="Provide a valid email address for business communications."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="password" sx={{ flexGrow: 1 }}>
                        Password
                      </FormLabel>
                      <Tooltip
                        title="Set a secure password for your account."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      placeholder="••••••••"
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="phoneNumber" sx={{ flexGrow: 1 }}>
                        Business Phone Number
                      </FormLabel>
                      <Tooltip
                        title="Enter the contact phone number for your business."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
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

                  <FormControl
                    sx={{ width: "calc(50% - 16px)" }}
                    error={errors.countryLocatedError}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="countryLocated" sx={{ flexGrow: 1 }}>
                        Country Located
                      </FormLabel>
                      <Tooltip
                        title="Specify the country where the business is located."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
                    <Select
                      labelId="country-located-label"
                      id="country-located"
                      name="countryLocated"
                      value={formData.countryLocated}
                      onChange={handleChange}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select a country
                      </MenuItem>
                      {countryOptions.map((country) => (
                        <MenuItem key={country.value} value={country.value}>
                          {country.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.countryLocatedError && (
                      <FormHelperText>
                        {errors.countryLocatedErrorMessage}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="cityLocated" sx={{ flexGrow: 1 }}>
                        City Located
                      </FormLabel>
                      <Tooltip
                        title="Specify the city where the business is located."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
                    <TextField
                      required
                      fullWidth
                      id="city-located"
                      placeholder="Bangkok"
                      name="cityLocated"
                      variant="outlined"
                      value={formData.cityLocated}
                      onChange={handleChange}
                      error={errors.cityLocatedError}
                      helperText={errors.cityLocatedErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="publishDate" sx={{ flexGrow: 1 }}>
                        Fundraising Publish Date
                      </FormLabel>
                      <Tooltip
                        title="Specify the date when the fundraising campaign will start."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
                    <TextField
                      required
                      fullWidth
                      id="publish-date"
                      type="date"
                      name="publishDate"
                      variant="outlined"
                      value={formData.publishDate}
                      onChange={handleChange}
                      error={errors.publishDateError}
                      helperText={errors.publishDateErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="endDate" sx={{ flexGrow: 1 }}>
                        Fundraising End Date
                      </FormLabel>
                      <Tooltip
                        title="Specify the date when the fundraising campaign will end."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
                    <TextField
                      required
                      fullWidth
                      id="end-date"
                      type="date"
                      name="endDate"
                      variant="outlined"
                      value={formData.endDate}
                      onChange={handleChange}
                      error={errors.endDateError}
                      helperText={errors.endDateErrorMessage}
                    />
                  </FormControl>

                  <FormControl sx={{ width: "calc(50% - 16px)" }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="goal" sx={{ flexGrow: 1 }}>
                        Fundraising Goal ($)
                      </FormLabel>
                      <Tooltip
                        title="Specify the total amount of money you aim to raise during the fundraising campaign."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
                    <TextField
                      required
                      fullWidth
                      id="goal"
                      placeholder="100,000.00"
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="minInvestment" sx={{ flexGrow: 1 }}>
                        Minimum Investment ($)
                      </FormLabel>
                      <Tooltip
                        title="Specify the smallest amount of money that an investor can contribute."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
                    <TextField
                      required
                      fullWidth
                      id="min-investment"
                      placeholder="100.00"
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="maxInvestment" sx={{ flexGrow: 1 }}>
                        Maximum Investment ($)
                      </FormLabel>
                      <Tooltip
                        title="This is the maximum amount of money an investor can invest in this business."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
                    <TextField
                      required
                      fullWidth
                      id="max-investment"
                      placeholder="100,000.00"
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="stockAmount" sx={{ flexGrow: 1 }}>
                        Stock Amount (units)
                      </FormLabel>
                      <Tooltip
                        title="Specify the total number of stock units available for investors."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
                    <TextField
                      id="stock-amount"
                      name="stockAmount"
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="coverImage" sx={{ flexGrow: 1 }}>
                        Upload Business Cover Image
                      </FormLabel>
                      <Tooltip
                        title="Upload a cover image that represents your business. Accepted formats: JPG, PNG."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel htmlFor="describeImages" sx={{ flexGrow: 1 }}>
                        Upload Describe Images
                      </FormLabel>
                      <Tooltip
                        title="Upload additional images that describe your business. Accepted formats: JPG, PNG. You can upload multiple files."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel
                        htmlFor="fundraisingPurpose"
                        sx={{ flexGrow: 1 }}
                      >
                        Fundraising Purpose
                      </FormLabel>
                      <Tooltip
                        title="Provide a clear and concise explanation of the purpose of the fundraising campaign."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <FormLabel
                        htmlFor="briefDescription"
                        sx={{ flexGrow: 1 }}
                      >
                        Brief Description
                      </FormLabel>
                      <Tooltip
                        title="Provide a short description of your business, highlighting its core offerings and purpose."
                        arrow
                        placement="top"
                      >
                        <HelpOutlineIcon
                          sx={{ color: "text.secondary" }}
                          fontSize=""
                        />
                      </Tooltip>
                    </Box>

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
                      name="terms"
                      color="primary"
                      onChange={(event) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          terms: event.target.checked,
                        }));
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I have read and agreed to the{" "}
                      <Link
                        component="button"
                        variant="body2"
                        onClick={handleOpen}
                        sx={{ textDecoration: "underline", cursor: "pointer" }}
                      >
                        Terms of Service
                      </Link>
                      .
                    </Typography>
                  }
                />

                <PopUpTerms open={open} handleClose={handleClose} />

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
