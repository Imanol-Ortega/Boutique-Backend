import express from 'express'
import { PORT } from './config.js'
import userRoutes from './routes/users.routes.js'
import categoriasRoutes from './routes/categorias.routes.js'
import clientesRoutes from './routes/clientes.routes.js'
import tallasRoutes from './routes/tallas.routes.js'
import coloresRoutes from './routes/colores.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'
import productosRoutes from './routes/productos.routes.js'
import tipodocumentoRoutes from './routes/tipodocumento.routes.js'

import cors from 'cors'

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(userRoutes);
app.use(categoriasRoutes);
app.use(clientesRoutes);
app.use(tallasRoutes);
app.use(coloresRoutes);
app.use(pedidosRoutes);
app.use(productosRoutes);
app.use(tipodocumentoRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriento en el puerto ${PORT}`)
})