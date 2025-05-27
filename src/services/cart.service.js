import { cartsManager } from "../dao/index.factory.js";

class CartsService {
    addProductToCart = async (product_id, user_id, quantity) => await cartsManager.addProductToCart(product_id, user_id, quantity);
    readProductsFromUser = async (user_id) => await cartsManager.readProductsFromUser(user_id);
    updateQuantity = async (id, quantity) => await cartsManager.updateQuantity(id, quantity);
    updateState = async (id, state) => await cartsManager.updateState(id, state);
    removeProductFromCart = async (id) => await cartsManager.removeProductFromCart(id);
}

const cartsService = new CartsService();
export default cartsService;