import products from '../../_mock/products'

export function getProductById (id) {

  let productReturn;

  for (const product of products) {
    if(product.id == id){
      productReturn = product
    }
  }

  if(!productReturn) {
    throw new Error('Producto no Encontrado')
  }

  return productReturn
};