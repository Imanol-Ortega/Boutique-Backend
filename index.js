import express from 'express'
import { PORT } from './config.js'
import userRoutes from './routes/users.routes.js'
import categoriasRoutes from './routes/categorias.routes.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(userRoutes);
app.use(categoriasRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriento en el puerto ${PORT}`)
})