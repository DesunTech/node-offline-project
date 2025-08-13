import { Router } from "express";
import {
    create,
    list,
    update,
    deletePost
} from '../controllers/BlogController.js'

import { JwtAuthCheck } from "../middlewares/JwtAuthCheck.js";

const router = new Router();

router.post('/', JwtAuthCheck, create);
router.get('/', JwtAuthCheck, list);
router.post('/update/:id', JwtAuthCheck, update);
router.post('/delete/:id', JwtAuthCheck, deletePost);

export default router;