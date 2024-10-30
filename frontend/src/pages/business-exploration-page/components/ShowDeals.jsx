import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BusinessCard from "../../../components/BusinessCard";
import api from "../../../api";
import { Box } from "@mui/material";

export default function ShowDeals({ searchTerm }) {
  const [visibleDeals, setVisibleDeals] = useState(3);
  const [businessDeals, setBusinessDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultImage =
    "https://uploads.republic.com/p/offerings/slider_media_items/previews/default_2x/000/032/684/32684-1725487846-9103ddee4ba95095971afd721de151faa49ce7bb.png";

  useEffect(() => {
    const fetchBusinessDeals = async () => {
      try {
        const response = await api.get("api/business/card/");
        setBusinessDeals(response.data);
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

  const handleViewMore = () => {
    setVisibleDeals((prev) => prev + 6);
  };

  // Corrected the field used for filtering the deals
  const filteredDeals = businessDeals.filter((deal) =>
    deal.business_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Grid container spacing={4} justifyContent="center">
        {filteredDeals.slice(0, visibleDeals).map((deal, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} maxWidth={"30%"}>
            <BusinessCard
              businessTitle={deal.business_name}
              businessId={deal.id}
              categories={
                Array.isArray(deal.business_category) && deal.business_category.length > 0
                  ? deal.business_category.join(", ")
                  : "No categories"
              }              
              briefDescription={deal.brief_description}
              picture={defaultImage}
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
