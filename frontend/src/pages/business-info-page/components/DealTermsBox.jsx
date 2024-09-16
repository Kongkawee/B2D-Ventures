import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, Button, Divider, LinearProgress, Card } from "@mui/material";
import { Link } from "react-router-dom";

export default function DealTermsBox() {
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
        {/* Funding Amount */}
        <Typography variant="h3" color="text.primary" sx={{ mb: 2 }}>
          Deal Terms
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Minimum investment
        </Typography>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          $ 200
        </Typography>

        <Divider sx={{ my: 2, borderColor: "grey.700" }} />

        <Typography variant="body1" color="text.secondary">
          Maximum investment
        </Typography>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          -
        </Typography>

        <Divider sx={{ my: 2, borderColor: "grey.700" }} />


        <Typography variant="body1" color="text.secondary">
          Funding goal
        </Typography>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          $ 1.5M
        </Typography>

        <Divider sx={{ my: 2, borderColor: "grey.700" }} />

        <Typography variant="body1" color="text.secondary">
          Deadline
        </Typography>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          November 23, 2024
        </Typography>

        <Divider sx={{ my: 2, borderColor: "grey.700" }} />

        <Typography variant="body1" color="text.secondary">
          Price per share
        </Typography>
        <Typography
          variant="h4"
          color="text.primary"
        >
          $ 1
        </Typography>
      </Box>
    </Card>
  );
}
