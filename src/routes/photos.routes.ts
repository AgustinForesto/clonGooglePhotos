import express, { NextFunction, Request, Response } from "express";
import User, { IUser } from "../model/user.model"
import Album, { IAlbum } from "../model/album.model";
import Photo, { IPhoto, IPhotoFavReq } from "../model/photo.model";
import { middleware } from "../middleware/auth.middleware";

export const router = express.Router();

router.post("/add-to-album",
    middleware,
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
        /*idPhotos.forEach((id: string | number) => {
            promises.push(
                Photo.findByIdAndUpdate(idPhotos[id], {
                    $push: { albums: albumid },
                })
            );
        });*/

        await Promise.all(promises);

        res.redirect("/home");
    }
);

router.post("/update-photos", (req: Request, res: Response) => { });

router.post("/add-favorite",
    middleware,
    async (req: Request, res: Response) => {
        const { photoid, origin }: IPhotoFavReq = req.body;
    
        try {
            await Photo.findByIdAndUpdate(photoid, {
                $set: { favorite: true }
            });
    
            res.redirect(origin);
        } catch (error) {
            
        }
    }
);

router.post("/remove-favorite",
    middleware,
    async (req: Request, res: Response) => {
        const { photoid, origin }: IPhotoFavReq = req.body;
    
        try {
            await Photo.findByIdAndUpdate(photoid, {
                $set: { favorite: false }
            });
    
            res.redirect(origin);
        } catch (error) {
            
        }
    }
);

router.get("/view/:id",
    middleware,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id as string;
        const origin = req.query.origin as string;
    
        try {
            const photo = await Photo.findById(id);
    
            const albums = await Album.find({ userid: req.session.user._id });
    
            res.render("layout/preview", {
                user: req.session.user,
                photo,
                albums,
                origin,
            });
        } catch (error) {
            
        }
    }
);