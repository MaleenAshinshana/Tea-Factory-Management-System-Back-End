import mongoose from "mongoose";
import * as SchemaType  from "../types/SchemaTypes";


const tea_ownerSchema=new mongoose.Schema<SchemaType.ITeaOwner>({
    username:{type:String,required:true},
    usertype:{type:String,required:true},
    branch:{type:String,required:true},
    email:{type:String,required:true},
    contact_number1:{type:Number,required:true},
    contact_number2:{type:Number,required:true},
    password:{type:String,required:true},
    /*tea_leaves_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'tea_leaves'},
    fertilizer_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'fertilizer'},
    tea_powder:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'tea_powder'},*/
})
const TeaOwnerModel=mongoose.model('Tea_Owner',tea_ownerSchema);
export default TeaOwnerModel;