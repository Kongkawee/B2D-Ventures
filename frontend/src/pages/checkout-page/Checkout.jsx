import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InvestmentForm from "./components/InvestmentForm";
import getCheckoutTheme from "./theme/getCheckoutTheme";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import Review from "./components/Review";
import RisksAcceptance from "./components/RisksAcceptance";
import TemplateFrame from "./TemplateFrame";
import api from "../../api";
import { useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import PopUpTerms from "../../components/PopUp/PopUpTerms";

const steps = ["Invest detail", "Risks acceptance", "Review your investment"];

function Checkout() {
  const [mode, setMode] = useState("light");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = useState(0);
  const [business, setBusiness] = useState(null);
  const [investmentDetails, setInvestmentDetails] = useState({
    amount: 0,
    capitalGain: 0,
  });
  const [investmentId, setInvestmentId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [openTermsDialog, setOpenTermsDialog] = useState(false);

  const handleOpenTermsDialog = () => {
    setOpenTermsDialog(true);
  };

  const handleCloseTermsDialog = () => {
    setOpenTermsDialog(false);
  };

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8000/api/business/${id}/`
        );
        setBusiness(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching business data:", err);
        setError("Failed to load business data.");
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [id]);

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

  const handleNext = () => {
    if (activeStep === 0) {
      const investmentAmount = investmentDetails.amount;
      if (investmentAmount <= 0) {
        alert("Please enter a valid investment amount.");
        return;
      }
      const capitalGain = investmentAmount / business.price_per_share;
      setInvestmentDetails((prevDetails) => ({
        ...prevDetails,
        capitalGain,
      }));
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInvestmentDetailsChange = (details) => {
    setInvestmentDetails(details);
  };

  const handlePlaceOrder = async () => {
    if (!business) {
      alert("Invalid business data.");
      return;
    }

    try {
      const response = await api.post("/api/invest/", {
        business_id: business.id,
        amount: investmentDetails.amount,
        shares: investmentDetails.capitalGain,
      });

      console.log("Investment successful:", response.data);
      alert("Investment placed successfully!");
      setInvestmentId(response.data.id);
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error("Error placing investment:", error);
      if (error.response) {
        alert(
          error.response.data.error || "Investment failed. Please try again."
        );
      } else {
        alert("Network error. Please check your connection.");
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
          <InvestmentForm
            business={business}
            onDetailsChange={handleInvestmentDetailsChange}
            handleOpenTermsDialog={handleOpenTermsDialog}
          />
          <PopUpTerms open={openTermsDialog} handleClose={handleCloseTermsDialog} />
        </div>
        );
      case 1:
        return <RisksAcceptance />;
      case 2:
        return (
          <Review investmentDetails={investmentDetails} business={business} />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
          <Grid
            size={{ xs: 12, sm: 5, lg: 4 }}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              alignItems: "start",
              pt: 10,
              px: 5,
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Info business={business} />
            </Box>
          </Grid>
          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "100%",
              backgroundColor: { xs: "transparent", sm: "background.default" },
              alignItems: "start",
              pt: { xs: 6, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexGrow: 1,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{ width: "100%", height: 40 }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ":first-child": { pl: 0 },
                        ":last-child": { pr: 0 },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
            <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Investment
                  </Typography>
                  <Typography variant="body1">
                    ${investmentDetails.amount || 0}
                  </Typography>
                </div>
                <InfoMobile totalPrice={`$${investmentDetails.amount || 0}`} />
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
                maxHeight: "720px",
                gap: { xs: 5, md: "none" },
              }}
            >
              <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: "flex", md: "none" } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ":first-child": { pl: 0 }, ":last-child": { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h5">
                    Thank you for your investment!
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Your order number is
                    <strong>&nbsp;#{investmentId}</strong>.
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    We, {business.business_name}, Thanks for your investment.
                  </Typography>
                  <Divider/>
                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    href="/inv-pro"
                  >
                    Go to my orders
                  </Button>
                </Stack>
              ) : (
                <>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        activeStep === 0 ? "flex-end" : "space-between",
                      mt: 2,
                    }}
                  >
                    {activeStep !== 0 && (
                      <Button
                        onClick={handleBack}
                        variant="text"
                        startIcon={<ChevronLeftIcon />}
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      onClick={
                        activeStep === steps.length - 1
                          ? handlePlaceOrder
                          : handleNext
                      }
                      variant="contained"
                      endIcon={<ChevronRightIcon />}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </TemplateFrame>
  );
}

export default Checkout;
