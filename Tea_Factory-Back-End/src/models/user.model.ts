import mongoose, {model} from "mongoose";
import * as SchemaType from "../types/SchemaTypes";


const UserSchema =new mongoose.Schema<SchemaType.IUser>({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})
const UserModel=model("User",UserSchema);
export default UserModel;