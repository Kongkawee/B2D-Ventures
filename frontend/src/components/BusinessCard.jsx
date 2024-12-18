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
  cityLocated,
  companyName,
}) {
  const categoryArray = categories
    .split(",")
    .map((category) => category.trim());

  return (
    <Link
      to={`/bus/${businessId}`}
      style={{ textDecoration: "none", flexGrow: 1 }}
    >
      <Card
        id="business-card"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: 3,
          overflow: "hidden",
          maxWidth: "100%",
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          alt={`${businessTitle} Picture`}
          height="200"
          image={picture}
          sx={{
            objectFit: "cover",
            width: "100%",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "248px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {businessTitle}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {companyName}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mt: 1,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3, 
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
              }}
            >
              {briefDescription}
            </Typography>
          </Box>
          <Box sx={{ bottom: 0, position: "absolute", right: 0, left: 0, padding: "16px" }}>
            <Box className="location">
              <Typography
                variant="body2"
                sx={{
                  color: "gray",
                  mt: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {countryLocated}, {cityLocated}
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
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
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
