import { pool } from "../db.js";

export const obtenerCategorias = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM categorias WHERE categoriaestado = TRUE');
        res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({'message':error.message})
    }
}

export const obtenerUnoCategoria = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM categorias WHERE categoriaid = $1 AND categoriaestado = TRUE',[req.params.id]);
        res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({'message':error.message})
    }
}

export const guardarCategorias = async(req,res)=>{
    try {
        const rp = req.body;
        const result = await pool.query('INSERT INTO categorias (categorianombre) VALUES ($1)',[rp.categorianombre]);

        res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({'message':error.message})
    }
}

export const actualizarCategoria = async(req,res)=>{
    try {
        const rp = req.body
        const result = await pool.query('UPDATE categorias SET categorianombre = $1 WHERE categoriaid = $2',[rp.categorianombre, req.params.id]);
        res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({'message':error.message})
    }
}

export const eliminarCategoria = async(req,res)=>{
    try {
        const result = await pool.query('UPDATE categorias SET categoriaestado = FALSE WHERE categoriaid = $1',[req.params.id]);
        res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({'message':error.message})
    }
}