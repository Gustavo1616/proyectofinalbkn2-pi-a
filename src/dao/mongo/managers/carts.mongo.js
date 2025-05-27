import Manager from "./manager.mongo.js";
import Cart from "../models/carts.model.js";


class CartsManager extends Manager {
  constructor() {
    super(Cart);
  }
   addProductToCart = async (productId, userId, quantity) => {
    try {
      let cart = await Cart.findOneAndUpdate(
        { user_id: userId, state: "reserved" },
        { $setOnInsert: { products: [] } },
        { upsert: true, new: true, runValidators: true }
      );
      if (!cart) {
        throw new Error("CartsManager: No se pudo encontrar o crear el carrito del usuario.");
      }
      const productIndex = cart.products.findIndex(
        (p) => {
          const existingProductIdToCompare = p.product_id._id ? p.product_id._id.toString() : p.product_id.toString();
          const incomingProductIdToCompare = productId.toString();
          return existingProductIdToCompare === incomingProductIdToCompare;
        }
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product_id: productId, quantity: quantity });
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  };
  readProductsFromUser = async (user_id) => {
    const cart = await this.readBy({ user_id, state: "reserved" });
    return cart ? cart.products : [];
  };
  updateQuantity = async (cartId, productId, newQuantity) => {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado.");
      }
      const productIndex = cart.products.findIndex(
        (p) => p.product_id.toString() === productId.toString()
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity = newQuantity;
        await cart.save();
        return cart;
      } else {
        throw new Error("Producto no encontrado en el carrito.");
      }
    } catch (error) {
      throw error;
    }
  };
  removeProductFromCart = async (cartId, productId) => {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado.");
      }
      const initialLength = cart.products.length;
      cart.products = cart.products.filter(
        (p) => p.product_id.toString() !== productId.toString()
      );
      if (cart.products.length === initialLength) {
        throw new Error("Producto no encontrado en el carrito para eliminar.");
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  };
  updateState = async (cart_id, state) => await this.updateById(cart_id, { state });
  removeFullCart = async (cart_id) => await this.destroyById(cart_id);
}

const cartsManager = new CartsManager();
export { cartsManager };