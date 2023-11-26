import cors from 'cors'
import express from 'express'
import { middleware } from './middleware/user.middleware'
import { clasesRouter } from './routes/clases.router'
import { comprasRouter } from './routes/compras.router'
import { loginRouter } from './routes/login.router'
import { productsRouter } from './routes/products.router'
import { profesoresRouter } from './routes/profesores.router'
import { usersRouter } from './routes/users.router'

// EXPRESS
const app = express()
app.use(cors())
app.use(express.json())

// CONFIG
const PORT = 3000

// ROUTES
app.get('/', (_req, res) => {
  res.send('Hola mndo!')
})

app.use('/api/login', loginRouter)
app.use('/api/users', middleware, usersRouter)
app.use('/api/profesores', middleware, profesoresRouter)
app.use('/api/clases', middleware, clasesRouter)
app.use('/api/products', productsRouter)
app.use('/api/compras', comprasRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
