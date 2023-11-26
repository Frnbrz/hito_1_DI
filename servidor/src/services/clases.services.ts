import clasesData from '../bd/clases.json'
import { Clase } from '../types/types'

const clases: Clase[] = clasesData as Clase[]

export function getClases(): Clase[] {
  return clases
}

export function addUserToClase(
  claseId: number,
  userId: number
): Clase | undefined {
  const clase = clases.find((clase) => clase.id === claseId)
  if (clase !== undefined && clase.users.indexOf(userId) === -1) {
    clase.users.push(userId)
  }
  return clase
}

export function removeUserFromClase(
  claseId: number,
  userId: number
): Clase | undefined {
  const clase = clases.find((clase) => clase.id === claseId)
  if (clase !== undefined) {
    clase.users = clase.users.filter((id) => id !== userId)
  }
  return clase
}

export function findClaseById(id: number): Clase | undefined {
  const clase = clases.find((clase) => clase.id === id)
  return clase
}
