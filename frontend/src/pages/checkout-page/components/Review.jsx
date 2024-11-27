import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Review({ investmentDetails, business }) {
  const pricePerShare = parseFloat(business.goal) / parseFloat(business.stock_amount);
  const sharesGain = investmentDetails.amount/ pricePerShare
  return (
    <Stack spacing={2}>
      <List disablePadding>
        {/* Investment Amount */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Your Investment" />
          <Typography variant="body2">
            $ {investmentDetails.amount.toFixed(2)}
          </Typography>
        </ListItem>

        {/* Price Per Share */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Price Per Share" />
          <Typography variant="body2">
            ${pricePerShare.toFixed(2)}
          </Typography>
        </ListItem>

        <Divider />

        {/* Share Gained */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shares Gained" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {sharesGain.toFixed(2)} Units
          </Typography>
        </ListItem>
      </List>
    </Stack>
  );
}
