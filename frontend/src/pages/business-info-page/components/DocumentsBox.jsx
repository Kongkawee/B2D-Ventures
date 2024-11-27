import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Divider,
  Card,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

export default function DocumentsBox({ documents }) {
  if (!documents || documents.length === 0) {
    return (
      <Card sx={{ p: 4 }}>
        <Box
          sx={{
            maxWidth: 400,
            mx: "auto",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h3" color="text.primary" sx={{ mb: 2 }}>
            Business Documents
          </Typography>
          <Typography variant="body1" color="text.secondary">
            No documents available.
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 4 }}>
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h3" color="text.primary" sx={{ mb: 2 }}>
          Business Documents
        </Typography>

        <List>
          {documents.map((doc, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link href={doc.document} target="_blank" rel="noopener">
                      {doc.name || `Document ${index + 1}`}
                    </Link>
                  }
                />
              </ListItem>
              {index < documents.length - 1 && (
                <Divider sx={{ my: 1, borderColor: "grey.700" }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Card>
  );
}
