import { Role, ThrowError } from '../types/enums'
import { newLoginEntry, newProductEntry, newUserEntry } from '../types/types'

export function toNewUserEntry(object: any): newUserEntry {
  const newUserEntry: newUserEntry = {
    name: parseName(object.name),
    email: parseEmail(object.email),
    description: parseDescription(object.description),
    role: parseRole(object.role),
    password: parsePassword(object.password)
  }

  return newUserEntry
}

export function toNewProductEntry(object: any): newProductEntry {
  const newProductEntry: newProductEntry = {
    name: parseName(object.name),
    category: parseCategory(object.category),
    price: parsePrice(object.price),
    stock: parseStock(object.stock),
    img: parseImg(object.img)
  }

  return newProductEntry
}

export function toNewLoginEntry(object: any): newLoginEntry {
  const newLoginEntry: newLoginEntry = {
    email: parseEmail(object.email),
    password: parsePassword(object.password)
  }
  return newLoginEntry
}

function isString(text: any): boolean {
  return typeof text === 'string' || text instanceof String
}

function isUndefined(text: any): boolean {
  return text === undefined
}

function parseName(nameFromRequest: any): string {
  if (!isString(nameFromRequest) || isUndefined(nameFromRequest)) {
    throw new Error(ThrowError.NAME)
  }

  return nameFromRequest
}

function parseEmail(emailFromRequest: any): string {
  if (!isString(emailFromRequest) || isUndefined(emailFromRequest)) {
    throw new Error(ThrowError.EMAIL)
  }

  return emailFromRequest
}

function parsePassword(passwordFromRequest: any): string {
  if (!isString(passwordFromRequest) || isUndefined(passwordFromRequest)) {
    throw new Error(ThrowError.PASSWORD)
  }

  const passwordEncrypt: string = passwordFromRequest

  return passwordEncrypt
}

// function encryptPassword(password: string): string {
//   const saltRounds = 10
//   const passwordEncrypt = bcrypt.hashSync(password, saltRounds)

//   return passwordEncrypt
// }

function parseCategory(categoryFromRequest: string): string {
  if (!isString(categoryFromRequest) || isUndefined(categoryFromRequest)) {
    throw new Error(ThrowError.CATEGORY)
  }

  return categoryFromRequest
}

function parsePrice(priceFromRequest: number): number {
  if (
    isUndefined(priceFromRequest) ||
    isNaN(priceFromRequest) ||
    priceFromRequest < 0
  ) {
    throw new Error(ThrowError.PRICE)
  }
  return priceFromRequest
}

function parseStock(stockFromRequest: number): number {
  if (
    isUndefined(stockFromRequest) ||
    isNaN(stockFromRequest) ||
    stockFromRequest < 0
  ) {
    throw new Error(ThrowError.STOCK)
  }
  return stockFromRequest
}

function parseImg(imgFromRequest: string): string {
  if (
    !isString(imgFromRequest) ||
    isUndefined(imgFromRequest) ||
    imgFromRequest === ''
  ) {
    throw new Error(ThrowError.IMG)
  }

  return imgFromRequest
}

function parseDescription(descriptionFromRequest: string): string {
  if (
    !isString(descriptionFromRequest) ||
    isUndefined(descriptionFromRequest) ||
    descriptionFromRequest === ''
  ) {
    throw new Error(ThrowError.DESCRIPTION)
  }

  return descriptionFromRequest
}

function parseRole(roleFromRequest: Role): Role {
  if (
    roleFromRequest === Role.admin ||
    roleFromRequest === Role.instructor ||
    roleFromRequest === Role.user ||
    roleFromRequest === Role.asistente ||
    isUndefined(roleFromRequest)
  ) {
    throw new Error(ThrowError.ROLE)
  }

  return roleFromRequest
}
