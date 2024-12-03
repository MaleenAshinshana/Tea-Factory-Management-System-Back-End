import express from "express";

import CustomResponse from "../dtos/custom.response";
import * as SchemaType from "../types/SchemaTypes";
import jwt, {Secret} from "jsonwebtoken";

import bcrypt from "bcryptjs";
import AdminModel from "../models/admin.model";
import process from "process";
import UserModel from "../models/user.model";


export const createNewAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const req_body: any = req.body;

        await bcrypt.hash(req_body.password, 8, async function (err, hash) {
            if (err) {
                res.status(100).send(
                    new CustomResponse(100, "Something went wrong.")
                )
            }
            const adminModel = new AdminModel({
                username: req_body.username,
                email: req_body.email,
                password: hash
            })
            let admin: SchemaType.IAdmin | null = await adminModel.save();

            if (admin) {
                admin.password = "";
                res.status(200).send(
                    new CustomResponse(200, "admin created successfully", admin)
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
export const authAdmin = async (req: express.Request, res: express.Response) => {
    try {

        let request_body = req.body
        // email, password

        let admin: SchemaType.IAdmin | null = await AdminModel.findOne({username: request_body.username});
        if(admin) {

            let isMatch = await bcrypt.compare(request_body.password, admin.password)

            if(isMatch) {

                // token gen
                admin.password = "";

                const expiresIn = '1w';

                jwt.sign({admin}, process.env.SECRET as Secret, {expiresIn}, (err: any, token: any) => {

                    if(err) {
                        res.status(100).send(
                            new CustomResponse(100, "Somthing went wrong")
                        );
                    } else {

                        let res_body = {
                            admin: admin,
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
                new CustomResponse(404, "User not found")
            );
        }

    } catch (error) {
        res.status(100).send("Error");
    }
};
export const getAllAdmin = async (req: express.Request, res: express.Response) => {

    try {
        let admin = await AdminModel.find();
        res.status(200).send(
            new CustomResponse(200, "Admin are found successfully", admin)
        );
    } catch (error) {
        res.status(100).send("Error")
    }
}


