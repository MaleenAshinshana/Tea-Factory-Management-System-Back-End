import express from "express";
import CustomResponse from "../dtos/custom.response";
import UserTeaLeaves from "../models/user_tea_leaves.model";
import {ObjectId} from "mongodb";
import TeaOwnerModel from "../models/tea_owner.model"
import * as SchemaType from "../types/SchemaTypes";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";




export const saveTeaLeaves = async (req: express.Request, res: any) => {

    try {

        let req_body = req.body;
        let owner_id=res.tokenData.owner._id;


        console.log("Request Body :",req_body);


        console.log(res)
       // console.log("Owner ID :",owner_id);

        let user_leavesModel = new UserTeaLeaves({
            data: req_body.data,
            leaves_type: req_body.leaves_type,
            qty: req_body.qty,
            price:req_body.price,
            owner:new ObjectId(owner_id)
        });

        await user_leavesModel.save().then(r => {
            res.status(200).send(
                new CustomResponse(200, "Saved successfully.")
            )
        }).catch(e => {
            console.log(e)
            res.status(100).send(
                new CustomResponse(100, "Something went wrongs")
            )
        });

    } catch (error) {
        console.log(error)
        res.status(100).send("Error");

    }
};

export const getAllTeaLe = async (req: express.Request, res: express.Response) => {
    try {

        let leaves = await UserTeaLeaves.find();

        res.status(200).send(
            new CustomResponse(200, "Articles are found successfully", leaves)
        )

    } catch (error) {
        res.status(100).send("Error");
    }
};
export const updateLeaves = async (req: express.Request, res: any) => {
    try {

        let req_body: any = req.body

        let owner_id = res.tokenData.owner._id;

        let leaves = await UserTeaLeaves.find({_id: req_body.id ,user: owner_id})

        console.log('test');

        if(leaves) {

            await UserTeaLeaves.findOneAndUpdate({_id: req_body.id}, {

                data:req_body.data,
                leaves_type:req_body.leaves_type,
                qty:req_body.qty,
                price:req_body.price,
                owner:req_body.owner,
            })
                .then(r => {
                    res.status(200).send(
                        new CustomResponse(100, "updated successfully.")
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
};

export const deleteLeaves = async (req: express.Request, res: any) => {
    try {
        let owner_id = res.tokenData.owner._id;

        let leaves_id: string = req.params.id;

        let leaves = await UserTeaLeaves.find({_id: leaves_id ,user: owner_id})

        if(leaves) {

            await UserTeaLeaves.deleteOne({_id: leaves_id}).then(r => {
                res.status(200).send(
                    new CustomResponse(200, "deleted successfully.")
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
};
export const getLeavesByUsername = async (req: express.Request, res: express.Response) =>{
    try {

      /*  let req_query: any = req.query;
        let size: number = req_query.size;
        let page: number = req_query.page;*/

        let username: string = req.params.username;

        let user:any = await TeaOwnerModel.findOne({username: username});

        if(!user) {
            res.status(404).send(
                new CustomResponse(404, "Owner not found")
            )
        } else {
            //let leaves = await UserTeaLeaves.find({user: user._id})
/*
            let documentCount = await ArticleModel.countDocuments({user: user._id});
            let pageCount = Math.ceil(documentCount/size);*/
            let leaves = await UserTeaLeaves.find();
            res.status(200).send(
                new CustomResponse(200, "Leaves are found successfully",leaves)
            )
        }

    } catch (error) {
        res.status(100).send("Error");
    }
};
export const getMyLeaves = async (req: express.Request, res: any) => {
    try {

       /* let req_query: any = req.query;
        let size: number = req_query.size;
        let page: number = req_query.page;*/

        let user_id = res.tokenData.user._id;

        let leaves = await UserTeaLeaves.find({user:user_id});

        /*let documentCount = await ArticleModel.countDocuments({user: user_id});
        let pageCount = Math.ceil(documentCount/size);*/

        res.status(200).send(
            new CustomResponse(200, "Leaves are found successfully", leaves)
        )

    } catch (error) {
        res.status(100).send("Error");
    }
}

