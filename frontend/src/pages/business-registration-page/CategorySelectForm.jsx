import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  Drawer,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Papa from "papaparse";

export default function CategorySelectForm({ onCategoryChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState("");
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/business_categories.csv");
        if (!response.ok) {
          throw new Error("Failed to fetch CSV file");
        }
        const csvData = await response.text();
        Papa.parse(csvData, {
          header: false,
          skipEmptyLines: true,
          complete: (results) => {
            const categories = results.data.map((row) => row[0]);
            setAvailableCategories(categories.filter(Boolean));
          },
        });
      } catch (error) {
        console.error("Error fetching and parsing the CSV file:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    let newSelectedCategories = [];
    if (selectedCategories.includes(category)) {
      newSelectedCategories = selectedCategories.filter((item) => item !== category);
    } else if (selectedCategories.length < 4) {
      newSelectedCategories = [...selectedCategories, category];
    } else {
      setError("You can select a maximum of 4 categories.");
      return;
    }

    setSelectedCategories(newSelectedCategories);
    setError("");
    onCategoryChange(newSelectedCategories);
  };

  const filteredCategories = availableCategories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        border: "1px solid hsla(220, 20%, 25%, 0.6)",
        borderRadius: 1,
        p: 2,
        mb: 2,
      }}
    >
      <Button variant="contained" onClick={() => setDrawerOpen(true)}>
        Open Category Selector
      </Button>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Selected Categories:</Typography>

        {selectedCategories.length > 0 ? (
          <ul>
            {selectedCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No categories selected
          </Typography>
        )}
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 300 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Select Categories</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
          <TextField
            label="Search Categories"
            fullWidth
            sx={{ mb: 2 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
            <List>
              {filteredCategories.map((category, index) => (
                <ListItem key={index} disablePadding>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                    }
                    label={category}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setDrawerOpen(false)}
          >
            Submit
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
