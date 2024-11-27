import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BusinessCard from "../../../components/BusinessCard";
import api from "../../../api";
import { Box, ButtonGroup } from "@mui/material";
import { BUSINESS_CARD_API } from "../../../constants";

export default function ShowDeals({ searchTerm, selectedCategories }) {
  const [visibleDeals, setVisibleDeals] = useState(6);
  const [businessDeals, setBusinessDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("hottest");

  const defaultImage =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";

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

        setBusinessDeals(businessesWithInvestorCounts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching business deals:", error);
        setError("Failed to load business deals.");
        setLoading(false);
      }
    };

    fetchBusinessDeals();
  }, []);

  const sortDeals = (deals, criteria) => {
    switch (criteria) {
      case "hottest":
        return deals.sort((a, b) => b.uniqueInvestorCount - a.uniqueInvestorCount);
      case "mostRecent":
        return deals.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
      case "mostInvestment":
        return deals.sort((a, b) => b.current_investment - a.current_investment);
      default:
        return deals;
    }
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const filteredDeals = sortDeals(
    businessDeals.filter((deal) => {
      const matchesSearchTerm = deal.business_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const dealCategories = Array.isArray(deal.business_category)
        ? deal.business_category.map((cat) => cat.toLowerCase())
        : [];

      const matchesSelectedCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          dealCategories.includes(category.toLowerCase())
        );

      return matchesSearchTerm && matchesSelectedCategories;
    }),
    sortCriteria
  );

  const handleViewMore = () => {
    setVisibleDeals((prev) => prev + 6);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sort By
        </Typography>
        <ButtonGroup variant="outlined" fullWidth>
          <Button
            onClick={() => handleSortChange("hottest")}
            variant={sortCriteria === "hottest" ? "contained" : "outlined"}
          >
            Hottest
          </Button>
          <Button
            onClick={() => handleSortChange("mostRecent")}
            variant={sortCriteria === "mostRecent" ? "contained" : "outlined"}
          >
            Most Recent
          </Button>
          <Button
            onClick={() => handleSortChange("mostInvestment")}
            variant={sortCriteria === "mostInvestment" ? "contained" : "outlined"}
          >
            Most Investment
          </Button>
        </ButtonGroup>
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ width: "100%" }}>
        {filteredDeals.slice(0, visibleDeals).map((deal, index) => (
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
      {visibleDeals < filteredDeals.length && (
        <Button
          fullWidth
          variant="outlined"
          sx={{
            width: { sm: "100%", md: "30%" },
            textAlign: { sm: "left", md: "center" },
          }}
          onClick={handleViewMore}
        >
          View More
        </Button>
      )}
    </Container>
  );
}
