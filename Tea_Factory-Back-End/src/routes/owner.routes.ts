import express from "express";
import * as TeaOwnerController from "../controller/teaOwner.Controller";


const router=express.Router();

router.post('/save',TeaOwnerController.createNewTeaOwner)
router.get('/all',TeaOwnerController.getAllOwners)
router.post('/auth',TeaOwnerController.authTeaOwner)


export default router