export const validateInputs = (formData, errors) => {
  let isValid = true;
  let newErrors = { ...errors };

  // Validate Company Name
  if (!formData.companyName || !formData.companyName.trim()) {
    newErrors.companyNameError = true;
    newErrors.companyNameErrorMessage = "Company name is required.";
    isValid = false;
  } else {
    newErrors.companyNameError = false;
    newErrors.companyNameErrorMessage = "";
  }

  // Validate Business Name
  if (!formData.businessName || !formData.businessName.trim()) {
    newErrors.businessNameError = true;
    newErrors.businessNameErrorMessage = "Business name is required.";
    isValid = false;
  } else {
    newErrors.businessNameError = false;
    newErrors.businessNameErrorMessage = "";
  }

  // Validate Email
  if (!formData.email || !formData.email.trim()) {
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

  // Validate Phone Number
  if (!formData.phoneNumber.trim()) {
    newErrors.phoneError = true;
    newErrors.phoneErrorMessage = "Phone number is required.";
    isValid = false;
  } else if (
    !/^\d{3}\d{3}\d{4}$/.test(formData.phoneNumber.replace(/-/g, ""))
  ) {
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
    newErrors.publishDateError = true;
    newErrors.publishDateErrorMessage = "Publish date is required.";
    isValid = false;
  } else {
    newErrors.publishDateError = false;
    newErrors.publishDateErrorMessage = "";
  }

  // Validate End Date
  if (!formData.endDate) {
    newErrors.deadlineDateError = true;
    newErrors.deadlineDateErrorMessage = "Deadline date is required.";
    isValid = false;
  } else if (
    formData.publishDate &&
    new Date(formData.endDate) < new Date(formData.publishDate)
  ) {
    newErrors.deadlineDateError = true;
    newErrors.deadlineDateErrorMessage =
      "Deadline date must be after publish date.";
    isValid = false;
  } else {
    newErrors.deadlineDateError = false;
    newErrors.deadlineDateErrorMessage = "";
  }

  // Validate Goal
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

  // Validate Minimum Investment
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

  // Validate Maximum Investment
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
    newErrors.passwordError = true;
    newErrors.passwordErrorMessage = "Password is required.";
    isValid = false;
  } else if (formData.password.length < 8) {
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
    newErrors.termsError = true;
    newErrors.termsErrorMessage = "You must agree to the Terms of Service.";
    isValid = false;
  } else {
    newErrors.termsError = false;
    newErrors.termsErrorMessage = "";
  }

  // Validate Pitching
  if (!formData.pitching.trim()) {
    newErrors.pitchingError = true;
    newErrors.pitchingErrorMessage = "Pitching is required.";
    isValid = false;
  } else {
    newErrors.pitchingError = false;
    newErrors.pitchingErrorMessage = "";
  }

  // Validate Business Description
  if (!formData.businessDescription.trim()) {
    newErrors.businessDescriptionError = true;
    newErrors.businessDescriptionErrorMessage =
      "Business description is required.";
    isValid = false;
  } else {
    newErrors.businessDescriptionError = false;
    newErrors.businessDescriptionErrorMessage = "";
  }

  // Validate Stock Amount
  if (!formData.stockAmount.trim()) {
    newErrors.stockAmountError = true;
    newErrors.stockAmountErrorMessage = "Price per share is required.";
    isValid = false;
  } else if (
    isNaN(formData.stockAmount) ||
    Number(formData.stockAmount) <= 0
  ) {
    newErrors.stockAmountError = true;
    newErrors.stockAmountErrorMessage =
      "Stock Amount must be a positive number.";
    isValid = false;
  } else {
    newErrors.stockAmountError = false;
    newErrors.stockAmountMessage = "";
  }

  return { isValid, newErrors };
};
