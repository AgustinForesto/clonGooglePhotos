import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { join } from "path";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

import { IUser } from "./model/user.model";

import { router as loginRouter } from "./routes/login.routes";
import { router as homeRouter } from "./routes/home.routes";


declare module "express-session" {
    interface Session {
        user: IUser
    }
}

export const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(join(__dirname, "../public/")));

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(loginRouter);
app.use(homeRouter);

const options: mongoose.ConnectOptions = {
    dbName: process.env.DB_NAME as string,
    user: process.env.DB_USERNAME as string,
    pass: process.env.DB_PASSWORD as string
};

(async () => {
    await mongoose.connect(process.env.DB_CONNECTION as string, options);
    console.log("Conectando a MongoDB..");
})();

app.get("/", (req: Request, res: Response) => { 
    res.send("Que ondaaa desde el server(?")
});

app.listen(3000, () => {
    console.log("Servidor en el puerto 3000");
});