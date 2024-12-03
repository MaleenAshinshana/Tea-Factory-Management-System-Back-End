import mongoose from "mongoose";

import * as SchemaType from "../types/SchemaTypes";

const AdminSchema=new mongoose.Schema<SchemaType.IAdmin>({
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
})
const AdminModel=mongoose.model('Admin',AdminSchema);
export default AdminModel;