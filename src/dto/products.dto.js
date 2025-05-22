import crypto from 'crypto';
const { PERSISTENCE } = process.env;

class ProductDTO {
constructor(data){
    if (PERSISTENCE !== "mongo") {
        this._id = crypto.randomBytes(12).toString("hex");
    }
    this.title = data.title;
    this.description = data.description;
    this.code = data.code;
    this.price = data.price;
    this.status = data.status || true;
    this.stock = data.stock || 0;
    this.category = data.category;
    this.image = data.image || "https://picsum.photos/200/300?random=2";
    if (PERSISTENCE === "mongo") {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
 }
}