import { productsManager, usersManager, cartsManager } from "../dao/index.factory.js";

class ViewsService {
    homeView = async () => await productsManager.readAll();
    profileView = async (users_id) => await usersManager.readById(users_id);
    detailsView = async (product_id) => await productsManager.readById(product_id);
    cartsView = async (user_id) => await cartsManager.readProductsFromUser(user_id);
}

const viewsService = new ViewsService();
export default viewsService;