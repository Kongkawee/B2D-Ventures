import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

export default function BusinessCard({
  businessTitle,
  businessId,
  categories,
  briefDescription,
  picture,
  countryLocated,
  provinceLocated,
  companyName,
}) {
  const categoryArray = categories
    .split(",")
    .map((category) => category.trim());

  return (
    <Link to={`/bus/${businessId}`} style={{ textDecoration: "none", flexGrow: 1 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: 3,
        }}
      >
        <CardMedia
          component="img"
          alt={`${businessTitle} Picture`}
          height="200"
          image={picture}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {businessTitle}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {companyName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
              {briefDescription}
            </Typography>
          </Box>
          <Box>
            <Box className="location">
              <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
                {provinceLocated}, {countryLocated}
              </Typography>
            </Box>
            <Box className="categories" sx={{ display: "flex", gap: 1, my: 1 }}>
              {categoryArray.map((category, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    backgroundColor: "#EEEEEE",
                    color: "#00000099",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    px: 1,
                    py: 0.5,
                    borderRadius: "4px",
                  }}
                >
                  {category}
                </Typography>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
