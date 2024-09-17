import * as React from "react";
import { Box, IconButton } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useState, useEffect, useRef } from "react";
import HeroInvestor from "./HeroCollection/HeroInvestor";
import HeroBusiness from "./HeroCollection/HeroBusiness";

const heroes = [HeroInvestor, HeroBusiness]; // List of hero components

export default function HeroSection() {
  const [currentHero, setCurrentHero] = useState(0); // State to manage the current hero
  const [isTransitioning, setIsTransitioning] = useState(false); // To manage the transition effect
  const intervalRef = useRef(null); // To store the interval reference
  const timerStartRef = useRef(Date.now()); // To track the start time of the timer

  useEffect(() => {
    startAutoSlide(); // Start the interval when the component mounts

    return () => clearInterval(intervalRef.current); // Clean up interval on unmount
  }, []);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current); // Clear any existing interval

    const currentTime = Date.now();
    timerStartRef.current = currentTime; // Update timer start time
    console.log("Timer reset. Next slide in 6 seconds from", new Date(currentTime).toLocaleTimeString());

    intervalRef.current = setInterval(() => {
      handleTransition();
    }, 6000); // Set the interval to 6 seconds
  };

  const handleTransition = () => {
    setIsTransitioning(true); // Start transition
    setTimeout(() => {
      setCurrentHero((prev) => (prev + 1) % heroes.length); // Cycle through heroes
      setIsTransitioning(false); // End transition
    }, 1000); // Match the transition duration
  };

  const handleDotClick = (index) => {
    setCurrentHero(index); // Set the current hero on circle click
    startAutoSlide(); // Reset the auto-slide timer to 6 seconds
  };

  return (
    <Box position="relative" overflow="hidden" justifyContent="center" display="flex">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          transition: "opacity 1s ease-in-out",
          opacity: isTransitioning ? 0 : 1, // Fade effect during transition
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "64px",
        }}
      >
        {/* Render the current hero component */}
        {React.createElement(heroes[currentHero])}
      </Box>

      {/* Dots to indicate the current slide */}
      <Box
        position="absolute"
        display="flex"
        padding= "0px"
        bottom= "10px"
        width="fit-content"
      >
        {heroes.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => handleDotClick(index)}
            sx={{
              color:
                currentHero === index ? "white" : "rgba(255, 255, 255, 0.5)",
            }}
          >
            <CircleIcon sx={{ height: 12, width: 12 }}/>
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}
