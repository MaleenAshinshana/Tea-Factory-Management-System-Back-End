import express from "express";
import * as teaLeavesController from "../controller/teaLeaves.Controller";
import * as Middleware from "../middlewares";

const router=express.Router();

router.post('/',teaLeavesController.createTeaLeavesType);
router.get('/all',teaLeavesController.getAllLeaves);
router.get('/:tea_leaves_type',teaLeavesController.getLeavesByLeavesType);
router.delete('/deleteLeaves/:id',teaLeavesController.deleteLeaves);
router.put('/updateLeaves/:id',teaLeavesController.updateLeaves);


export default router