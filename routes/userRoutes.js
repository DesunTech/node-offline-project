import { Router } from "express";
import {
    listUser,
    createUser
} from '../controllers/UserController.js'

const router = new Router();

router.get('/', listUser); // list
router.post('/', createUser); // add

export default router;