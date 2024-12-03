import express from "express";
import powderModel from "../models/type_of_tea_powder.model";
import CustomResponse from "../dtos/custom.response";
import * as SchemaTypes from "../types/SchemaTypes";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";
import bcrypt from "bcryptjs";
import multer from "multer";
import Teq_leavesModel from "../models/teq_leaves.model";
import powder from "../models/uset_order_tea_powder.model";
import * as SchemaType from "../types/SchemaTypes";
import UserModel from "../models/user.model";



const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

export const createTypeOfTeaPowder = async (req: express.Request, res: any) => {
    try {
        upload(req, res, async (err: any) => {
            if (err) {
                console.error(err);
                return res.status(500).send(new CustomResponse(100, "Error uploading image."));
            }

            try {
                let req_body = req.body;

                // Assuming 'image' is now a base64-encoded string
                const imageBuffer = Buffer.from(req_body.image, 'base64');

                let powder_model = new powderModel({
                    itemName: req_body.itemName,
                    type: req_body.type,
                    qty: req_body.qty,
                    price: req_body.price,
                    image: imageBuffer,
                });

                await powder_model.save().then((r) => {
                    res.status(200).send(new CustomResponse(200, "Item created successfully."));
                }).catch((e) => {
                    console.error(e);
                    res.status(100).send(new CustomResponse(100, "Something went wrong"));
                });
            } catch (error) {
                console.error(error);
                res.status(100).send(new CustomResponse(100, "Error processing request"));
            }
        });
    } catch (error) {
        console.error(error);
        res.status(100).send(new CustomResponse(100, "Error"));
    }
};

export const getAllTeaPowder = async (req: express.Request, res: express.Response) => {
    try {
        let powder = await powderModel.find();
        res.status(200).send(
            new CustomResponse(200, "Powder are found successfully", powder)
        )

    } catch (error) {
        res.status(100).send("Error");
    }
}
export const getPowderByLeavesTypes = async (req: express.Request, res: express.Response) => {
    try {
        let tea_powder_type: string = req.params.type as string;

        if (!tea_powder_type) {
            return res.status(400).send(
                new CustomResponse(400, "Type parameter is missing.")
            );
        }

        let types: any[] = await powderModel.find({ type: tea_powder_type });

        if (types.length === 0) {
            return res.status(404).send(
                new CustomResponse(404, `Tea Powder Type '${tea_powder_type}' Not Found!`)
            );
        }

        res.status(200).send(
            new CustomResponse(200, "Tea Powder(s) Found Successfully!", types)
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export const getPowderByItemName = async (req: express.Request, res: express.Response) => {
    try {
        let item_name: string = req.params.item_name as string;

        if (!item_name) {
            return res.status(400).send(
                new CustomResponse(400, "item_name parameter is missing.")
            );
        }

        // Use findOne to get a document with the specified item_name
        let powder: any = await powderModel.findOne({ item_name: item_name });

        if (!powder) {
            return res.status(404).send(
                new CustomResponse(404, `Tea Powder with item_name '${item_name}' Not Found!`)
            );
        }

        res.status(200).send(
            new CustomResponse(200, "Tea Powder Found Successfully!", powder)
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export const updatePowderByItemName = async (req: express.Request, res: express.Response) => {
    try {
        const item_name: string = req.params.item_name;
        const updateData = req.body;

        if (!item_name) {
            return res.status(400).send(
                new CustomResponse(400, "item_name parameter is missing.")
            );
        }

        // Use findOneAndUpdate to find and update the document with the specified item_name
        const updatedPowder: any = await powderModel.findOneAndUpdate(
            { item_name: item_name },
            updateData,
            { new: true } // Returns the updated document
        );

        if (!updatedPowder) {
            return res.status(404).send(
                new CustomResponse(404, `Tea Powder with item_name '${item_name}' Not Found!`)
            );
        }

        res.status(200).send(
            new CustomResponse(200, "Tea Powder Updated Successfully!", updatedPowder)
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export const deletePowderByItemName = async (req: express.Request, res: express.Response) => {
    try {
        const item_name: string = req.params.item_name;

        if (!item_name) {
            return res.status(400).send(
                new CustomResponse(400, "item_name parameter is missing.")
            );
        }

        // Use findOneAndDelete to find and delete the document with the specified item_name
        const deletedPowder: any = await powderModel.findOneAndDelete({ item_name: item_name });

        if (!deletedPowder) {
            return res.status(404).send(
                new CustomResponse(404, `Tea Powder with item_name '${item_name}' Not Found!`)
            );
        }

        res.status(200).send(
            new CustomResponse(200, "Tea Powder Deleted Successfully!", deletedPowder)
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
/*export const authTeaPowder = async (req: express.Request, res: express.Response) => {
    try {

        let request_body = req.body

        let powder: SchemaType.ITypes_of_tea_powder | null = await powderModel.findOne({powder_type: request_body.powder_type});
        if(powder) {

            let isMatch = await bcrypt.compare(request_body.powder_type, powder.type)

            if(isMatch) {

                // token gen
                powder.type = "";

                const expiresIn = '1w';

                jwt.sign({type: powder}, process.env.SECRET as Secret, {expiresIn}, (err: any, token: any) => {

                    if(err) {
                        res.status(100).send(
                            new CustomResponse(100, "Somthing went wrong")
                        );
                    } else {

                        let res_body = {
                            tea_powder: powder,
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
                new CustomResponse(404, "Powder Type not found")
            );
        }

    } catch (error) {
        res.status(100).send("Error");
    }
}*/



