import { pool } from "../db.js";

export const obtener = async(req,res)=>{
    try {
        const response = await pool.query('SELECT p.productoid, c.categorianombre, p.productonombre, p.productodescripcion, p.productocantidad, p.productoprecio, p.productoimagen FROM productos p JOIN categorias c ON p.categoriaid = c.categoriaid WHERE productoestado = true AND productocantidad > 0');

        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const obtenerUno = async(req,res)=>{
    try {
        const response = await pool.query('SELECT p.productoid,c.categoriaid,p.productocatpersona, p.productonombre, p.productodescripcion, p.productocantidad, p.productoprecio, p.productoimagen FROM productos p JOIN categorias c ON p.categoriaid = c.categoriaid WHERE p.productoid = $1 AND productoestado = true',[req.params.id]);

        const rptalla = await pool.query('SELECT t.tallaid,t.tallanombre FROM tallas t JOIN tallas_producto tp ON tp.tallaid = t.tallaid WHERE tp.productoid = $1 GROUP BY t.tallaid,t.tallanombre',[req.params.id]);

        const rpcolor = await pool.query('SELECT c.colorid,c.colornombre FROM colores c JOIN colores_disponibles cd ON cd.colorid = c.colorid WHERE cd.productoid = $1 GROUP BY c.colorid, c.colornombre',[req.params.id]);

        return res.status(200).json({productos:response.rows,tallas:rptalla.rows,colores:rpcolor.rows});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const guardar = async(req,res)=>{
    try {
        const {productonombre,productodescripcion,productocantidad,productoprecio,productoimagen,productocatpersona,categoriaid,tallas,colores} = req.body;
        const response = await pool.query('INSERT INTO productos (productonombre,productodescripcion,productocantidad,productoprecio,productoimagen,productocatpersona,categoriaid) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING productoid',
                        [productonombre,productodescripcion,productocantidad,productoprecio,productoimagen,productocatpersona,categoriaid]);
        
        for(let i=0;i<tallas.length;i++){
            const rptalla = await pool.query('INSERT INTO tallas_producto (productoid,tallaid) VALUES ($1,$2)',[response.rows[0].productoid,tallas[i].tallaid]);
        };
        for(let i=0;i<colores.length;i++){
            const rpcolor = await pool.query('INSERT INTO colores_disponibles (productoid,colorid) VALUES ($1,$2)',[response.rows[0].productoid,colores[i].colorid]);
        };

        return res.status(200).json({message:'Se guardo correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const actualizar = async(req,res)=>{
    try {
        const {productonombre,productodescripcion,productocantidad,productoprecio,productoimagen,productocatpersona,categoriaid,tallas,colores} = req.body;
        
        const reponse = await pool.query('UPDATE productos SET productonombre = $1, productodescripcion = $2, productocantidad = $3, productoprecio = $4, productoimagen = $5, productocatpersona = $6, categoriaid = $7 WHERE productoid = $8',
            [productonombre,productodescripcion,productocantidad,productoprecio,productoimagen,productocatpersona,categoriaid,req.params.id]);

            const dltalla = await pool.query('DELETE FROM tallas_producto WHERE productoid = $1',[req.params.id]);
            for(let i=0;i<tallas.length;i++){
                
                const rptalla = await pool.query('INSERT INTO tallas_producto (productoid,tallaid) VALUES ($1,$2)',[req.params.id,tallas[i].tallaid]);
            };
            const dlcolor = await pool.query('DELETE FROM colores_disponibles WHERE productoid = $1',[req.params.id]);
            for(let i=0;i<colores.length;i++){
                
                const rpcolor = await pool.query('INSERT INTO colores_disponibles (productoid,colorid) VALUES ($1,$2)',[req.params.id,colores[i].colorid]);
            };

        return res.status(200).json({message:'Se actualizó correctamente'});
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const eliminar = async(req,res)=>{
    try {
        const response = await pool.query('UPDATE productos SET productoestado = false WHERE productoid = $1',[req.params.id]);
        return res.status(200).json({message:'Se elimino correctamente'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};