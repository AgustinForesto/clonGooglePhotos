import express, { NextFunction, Request, Response } from "express";
import User, { IUser } from "../model/user.model";

export const router = express.Router();

router.get("/home", (req: Request, res: Response) => {
    res.render("home/index", {user: req.session.user});
});

router.get("/login", (req: Request, res: Response) => { 
    res.render("login/index");
});

router.get("/signup", (req: Request, res: Response) => {
    res.render("signup/index");
});

router.post("/upload", (req: Request, res: Response) => {

});

router.post("/auth", async (req: Request, res: Response, next: NextFunction) => { 
    const { username, password }: IUser = req.body;

    if (!username || !password) {
        console.log("Falta un campo");
        res.redirect("/login");
    } else {
        try {
            const user = new User();

            const userExists = await user.usernameExists(username);

            if (userExists) {
                const userFound = await User.findOne({ username });

                const passCorrect = await user.isCorrectPassword(password, userFound.password);

                if (passCorrect) {
                    req.session.user = userFound;
                    res.redirect("/home");
                } else {
                    res.redirect("/login");
                }
            } else {
                res.redirect("/login");
            }

        } catch (error) {
            res.redirect("/login");
        }
    }
});

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, name }: IUser = req.body;
    if (!username || !password || !name) {
        console.log("Uno o mas campos vacios");

        res.redirect("/signup");
    } else {
        try {
            const userProps = { username, password, name };
        
            const user = new User(userProps);
    
            const exists = await user.usernameExists(username);
        
            if (exists) res.redirect("/signup");

            await user.save();

            res.redirect("/login");
        } catch (error) { res.redirect("/signup"); }
    }
});