/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useCartContext } from '../../context/CartContext';

export default function ColorBadge({handleCart}) {
  const { total } = useCartContext()
  const [itemsAmount, setItemsAmount] = useState(0)
  useEffect(() => {
    setItemsAmount(total)
  }, [total]);

  useEffect(() => {
    setItemsAmount(total)
  })

  return (
    <IconButton spacing={2} direction="row" sx={{ ml: { xs: '6px', md: 5 }, mr: { xs: '6px', md: 5 } }} onClick={handleCart}>
      <Badge badgeContent={itemsAmount} color="error" >
        <ShoppingCartIcon color="action" sx={{ color: "white", fontSize: 27}} />
      </Badge>
    </IconButton>
  );
}