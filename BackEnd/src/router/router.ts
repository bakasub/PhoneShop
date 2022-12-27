import {Router} from "express";
import {userRouter} from "./user-router";
import {productRouter} from "./product-router";

export const router = Router();
router.use('/user',userRouter)
router.use('/product',productRouter)