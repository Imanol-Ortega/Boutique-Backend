import { Router } from "express";
import { cambiarEstado, guardar, obtener, obtenerCliente, obtenerDetalle, obtenerUno } from "../controllers/pedidos.controllers.js";

const router = Router();

router.get('/pedidos/obtener',obtener);

router.get('/pedidos/obtener/:id',obtenerUno);

router.get('/pedidos/clientes/:id',obtenerCliente);

router.get('/pedidos/clientes/detalle/:id',obtenerDetalle);

router.post('/pedidos/guardar',guardar);

router.put('/pedidos/actualizar/estado/:id',cambiarEstado);

export default router;