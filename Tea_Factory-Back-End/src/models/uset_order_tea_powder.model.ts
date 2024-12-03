import mongoose from "mongoose";
import * as SchemaType  from "../types/SchemaTypes";
import {IUserOderTeaPowder} from "../types/SchemaTypes";

const userTeaPowder=new mongoose.Schema<SchemaType.IUserOderTeaPowder>({

    data:{type: Date, required: true, default: Date.now()},
    powder_type:{type:String,required:true},
    qty:{type:Number,required:true},
    price:{type:Number,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'user'},

})
const powder=mongoose.model('IUserOderTeaPowder',userTeaPowder);
export default powder;