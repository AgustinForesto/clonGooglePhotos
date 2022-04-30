import mongoose from "mongoose";
//Para la encripcion de la informacion//
import bcrypt, { hash } from "bcrypt";

export interface IUser{
    id?: string;
    username: string;
    password: string;
    name?: string;
}

const UserSchema = new mongoose.Schema({
    id: { type: Object },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
});

UserSchema.pre("save", function (next) {
    //Para saber si estamos modificando un pass o un nuevo documento
    if (this.isModified("password") || this.new) {
        const document = this;

        bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) return next(err);
            document.password = hash;
            next();
        });
    } else next();
});

UserSchema.methods.usernameExists = async function (username:any): Promise<boolean> {
    let result = await mongoose.model("User").find({ username: username });
    return result.length > 0;
};

UserSchema.methods.isCorrectPassword = async (password:any, hash:any): Promise<boolean> => {
    console.log(password, hash);
    const same = await bcrypt.compare(password, hash);

    return same;
}

//Exportamos todo el esquema//
export default mongoose.model("User", UserSchema);

