import mongoose from "mongoose";

export interface IAlbum {
    _id?: string;
    name: string;
    userid?: string;
    isPrivate: boolean;
    createAt?: Date;
}

const AlbumSchema = new mongoose.Schema({
    id: { type: Object },
    name: { type: String, required: true},
    userid: { type: String, default: "" },
    isprivate: { type: Boolean, required: true, default: true },
    createAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Album", AlbumSchema);