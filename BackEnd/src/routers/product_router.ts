import {Router} from "express";
import product_controller from "../controller/product_controller";

export const product_router = Router();
product_router.get('',product_controller.getAll);
product_router.get('/find-by-name',product_controller.findByName);
product_router.post('/filter',product_controller.advancedFilter)
product_router.post('/add', product_controller.add);
product_router.put('/:product_id',product_controller.edit);
product_router.delete('/:product_id',product_controller.delete);
