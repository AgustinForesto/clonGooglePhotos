import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
    id: { type: Object },
    name: { type: String, required: true},
    userid: { type: Boolean, required: true, default: true },
    isprivate: { type: Boolean, required: true, default: true },
    createAt: { type: Date, default: Date.now },
});

export default mongoose.model("Album", AlbumSchema);