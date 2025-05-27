import crypto from "crypto";
import { createHash } from "../helpers/hash.helper.js";
const { PERSISTENCE } = process.env;

class UserDTO {
    constructor(data) {
        if (PERSISTENCE !== "MONGO") {
            this._id = crypto.randomBytes(12).toString("hex");
        }
        this.name = data.name;
        this.data = data.data;
        this.email = data.email;
        this.password = createHash(data.password);
        this.role = data.role || "USER";
        this.photo = data.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        this.isVerify = data.isVerify || false;
        this.verifyCode = crypto.randomBytes(12).toString("hex");
        if (PERSISTENCE === "MONGO") {
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
    }
}

export default UserDTO;