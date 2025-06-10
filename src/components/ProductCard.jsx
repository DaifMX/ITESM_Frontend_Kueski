import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useNavigate } from 'react-router';

export default function ProductsCard({ props }) {
  const navigate = useNavigate();
  const handleDetailsBtn = () => navigate((`/product/${props.id}`));

  return (
    <Card sx={{
      width: 345,
      margin: "10px",
      backgroundColor: "secondary",
      overflow: "hidden",
      '&:hover': {
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
        cursor: "pointer"
      }
    }}>
      <CardHeader
        sx={{ height: 80, textAlign: 'center', fontSize: 30 }}
        title={props.name}
      />
      <CardMedia
        component="img"
        height="280"
        image={`${import.meta.env.VITE_BASE_API_URL}`.replace('/api/', `${props.imgPath}`)}
        alt={`Imágen de ${props.name}`}
      />
      <CardContent>
        <Stack spacing={4} direction="row">
          <Typography variant="h4" sx={{ color: 'text.primary' }}>
            {props.price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: '#cebd22', fontWeight: 700, '&:hover': { backgroundColor: '#e6d225' } }} onClick={handleDetailsBtn}>
            Detalles
          </Button>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );
};