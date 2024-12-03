import mongoose from "mongoose";
import * as SchemaType  from "../types/SchemaTypes";

const fertilizerSchema=new mongoose.Schema<SchemaType.IUserOderFertilizer>({

    date:{type: Date, required: true, default: Date.now()},
    fertilizer_type:{type:String,required:true},
    qty:{type:Number,required:true},
    price:{type:Number,required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'ITeaOwner'},
})
const TeaFertilizerModel=mongoose.model('UserOderFertilizer',fertilizerSchema);
export default TeaFertilizerModel;