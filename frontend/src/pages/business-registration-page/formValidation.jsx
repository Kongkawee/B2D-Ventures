export const validateInputs = (formData, errors) => {
  let isValid = true;
  let newErrors = { ...errors };

  // Validate Company Name
  if (!formData.companyName || !formData.companyName.trim()) {
    console.log("company name")
    newErrors.companyNameError = true;
    newErrors.companyNameErrorMessage = "Company name is required.";
    isValid = false;
  } else {
    newErrors.companyNameError = false;
    newErrors.companyNameErrorMessage = "";
  }

  // Validate Business Name
  if (!formData.businessName || !formData.businessName.trim()) {
    console.log("business name")
    newErrors.businessNameError = true;
    newErrors.businessNameErrorMessage = "Business name is required.";
    isValid = false;
  } else {
    newErrors.businessNameError = false;
    newErrors.businessNameErrorMessage = "";
  }

  // Validate Email
  if (!formData.email || !formData.email.trim()) {
    console.log("email")
    newErrors.emailError = true;
    newErrors.emailErrorMessage = "Email is required.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    console.log("email")
    newErrors.emailError = true;
    newErrors.emailErrorMessage = "Please enter a valid email address.";
    isValid = false;
  } else {
    newErrors.emailError = false;
    newErrors.emailErrorMessage = "";
  }

  // Validate Phone Number
  if (!formData.phoneNumber.trim()) {
    console.log("phone number")
    newErrors.phoneError = true;
    newErrors.phoneErrorMessage = "Phone number is required.";
    isValid = false;
  } else if (
    !/^\d{3}\d{3}\d{4}$/.test(formData.phoneNumber.replace(/-/g, ""))
  ) {
    console.log("phone number")
    newErrors.phoneError = true;
    newErrors.phoneErrorMessage =
      "Please enter a valid phone number (e.g., 1234567890).";
    isValid = false;
  } else {
    newErrors.phoneError = false;
    newErrors.phoneErrorMessage = "";
  }

  // Validate Publish Date
  if (!formData.publishDate) {
    console.log("pub date")
    newErrors.publishDateError = true;
    newErrors.publishDateErrorMessage = "Publish date is required.";
    isValid = false;
  } else {
    newErrors.publishDateError = false;
    newErrors.publishDateErrorMessage = "";
  }

  // Validate End Date
  if (!formData.endDate) {
    console.log("end date")
    newErrors.endDateError = true;
    newErrors.endDateErrorMessage = "End date is required.";
    isValid = false;
  } else if (
    formData.publishDate &&
    new Date(formData.endDate) < new Date(formData.publishDate)
  ) {
    console.log("end date")
    newErrors.endDateError = true;
    newErrors.endDateErrorMessage = "End date must be after publish date.";
    isValid = false;
  } else {
    newErrors.endDateError = false;
    newErrors.endDateErrorMessage = "";
  }

  // Validate Goal
  if (!formData.goal.trim()) {
    console.log("goal")
    newErrors.goalError = true;
    newErrors.goalErrorMessage = "Fundraise goal is required.";
    isValid = false;
  } else if (isNaN(formData.goal) || Number(formData.goal) <= 0) {
    console.log("goal")
    newErrors.goalError = true;
    newErrors.goalErrorMessage = "Fundraise goal must be a positive number.";
    isValid = false;
  } else {
    newErrors.goalError = false;
    newErrors.goalErrorMessage = "";
  }

  // Validate Minimum Investment
  if (!formData.minInvestment.trim()) {
    console.log("min invest")
    newErrors.minInvestmentError = true;
    newErrors.minInvestmentErrorMessage = "Minimum investment is required.";
    isValid = false;
  } else if (
    isNaN(formData.minInvestment) ||
    Number(formData.minInvestment) <= 0
  ) {
    console.log("min invest")
    newErrors.minInvestmentError = true;
    newErrors.minInvestmentErrorMessage =
      "Minimum investment must be a positive number.";
    isValid = false;
  } else {
    newErrors.minInvestmentError = false;
    newErrors.minInvestmentErrorMessage = "";
  }

  // Validate Maximum Investment
  if (!formData.maxInvestment.trim()) {
    console.log("max invest")
    newErrors.maxInvestmentError = true;
    newErrors.maxInvestmentErrorMessage = "Maximum investment is required.";
    isValid = false;
  } else if (
    isNaN(formData.maxInvestment) ||
    Number(formData.maxInvestment) <= 0
  ) {
    console.log("max invest")
    newErrors.maxInvestmentError = true;
    newErrors.maxInvestmentErrorMessage =
      "Maximum investment must be a positive number.";
    isValid = false;
  } else if (Number(formData.maxInvestment) < Number(formData.minInvestment)) {
    newErrors.maxInvestmentError = true;
    newErrors.maxInvestmentErrorMessage =
      "Maximum investment must be greater than minimum investment.";
    isValid = false;
  } else {
    newErrors.maxInvestmentError = false;
    newErrors.maxInvestmentErrorMessage = "";
  }

  // Validate Password
  if (!formData.password) {
    console.log("password")
    newErrors.passwordError = true;
    newErrors.passwordErrorMessage = "Password is required.";
    isValid = false;
  } else if (formData.password.length < 8) {
    console.log("password")
    newErrors.passwordError = true;
    newErrors.passwordErrorMessage =
      "Password must be at least 8 characters long.";
    isValid = false;
  } else {
    newErrors.passwordError = false;
    newErrors.passwordErrorMessage = "";
  }

  // Validate Terms
  if (!formData.terms) {
    console.log("terms")
    newErrors.termsError = true;
    newErrors.termsErrorMessage = "You must agree to the Terms of Service.";
    isValid = false;
  } else {
    newErrors.termsError = false;
    newErrors.termsErrorMessage = "";
  }

  // Validate Business Description
  if (!formData.briefDescription.trim()) {
    console.log("brief description")
    newErrors.briefDescriptionError = true;
    newErrors.briefDescriptionErrorMessage =
      "Business description is required.";
    isValid = false;
  } else {
    newErrors.briefDescriptionError = false;
    newErrors.briefDescriptionErrorMessage = "";
  }

  // Validate Fundraising Purpose
  if (!formData.fundraisingPurpose.trim()) {
    console.log("purpose")
    newErrors.fundraisingPurposeError = true;
    newErrors.fundraisingPurposeErrorMessage =
      "Fundraising purpose is required.";
    isValid = false;
  } else if (formData.fundraisingPurpose.trim().length > 200) {
    console.log("purpose")
    newErrors.fundraisingPurposeError = true;
    newErrors.fundraisingPurposeErrorMessage =
      "Fundraising purpose cannot exceed 200 characters.";
    isValid = false;
  } else {
    newErrors.fundraisingPurposeError = false;
    newErrors.fundraisingPurposeErrorMessage = "";
  }

  // Validate Stock Amount
  if (!formData.stockAmount.trim()) {
    console.log("stock amount")
    newErrors.stockAmountError = true;
    newErrors.stockAmountErrorMessage = "Stock amount is required.";
    isValid = false;
  } else if (isNaN(formData.stockAmount) || Number(formData.stockAmount) <= 0) {
    console.log("stock amount")
    newErrors.stockAmountError = true;
    newErrors.stockAmountErrorMessage =
      "Stock amount must be a positive number.";
    isValid = false;
  } else {
    newErrors.stockAmountError = false;
    newErrors.stockAmountMessage = "";
  }

  // Validate Country Located
  if (!formData.countryLocated.trim()) {
    console.log("country")
    newErrors.countryLocatedError = true;
    newErrors.countryLocatedErrorMessage = "Country is required.";
    isValid = false;
  } else {
    newErrors.countryLocatedError = false;
    newErrors.countryLocatedErrorMessage = "";
  }

  // Validate City Located
  if (!formData.cityLocated.trim()) {
    console.log("city")
    newErrors.cityLocatedError = true;
    newErrors.cityLocatedErrorMessage = "City is required.";
    isValid = false;
  } else {
    newErrors.cityLocatedError = false;
    newErrors.cityLocatedErrorMessage = "";
  }

  return { isValid, newErrors };
};
