import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, Button, Divider, LinearProgress, Card } from "@mui/material";
import { Link } from "react-router-dom";

export default function InvestInfoBox() {
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
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          $524,072
        </Typography>

        {/* Percentage Raised */}
        <Typography variant="body1" color="text.secondary">
          34% raised of $1.5M funding goal{" "}
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={34}
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

        {/* Funding Info Box */}
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
          {/* <Avatar
          src="https://placehold.co/40x40"
          alt="Logo"
          sx={{ width: 40, height: 40, mr: 2 }}
        /> */}
          <Typography variant="body2">
            Funding goal of $1.5M will allow us to develop six different films.
            Should we exceed our Funding Goal, the additional funds will enable
            us to pursue higher-value intellectual properties and engage
            higher-level writers.
            {/* <Typography
            component="a"
            href="#"
            color="inherit"
            fontWeight="bold"
            sx={{ textDecoration: "none", cursor: "pointer" }}
          >
            View more
          </Typography> */}
          </Typography>
        </Box>

        {/* Investors */}
        <Typography
          variant="h3"
          fontWeight="bold"
          color="text.primary"
          sx={{ mt: 2 }}
        >
          125
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Investors
        </Typography>

        {/* Divider */}
        <Divider sx={{ my: 2, borderColor: "grey.300" }} />

        {/* Days Left */}
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          72 days
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Left to invest
        </Typography>
        <Link to="/checkout" style={{ textDecoration: "none" }} >
          <Button
            sx={{
              backgroundColor: "green", // Button background color
              color: "white", // White text
              fontWeight: "bold",
              fontSize: "16px", // Font size
              textTransform: "none", // No uppercase text
              borderRadius: "8px", // Rounded corners
              mt: 2,
              padding: "12px 24px", // Padding
              "&:hover": {
                backgroundColor: "darkgreen", // Darker green on hover
              },
            }}
          >
            Invest in Pressman Film
          </Button>
        </Link>
      </Box>
    </Card>
  );
}
