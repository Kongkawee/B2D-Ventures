import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PitchBox({ business }) {
  return (
    <Box>
      {/* Loop through the pitch object */}
      {Object.entries(business.pitch).map(([key, value]) => (
        <Box key={key} sx={{ my: 2 }}>
          {/* Topic */}
          <Typography component="h2" variant="h4" sx={{ my: 2 }}>
            {value.topic}
          </Typography>

          {/* Description */}
          <Typography component="p" variant="body1" sx={{ my: 2, fontSize: "h6.fontSize" }}>
            {value.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}