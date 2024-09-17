import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BusinessCard from "./BusinessCard";
import { Button } from "@mui/material";

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
  // Add more businesses as needed
];

export default function HotDeals() {
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
          Deals you might be interested in.
        </Typography>
      </Box>

      {/* Grid for responsive layout */}
      <Grid container spacing={4} justifyContent="center" columns={9}>
        {businessDeals.map((deal, index) => (
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
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        sx={{
          width: { sm: "100%", md: "20%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        View All
      </Button>
    </Container>
  );
}
