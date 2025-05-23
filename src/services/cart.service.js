import { cartsManager } from "../dao/index.factory.js";

class CartsService {
    addProductToCart = async () => await cartsManager.addProductToCart(product_id, user_id, quantity);
    readProductsFromUser = async () => await cartsManager.readProductsFromUser(user_id);
    updateQuantity = async () => await cartsManager.updateQuantity(id, quantity);
    updateState = async () => await cartsManager.updateState(id, state);
    removeProductFromCart = async () => await cartsManager.removeProductFromCart(id);
}

const cartsService = new CartsService();
export default cartsService;