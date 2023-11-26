import bcrypt from 'bcrypt'
import fs from 'fs'
import usersData from '../bd/users.json'
import { ThrowError } from '../types/enums'
import { User, newUserEntry } from '../types/types'

const users: User[] = usersData as User[]

export function getUsers(): User[] {
  return users
}

export function findUserById(id: number): User | undefined {
  const user = users.find((user) => user.id === id)
  return user
}

export function addUser(newUserEntry: newUserEntry): User {
  const newUser = {
    id: users.length + 1,
    password: bcrypt.hashSync(newUserEntry.password, 10),
    ...newUserEntry
  }

  if (users.find((user) => user.email === newUser.email)) {
    throw new Error(ThrowError.EMAIL)
  }

  fs.writeFileSync(
    './src/bd/users.json',
    JSON.stringify([...users, newUser], null, 2)
  )

  users.push(newUser)

  return newUser
}
