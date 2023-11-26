import express from 'express'
import {
  findProfesorById,
  getProfesores
} from '../services/profesores.services'
import { StatusMessage, StatusType } from '../types/enums'

export const profesoresRouter = express.Router()

profesoresRouter.get('/', (_req, res) => {
  res.send({ status: StatusType.OK, data: getProfesores() })
})

profesoresRouter.get('/:id', (req, res) => {
  const id = req.params.id
  const profesor = findProfesorById(+id)

  return profesor !== undefined
    ? res.send({ status: StatusType.OK, data: profesor })
    : res
        .status(404)
        .send({ status: StatusType.NOT_FOUND, message: StatusMessage.USER })
})
