import express from "express";
import teq_leavesModel from "../models/teq_leaves.model";
import CustomResponse from "../dtos/custom.response";
import Teq_leavesModel from "../models/teq_leaves.model";

export const createTeaLeavesType = async (req: express.Request, res: any) => {

    try {

        let req_body = req.body;


        let tea_leaves_model = new teq_leavesModel({
            tea_leaves_type: req_body.tea_leaves_type,
            qty: req_body.qty,
            price: req_body.price,
        });

        await tea_leaves_model.save().then(r => {
            res.status(200).send(
                new CustomResponse(200, "Leaves Type created successfully.")
            )
        }).catch(e => {
            console.log(e)
            res.status(100).send(
                new CustomResponse(100, "Something went wrongs")
            )
        });

    } catch (error) {
        res.status(100).send("Error");
    }
};
/*Get All Tea Leaves types*/
export const getAllLeaves = async (req: express.Request, res: express.Response) => {
    try {
        let leaves = await Teq_leavesModel.find();
        res.status(200).send(
            new CustomResponse(200, "Leaves are found successfully", leaves)
        )

    } catch (error) {
        res.status(100).send("Error");
    }
}

/*Get leaves By tea leaves type*/
export const getLeavesByLeavesType=async (req:express.Request,res:express.Response)=>{
    try {
        let tea_leaves_type:string=req.params.tea_leaves_type;
        let leaves_type:any=await Teq_leavesModel.findOne({tea_leaves_type:tea_leaves_type});

        if (!leaves_type){
            res.status(404).send(
                new CustomResponse(404,"Tea Leaves Type Not Found!")
            )
        }else {
            let type=await Teq_leavesModel.find({tea_leaves_type:leaves_type.id})
            res.status(200).send(
                new CustomResponse(200,"Tea Leaves Are Found successfully!",type,leaves_type)
            )
        }
    }catch (error){
        res.status(100).send("Error");
    }
}
/*Update Tea Leaves*/

export const updateLeaves = async (req: express.Request, res: express.Response) => {
    try {
        const leavesId = req.params.id;

        const leaves = await teq_leavesModel.findOneAndUpdate(
            { _id: leavesId },
            {
                tea_leaves_type: req.body.tea_leaves_type,
                qty: req.body.qty,
                price: req.body.price,
            },
            { new: true }
        );

        if (leaves) {
            res.status(200).send(new CustomResponse(100, "Leaves updated successfully."));
        } else {
            res.status(401).send(new CustomResponse(401, "Access Denied"));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(new CustomResponse(500, "Internal Server Error"));
    }
};


/*export const updateLeaves = async (req: express.Request, res: any) => {
    try {

        let req_body: any = req.body

        let leaves_id = res.tea_leaves_type._id;
        console.log("Leaves id :"+leaves_id,leaves_id)

        let leaves = await teq_leavesModel.find({_id: req_body.id ,leaves_type: leaves_id})

        console.log('test');

        if(leaves) {

            await teq_leavesModel.findOneAndUpdate({_id: req_body.id}, {

                tea_leaves_type: req_body.tea_leaves_type,
                qty: req_body.qty,
                price: req_body.price,
            })
                .then(r => {
                    res.status(200).send(
                        new CustomResponse(100, "Leaves updated successfully.")
                    )
                }).catch(error => {
                    console.log(error)
                    res.status(100).send(
                        new CustomResponse(100, "Something went wrong.")
                    )
                })

        } else {
            res.stat(401).send(
                new CustomResponse(401, "Access denied")
            )
        }


    } catch (error) {
        res.status(100).send("Error");
    }
}*/

export const deleteLeaves = async (req: express.Request, res: any) => {
    try {
        /*let user_id = res.tokenData.user._id;*/

        let leaves_id: string = req.params.id;

        let leaves = await Teq_leavesModel.find({_id: leaves_id})

        if(leaves) {

            await Teq_leavesModel.deleteOne({_id: leaves_id}).then(r => {
                res.status(200).send(
                    new CustomResponse(200, "Leaves is deleted successfully.")
                )
            }).catch(e => {
                res.status(100).send(
                    new CustomResponse(100, "Something went wrong.")
                )
            })

        } else {
            res.stat(401).send(
                new CustomResponse(401, "Access denied")
            )
        }

    } catch (error) {
        res.status(100).send("Error");
    }
}
