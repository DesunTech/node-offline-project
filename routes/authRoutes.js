import { Router } from "express";
import {
    login,
    userOrder
} from '../controllers/AuthController.js'

import { JwtAuthCheck } from "../middlewares/JwtAuthCheck.js";

const router = new Router();

router.post('/login', login);

router.get("/user/order", JwtAuthCheck, userOrder);

export default router;