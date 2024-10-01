import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BusinessCard from "./BusinessCard";

const businessDeals = [
  {
    businessTitle: "Pressman Film",
    businessId: "B001",
    categories: "Entertainment, Media",
    description:
      "A major film production company focusing on producing groundbreaking films across all genres. It's dedicated to bringing visionary storytelling to life.",
    businessLogo: "",
    picture:
      "https://uploads.republic.com/p/offerings/slider_media_items/previews/default_2x/000/032/684/32684-1725487846-9103ddee4ba95095971afd721de151faa49ce7bb.png",
    location: "Place",
    companyName: "Company",
  },
  {
    businessTitle: "Tech Innovators",
    businessId: "B002",
    categories: "Technology, AI",
    description:
      "A cutting-edge AI and tech company providing innovative solutions in artificial intelligence, cloud computing, and robotics.",
    businessLogo: "",
    picture:
      "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg",
    location: "Place",
    companyName: "Company",
  },
  {
    businessTitle: "Eco Builders",
    businessId: "B003",
    categories: "Construction, Green Energy",
    description:
      "Specializing in eco-friendly construction, this company aims to revolutionize the building industry with sustainable and renewable materials.",
    businessLogo: "",
    picture:
      "https://www.hanson.my/sites/default/files/2024-05/green-building-revolution-eco-friendly.jpg",
    location: "Place",
    companyName: "Company",
  },
  {
    businessTitle: "Pressman Film",
    businessId: "B001",
    categories: "Entertainment, Media",
    description:
      "A major film production company focusing on producing groundbreaking films across all genres. It's dedicated to bringing visionary storytelling to life.",
    businessLogo: "",
    picture:
      "https://uploads.republic.com/p/offerings/slider_media_items/previews/default_2x/000/032/684/32684-1725487846-9103ddee4ba95095971afd721de151faa49ce7bb.png",
    location: "Place",
    companyName: "Company",
  },
  {
    businessTitle: "Tech Innovators",
    businessId: "B002",
    categories: "Technology, AI",
    description:
      "A cutting-edge AI and tech company providing innovative solutions in artificial intelligence, cloud computing, and robotics.",
    businessLogo: "",
    picture:
      "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg",
    location: "Place",
    companyName: "Company",
  },
];

export default function ShowDeals() {
  const [visibleDeals, setVisibleDeals] = useState(3); // Initially show 15 deals (Changed to 3 for tests)

  const handleViewMore = () => {
    setVisibleDeals((prev) => prev + 3); // Show 15 more deals when clicked (Changed to 3 for tests)
  };

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
      {/* Grid for responsive layout */}
      <Grid container spacing={4} justifyContent="center" columns={9}>
        {businessDeals.slice(0, visibleDeals).map((deal, index) => (
          <Grid item size={{ sm: 12, md: 3 }} xs={12} sm={6} md={4} key={index}>
            <BusinessCard
              businessTitle={deal.businessTitle}
              businessId={deal.businessId}
              categories={deal.categories}
              description={deal.description}
              businessLogo={deal.businessLogo}
              picture={deal.picture}
              location={deal.location}
              companyName={deal.companyName}
            />
          </Grid>
        ))}
      </Grid>
      {visibleDeals < businessDeals.length && (
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
