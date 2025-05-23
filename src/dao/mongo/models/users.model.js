import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
    {
        name: { type: String },
        photo: { type: String, default: "https://media.lordicon.com/icons/wired/lineal/44-avatar-user-in-circle.svg" },
        role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREM"] },
        email: { type: String, required: true, index: true, unique: true },
        password: { type: String, required: true },
        isVerify: { type: Boolean, default: false },
        verifyCode: { type: String, required: true },
    },
    { timestamps: true }
);

const User = model(collection, schema);
export default User;