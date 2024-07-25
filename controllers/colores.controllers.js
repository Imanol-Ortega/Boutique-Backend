import { pool } from "../db.js";

export const obtener = async(req,res)=>{
    try {
        const response = await pool.query('SELECT colorid,colornombre FROM colores WHERE coloresestado = true');
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const obtenerUno = async(req,res)=>{
    try {
        const response = await pool.query('SELECT colorid,colornombre FROM colores WHERE coloreestado = true AND colorid = $1',[req.params.id]);
        if(response.rows == 0){
            return res.status(404).json({message:'No existe el color'});
        }
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const guardar = async(req,res)=>{
    try {
        const resp = req.body;
        const response = await pool.query('INSERT INTO colores (colornombre) VALUES ($1)',[resp.colornombre]);
        return res.status(200).json({message:'Se guardo correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const actualizar = async(req,res)=>{
    try {
        const resp = req.body;
        const response = await pool.query('UPDATE colores SET colornombre = $1 WHERE colorid = $2',[resp.colornombre, req.params.id]);
        return res.status(200).json({message:'Se actualizo correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const eliminar = async(req,res)=>{
    try {
        const response = await pool.query('UPDATE colores SET coloresestado = false WHERE colorid = $1',[req.params.id]);
        return res.status(200).json({message:'Se elimino correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};