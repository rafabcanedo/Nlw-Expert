import { ProductCartProps } from '@/store/cart-store';
import { ProductProps } from '@/utils/data/products';

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(({ id }) => newProduct.id === id);

   // Check if the product exist, if it exits we increment in the list (+1)
  if (existingProduct) {
    return products.map((product) =>
      product.id === existingProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product,
    );
  }

  return [...products, { ...newProduct, quantity: 1 }];
}

export function remove(products: ProductCartProps[], productRemovedId: string) {
 const updateProducts = products.map((product) =>
 product.id === productRemovedId 
  ? {
  ...product,
  quantity: product.quantity > 1 ? product.quantity - 1 : 0,
 }
  : product
 )

 return updateProducts.filter((product) => product.quantity > 0)
}