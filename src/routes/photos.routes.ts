import express, { NextFunction, Request, Response } from "express";
import User, { IUser } from "../model/user.model"
import Album, { IAlbum } from "../model/album.model";
import Photo, { IPhoto } from "../model/photo.model";

export const router = express.Router();

router.post(
    "/add-to-album",
    async (req: Request, res: Response) => {
        const { ids, albumid }: { ids: string; albumid: string } = req.body;

        const idPhotos = ids.split(",");

        const promises = [];

        for (let i = 0; i < idPhotos.length; i++) {
            promises.push(
                Photo.findByIdAndUpdate(idPhotos[i], {
                    $push: { albums: albumid },
                })
            );
        }
        // idPhotos.forEach((id: string | number) => {
        //     promises.push(
        //         Photo.findByIdAndUpdate(idPhotos[id], {
        //             $push: { albums: albumid },
        //         })
        //     );
        // });

        await Promise.all(promises);

        res.redirect("/home");
    });

router.post("/update-photos", (req: Request, res: Response) => { });

router.post("/add-favorite", async (req: Request, res: Response) => { });

router.post("/remove-favorite", async (req: Request, res: Response) => { });

router.get("/view/:id", async (req: Request, res: Response, next: NextFunction) => { });