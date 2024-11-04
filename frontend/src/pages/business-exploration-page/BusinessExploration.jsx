import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import ShowDeals from './components/ShowDeals';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import Footer from '../../components/Footer';

export default function BusinessExplorationPage() {
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const LPtheme = createTheme({ palette: { mode } });
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
