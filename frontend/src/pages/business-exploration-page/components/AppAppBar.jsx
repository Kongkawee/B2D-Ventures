import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import LogoLight from "../../../images/LogoLight.png";
import LogoDark from "../../../images/LogoDark.png";
import Search from "./Search";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FilterListIcon from "@mui/icons-material/FilterList";
import Papa from "papaparse";

const logoStyle = {
  width: "100px",
  margin: "10px",
  height: "auto",
  cursor: "pointer",
};

function AppAppBar({
  mode,
  toggleColorMode,
  setSearchTerm,
  setSelectedCategories,
}) {
  const [filterDrawerOpen, setFilterDrawerOpen] = React.useState(false);
  const [availableCategories, setAvailableCategories] = React.useState([]);
  const [selectedCategories, setLocalSelectedCategories] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/business_categories.csv");
      const csvData = await response.text();
      Papa.parse(csvData, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const categories = results.data.map((row) => row[0]);
          setAvailableCategories(categories.filter(Boolean));
        },
      });
    };

    fetchCategories();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    setLocalSelectedCategories(updatedCategories);
    setSelectedCategories(updatedCategories);
  };

  const toggleFilterDrawer = (newOpen) => () => {
    setFilterDrawerOpen(newOpen);
  };

  const resetCategories = () => {
    setLocalSelectedCategories([]);
    setSelectedCategories([]);
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
              <Button
                variant="text"
                size="small"
                aria-label="Back"
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                Back
              </Button>
              <img
                src={mode === "light" ? LogoLight : LogoDark}
                style={logoStyle}
                alt="logo of b2d"
              />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <Search setSearchTerm={setSearchTerm} />
              <Button
                variant="text"
                color="inherit"
                startIcon={<FilterListIcon />}
                onClick={toggleFilterDrawer(true)}
              >
                Filter Categories
              </Button>
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
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
                  <Divider />
                  <MenuItem>
                    <Search setSearchTerm={setSearchTerm} />
                  </MenuItem>
                  <MenuItem>
                    <Button
                      fullWidth
                      variant="text"
                      color="inherit"
                      startIcon={<FilterListIcon />}
                      onClick={toggleFilterDrawer(true)}
                    >
                      Filter Categories
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={toggleFilterDrawer(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6">Category Filters</Typography>
          <Box sx={{ maxHeight: 400, overflowY: "auto", mb: 2 }}>
            {availableCategories.map((category, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                }
                label={category}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={resetCategories}
          >
            Reset
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
};

export default AppAppBar;
