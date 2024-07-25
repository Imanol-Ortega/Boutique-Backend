import { pool } from "../db.js";

export const guardar = async(req,res)=>{
    try {
        const {pedidototal,clienteid,detalle} = req.body;

        const response = await pool.query('INSERT INTO pedidos (pedidototal,clienteid,pedidoestado) VALUES($1,$2,$3) RETURNING pedidoid',[pedidototal,clienteid,"P"]);

        for(let i=0; i<detalle.length;i++){
            const rpdetalle = await pool.query('INSERT INTO detalles_pedido (productoid,pedidoid,detallepedidosubtotal,detallepedidocantidad) VALUES ($1,$2,$3,$4)',
                                            [detalle[i].productoid,response.rows[0].pedidoid,detalle[i].subtotal,detalle[i].cantidad]);
        }

        return res.status(200).json({message:'Se guardo correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};


export const obtener = async(req,res)=>{
    try {
        const response = await pool.query('SELECT p.pedidoid, p.pedidofchpedido, p.pedidototal, p.pedidoestado, c.clienteid, c.clientenombre FROM pedidos p JOIN clientes c ON c.clienteid = p.clienteid');

        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const obtenerUno = async(req,res)=>{
    try {
        const response = await pool.query('SELECT p.pedidoid, p.pedidofchpedido, p.pedidototal, p.pedidoestado, c.clienteid, c.clientenombre FROM pedidos p JOIN clientes c ON c.clienteid = p.clienteid WHERE pedidoid = $1',[req.params.id]);

        const rpdetalles = await pool.query('SELECT * FROM detalles_pedido WHERE pedidoid = $1',[req.params.id]);

        return res.status(200).json({pedido:response.rows,detalles:rpdetalles.rows});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const obtenerCliente = async(req,res)=>{
    try {
        const response = await pool.query('SELECT pedidoid, pedidofchpedido, pedidototal, pedidoestado FROM pedidos WHERE clienteid = $1',[req.params.id]);

        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const obtenerDetalle = async(req,res)=>{
    try {
        
        const response = await pool.query('SELECT * FROM detalles_pedido WHERE pedidoid = $1',[req.params.id]);

        return res.status(200).json(response.rows);

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const cambiarEstado = async(req,res)=>{
    try {
        const rp = req.body;
        const response = await pool.query('UPDATE pedidos SET pedidoestado = $1 WHERE pedidoid = $2',[rp.pedidoestado,req.params.id]);

        return res.status(200).json({message:'Se actualizo el estado correctamente'});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}