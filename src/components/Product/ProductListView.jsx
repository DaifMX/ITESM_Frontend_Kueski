import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import ProductCard from './ProductCard';

import Box from '@mui/material/Box';

import { getDocs, getFirestore, collection, query, where } from 'firebase/firestore';

export default function ProductListView() {
  const params = useParams();

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    let q, snapshot;

    // Per category
    if (params.categoryId) {
      (async () => {
        console.log('category ran');
        q = query(collection(db, 'products'), where('category', '==', params.categoryId));
        snapshot = await getDocs(q, {apiKey: "YOUR_SECRET_KEY"});
        if (snapshot.size === 0) console.log('NO HAY OBJETOS');
        else setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      })();

      // ALl products
    } else {
      (async () => {
        q = collection(db, 'products');
        snapshot = await getDocs(q);
        if (snapshot.size === 0) console.log('NO HAY OBJETOS');
        else setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      })();
    }

  }, [params]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "1460px", margin: "0 auto" }}>
          {
            products ? (
              products.map((product) => (
                <ProductCard key={product.id} props={product} />
              ))
            ) : (
            <h1> Lo sentimos, no hay productos disponibles.</h1>
            )
          }
        </Box>
      </Box>
    </>
  )
}