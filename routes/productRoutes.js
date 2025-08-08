import { Router } from "express";
import {
    listProduct,
    deleteProduct,
    createProduct,
    updateProduct,
    getProductById
} from '../controllers/ProductController.js'

const router = new Router();

router.get('/', listProduct); // list
router.get('/:id', getProductById); 
router.post('/:id/delete', deleteProduct); // delete
router.post('/', createProduct); // add
router.post('/:id/update', updateProduct); // update

export default router;