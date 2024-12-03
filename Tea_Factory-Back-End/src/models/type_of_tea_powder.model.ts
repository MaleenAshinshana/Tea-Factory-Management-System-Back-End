import mongoose from "mongoose";
import * as SchemaType from "../types/SchemaTypes";

const powder =new mongoose.Schema<SchemaType.ITypes_of_tea_powder>({
    item_name:{type:String,required:true},
    type:{type:String,required:true},
    qty:{type:Number,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
})
const powderModel=mongoose.model('type_of_tea_powder',powder);
export default powderModel;