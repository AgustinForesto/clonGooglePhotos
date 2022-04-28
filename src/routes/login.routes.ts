import express, { NextFunction, Request, Response } from "express";

export const router = express.Router();

router.get("/login", (req: Request, res: Response) => { 
    res.render("login/index");
});

router.get("/signup", (req: Request, res: Response) => {

});

router.post("/auth", (req: Request, res: Response, next: NextFunction) => { 

});

router.post("/register", (req: Request, res: Response, next: NextFunction) => {

});