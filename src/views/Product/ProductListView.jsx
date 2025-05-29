import { useState, useEffect } from 'react'
import { useParams } from 'react-router';

import ProductCard from './ProductCard';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import useProduct from '../../api/hooks/useProduct';

export default function ProductListView() {
  const params = useParams();

  const { getAll, loading } = useProduct();
  const [prodcuts, setProducts] = useState([]);

  useEffect(() => {
    // Per category
    if (params.categoryId) {
      (async () => {
        const res = await getAll(params.categoryId);
        setProducts(res.data.payload);
      })();

      // All
    } else {
      (async () => {
        const res = await getAll();
        setProducts(res.data.payload);
      })();
    }

  }, [params]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "1460px", margin: "0 auto" }}>
          {loading ? (
              <CircularProgress />
            ) : prodcuts && prodcuts.length > 0 ? (
              prodcuts.map((product) => (
                <ProductCard key={product.id} props={product} />
              ))
            ) : (
              <h1>Lo sentimos, no hay productos disponibles.</h1>
            )}
        </Box>
      </Box>
    </>
  );
};