import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function PitchForm({ onPitchChange }) {
  const [sections, setSections] = useState([{ topic: "", description: "" }]);

  const addSection = () => {
    const newSections = [...sections, { topic: "", description: "" }];
    setSections(newSections);
    onPitchChange(newSections);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newSections = [...sections];
    newSections[index][name] = value;
    setSections(newSections);
    onPitchChange(newSections);
  };

  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
    onPitchChange(newSections);
  };

  return (
    <Box
      sx={{
        border: "1px solid hsla(220, 20%, 25%, 0.6)",
        borderRadius: 1,
        p: 2,
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h4" gutterBottom sx={{ flexGrow: 1 }}>
          Pitch Form
        </Typography>
        <Tooltip
          title="Use this form to structure and present your business pitch effectively. Add sections for specific topics and descriptions."
          arrow
          placement="top"
        >
          <HelpOutlineIcon sx={{ color: "text.secondary" }} fontSize="" />
        </Tooltip>
      </Box>

      {sections.map((section, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            border: "1px solid hsla(220, 20%, 25%, 0.6)",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Section {index + 1}
          </Typography>
          <TextField
            id="pitch-topic"
            label="Title"
            name="topic"
            value={section.topic}
            onChange={(event) => handleInputChange(index, event)}
            fullWidth
          />
          <TextField
            id="pitch-description"
            label="Description"
            name="description"
            value={section.description}
            onChange={(event) => handleInputChange(index, event)}
            fullWidth
            multiline
            rows={5}
            sx={{ my: 2 }}
          />
          <IconButton color="error" onClick={() => removeSection(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button variant="contained" onClick={addSection}>
        Add Section
      </Button>
    </Box>
  );
}
