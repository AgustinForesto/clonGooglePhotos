import express, { NextFunction, Request, Response } from "express";
import { middlewareHome } from "../middleware/auth.middleware";
import User, { IUser } from "../model/user.model";

export const router = express.Router();

router.get("/login",
    middlewareHome,
    (req: Request, res: Response) => { 
        res.render("login/index");
    }
);

router.get("/signup",
    middlewareHome,
    (req: Request, res: Response) => {
        res.render("signup/index");
    }
);

router.post("/auth",
    middlewareHome,
    async (req: Request, res: Response, next: NextFunction) => { 
        const { username, password }: IUser = req.body;

        if (!username || !password) {
            console.log("Falta un campo");
            res.redirect("/login");
        } else {
            try {
                const user = new User();

                const userExists = await user.usernameExists(username);

                if (userExists) {
                    const userFound = await User.findOne({ username: username });

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
                console.log(error);
                res.redirect("/login");
            }
        }
    }
);

router.post("/register",
    middlewareHome,
    async (req: Request, res: Response, next: NextFunction) => {
        const { username, password, name }: IUser = req.body;
        
        if (!username || !password || !name) {
            console.log("Uno o mas campos vacios");

            res.redirect("/signup");
        } else {
            try {
                console.log(req.body);
                const userProps: IUser = { username, password, name };
            
                const user = new User(userProps);
        
                const exists = await user.usernameExists(username);
            
                if (exists) {
                    res.redirect("/signup");
                } else {
                    await user.save();

                    res.redirect("/login");
                }
            } catch (error) {
                console.log(error);
                res.redirect("/signup");
            }
        }
    }
);