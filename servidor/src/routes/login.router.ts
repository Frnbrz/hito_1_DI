import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { login } from '../services/login.service'
import { StatusMessage, StatusType } from '../types/enums'
import { User, newLoginEntry } from '../types/types'
import { toNewLoginEntry } from '../utils/utils'

const SECRET_KEY = process.env.JWT_SECRET || 'secret'

export const loginRouter = express.Router()
loginRouter.post('/', (req: Request, res: Response) => {
  try {
    const newLoginEntry: newLoginEntry = toNewLoginEntry(
      req.body
    ) as newLoginEntry
    const user: User | undefined = login(newLoginEntry) as User
    if (user !== undefined) {
      const { id, name, role, email } = user
      const token = jwt.sign(
        {
          sub: id,
          name,
          role,
          exp: Date.now() + 60 * 1000
        },
        SECRET_KEY
      )
      res.status(200).send({
        status: StatusType.OK,
        data: { user: { id, name, email }, token }
      })
    } else {
      res
        .status(401)
        .send({ status: StatusType.BADREQUEST, message: StatusMessage.LOGIN })
    }
  } catch (error: any) {
    res.status(400).send({
      status: 'BAD REQUEST',
      message: error.message,
      error
    })
  }
})
