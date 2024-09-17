import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { CardMedia } from "@mui/material";

export default function MediaDisplayBox() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0); // Stores the index of the main photo
  const images = [
    {
      src: "https://uploads.republic.com/p/offerings/slider_media_items/previews/default_2x/000/032/684/32684-1725487846-9103ddee4ba95095971afd721de151faa49ce7bb.png",
      alt: "Business Pic 1",
    },
    {
      src: "https://uploads.republic.com/p/offerings/slider_media_items/contents/default_2x/000/032/717/32717-1725500339-913c09bab662aba4b2775879f096a3388b9d4db9.jpg",
      alt: "Business Pic 2",
    },
    {
      src: "https://uploads.republic.com/p/offerings/slider_media_items/contents/default_2x/000/031/791/31791-1724694627-67c7878404b5a491fb136b8498b0ec19d03dd0f9.png",
      alt: "Business Pic 3",
    },
    {
      src: "https://uploads.republic.com/p/offerings/slider_media_items/previews/default_2x/000/032/229/32229-1724881218-f8b98be82191f5091a4978bf6fb20e86a15c1995.png",
      alt: "Business Pic 4",
    },
    {
      src: "https://uploads.republic.com/p/offerings/slider_media_items/previews/default_2x/000/032/230/32230-1724881249-cc50d94927a4c7130c82fe313d5dc15306ad71c6.png",
      alt: "Business Pic 5",
    },
    {
      src: "https://uploads.republic.com/p/offerings/slider_media_items/contents/default_2x/000/032/575/32575-1724956993-a912a11e5ef17a9e6f1bb20fffffe146785535aa.jpg",
      alt: "Business Pic 6",
    },
  ];

  // Handle click on a photo in the stack
  const handleStackClick = (index) => {
    setCurrentIndex(index);
  };

  // Handle click on left or right half of the main image
  const handleMainImageClick = (event) => {
    const width = event.target.offsetWidth;
    const clickPosition = event.nativeEvent.offsetX;
    
    if (clickPosition < width / 2 && currentIndex > 0) {
      // Clicked on left half, go to previous image
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (clickPosition >= width / 2 && currentIndex < images.length - 1) {
      // Clicked on right half, go to next image
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <Card variant="outlined" sx={{ width: "100%", p: 0 }}>
      <CardMedia
        component="img"
        image={images[currentIndex].src}
        alt={images[currentIndex].alt}
        onClick={handleMainImageClick}
        sx={{ borderRadius: "inherit", cursor: "pointer" }} // Clickable
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          py: 1,
          mt: { xs: 8, md: 0 },
          overflowX: "auto", // Enables horizontal scrolling
          whiteSpace: "nowrap", // Prevents wrapping of images in the stack
          maxWidth: "100%", // Ensures the container respects the max width
        }}
      >
        {images.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            image={image.src}
            alt={image.alt}
            onClick={() => handleStackClick(index)} // Click to update main photo
            sx={{
              borderRadius: "inherit",
              width: 200,
              flexShrink: 0, // Prevents images from shrinking
              cursor: "pointer", // Show pointer when hovering over the image
              border: currentIndex === index ? `2px solid ${theme.palette.primary.main}` : "none", // Highlight selected image
            }}
          />
        ))}
      </Stack>
    </Card>
  );
}