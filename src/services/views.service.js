import { productsManager, usersManager, cartsManager } from "../dao/index.factory.js";

const homeViewService = async () => await productsManager.readAll();
const profileViewService = async (users_id) => await usersManager.readById(users_id);
const detailsViewService = async (product_id) => await productsManager.readById(product_id);
const cartsViewService = async (user_id) => await cartsManager.readProductsFromUser(user_id);


export { homeViewService, profileViewService, detailsViewService, cartsViewService };