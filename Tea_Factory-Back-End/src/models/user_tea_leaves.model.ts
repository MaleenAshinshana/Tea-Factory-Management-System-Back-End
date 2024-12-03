import mongoose from "mongoose";
import * as SchemaType  from "../types/SchemaTypes";


const userTeaLeaves=new mongoose.Schema<SchemaType.IUserTeaLeaves>({

    data:{type: Date, required: true, default: Date.now()},
    leaves_type:{type:String,required:true},
    qty:{type:Number,required:true},
    price:{type:Number,required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'ITeaOwner'},
})
const leaves=mongoose.model('UserOderLeaves',userTeaLeaves);
export default leaves;