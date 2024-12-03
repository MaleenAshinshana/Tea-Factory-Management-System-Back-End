import mongoose from "mongoose";
import * as SchemaType from "../types/SchemaTypes";

const Leaves =new mongoose.Schema<SchemaType.ITeaLeaves>({
    tea_leaves_type:{type:String,required:true},
    qty:{type:Number,required:true},
    price:{type:Number,required:true}
})
const LeavesModel=mongoose.model('tea_leaves',Leaves);
export default LeavesModel;