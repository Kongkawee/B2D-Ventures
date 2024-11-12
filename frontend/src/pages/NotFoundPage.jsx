import React from 'react';
import { Box, Typography, Grid2 } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

function NotFound() {
    return (
        <Grid2 
            container 
            direction="column" 
            alignItems="center" 
            justifyContent="center" 
            style={{ minHeight: '100vh', backgroundColor: '#f8d7da' }}
        >
            <Grid2 item>
                <ErrorIcon style={{ fontSize: 60, color: '#721c24' }} />
            </Grid2>
            <Grid2 item>
                <Typography variant="h4" color="#721c24" gutterBottom>
                    404 Not Found
                </Typography>
                <Typography variant="body1" color="#721c24" gutterBottom>
                    The page you're looking for doesn't exist!
                </Typography>
                <Typography variant="body2" color="#721c24">
                    Please{' '}
                    <Typography 
                        component="a" 
                        href="/" 
                        style={{ color: '#1976d2', textDecoration: 'underline', cursor: 'pointer', margin: '0 5px' }}
                    >
                        go back to the homepage
                    </Typography>
                </Typography>
            </Grid2>
        </Grid2>
    );
}

export default NotFound;