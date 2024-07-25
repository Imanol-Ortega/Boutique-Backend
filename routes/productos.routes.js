import { Router } from "express";
import { actualizar, eliminar, guardar, obtener, obtenerUno } from "../controllers/productos.controllers.js";

const router = Router();

router.get('/productos/obtener',obtener);

router.get('/productos/obtener/:id',obtenerUno);

router.post('/productos/guardar',guardar);

router.put('/productos/actualizar/:id',actualizar);

router.put('/productos/eliminar/:id',eliminar);

export default router;