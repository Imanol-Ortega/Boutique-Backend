import { pool } from "../db.js";

export const obtener = async(req,res)=>{
    try {
        const response = await pool.query('SELECT tipodocumentoid, tipodocumentonombre FROM tiposdocumento WHERE tipodocumentoestado = true');
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const obtenerUno = async(req,res)=>{
    try {
        const response = await pool.query('SELECT tipodocumentoid, tipodocumentonombre FROM tiposdocumento WHERE tipodocumentoid = $1 AND tipodocumentoestado = true',[req.params.id]);
        if(response.rows == 0){
            return res.status(404).json({message:'No se encontro el tipo de documento'});
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const guardar = async(req,res)=>{
    try {
        const resp = req.body;
        const response = await pool.query('INSERT INTO tiposdocumento (tipodocumentonombre) VALUES ($1)',[resp.tipodocumentonombre]);
        return res.status(200).json({message:'Se guardo correctamente'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const actualizar = async(req,res)=>{
    try {
        const resp = req.body;
        const response = await pool.query('UPDATE tiposdocumento SET tipodocumentonombre = $1 WHERE tipodocumentoid = $2',[resp.tipodocumentonombre,req.params.id]);
        return res.status(200).json({message:'Se actualizo correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const eliminar = async(req,res)=>{
    try {
        const response = await pool.query('UPDATE tiposdocumento SET tipodocumentoestado = false WHERE tipodocumentoid = $1',[req.params.id]);
        return res.status(200).json({message:'Se elimino correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};