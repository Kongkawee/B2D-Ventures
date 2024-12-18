import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import MediaDisplayBox from "./MediaDisplayBox";
import { CardMedia, Divider } from "@mui/material";
import PitchBox from "./PitchBox";
import InvestInfoBox from "./InvestInfoBox";
import DealTermsBox from "./DealTermsBox";
import DocumentsBox from "./DocumentsBox";

export default function MainGrid({ business }) {
  const defaultImage =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
  console.log(business);
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography id="business-name" component="h1" variant="h1" sx={{ mb: 0 }}>
        {business.business_name}
      </Typography>
      <Typography
        id="brief-description"
        component="overline"
        variant="overline"
        sx={{ mb: 2 }}
      >
        {business.brief_description}
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ sm: 12, md: 8 }} sx={{ mb: 1 }}>
          <Box sx={{ marginBottom: "16px" }}>
            <MediaDisplayBox businessImages={business.describe_images} />
          </Box>
          <Divider />
          <Typography component="h2" variant="h4" sx={{ my: 2 }}>
            Pitch
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ md: 12, lg: 8 }}>
              <PitchBox business={business} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          size={{ sm: 12, md: 4 }}
          rowSpacing={2}
          sx={{ mb: 1 }}
        >
          <Grid>
            <CardMedia
              component="img"
              image={business.cover_image || defaultImage}
              sx={{
                height: "200px",
                borderRadius: "8px",
                border: "1px solid hsla(220, 20%, 25%, 0.6);",
              }}
            />
          </Grid>
          <Grid>
            <InvestInfoBox business={business} />
          </Grid>
          <Grid>
            <DealTermsBox business={business} />
          </Grid>
          <Grid>
            <DocumentsBox documents={business.documents}/>
          </Grid>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
