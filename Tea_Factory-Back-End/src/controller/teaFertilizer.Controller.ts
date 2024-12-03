import express from "express";
import teaFertilizerModel from "../models/fertilizer.model";
import CustomResponse from "../dtos/custom.response";
import fertilizerModel from "../models/fertilizer.model";
import multer from "multer";
import FertilizerModel from "../models/fertilizer.model";
import Teq_leavesModel from "../models/teq_leaves.model";
import teq_leavesModel from "../models/teq_leaves.model";



/*export const createFertilizer = async (req: express.Request, res: any) => {

    try {

        let req_body = req.body;


        let tea_fertilizer_model = new fertilizerModel({
            tea_fertilizer_type: req_body.tea_fertilizer_type,
            qty: req_body.qty,
            price: req_body.price,
        });

        await tea_fertilizer_model.save().then(r => {
            res.status(200).send(
                new CustomResponse(200, "Fertilizer created successfully.")
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
};*/
/*const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');
export const createFertilizer = async (req: express.Request, res: any) => {
    try {
        // Use Multer to handle file upload
        upload(req, res, async (err: any) => {
            if (err) {
                console.log(err);
                return res.status(400).send('Error handling file upload');
            }

            const reqBody = req.body;


            const image = req.file ? req.file.buffer.toString('base64') : '';


            const fertilizer = new FertilizerModel({
                tea_fertilizer_type: reqBody.tea_fertilizer_type,
                qty: reqBody.qty,
                price: reqBody.price,
                image: image,
            });

            await fertilizer.save().then(r => {
                res.status(200).send(
                    new CustomResponse(200, "Fertilizer created successfully.")
                )
            }).catch(e => {
                console.log(e)
                res.status(100).send(
                    new CustomResponse(100, "Something went wrongs")
                )
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};*/



const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('images', 5); // Set the field name to 'images' and limit to 5 files

export const createFertilizer = async (req: express.Request, res: any) => {
    try {
        // Use Multer to handle file upload
        upload(req, res, async (err: any) => {
            if (err) {
                console.log(err);
                return res.status(400).send('Error handling file upload');
            }

            const reqBody = req.body;

            // Convert the buffers to base64-encoded strings for each image
            const files: Express.Multer.File[] = req.files as Express.Multer.File[];

            // Convert the buffers to base64-encoded strings for each image
            const images = files.map((file: Express.Multer.File) => file.buffer.toString('base64'));

            // Create a new Fertilizer document
            const fertilizer = new FertilizerModel({
                tea_fertilizer_type: reqBody.tea_fertilizer_type,
                qty: reqBody.qty,
                price: reqBody.price,
                images: images,
            });

            // Save the document to MongoDB
            try {
                await fertilizer.save();
                res.status(200).send(new CustomResponse(200, 'Fertilizer created successfully.'));
            } catch (saveError) {
                console.error('Error saving fertilizer :', saveError);
                res.status(500).send(new CustomResponse(100, 'Error saving fertilizer '));
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};






/*export const createFertilizer = async (req: express.Request, res: any) => {
    try {
        // Use Multer to handle file upload
        upload(req, res, async (err: any) => {
            if (err) {
                console.log(err);
                return res.status(400).send('Error handling file upload');
            }

            const reqBody = req.body;

            // Convert the buffers to base64-encoded strings for each image
            const files: Express.Multer.File[] = req.files as Express.Multer.File[];

            // Convert the buffers to base64-encoded strings for each image
            const images = files.map((file: Express.Multer.File) => file.buffer.toString('base64'));

            const images = ((req.files ?? []) as Express.Multer.File[]).map((file: Express.Multer.File) =>
                file.buffer.toString('base64')
            );


            // Create a new Fertilizer document
            const fertilizer = new FertilizerModel({
                tea_fertilizer_type: reqBody.tea_fertilizer_type,
                qty: reqBody.qty,
                price: reqBody.price,
                images: images,
            });

            // Save the document to MongoDB
            try {
                await fertilizer.save();
                res.status(200).send(new CustomResponse(200, 'Fertilizer created successfully.'));
            } catch (saveError) {
                console.error('Error saving fertilizer to MongoDB:', saveError);
                res.status(500).send(new CustomResponse(100, 'Error saving fertilizer to MongoDB'));
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};*/


export const getAllFertilizer = async (req: express.Request, res: express.Response) => {
    try {
        let fertilizer = await teaFertilizerModel.find();
        res.status(200).send(
            new CustomResponse(200, "Fertilizer are found successfully", fertilizer)
        )

    } catch (error) {
        res.status(100).send("Error");
    }
}

export const getFertilizerByType=async (req:express.Request,res:express.Response)=>{
    try {
        let tea_fertilizer_type:string=req.params.tea_fertilizer_type;
        let fertilizer_type:any=await FertilizerModel.findOne({tea_fertilizer_type:tea_fertilizer_type});

        console.log(tea_fertilizer_type)
        console.log(fertilizer_type)

        if (!fertilizer_type){
            res.status(404).send(
                new CustomResponse(404,"Tea Fertilizer Type Not Found!")
            )
        }else {
            let type=await FertilizerModel.find({tea_fertilizer_type:fertilizer_type.id})
            res.status(200).send(
                new CustomResponse(200,"Tea Fertilizer Are Found successfully!",type,fertilizer_type)
            )
        }
    }catch (error){
        res.status(100).send("Error");
    }
};

/*export const updateFertilizer = async (req: express.Request, res: express.Response) => {
    try {
        const fertilizerId = req.params.id;

        const fertilizer = await FertilizerModel.findOneAndUpdate(
            { _id: fertilizerId },
            {
                tea_fertilizer_type: req.body.tea_fertilizer_type,
                qty: req.body.qty,
                price: req.body.price,
                image:req.body.image,
            },
            { new: true }
        );

        if (fertilizer) {
            res.status(200).send(new CustomResponse(200, "Fertilizer Updated successfully."));
        } else {
            res.status(401).send(new CustomResponse(401, "Access Denied"));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(new CustomResponse(500, "Internal Server Error"));
    }
};*/

export const updateFertilizer = async (req: express.Request, res: express.Response) => {
    try {
        const fertilizerId = req.params.id;

        let updateFields: any = {
            tea_fertilizer_type: req.body.tea_fertilizer_type,
            qty: req.body.qty,
            price: req.body.price,
        };

        // Check if an image is provided in the request
        if (req.body.image) {
            updateFields.image = req.body.image;
        }

        const fertilizer = await FertilizerModel.findOneAndUpdate(
            { _id: fertilizerId },
            updateFields,
            { new: true }
        );

        if (fertilizer) {
            res.status(200).send(new CustomResponse(200, "Fertilizer Updated successfully."));
        } else {
            res.status(401).send(new CustomResponse(401, "Access Denied"));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(new CustomResponse(500, "Internal Server Error"));
    }
};

export const deleteFertilizer = async (req: express.Request, res: any) => {
    try {
        /*let fertilizer_id = res.tokenData.fertilizer_type._id;*/

        let fertilizer_id: string = req.params.id;

        let fertilizer = await FertilizerModel.find({_id: fertilizer_id})

        if(fertilizer) {

            await FertilizerModel.deleteOne({_id: fertilizer_id}).then(r => {
                res.status(200).send(
                    new CustomResponse(200, "Fertilizer is deleted successfully.")
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


//Using Middle Were
/*
export const deleteFertilizer = async (req: express.Request, res: any) => {
    try {
        let fertilizer_id = res.tokenData.fertilizer_type._id;

        //let fertilizer_id: string = req.params.id;

        let fertilizer = await FertilizerModel.find({_id: fertilizer_id})

        if(fertilizer) {

            await FertilizerModel.deleteOne({_id: fertilizer_id}).then(r => {
                res.status(200).send(
                    new CustomResponse(200, "Fertilizer is deleted successfully.")
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
};*/
