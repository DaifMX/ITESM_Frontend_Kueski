import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";

import { Typography, Box, Card, CardContent, CardMedia, Button } from '@mui/material';

import { useCartContext } from '../../context/CartContext';
import useProduct from '../../api/hooks/useProduct';

export default function ProductDetailView({ context }) {

  const { addToCart, removeFromCart, items } = useCartContext()

  const params = useParams();
  const navigate = useNavigate()

  const { getById } = useProduct();
  const [product, setProduct] = useState(null);

  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    if (context?.type === 'CART') setProduct(context.payload);

    if (!product && context?.type !== 'CART') {
      try {
        (async () => {
          const res = await getById(params.productId);
          setProduct(res.data.payload);
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, [product, items]);


  const handleQuantity = (OPTION) => {
    if (OPTION == "ADD" && productQuantity < product.stock) {
      setProductQuantity(productQuantity + 1)
    } else if (OPTION == "SUBSTRACT" && productQuantity > 1) {
      setProductQuantity(productQuantity - 1)
    }
  }

  return (
    <>
      {
        product ? (
          <Box sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: context?.type === 'CART' ? 'none' : 'center',
              maxWidth: '500px',
              alignItems: 'center',
              borderRadius: 2,
              margin: "10px"
            }}>
              <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 4, height: "20px" }}>
                {product.name}
              </Typography>

              {/* Carta de Control de Producto */}
              <Card sx={{ width: "100%", mb: 4 }}>
                <CardMedia
                  sx={{ height: 300, width: 500 }}
                  image={`${import.meta.env.VITE_BASE_API_URL}`.replace('/api/', `${product.imgPath}`)}
                  title={product.name}
                />
                <CardContent sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  pb: 2
                }}>
                  <Button variant="contained"
                    sx={{
                      backgroundColor: '#cebd22',
                      height: 60,
                      minWidth: 60,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': { backgroundColor: '#e6d225' }
                    }}
                    onClick={() => handleQuantity("SUBSTRACT")}>
                    <Typography variant="h3">-</Typography>
                  </Button>
                  <Typography variant="h4">{productQuantity}</Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#cebd22',
                      height: 60,
                      minWidth: 60,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': { backgroundColor: '#e6d225' }
                    }}
                    onClick={() => handleQuantity("ADD")}>
                    <Typography variant="h3">+</Typography>
                  </Button>

                  {context?.type === 'CART' ? (
                    <Button variant="contained"
                      onClick={() => {
                        removeFromCart(product?.id)
                        console.log('PDC', product.id)
                      }}
                      sx={{
                        backgroundColor: '#ab1002',
                        height: 60,
                        fontWeight: 700,
                        '&:hover': { backgroundColor: '#cf1302' }
                      }}> Borrar </Button>
                  ) : (
                    <Button variant="contained"
                      onClick={() => addToCart({ product: product, count: productQuantity })}
                      sx={{
                        backgroundColor: '#cebd22',
                        height: 60,
                        fontWeight: 700,
                        '&:hover': { backgroundColor: '#e6d225' }
                      }}>
                      Agregar
                    </Button>
                  )
                  }

                </CardContent>
                <Typography variant="h5" component="div" sx={{ textAlign: 'center', py: 2 }}>
                  {product.price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} c/ pieza
                </Typography>
              </Card>

              {/* Carta de descripción del Producto */}
              {
                context?.type !== 'CART' ? (
                  <Card sx={{ width: 500 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" sx={{ mb: 3, height: "150px", overflow: "scroll" }}>
                        {product.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#cebd22',
                            height: 60,
                            fontWeight: 700,
                            '&:hover': { backgroundColor: '#e6d225' }
                          }}
                          onClick={() => navigate('/')}>
                          Regresar
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ) : (
                  <></>
                )
              }
            </Box>
          </Box >

        ) : (
          <h1>Producto Inexistente</h1 >
        )
      }
    </>
  )
}