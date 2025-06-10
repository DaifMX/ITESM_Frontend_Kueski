import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

export default function OrderSuccessView() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card sx={{ maxWidth: 400, mx: 'auto', my: 4, p: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 64 }} />
          <Typography variant="h5" component="h2">
            ¡Todo listo!
          </Typography>
          <Typography variant="body1" align="center">
            La orden {' '}
            <Box component="span" sx={{ fontWeight: 'medium' }}>
              #{params.orderId}
            </Box>{' '}
            fue completada de manera exitosa.
          </Typography>
          <Button variant="contained" onClick={() => navigate(`/my-orders`)} sx={{ mt: 2 }}>
            Ver ordenes
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
