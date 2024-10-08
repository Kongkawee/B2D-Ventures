import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function GeneralInformationForm({
  formData,
  handleChange,
  errors,
}) {
  return (
    <Box
      component="div"
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
        <FormLabel htmlFor="publishDate">Fundraise Publish Date</FormLabel>
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
        <FormLabel htmlFor="deadlineDate">Fundraise Deadline Date</FormLabel>
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
        <FormLabel htmlFor="minInvestment">Minimum Investment</FormLabel>
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
        <FormLabel htmlFor="maxInvestment">Maximum Investment</FormLabel>
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
  );
}
