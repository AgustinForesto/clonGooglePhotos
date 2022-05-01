import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import Photo from "../model/photo.model";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".");
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "." + ext[ext.length - 1]);
    },
});

const upload = multer({ storage: storage });

export const router = express.Router();

router.get("/home", async (req: Request, res: Response) => {
    try {
        const photos = await Photo.find(
            //{ userid: req.session.user.id! }
        );
        res.render("home/index", { user: req.session.user, photos });
    } catch (error) {
        res.render("home/index", { user: req.session.user });
    }
});

router.post("/upload", upload.single("photos"), (req: Request, res: Response) => {
    const file = req.file!;

    const photoProps = {
        filename: file.filename,
        userid:
            //req.session.user.id!,
            req.session.user.id || req.session.id || "usuarioUnico",
        size: file.size,
        mimeType: file.mimetype,
    }

    const photo = new Photo(photoProps);

    photo.save();

    res.redirect("/home");
});