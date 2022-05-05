import express, { NextFunction, Request, Response } from "express";
import Album, {IAlbum} from "../model/album.model";

export const router = express.Router();

router.get("/albums", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const albums = Album.find({ userid: req.session.user._id });
        
        res.render("albums/index", { user: req.session.user, albums });
    } catch (error) {
        
    }
});

router.get("/albums/:id", (req: Request, res: Response, next: NextFunction) => { });

router.post("/create-album", async (req: Request, res: Response, next: NextFunction) => {
    const { name, isPrivate }: {name: string, isPrivate: string} = req.body;
console.log(req.body)
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