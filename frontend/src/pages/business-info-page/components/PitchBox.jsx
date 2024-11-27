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
          <Typography id="pitch-topic" component="h2" variant="h4" sx={{ my: 2 }}>
            {value.topic}
          </Typography>
          
           {/* Display Image if Available */}
           {value.image && (
            <Box
              component="img"
              src={value.image} // Base64 image
              alt={`Pitch Image for ${value.topic}`}
              sx={{ width: "100%", height: "auto", borderRadius: 1, my: 2 }}
            />
          )}

          {/* Description */}
          <Typography id="pitch-description" component="p" variant="body1" sx={{ my: 2, fontSize: "h6.fontSize" }}>
            {value.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}