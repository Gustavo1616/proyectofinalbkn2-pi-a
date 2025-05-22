import { Schema, model, Types } from "mongoose";

const collection = "carts";
const schema = new Schema(
    {
        product_id: { type: Types.ObjectId, ref: "products", required: true },
        user_id: { type: Types.ObjectId, ref: "users", required: true, index: true },
        quantity: { type: Number, required: true, default: 1, min: [1, "La cantidad mínima debe ser 1"] },
        state: { type: String, default: "reserved", enum: ["reserved", "paid", "delivered"], index: true, },
    },
    { timestamps: true }
);

schema.pre(/^find/, function () {
    this.populate("user_id", "email photo")
        .populate("product_id", "title price stock");
});

const Cart = model(collection, schema);
export default Cart;
