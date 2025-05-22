import { cartsManager } from "../dao/index.factory.js";


const addProductToCartService = async () => await cartsManager.addProductToCart(product_id,user_id,quantity);
const readProductsFromUserService = async () => await cartsManager.readProductsFromUser(user_id);
const updateQuantityService = async () => await cartsManager.updateQuantity(id, quantity);
const updateStateService = async () => await cartsManager.updateState(id, state);
const removeProductFromCartService = async () => await cartsManager.removeProductFromCart(id);

export { addProductToCartService, readProductsFromUserService, updateQuantityService, updateStateService, removeProductFromCartService };