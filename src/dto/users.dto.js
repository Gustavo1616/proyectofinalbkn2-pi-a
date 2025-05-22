import crypto from "crypto";

const { PERSISTENCE } = process.env;

class userDTO {
    constructor(data) {
        if (PERSISTENCE !== "mongo") {
            this._id = crypto.randomBytes(12).toString("hex");
        }
        this.name = data.name;
        this.data = data.data;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role || "USER";
        this.avatar = data.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        this.isVerify = data.isVerify || false;
        this.verifyCode = crypto.randomBytes(12).toString("hex");
        if (PERSISTENCE === "mongo") {
            this_createdAt = new Date();
            this.updatedAt = new Date();
        }
    }
}

export default userDTO;