import mongoose from "mongoose";
import * as SchemaType  from "../types/SchemaTypes";

const fertilizer =new mongoose.Schema<SchemaType.ITeaFertilizer>({
    tea_fertilizer_type:{type:String,required:true},
    qty:{type:Number,required:true},
    price:{type:Number,required:true},
    image:[{type:String,required:true}]
})
const fertilizerModel=mongoose.model('tea_fertilizer',fertilizer);
export default fertilizerModel;