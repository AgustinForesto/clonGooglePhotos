import express, { NextFunction, Request, Response } from "express";
import { middleware } from "../middleware/auth.middleware";
import User, { IUser } from "../model/user.model";
import Album, { IAlbum } from "../model/album.model";
import Photo, { IPhoto } from "../model/photo.model";

export const router = express.Router();

router.get("/albums",
    middleware,
    async (req: Request, res: Response, next: NextFunction) => {
        const albums = await Album.find({ userid: req.session.user._id });
    
        res.render("albums/index", { user: req.session.user, albums });
    }
);

router.get("/albums/:id",
    middleware,
    async (req: Request, res: Response, next: NextFunction) => { 
        const albumid = req.params.id;

        try {
            let photos = await Photo.find({
                albums: albumid,
            });
            
            let album = await Album.findById(albumid);
            
            if (album.userid !== req.session.user._id && album.isPrivate) {
                res.render("error/privacy", {});

                return;
            }
            
            const albums = await Album.find({ userid: req.session.user._id });
            
            res.render("albums/view", {
                user: req.session.user,
                photos,
                album,
                albums,
            });
        } catch (error) {
            console.log("******ERROR DE `albums.routes.ts`******");
            console.log(error);
            console.log("******ERROR DE `albums.routes.ts`******");
        }
    }
);

router.post("/create-album",
    middleware,
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, isPrivate }: {name: string, isPrivate: string} = req.body;
    
        const albumProps: IAlbum = {
            name: name,
            userid: req.session.user._id,
            isPrivate: isPrivate === "on",
            createAt: new Date(),
        }
    
        try {
            const album = await new Album(albumProps);
    
            album.save();
    
            res.redirect("/albums");
        } catch (error) {
            
        }
    }
);

router.post("/delete-album",
    middleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Album.findByIdAndDelete(req.body.albumId);
    
            res.redirect("/albums");
        } catch (error) {
            
        }
    }
);