import express from "express";
import * as UserController from "../controller/customer.controller";


const router=express.Router();

router.get('/all',UserController.getAllUser)
router.post('/',UserController.createNewUser)
router.post('/auth',UserController.authCustomer)



export default router