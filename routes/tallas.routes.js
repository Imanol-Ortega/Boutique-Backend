import { Router } from "express";
import { obtener, obtenerUno, actualizar, guardar, eliminar } from "../controllers/tallas.controllers.js";


const router = Router();

router.get('/tallas/obtener',obtener);

router.get(`/tallas/obtener/:id`,obtenerUno);

router.post('/tallas/guardar',guardar);

router.put(`/tallas/actualizar/:id`,actualizar);

router.put(`/tallas/eliminar/:id`,eliminar);



export default router; 