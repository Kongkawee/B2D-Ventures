import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Divider, LinearProgress, Card } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../../../api";


export default function InvestInfoBox({ business }) {
  const percentageRaised = (business.current_investment / business.goal) * 100;
  const [investorsCount, setInvestorsCount] = useState(0);

  useEffect(() => {
    const fetchInvestmentByBusiness = async () => {
      try {
        const response = await api.get(`api/investment/business/${business.id}/`);
        const uniqueInvestorIds = new Set(response.data.map(investment => investment.investor));
        setInvestorsCount(uniqueInvestorIds.size);

      } catch (error) {
        console.error("Error fetching investment deals:", error);
      }
    };

    fetchInvestmentByBusiness();
  }, [business.id]);

  const endDate = new Date(business.end_date);
  const currentDate = new Date();
  const daysLeft = Math.max(0, Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)));

  return (
    <Card sx={{ p: 4 }}>
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          borderRadius: 2,
          boxShadow: 3,
          spaceY: 2,
        }}
      >
        <Typography id="current-investment" variant="h3" fontWeight="bold" color="text.primary">
          $ {Number(business.current_investment).toFixed(2).toLocaleString()}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {percentageRaised.toFixed(2)}% raised of ${Number(business.goal).toFixed(2).toLocaleString()} funding goal
        </Typography>

        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={percentageRaised}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: (theme) => theme.palette.grey[300],
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                backgroundColor: "green",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            bgcolor: "inherit",
            border: 1,
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Typography id="fundraise-purpose" variant="body2">
            {business.fundraise_purpose}
          </Typography>
        </Box>

        <Typography
          variant="h3"
          fontWeight="bold"
          color="text.primary"
          sx={{ mt: 2 }}
        >
          {investorsCount}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Investors
        </Typography>

        <Divider sx={{ my: 2, borderColor: "grey.300" }} />

        <Typography variant="h3" fontWeight="bold" color="text.primary">
          {daysLeft} days
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Left to invest
        </Typography>

        <Link to={`/checkout/${business.id}`} style={{ textDecoration: "none" }}>
          <Button
            id="invest-button"
            sx={{
              backgroundColor: "green",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "8px",
              mt: 2,
              padding: "12px 24px",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            Invest in {business.business_name}
          </Button>
        </Link>
      </Box>
    </Card>
  );
}
