import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import { join } from "path";
export const app = express();

dotenv.config();

app.use(express.json());
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

app.get("/", (req: Request, res: Response) => { 
    res.send("Que ondaaa desde el server(?")
});

app.listen(3000, () => {
    console.log("Servidor en el puerto 3000");
});