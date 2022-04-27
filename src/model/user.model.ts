import mongoose from "mongoose";
//Para la encripcion de la informacion//
import bcrypt, { hash } from "bcrypt";

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
        });
    }
    const user = this;

    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
    })
});

//Exportamos todo el esquema//
export default mongoose.model("User", UserSchema);

