import * as React from "react";
import { Box, IconButton } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useState, useEffect, useRef } from "react";
import HeroInvestor from "./HeroCollection/HeroInvestor";
import HeroBusiness from "./HeroCollection/HeroBusiness";

const heroes = [HeroInvestor, HeroBusiness];

export default function HeroSection() {
  const [currentHero, setCurrentHero] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const timerStartRef = useRef(Date.now());

  useEffect(() => {
    startAutoSlide();

    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);

    const currentTime = Date.now();
    timerStartRef.current = currentTime;

    intervalRef.current = setInterval(() => {
      handleTransition();
    }, 6000);
  };

  const handleTransition = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentHero((prev) => (prev + 1) % heroes.length);
      setIsTransitioning(false);
    }, 1000);
  };

  const handleDotClick = (index) => {
    setCurrentHero(index);
    startAutoSlide();
  };

  return (
    <Box position="relative" overflow="hidden" justifyContent="center" display="flex">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          transition: "opacity 1s ease-in-out",
          opacity: isTransitioning ? 0 : 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "64px",
        }}
      >
        {React.createElement(heroes[currentHero])}
      </Box>

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
