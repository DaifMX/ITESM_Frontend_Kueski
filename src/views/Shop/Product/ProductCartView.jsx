
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import Divider from '@mui/material/Divider';


export default function ProductCartView({ payload }) {

  const theme = useTheme();



  return (
    <>
      <Divider />
      <Card sx={{ display: 'flex', backgroundColor: 'black', margin: '24px' }}>
        <CardMedia
          component="img"
          sx={{ width: 250 }}
          src='https://m.media-amazon.com/images/I/61wPZIrs1XL._SL1000_.jpg'
          alt="penis  r"
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', px: '15px' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            box
            <Typography component="span" variant="h4">
              Turbo +4200 psi
            </Typography>
            <Typography component="span" variant="h4">
              Turbo +4200 psi
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              4200 pesos changos
            </Typography>
          </CardContent>

        </Box>

      </Card>
      <Divider />
    </>
  );
}