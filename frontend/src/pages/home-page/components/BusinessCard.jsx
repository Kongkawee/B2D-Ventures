import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ImgMediaCard() {
  return (
    <Link to="/bus" style={{ textDecoration: 'none' }}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Deal Pic"
        height="140"
        image="https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Special Deal
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          AI-powered legal document platform that saves companies time and money
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
}
