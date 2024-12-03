import express from "express";
import * as AdminController from "../controller/admin.controller";


const router=express.Router();

router.post('/',AdminController.createNewAdmin);
router.post('/auth',AdminController.authAdmin);
router.get('/all',AdminController.getAllAdmin);


export default router