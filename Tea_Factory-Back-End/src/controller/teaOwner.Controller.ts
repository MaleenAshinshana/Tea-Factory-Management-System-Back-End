import express from "express";
import CustomResponse from "../dtos/custom.response";
import * as SchemaTypes from "../types/SchemaTypes";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";
import bcrypt from "bcryptjs";
import TeaOwnerModel from "../models/tea_owner.model";
import Tea_ownerModel from "../models/tea_owner.model";
import * as SchemaType from "../types/SchemaTypes";
import UserModel from "../models/user.model";



export const getAllOwners = async (req: express.Request, res: express.Response) => {

    try {
        let users = await Tea_ownerModel.find();
        res.status(200).send(
            new CustomResponse(200, "Users are found successfully", users)
        );
    } catch (error) {
        res.status(100).send("Error")
    }
}


export const createNewTeaOwner = async (req: express.Request, res: express.Response) => {
    try {
        const req_body: any = req.body;
        console.log(req_body)

        await bcrypt.hash(req_body.password, 8, async function (err, hash) {
            if (err) {
                res.status(100).send(
                    new CustomResponse(100, "Something went wrong.")
                )
            }
            const owners = new Tea_ownerModel({

                username: req_body.username,
                usertype: req_body.usertype,
                branch: req_body.branch,
                email: req_body.email,
                contact_number1: req_body.contact_number1,
                contact_number2: req_body.contact_number2,
                password: hash
            })
            let owner: SchemaTypes.ITeaOwner | null = await owners.save();

            if (owner) {
                owner.password = "";
                res.status(200).send(
                    new CustomResponse(200, "User created successfully", owner)
                )
            } else {
                res.status(100).send(
                    new CustomResponse(100, "Something went wrong.")
                )
            }
        })

    } catch (error) {
        res.status(100).send("Error")
    }

}
export const authTeaOwner = async (req: express.Request, res: express.Response) => {
    try {

        let request_body = req.body

        let owner: SchemaType.IUser | null = await Tea_ownerModel.findOne({username: request_body.username});
        if(owner) {

            let isMatch = await bcrypt.compare(request_body.password, owner.password)

            if(isMatch) {

                // token gen
                owner.password = "";

                const expiresIn = '1w';

                jwt.sign({owner}, process.env.SECRET as Secret, {expiresIn}, (err: any, token: any) => {

                    if(err) {
                        res.status(100).send(
                            new CustomResponse(100, "Somthing went wrong")
                        );
                    } else {

                        let res_body = {
                            owner: owner,
                            accessToken: token
                        }

                        res.status(200).send(
                            new CustomResponse(200, "Access", res_body)
                        );
                    }

                })
            } else {
                res.status(401).send(
                    new CustomResponse(401, "Invalid credentials")
                );
            }
        } else {
            res.status(404).send(
                new CustomResponse(404, "Owner not found")
            );
        }

    } catch (error) {
        res.status(100).send("Error");
    }
}
