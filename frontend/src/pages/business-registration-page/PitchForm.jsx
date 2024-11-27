import React, { useState } from "react";
import { Box, Button, TextField, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function PitchForm({ onPitchChange }) {
  const [sections, setSections] = useState([{ topic: "", image: null, description: "" }]);

  const addSection = () => {
    const newSections = [...sections, { topic: "", image: null, description: "" }];
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // Base64 string
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // Read file as Base64
    });
  };

  const handleImageChange = async (index, event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Image = await convertToBase64(file);
        const newSections = [...sections];
        newSections[index].image = base64Image; // Store Base64 string
        setSections(newSections);
        onPitchChange(newSections);
      } catch (error) {
        console.error("Failed to convert image to Base64:", error);
      }
    }
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
      <Typography variant="h4" gutterBottom>
        Pitch Form
      </Typography>
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
            id={`pitch-topic-${index}`}
            label="Title"
            name="topic"
            value={section.topic}
            onChange={(event) => handleInputChange(index, event)}
            fullWidth
          />
          {section.image && (
            <Box
              component="img"
              src={section.image}
              alt={`Image for Section ${index + 1}`}
              sx={{ width: "100%", height: "auto", mt: 2 }}
            />
          )}
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ mt: 2, mb: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(event) => handleImageChange(index, event)}
            />
          </Button>
          <TextField
            id={`pitch-description-${index}`}
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
