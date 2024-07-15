import { Router } from "express";
import { actualizar, eliminar, guardar, obtener, obtenerUno } from "../controllers/tipodocumento.controllers.js";

const router = Router();

router.get('/tipodocumento/obtener',obtener);

router.get(`/tipodocumento/obtener/:id`,obtenerUno);

router.post('/tipodocumento/guardar',guardar);

router.put(`/tipodocumento/actualizar/:id`,actualizar);

router.put(`/tipodocumento/eliminar/:id`,eliminar);


export default router;