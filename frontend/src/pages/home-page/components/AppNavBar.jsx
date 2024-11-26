import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import LogoLight from "../../../images/LogoLight.png";
import LogoDark from "../../../images/LogoDark.png";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, BUSINESS_REGISTER_PATH, INVESTOR_PROFILE_PATH, INVESTOR_SIGN_UP_PATH, LOG_OUT_PATH } from "../../../constants";
import { Button, ListItemText, Drawer } from "@mui/material";

const logoStyle = {
  width: "100px",
  margin: "10px",
  height: "auto",
  cursor: "pointer",
};

function AppNavBar({ mode, toggleColorMode, userData }) {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorElBusiness, setAnchorElBusiness] = useState(null);
  const [anchorElInvestor, setAnchorElInvestor] = useState(null);
  const [anchorElAvatar, setAnchorElAvatar] = useState(null);
  const navigate = useNavigate();
  const placeholderImage = "/static/images/avatar/placeholder.jpg";

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    navigate(LOG_OUT_PATH);
  };

  const handleProfile = () => {
    navigate(INVESTOR_PROFILE_PATH);
    handleCloseAvatarMenu();
  };

  const handleOpenBusinessMenu = (event) => {
    setAnchorElBusiness(event.currentTarget);
  };

  const handleCloseBusinessMenu = () => {
    setAnchorElBusiness(null);
  };

  const handleOpenInvestorMenu = (event) => {
    setAnchorElInvestor(event.currentTarget);
  };

  const handleCloseInvestorMenu = () => {
    setAnchorElInvestor(null);
  };

  const handleOpenAvatarMenu = (event) => {
    setAnchorElAvatar(event.currentTarget);
  };

  const handleCloseAvatarMenu = () => {
    setAnchorElAvatar(null);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          width: "100%",
        }}
      >
        <Container disableGutters maxWidth={false}>
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              bgcolor: theme.palette.mode === "light" ? "white" : "black",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={mode === "light" ? LogoLight : LogoDark}
                style={logoStyle}
                alt="logo"
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  onClick={() => scrollToSection("hotdeals")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Hot Deals
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("faq")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQs
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {!isAuthenticated ? (
                <>
                  <Button
                    id="business-menu-dropdown"
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={handleOpenBusinessMenu}
                  >
                    Business
                  </Button>
                  <Menu
                    anchorEl={anchorElBusiness}
                    open={Boolean(anchorElBusiness)}
                    onClose={handleCloseBusinessMenu}
                  >
                    <MenuItem
                      id="business-register-button"
                      onClick={() => navigate(BUSINESS_REGISTER_PATH)}
                    >
                      <ListItemText primary="Business Registration" />
                    </MenuItem>
                  </Menu>
                  <Button
                    id="investor-menu-dropdown"
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={handleOpenInvestorMenu}
                  >
                    Investor
                  </Button>
                  <Menu
                    anchorEl={anchorElInvestor}
                    open={Boolean(anchorElInvestor)}
                    onClose={handleCloseInvestorMenu}
                  >
                    <MenuItem
                      id="investor-sign-up-button"
                      onClick={() => navigate(INVESTOR_SIGN_UP_PATH)}
                    >
                      <ListItemText primary="Investor Registration" />
                    </MenuItem>
                  </Menu>
                  <Button
                    id="sign-in-button"
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    href="/sin"
                  >
                    Sign in
                  </Button>
                </>
              ) : (
                <>
                  <IconButton onClick={handleOpenAvatarMenu} sx={{ p: 0 }}>
                    <Avatar
                      sizes="small"
                      alt=""
                      src={userData?.profile_picture || placeholderImage}
                      sx={{ width: 36, height: 36 }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElAvatar}
                    open={Boolean(anchorElAvatar)}
                    onClose={handleCloseAvatarMenu}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
            <Box sx={{ display: { sm: "flex", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem onClick={() => scrollToSection("hotdeals")}>
                    Hot Deals
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("faq")}>
                    FAQs
                  </MenuItem>
                  <Divider />
                  {!isAuthenticated ? (
                    <>
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        onClick={handleOpenBusinessMenu}
                      >
                        Business
                      </Button>
                      <Menu
                        anchorEl={anchorElBusiness}
                        open={Boolean(anchorElBusiness)}
                        onClose={handleCloseBusinessMenu}
                      >
                        <MenuItem onClick={() => navigate(BUSINESS_REGISTER_PATH)}>
                          <ListItemText primary="Business Registration" />
                        </MenuItem>
                      </Menu>
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        onClick={handleOpenInvestorMenu}
                      >
                        Investor
                      </Button>
                      <Menu
                        anchorEl={anchorElInvestor}
                        open={Boolean(anchorElInvestor)}
                        onClose={handleCloseInvestorMenu}
                      >
                        <MenuItem onClick={() => navigate(INVESTOR_SIGN_UP_PATH)}>
                          <ListItemText primary="Investor Registration" />
                        </MenuItem>
                      </Menu>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="outlined"
                          component="a"
                          href="/sign-in"
                          sx={{ width: "100%" }}
                        >
                          Sign in
                        </Button>
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleLogout}
                        sx={{ width: "100%" }}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppNavBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppNavBar;
