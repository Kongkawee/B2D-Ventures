import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppNavBar from "./components/AppNavBar";
import HeroSection from "./components/HeroSection";
import FAQ from "./components/FAQ";
import HotDeals from "./components/HotDeals";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import Footer from "../../components/Footer";
import api from "../../api";
import { ACCESS_TOKEN } from "../../constants";

export default function HomePage() {
  const [mode, setMode] = useState("dark");
  const defaultTheme = createTheme({ palette: { mode } });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    getUserData();
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const getUserData = () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      api
        .get("/api/investor/profile/", {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err); 
          alert("Failed to fetch user data."); 
        });
    } else {
      console.warn("No access token found."); 
    }
  };

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppNavBar
        mode={mode}
        userData={userData}
        toggleColorMode={toggleColorMode}
      />
      <HeroSection />
      <Box sx={{ bgcolor: "background.default" }}>
        <Divider />
        <HotDeals />
        <Divider />
        <FAQ />
        <Divider />
        <Footer mode={mode} />
        <ScrollToTopButton />
      </Box>
    </ThemeProvider>
  );
}
