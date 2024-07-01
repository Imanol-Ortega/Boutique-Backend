import { Router } from "express";
import { register,login } from "../controllers/users.controllers.js";

const router = Router();

router.post('/users/login',login);

router.post('/users/register',register);



export default router;