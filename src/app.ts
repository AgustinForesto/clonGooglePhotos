import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import { join } from "path";
import mongoose from "mongoose";
import { router as HomeRouter } from "./routes/login.routes";

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

app.use(HomeRouter);

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