import profesoresData from '../bd/profesores.json'
import { Profesor } from '../types/types'

const profesores: Profesor[] = profesoresData as Profesor[]

export function getProfesores(): Profesor[] {
  return profesores
}

export function findProfesorById(id: number): Profesor | undefined {
  const profesor = profesores.find((profesor) => profesor.id === id)
  return profesor
}
