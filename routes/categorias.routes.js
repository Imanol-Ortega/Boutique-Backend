import { Router } from "express";
import { actualizarCategoria, eliminarCategoria, guardarCategorias, obtenerCategorias, obtenerUnoCategoria } from "../controllers/categorias.controllers.js";

const router = Router();

router.get('/categorias/obtener',obtenerCategorias);

router.get('/categorias/obtener/:id',obtenerUnoCategoria);

router.post('/categorias/guardar',guardarCategorias);

router.put('/categorias/actualizar/:id',actualizarCategoria);

router.put('/categorias/eliminar/:id',eliminarCategoria);


export default router;