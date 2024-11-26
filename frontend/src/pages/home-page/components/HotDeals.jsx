import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BusinessCard from "../../../components/BusinessCard";
import { Button } from "@mui/material";
import api from "../../../api";
import { BUSINESS_CARD_API } from "../../../constants";

export default function HotDeals() {
  const [businessDeals, setBusinessDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultImage =
    "https://uploads.republic.com/p/offerings/slider_media_items/previews/default_2x/000/032/684/32684-1725487846-9103ddee4ba95095971afd721de151faa49ce7bb.png";

    useEffect(() => {
      const fetchBusinessDeals = async () => {
        try {
          const response = await api.get(BUSINESS_CARD_API);
          const businesses = response.data;
  
          const businessesWithInvestorCounts = await Promise.all(
            businesses.map(async (business) => {
              try {
                const investmentResponse = await api.get(
                  `api/investment/business/${business.id}/`
                );
                const uniqueInvestorIds = new Set(
                  investmentResponse.data.map(
                    (investment) => investment.investor.id
                  )
                );
                return {
                  ...business,
                  uniqueInvestorCount: uniqueInvestorIds.size,
                };
              } catch (investmentError) {
                console.error(
                  `Error fetching investments for business ${business.id}:`,
                  investmentError
                );
                return {
                  ...business,
                  uniqueInvestorCount: 0, 
                };
              }
            })
          );
  
          const sortedDeals = businessesWithInvestorCounts.sort(
            (a, b) => b.uniqueInvestorCount - a.uniqueInvestorCount
          );
  
          setBusinessDeals(sortedDeals);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching business deals:", error);
          setError("Failed to load business deals.");
          setLoading(false);
        }
      };
  
      fetchBusinessDeals();
    }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const limitedBusinessDeals = businessDeals.slice(0, 3);

  return (
    <Container
      id="hotdeals"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 6 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Interesting Deals
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Attracting the most investors.
        </Typography>
      </Box>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        {limitedBusinessDeals.map((deal, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ width: "30%" }}>
            <BusinessCard
              businessTitle={deal.business_name}
              businessId={deal.id}
              categories={
                Array.isArray(deal.business_category) &&
                deal.business_category.length > 0
                  ? deal.business_category.join(", ")
                  : "No categories"
              }
              briefDescription={deal.brief_description}
              picture={deal.cover_image || defaultImage}
              countryLocated={deal.country_located || "Unknown Country"}
              provinceLocated={deal.province_located || "Unknown Province"}
              companyName={deal.company_name}
            />
          </Grid>
        ))}
      </Grid>

      <Button
        id="view-more-button"
        type="submit"
        fullWidth
        variant="outlined"
        sx={{
          width: { sm: "100%", md: "20%" },
          textAlign: { sm: "left", md: "center" },
        }}
        href="explore"
      >
        View All
      </Button>
    </Container>
  );
}
