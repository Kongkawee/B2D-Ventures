import * as React from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Review() {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Your Investment" />
          <Typography variant="body2">$ 200.00</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Price Per Share" />
          <Typography variant="body2">$ 1.00</Typography>
        </ListItem>
        <Divider />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Capital Gained" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            200.00 Units
          </Typography>
        </ListItem>
      </List>
    </Stack>
  );
}
