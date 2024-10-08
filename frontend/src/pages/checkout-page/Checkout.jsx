import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import InvesmentForm from './components/InvestmentForm';
import getCheckoutTheme from './theme/getCheckoutTheme';
import Info from './components/Info';
import InfoMobile from './components/InfoMobile';
import Review from './components/Review';
import RisksAcceptance from './components/RisksAcceptance';
import TemplateFrame from './TemplateFrame';
import axios from 'axios';

const steps = ['Invest detail', 'Risks acceptance', 'Review your investment'];

function getStepContent(step, formData, setFormData) {
  switch (step) {
    case 0:
      return <InvesmentForm formData={formData} setFormData={setFormData} />;
    case 1:
      return <RisksAcceptance />;
    case 2:
      return <Review formData={formData} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    investor_id: '',
    business_id: '',
    amount: ''
  });
  const [error, setError] = React.useState(null);

  // Toggle theme based on system preference
  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  // Submit the investment to the backend
  const handleSubmitInvestment = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/invest/', {
        investor_id: formData.investor_id,
        business_id: formData.business_id,
        amount: formData.amount
      });
      console.log('Investment success:', response.data);
      setActiveStep(activeStep + 1); // Move to the next step if successful
    } catch (error) {
      console.error('Error during investment:', error);
      setError('Failed to submit the investment. Please try again.');
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmitInvestment(); // Submit investment on the last step
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
          <Grid
            size={{ xs: 12, sm: 5, lg: 4 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              backgroundColor: 'background.paper',
              borderRight: { sm: 'none', md: '1px solid' },
              borderColor: { sm: 'none', md: 'divider' },
              alignItems: 'start',
              pt: 10,
              px: 5,
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: 500,
              }}
            >
              <Info />
            </Box>
          </Grid>
          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              width: '100%',
              backgroundColor: { xs: 'transparent', sm: 'background.default' },
              alignItems: 'start',
              pt: { xs: 6, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { sm: 'space-between', md: 'flex-end' },
                alignItems: 'center',
                width: '100%',
                maxWidth: { sm: '100%', md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexGrow: 1,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{ width: '100%', height: 40 }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>

            {error && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )}

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: { sm: '100%', md: 600 },
                maxHeight: '720px',
                gap: { xs: 5, md: 'none' },
              }}
            >
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h5">Thank you for your investment!</Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Your order number is
                    <strong>&nbsp;#9999</strong>. We have emailed your order confirmation and will update you once it's complete.
                  </Typography>
                  <Button variant="contained" sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }} href="/">
                    Go to my orders
                  </Button>
                </Stack>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep, formData, setFormData)}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                    }}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                      >
                        Previous
                      </Button>
                    )}

                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{ display: { xs: 'flex', sm: 'none' } }}
                      >
                        Previous
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      onClick={handleNext}
                      sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </TemplateFrame>
  );
}
