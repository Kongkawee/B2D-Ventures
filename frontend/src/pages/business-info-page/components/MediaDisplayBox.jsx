import * as React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { CardMedia } from "@mui/material";

export default function MediaDisplayBox({ businessImages }) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const images = businessImages.map((img) => ({
    src: img.image,
    alt: `Image for Business ${img.business}`,
  }));

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
      {images.length > 0 && (
        <>
          <CardMedia
            component="img"
            image={images[currentIndex].src}
            alt={images[currentIndex].alt}
            onClick={handleMainImageClick}
            sx={{ borderRadius: "inherit", cursor: "pointer" }}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{
              py: 1,
              mt: { xs: 8, md: 0 },
              overflowX: "auto",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
            {images.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                image={image.src}
                alt={image.alt}
                onClick={() => handleStackClick(index)}
                sx={{
                  borderRadius: "inherit",
                  width: 200,
                  flexShrink: 0,
                  cursor: "pointer",
                  border: currentIndex === index ? `2px solid ${theme.palette.primary.main}` : "none",
                }}
              />
            ))}
          </Stack>
        </>
      )}
    </Card>
  );
}
