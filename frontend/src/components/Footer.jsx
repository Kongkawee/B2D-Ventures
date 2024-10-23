import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/GitHub";
import LogoLight from "../images/LogoLight.png";
import LogoDark from "../images/LogoDark.png";
import PopUpPrivacyPolicy from "./PopUp/PopUpPrivacyPolicy";
import PopUpAboutUs from "./PopUp/PopUpAboutUs";
import PopUpTerms from "./PopUp/PopUpTerms";
import PopUpContact from "./PopUp/PopUpContact";

const logoStyle = {
  width: "140px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link href="">B2Dventures</Link>
      &nbsp;{new Date().getFullYear()}
    </Typography>
  );
}

const scrollToSection = (sectionId) => {
  const sectionElement = document.getElementById(sectionId);
  const offset = 128;
  if (sectionElement) {
    const targetScroll = sectionElement.offsetTop - offset;
    sectionElement.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }
};

export default function Footer({ mode }) {
  const [openPrivacyDialog, setOpenPrivacyDialog] = useState(false);
  const [openAboutUsDialog, setOpenAboutUsDialog] = useState(false);
  const [openTermsDialog, setOpenTermsDialog] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);

  // Handlers for opening and closing dialogs
  const handleOpenPrivacyDialog = () => setOpenPrivacyDialog(true);
  const handleClosePrivacyDialog = () => setOpenPrivacyDialog(false);

  const handleOpenAboutUsDialog = () => setOpenAboutUsDialog(true);
  const handleCloseAboutUsDialog = () => setOpenAboutUsDialog(false);

  const handleOpenTermsDialog = () => setOpenTermsDialog(true);
  const handleCloseTermsDialog = () => setOpenTermsDialog(false);

  const handleOpenContactDialog = () => setOpenContactDialog(true);
  const handleCloseContactDialog = () => setOpenContactDialog(false);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Box sx={{ ml: "-15px" }}>
              <img
                src={mode === "light" ? LogoLight : LogoDark}
                style={logoStyle}
                alt="logo of b2d"
              />
            </Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Investment Platform
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Join us, and never miss the opportunities in investment.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600} alignSelf={"flex-start"}>
            Topic
          </Typography>
          <Link
            color="text.secondary"
            sx={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => scrollToSection("hotdeals")}
          >
            Hot Deals
          </Link>
          <Link
            color="text.secondary"
            sx={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => scrollToSection("faq")}
          >
            FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Company
          </Typography>
          <Link color="text.secondary" onClick={handleOpenAboutUsDialog}>
            About us
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Legal
          </Typography>
          <Link color="text.secondary" onClick={handleOpenTermsDialog}>
            Terms
          </Link>
          <Link color="text.secondary" onClick={handleOpenPrivacyDialog}>
            Privacy
          </Link>
          <Link color="text.secondary" onClick={handleOpenContactDialog}>
            Contact
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Link color="text.secondary" onClick={handleOpenPrivacyDialog}>
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" onClick={handleOpenTermsDialog}>
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/Kongkawee/B2D-Ventures"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <FacebookIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Dialog components */}
      <PopUpPrivacyPolicy
        open={openPrivacyDialog}
        handleClose={handleClosePrivacyDialog}
      />
      <PopUpAboutUs open={openAboutUsDialog} handleClose={handleCloseAboutUsDialog} />
      <PopUpTerms open={openTermsDialog} handleClose={handleCloseTermsDialog} />
      <PopUpContact open={openContactDialog} handleClose={handleCloseContactDialog} />
    </Container>
  );
}
