import { Schema, model } from "mongoose";

const collection = "product";
const schema = new Schema(
    {
        title: { type: String, required: true },
        photo: { type: String, required: true },
        category: { type: String, default: "general" },
        price: { type: Number, default: 1 },
        stock: { type: Number, default: 1 }
    },
    { timestamps: true, collection: "product" }
);

const Product = model(collection, schema);
export default Product;
