import { pool } from "../db.js";

export const obtener = async(req,res)=>{
    try {
        const response = await pool.query('SELECT tallaid,tallanombre FROM tallas WHERE tallaestado = true');
        return res.status(200).json(response.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const obtenerUno = async(req,res)=>{
    try {
        const response = await pool.query('SELECT tallaid,tallanombre FROM tallas WHERE tallaestado = true AND tallaid = $1',[req.params.id]);
        if (response.rows == 0){
            return res.status(404).json({message:'No existe la talla'});
        }
        return res.status(200).json(response.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const guardar = async(req,res)=>{
    try {
        const resp = req.body;
        const response = await pool.query('INSERT INTO tallas (tallanombre) VALUES ($1)',[resp.tallanombre]);
        return res.status(200).json({message:'Se guardo correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const actualizar = async(req,res)=>{
    try {
        const resp = req.body;
        const response = await pool.query('UPDATE tallas SET tallanombre = $1 WHERE tallaid = $2',[resp.tallanombre, req.params.id]);
        return res.status(200).json({message:'Se actualizo correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const eliminar = async(req,res)=>{
    try {
        const response = await pool.query('UPDATE tallas SET tallaestado = false WHERE tallaid = $1',[req.params.id]);
        return res.status(200).json({message:'Se borro correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};