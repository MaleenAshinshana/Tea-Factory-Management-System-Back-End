import mongoose, {Document} from "mongoose";
import  {ObjectId} from "mongoose";

export interface IAdmin extends Document {
    username: string,
    email: string,
    password: string
}

export interface ITeaOwner extends mongoose.Document {
    username: string,
    usertype: string,
    branch: string,
    email: string,
    contact_number1: number,
    contact_number2: number,
    password:string,
    tea_leaves_id:ObjectId,
    fertilizer_id:ObjectId,
    tea_powder:ObjectId
}
export interface ITeaLeaves extends Document{
    tea_leaves_type:string,
    qty:number,
    price:number
}
export interface ITeaFertilizer extends Document{
    tea_fertilizer_type:string,
    qty:number,
    price:number,
    image:string
}
export interface ITypes_of_tea_powder extends Document{
    item_name:string,
    type:string,
    qty:number,
    price:number,
    image:string
}

/*User  dila thiyena the kola pramayana add kirimata*/
export interface IUserTeaLeaves extends Document{
    data:Date,
    leaves_type:string,
    qty:number,
    price:number,
    owner:ObjectId

}

/*User  order karala thiyena the kola pramayana add kirimata*/
export interface IUserOderTeaPowder extends mongoose.Document{
    data:Date,
    powder_type:string,
    qty:number,
    price:number,
    user:ObjectId,
    //owner:ObjectId

}
export interface IUser extends Document{
    username:string,
    email:string,
    password:string
}
/*User  order karala thiyena pohora add kirimata*/
export interface IUserOderFertilizer extends Document{
    date:Date,
    fertilizer_type:string,
    qty:number,
    price:number,
    owner:ObjectId

}
export interface IOrder extends Document{
    date:Date,
    qty:number,
    amount:number,
    customerId:ObjectId,
}
export interface IOrderDetails extends Document{
    date:Date,
    qty:number,
    price:number,
    itemCode:ObjectId,

}