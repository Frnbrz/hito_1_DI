import express from 'express'
import { findCompraById, getCompras } from '../services/compras.services'
import { StatusMessage, StatusType } from '../types/enums'

export const comprasRouter = express.Router()

comprasRouter.get('/', (_req, res) => {
  res.send({ status: StatusType.OK, data: getCompras() })
})

comprasRouter.get('/:id', (req, res) => {
  const id = req.params.id
  const compra = findCompraById(+id)

  return compra !== undefined
    ? res.send({ status: StatusType.OK, data: compra })
    : res
        .status(404)
        .send({ status: StatusType.NOT_FOUND, message: StatusMessage.USER })
})
