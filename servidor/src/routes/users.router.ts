import express from 'express'
import { addUser, findUserById, getUsers } from '../services/user.services'
import { StatusMessage, StatusType } from '../types/enums'
import { toNewUserEntry } from '../utils/utils'

export const usersRouter = express.Router()

usersRouter.get('/', (_req, res) => {
  res.send({ status: StatusType.OK, data: getUsers() })
})

usersRouter.get('/:id', (req, res) => {
  const id = req.params.id
  const user = findUserById(+id)

  return user !== undefined
    ? res.send({ status: StatusType.OK, data: user })
    : res
        .status(404)
        .send({ status: StatusType.NOT_FOUND, message: StatusMessage.USER })
})

usersRouter.post('/', (req, res) => {
  try {
    const newUserEntry = toNewUserEntry(req.body)
    const addedUserEntry = addUser(newUserEntry)

    res.json(addedUserEntry)
  } catch (error: any) {
    res
      .status(400)
      .send({ status: StatusType.BADREQUEST, message: error.message })
  }
})
