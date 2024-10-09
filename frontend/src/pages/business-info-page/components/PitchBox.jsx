import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardMedia } from "@mui/material";

export default function PitchBox() {
  return (
    <Box>
      <Typography component="h2" variant="h4" sx={{ my: 2 }}>
        Highlights
      </Typography>
      <Typography component="p" variant="body1" sx={{ my: 2, fontSize: "h6.fontSize" }}>
        Invest in an upcoming portfolio of movies from Pressman Film, one of Hollywood's top
        independent production companies. Get in on the ground floor of the filmmaking process, 
        get exclusive insider perks, and share in the returns. 
      </Typography>

      {/* Apply Typography styles directly to the bullet points */}
      <Box component="ul" sx={{ fontSize: "h6.fontSize", paddingLeft: "1.5rem" }}>
        <Box component="li" sx={{ marginBottom: 1 }}>
          Track record of 100+ films & $2B+ in present-day global box office value
        </Box>
        <Box component="li" sx={{ marginBottom: 1 }}>
          IP catalog of major books, articles, comics, & remake rights
        </Box>
        <Box component="li" sx={{ marginBottom: 1 }}>
          Deep relationships with Oscar-winning actors, writers, & directors
        </Box>
        <Box component="li" sx={{ marginBottom: 1 }}>
          Fund the development of new films in a variety of genres
        </Box>
        <Box component="li" sx={{ marginBottom: 1 }}>
          3 revenue streams: development premium + producing fees + net profits
        </Box>
      </Box>

      <Typography component="h2" variant="h4" sx={{ my: 2 }}>
        About Pressman Film
      </Typography>
      <CardMedia
        component="img"
        image="https://republic.com/cdn-cgi/image/width=680,dpr=2/https://uploads.republic.com/p/images/attachments/original/000/146/259/146259-1725473499-c0c8258dfae71d846e4be3794437d09cc5b05f10.jpg"
      />
    </Box>
  );
}
