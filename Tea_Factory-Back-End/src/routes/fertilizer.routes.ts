import express from "express";
import * as teaFertilizerController from "../controller/teaFertilizer.Controller";
import * as Middleware from "../middlewares";

const router=express.Router();
router.post('/',teaFertilizerController.createFertilizer);
router.get('/all',teaFertilizerController.getAllFertilizer);
router.get('/:tea_fertilizer_type',teaFertilizerController.getFertilizerByType);
router.delete('/deleteFertilizer/:id',teaFertilizerController.deleteFertilizer);
router.put('/updateLeaves/:id',teaFertilizerController.updateFertilizer);
//router.delete('/deleteFertilizer/:id',Middleware.verifyToken,teaFertilizerController.deleteFertilizer);


export  default router;