import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { motion } from 'framer-motion';

// Props: orderNumber (string), onRetry (function)
export default function OrderRejectView() {
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
          <ErrorOutlineIcon color="error" sx={{ fontSize: 64 }} />
          <Typography variant="h5" component="h2">
            Order Failed!
          </Typography>
          <Typography variant="body1" align="center">
            Unfortunately, your order{' '}
            <Box component="span" sx={{ fontWeight: 'medium' }}>
              #{params.orderId}
            </Box>{' '}
            could not be processed.
          </Typography>
          <Button variant="contained" color="error" onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Go to store
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
