import express, { NextFunction, Request, Response } from "express";
import Album from "../model/album.model";

export const router = express.Router();

router.get("/albums", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const albums = Album.find({ userid: req.session.user._id });
        
        res.render("albums/index", { user: req.session.user });
    } catch (error) {
        
    }
});

router.get("/albums/:id", (req: Request, res: Response, next: NextFunction) => { });

router.post("/create-album", (req: Request, res: Response, next: NextFunction) => { });