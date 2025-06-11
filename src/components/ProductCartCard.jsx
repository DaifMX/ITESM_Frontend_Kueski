import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { fCurrency } from '../utils/format-number';
import { useCartContext } from '../context/CartContext';

export default function ProductCartCard({ payload }) {
  const { addToCart, removeFromCart, } = useCartContext();
  const [item, setItem] = useState(payload);

  const handleAdd = (product) => {
    addToCart(product);
    setItem((prev) => ({ ...prev, amount: prev.amount + 1 }));
  }

  const handleDelete = (itemId) => {
    removeFromCart(itemId);
    setItem((prev) => ({ ...prev, amount: prev.amount - 1 }));
  }

  return (
    <>
      <Box sx={{ justifyContent: 'left', mb: '5px' }}>

        <Card
          sx={{
            borderRadius: 0,
            position: 'relative',
            display: 'flex',
            p: '15px 15px 0px 15px',
            color: 'white',
            flexDirection: { xs: 'column', md: 'row' }
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 200,
              height: 200,
            }}
            src={payload.imgPath}
            alt={payload.name}
          />
          <Box >
            <CardContent sx={{ flex: '1 0 auto', p: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: { md: 'space-between' }, flexDirection: { xs: 'column' }, width: { lg: '240px', xs: '240px' }, maxHeight: '120px', minHeight: '120px', textAlign: 'left' }}>
                <Typography component="div" variant="h6" sx={{ minWidth: '240px', maxWidth: '480px' }} >
                  {item.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '23px' }}
                >
                  {fCurrency(item.price)}
                </Typography>
              </Box>

              <Box sx={{ border: 'solid 3.5px yellow', borderRadius: '20px', width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '20px', p: '3px' }}>
                <DeleteOutlineRoundedIcon onClick={() => handleDelete(item.id)} />
                <Typography
                  variant="subtitle1"
                  component="div"
                >
                  {item ? item.amount : 1}
                </Typography>
                <AddRoundedIcon onClick={() => handleAdd({ amount: item.amount + 1, product: item })} />
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box >
    </>
  );
}