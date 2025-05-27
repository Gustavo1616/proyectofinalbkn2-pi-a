import FileManager from "./manager.fs.js";
import { productsManager } from "./manager.fs.js";
import crypto from "crypto";

class CartsManager extends FileManager {
  constructor() {
    super("./src/dao/fs/data/carts.json");
  }

  addProductToCart = async (productId, userId, quantity) => {
    try {
      let userCart = await this.readBy({ user_id: userId, state: "reserved" });
      if (!userCart) {
        const newCartId = crypto.randomBytes(12).toString("hex");
        const newCartData = {
          _id: newCartId,
          user_id: userId,
          products: [{ product_id: productId, quantity: quantity }],
          state: "reserved",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        userCart = await this.createOne(newCartData);
      } else {
        const productIndex = userCart.products.findIndex(
          (p) => String(p.product_id) === String(productId)
        );
        if (productIndex > -1) {
          userCart.products[productIndex].quantity += quantity;
        } else {
          userCart.products.push({ product_id: productId, quantity: quantity });
        }
        userCart.updatedAt = new Date().toISOString();
        userCart = await this.updateById(userCart._id, userCart);
      }
      return userCart;
    } catch (error) {
      throw error;
    }
  };

  readProductsFromUser = async (user_id) => {
    try {
      const allCarts = await this._readFile();
      const userCart = allCarts.find(
        (cart) => String(cart.user_id) === String(user_id) && cart.state === "reserved"
      );
      if (!userCart || !userCart.products || userCart.products.length === 0) {
        return [];
      }
      const populatedProducts = await Promise.all(
        userCart.products.map(async (item) => {
          const productDetails = await productsManager.readById(String(item.product_id));
          return { ...item, product_id: productDetails };
        })
      );
      return populatedProducts;
    } catch (error) {
      throw error;
    }
  };

  updateQuantity = async (cartId, productId, newQuantity) => {
    try {
      let cart = await this.readById(cartId);
      if (!cart) {
        return null;
      }
      const productIndex = cart.products.findIndex(
        (p) => String(p.product_id) === String(productId)
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity = newQuantity;
        cart.updatedAt = new Date().toISOString();
        const updatedCart = await this.updateById(cart._id, cart);
        return updatedCart;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };

  removeProductFromCart = async (cartId, productId) => {
    try {
      let cart = await this.readById(cartId);
      if (!cart) {
        return null;
      }
      const initialLength = cart.products.length;
      cart.products = cart.products.filter(
        (p) => String(p.product_id) !== String(productId)
      );
      if (cart.products.length === initialLength) {
        return null;
      }
      cart.updatedAt = new Date().toISOString();
      const updatedCart = await this.updateById(cart._id, cart);
      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  updateState = async (cart_id, state) => {
    try {
      const updatedCart = await this.updateById(cart_id, { state, updatedAt: new Date().toISOString() });
      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  removeFullCart = async (cart_id) => {
    try {
      const deletedCart = await this.destroyById(cart_id);
      return deletedCart;
    } catch (error) {
      throw error;
    }
  };
}

const cartsManager = new CartsManager();
export { cartsManager };