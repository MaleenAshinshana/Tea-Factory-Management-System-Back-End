import express from "express";
import * as useTeaLeaves from "../controller/user_tea_leaves.Controller";
import * as Middleware from "../middlewares";

const router=express.Router();

router.post('/save',Middleware.verifyToken,useTeaLeaves.saveTeaLeaves)
router.get('/all',useTeaLeaves.getAllTeaLe);
router.put('/update',Middleware.verifyToken,useTeaLeaves.updateLeaves);
router.delete('/:id',Middleware.verifyToken,useTeaLeaves.deleteLeaves);
router.get('/:username',useTeaLeaves.getLeavesByUsername);
router.get('/my',Middleware.verifyToken,useTeaLeaves.getMyLeaves);




export default router