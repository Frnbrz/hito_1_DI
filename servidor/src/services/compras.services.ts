import comprasData from '../bd/compras.json'
import { Compra } from '../types/types'
import { findProductById } from './products.service'

const compras: Compra[] = comprasData as Compra[]

export function getCompras(): Compra[] {
  const comprasWithProducts = compras.map((compra) => {
    const products = compra.products.map((id) => {
      const product = findProductById(id)
      return product
    })
    return { ...compra, products }
  })
  return comprasWithProducts
}

export function findCompraById(id: number): Compra | undefined {
  const compra = compras.find((compra) => compra.id === id)
  return compra
}
