import React, { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import ShowDeals from './components/ShowDeals';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import Footer from '../../components/Footer';

export default function BusinessExplorationPage() {
  const [mode, setMode] = useState('dark');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const LPtheme = createTheme({ palette: { mode } });
  const defaultTheme = createTheme({ palette: { mode } });

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

  const handleSetSelectedCategories = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar
        mode={mode}
        toggleColorMode={toggleColorMode}
        setSearchTerm={setSearchTerm}
        setSelectedCategories={handleSetSelectedCategories}
      />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <ShowDeals searchTerm={searchTerm} selectedCategories={selectedCategories} />
        <Divider />
        <Footer mode={mode}/>
        <ScrollToTopButton />
      </Box>
    </ThemeProvider>
  );
}
