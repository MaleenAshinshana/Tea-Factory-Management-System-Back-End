import express from "express";
import * as powderController from "../controller/type_of_tea_powder.Controller";


const router=express.Router();

router.post('/save',powderController.createTypeOfTeaPowder);
router.get('/all',powderController.getAllTeaPowder);
router.get('/type/:type',powderController.getPowderByLeavesTypes);
router.get('/:item_name',powderController.getPowderByItemName);
router.put('/:item_name',powderController.updatePowderByItemName);
router.delete('/:item_name',powderController.deletePowderByItemName);
//router.post('/auth',powderController.authTeaPowder);
export default router