import  dotenv from 'dotenv';
dotenv.config();
/**/
import express from  'express';
import bodyParser from  "body-parser"
import mongoose from "mongoose";
import * as process from "process";
import AdminRoutes from "./routes/admin.routes";
import UserRoutes from "./routes/user.routes";
import OwnerRoutes from "./routes/owner.routes";
import Tea_ownerModel from "./models/tea_owner.model";
import Tea_leavesRoutes from "./routes/tea_leaves.routes";
import fertilizerRoutes from "./routes/fertilizer.routes";
import user_tea_LeavesRoutes from "./routes/user_tea_Leaves.routes";
import cors from "cors";
import type_of_tea_powderModel from "./models/type_of_tea_powder.model";
import type_of_tea_powderRouts from "./routes/type_of_tea_powder.routs";

/**/
const app=express();
app.use(cors({
    origin: "*"
}))
// @ts-ignore
app.use(bodyParser.json())

interface User {
    username: string,
    fName: string,
    lName: string,
    password: string
}

/*let user:User[]=[];*/

mongoose.connect(process.env.MONGO_URL as string)
const db=mongoose.connection
db.on('error',(error)=>{
    console.log("DB Connection Error : ",error)
})
db.on('open',()=>{
    console.log("DB Connected Successfully")
})



/*app.get('/user/all',(req:express.Request,res:express.Response)=>{

/!*let  data={
    id:"ksajkhj",
    name:"Maleen",
    email:"lkcsmkaj"
}*!/

/!* res.send(user)*!/
})*/

/*app.post('/user',(req:express.Request,res:express.Response)=>{
    const body= req.body;
    console.log(body)

    user.push(body)

    res.send("Ok")
})*/

/*--------------------------Admin--------------------------------------*/
app.use('/admin',AdminRoutes)

/*--------------------------User---------------------------------------*/
app.use('/user',UserRoutes)

/*--------------------------Tea Owners---------------------------------*/
app.use('/owner',OwnerRoutes)

/*--------------------------Tea Leaves----------------------------------*/
app.use('/leaves',Tea_leavesRoutes);

/*---------------------------Tea Fertilizer-----------------------------*/
app.use('/fertilizer',fertilizerRoutes);


/*---------------------------User Tea Leaves----------------------------*/
app.use('/userLeaves',user_tea_LeavesRoutes);

/*---------------------------Type Of Tea Powder-------------------------*/
app.use('/teaPowder',type_of_tea_powderRouts)


//app.use(express.json({ limit: '500mb' }));
app.listen(8080,()=>{
    console.log("server Started on port 8080")
})