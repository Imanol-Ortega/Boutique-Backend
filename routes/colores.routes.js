import { Router } from "express";
import { actualizar, eliminar, guardar, obtener, obtenerUno } from "../controllers/colores.controllers.js";

const router = Router();

router.get('/colores/obtener',obtener);

router.get(`/colores/obtener/:id`,obtenerUno);

router.post('/colores/guardar',guardar);

router.put(`/colores/actualizar/:id`,actualizar);

router.put(`/colores/eliminar/:id`,eliminar);

export default router;