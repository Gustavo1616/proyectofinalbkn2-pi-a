import { Schema, model, Types } from "mongoose";

const collection = "carts";
const schema = new Schema(
    {
        user_id: { type: Types.ObjectId, ref: "users", required: true, unique: true, index: true, },
        products: [
            {
                product_id: { type: Types.ObjectId, ref: "product", required: true, },
                quantity: { type: Number, required: true, default: 1, min: [1, "La cantidad mínima debe ser 1"], }, _id: false,
            },
        ],
        state: { type: String, default: "reserved", enum: ["reserved", "paid", "delivered"], index: true, },
    },
    { timestamps: true }
);
schema.pre(/^find/, function () {
    this.populate("user_id", "email photo")
        .populate("products.product_id", "title price stock photo");
});

const Cart = model(collection, schema);
export default Cart;