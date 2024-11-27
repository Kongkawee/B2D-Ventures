import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider, Card } from "@mui/material";
import { format } from "date-fns";

export default function DealTermsBox({ business }) {
  const formattedDeadline = business.end_date
    ? format(new Date(business.end_date), "MMMM d, yyyy")
    : "N/A";

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
        {/* Deal Terms Title */}
        <Typography variant="h3" color="text.primary" sx={{ mb: 2 }}>
          Deal Terms
        </Typography>

        {/* Minimum Investment */}
        <Typography variant="body1" color="text.secondary">
          Minimum Investment
        </Typography>
        <Typography
          id="min-investment"
          variant="h4"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          $ {Number(business.min_investment).toFixed(2).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 2, borderColor: "grey.700" }} />

        {/* Maximum Investment */}
        <Typography variant="body1" color="text.secondary">
          Maximum Investment
        </Typography>
        <Typography
          id="max-investment"
          variant="h4"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          {business.max_investment
            ? `$ ${Number(business.max_investment).toFixed(2).toLocaleString()}`
            : "-"}
        </Typography>

        <Divider sx={{ my: 2, borderColor: "grey.700" }} />

        {/* Funding Goal */}
        <Typography variant="body1" color="text.secondary">
          Funding Goal
        </Typography>
        <Typography
          id="goal"
          variant="h4"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          $ {Number(business.goal).toFixed(2).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 2, borderColor: "grey.700" }} />

        {/* Deadline */}
        <Typography variant="body1" color="text.secondary">
          Deadline
        </Typography>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          {formattedDeadline}
        </Typography>

        <Divider sx={{ my: 2, borderColor: "grey.700" }} />

        {/* Price per Share */}
        <Typography variant="body1" color="text.secondary">
          Stock Amount
        </Typography>
        <Typography
          id="price-per-share"
          variant="h4"
          color="text.primary"
        >
        {Number(business.stock_amount).toFixed(2).toLocaleString() } Units
        </Typography>
      </Box>
    </Card>
  );
}
