import * as React from "react";
import { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import MainGrid from "./components/MainGrid";
import SideMenu from "./components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./theme/customizations";
import api from "../../api";
import { BUSINESS_INVESTMENT_API, BUSINESS_PROFILE_API } from "../../constants";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function BusinessProfile(props) {
  const [userData, setUserData] = useState(null);
  const [userInvestment, setUserInvestment] = useState([]);
  const [currentInvestment, setCurrentInvestment] = useState(0.00);

  useEffect(() => {
    getUserData();
    getUserInvestment();
  }, []);

  const getUserData = () => {
    api
      .get(BUSINESS_PROFILE_API)
      .then((res) => res.data)
      .then((data) => {
        setUserData(data);
        setCurrentInvestment(data.current_investment)
      })
      .catch((err) => alert(err));
  };

  const getUserInvestment = () => {
  api
    .get(BUSINESS_INVESTMENT_API)
    .then((res) => res.data)
    .then((data) => {
      const mappedData = data.map((investment) => {
        const investmentDate = new Date(investment.investment_date);
        
        const formattedDate = investmentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        return {
          id: investment.id,
          investorName: `${investment.investor.first_name} ${investment.investor.last_name}`,
          amount: parseFloat(investment.amount),
          shares: parseFloat(investment.shares),
          investmentDate: formattedDate,
        };
      });
      setUserInvestment(mappedData);
    })
    .catch((err) => {
      console.error('Error fetching investments:', err);
      alert('Failed to fetch investment data');
    });
};

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu userData={userData} />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid currentInvestment={currentInvestment} userInvestment={userInvestment}/>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
