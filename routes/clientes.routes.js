import { Router } from "express";
import { actualizar, eliminar, guardar, obtener, obtenerUno } from "../controllers/clientes.controllers.js";

const router = Router();

router.get('/clientes/obtener',obtener);

router.get('/clientes/obtener/:id',obtenerUno);

router.post('/clientes/guardar',guardar);

router.put('/clientes/actualizar/:id',actualizar);

router.put('/clientes/eliminar/:id',eliminar);

export default router;