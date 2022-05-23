import express, { NextFunction, Request, Response } from "express";
import Album, { IAlbum } from "../model/album.model";
import Photo, { IPhoto } from "../model/photo.model";

export const router = express.Router();

router.get("/albums", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const albums = await Album.find({ userid: req.session.user._id });

        res.render("albums/index", { user: req.session.user, albums });
    } catch (error) {
        
    }
});

router.get(
    "/albums/:id",
    async (req: Request, res: Response, next: NextFunction) => { 
        const albumid = req.params.id;

        try {
            let photos = await Photo.find({
                albums: albumid,
            });

            let album = await Album.findById(albumid);

            if (album.userid !== req.session.user._id && album.isprivate) {
                res.render("error/privacy", {});

                return;
            }

            res.render("albums/view", {
                user: req.session.user,
                photos,
                album,
            });
        } catch (error) {
            
        }
    });

router.post("/create-album", async (req: Request, res: Response, next: NextFunction) => {
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
});