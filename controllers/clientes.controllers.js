import { pool } from "../db.js";

export const obtener = async(req,res)=>{
    try {
        const response = await pool.query('SELECT c.clienteid, c.clientenombre, c.clientetelefono, c.clientedireccion, c.clientedocumento, td.tipodocumentoid, td.tipodocumentonombre FROM CLIENTES c JOIN TIPOSDOCUMENTO td ON c.tipodocumentoid = td.tipodocumentoid JOIN USUARIOS u ON c.usuarioid = u.usuarioid WHERE clienteestado = true')
        return res.status(200).json(response.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const obtenerUno = async(req,res)=>{
    try {
        const response = await pool.query('SELECT c.clienteid, c.clientenombre, c.clientetelefono, c.clientedireccion, c.clientedocumento,td.tipodocumentoid, td.tipodocumentonombre FROM CLIENTES c JOIN TIPOSDOCUMENTO td ON c.tipodocumentoid = td.tipodocumentoid JOIN USUARIOS u ON c.usuarioid = u.usuarioid WHERE clienteestado = true AND clienteid = $1',[req.params.id]);
        if(response.rows == 0){
            return res.status(404).json({message:'No existe el cliente'});
        }
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const guardar = async(req,res)=>{
    try {
        const {clientenombre,clientetelefono,clientedireccion,clientedocumento,tipodocumentoid,usuarioid} = req.body;
        const response = await pool.query('INSERT INTO clientes (clientenombre,clientetelefono,clientedireccion,clientedocumento,tipodocumentoid,usuarioid) VALUES ($1,$2,$3,$4,$5,$6)',
            [clientenombre,clientetelefono,clientedireccion,clientedocumento,tipodocumentoid,usuarioid]
        );
        return res.status(200).json({message:'Se guardo correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const actualizar = async(req,res)=>{
    try {
        const {clientenombre,clientetelefono,clientedireccion,clientedocumento,tipodocumentoid,usuarioid} = req.body;
        const response = await pool.query('UPDATE clientes SET clientenombre = $1, clientetelefono = $2, clientedireccion = $3, clientedocumento = $4, tipodocumentoid = $5 WHERE clienteid = $6',
            [clientenombre,clientetelefono,clientedireccion,clientedocumento,tipodocumentoid,req.params.id]
        );
        return res.status(200).json({message:'Se actualizo correctamente'});

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const eliminar = async(req,res)=>{
    try {
        const response = await pool.query('UPDATE clientes SET clienteestado = false WHERE clienteid = $1',[req.params.id]);
        return res.status(200).json({message:'Se elimino correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};