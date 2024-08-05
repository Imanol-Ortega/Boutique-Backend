import { pool } from "../db.js";
import bcrypt from 'bcrypt'

export const register = async(req,res)=>{

    console.log(req.body)
    try {
        const rb = req.body;
        const find = await pool.query('SELECT usuarionombre FROM usuarios WHERE usuarionombre = $1',[rb.name]);

        if(find.rowCount != 0){
            console.log("hola")
            return res.status(409).json({error:'El nombre de usuario ya existe', message:"Desea iniciar sesion"});
        }

        const hashedPassword = await bcrypt.hash(rb.password,10)
        const result = await pool.query('INSERT INTO usuarios (usuarionombre,usuariocontrasena,usuariorol) VALUES ($1,$2,$3) RETURNING usuarioid',[rb.name,hashedPassword,rb.rol]);
        res.status(200).json({message:"Usuario creado correctamente",usuarioid:result.rows[0].usuarioid});


    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const login = async(req,res)=>{
    try {
        const rb = req.body;
        console.log(rb)
        const result = await pool.query('SELECT * FROM usuarios WHERE usuarionombre = $1',[rb.name]);
        if(result.rowCount == 0){
            return res.status(404).json({message: "No existe el Usuario"});
        }

        const isValid = await bcrypt.compare(rb.password,result.rows[0].usuariocontrasena);

        if (isValid){ 
            const rp = await pool.query('SELECT clienteid FROM clientes WHERE usuarioid = $1',[result.rows[0].usuarioid]);
            if(rp.rows == 0){
                res.status(200).json({
                    usuario: result.rows[0].usuarionombre, 
                    rol: result.rows[0].usuariorol
            });
            }else{
                res.status(200).json({
                    usuario: result.rows[0].usuarionombre, 
                    rol: result.rows[0].usuariorol,
                    cliente: rp.rows[0].clienteid});
            }
        }
        else{
            return res.status(401).json({message:"Contraseña Incorrecta"})
        }


    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}