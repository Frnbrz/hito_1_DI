import fs from 'fs'
import productsData from '../bd/productos.json'
import { ThrowError } from '../types/enums'
import { Product, newProductEntry } from './../types/types.d'

const products: Product[] = productsData as Product[]

export function getProducts(): Product[] {
  return products
}

export function findProductById(id: number): Product | undefined {
  const product = products.find((product) => product.id === id)
  return product
}

export function addProduct(newProductEntry: newProductEntry): Product {
  const newProduct = {
    id: products.length + 1,
    ...newProductEntry
  }

  if (products.find((product) => product.name === newProduct.name)) {
    throw new Error(ThrowError.PRODUCT)
  }

  fs.writeFileSync(
    './src/bd/users.json',
    JSON.stringify([...products, newProduct], null, 2)
  )

  products.push(newProduct)

  return newProduct
}
