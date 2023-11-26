import bcrypt from 'bcrypt'
import usersData from '../bd/users.json'
import { User, newLoginEntry } from '../types/types'

const users: User[] = usersData as User[]

export function login(newLoginEntry: newLoginEntry): newLoginEntry | undefined {
  const user = users.find((user) => {
    return (
      user.email === newLoginEntry.email &&
      bcrypt.compareSync(newLoginEntry.password, user.password) === true
    )
  })

  if (user != null) {
    return user
  }

  return undefined
}
