import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'

dotenv.config()
const port = 3001
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (_req, res) => {
  return res.redirect('landing.html')
})

app.get('/old', (_req, res) => {
  return res.redirect('landing_old.html')
})

app.get('/login', isLoged, (_req, res) => {
  return res.redirect('login.html')
})

app.get('/home', soloPublico, (_req, res) => {
  return res.redirect('home.html')
})

app.get('/profesores', soloPublico, (_req, res) => {
  return res.redirect('profesores.html')
})

app.get('/clases', soloPublico, (_req, res) => {
  return res.redirect('clases.html')
})

app.get('/perfil', soloPublico, (_req, res) => {
  return res.redirect('perfil.html')
})

app.get('/*', (_req, res) => {
  return res.redirect('error.html')
})

app.listen(port, () => {
  console.log(`The application started
successfully on port ${port}`)
})

/**
 * Middleware
 **/

function getUser(req) {
  try {
    const cookieJWT = req.headers.cookie.split('=')[1]
    const secret = process.env.JWT_SECRET
    const user = jwt.decode(cookieJWT, secret).role
    return user
  } catch (error) {
    return undefined
  }
}

function isLoged(req, res, next) {
  const user = getUser(req)
  if (user === undefined) {
    next()
  } else {
    return res.redirect('/home')
  }
}

function soloAdmin(req, res, next) {
  const user = getUser(req)
  if (user === 'admin') {
    next()
  } else {
    return res.redirect('/login')
  }
}

function soloPublico(req, res, next) {
  const user = getUser(req)
  if (user !== undefined) {
    next()
  } else {
    return res.redirect('/login')
  }
}
