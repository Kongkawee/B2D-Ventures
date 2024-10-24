import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppNavBar from './components/AppNavBar';
import HeroSection from './components/HeroSection';
import FAQ from './components/FAQ';
import HotDeals from './components/HotDeals';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import Footer from '../../components/Footer';


export default function HomePage() {
  const [mode, setMode] = React.useState('dark');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppNavBar mode={mode} toggleColorMode={toggleColorMode} />
      <HeroSection />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <HotDeals />
        <Divider />
        <FAQ />
        <Divider />
        <Footer mode={mode}/>
        <ScrollToTopButton />
      </Box>
    </ThemeProvider>
  );
}