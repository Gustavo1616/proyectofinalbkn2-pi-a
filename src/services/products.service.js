import { productsManager } from "../dao/index.factory.js";

class ProductsService {
    createOne = async (data) => await productsManager.createOne(data);
    readAll = async (filter) => await productsManager.readAll(filter);
    readById = async (pid) => await productsManager.readById(pid);
    updateById = async (pid, data) => await productsManager.updateById(pid, data);
    destroyById = async (pid) => await productsManager.destroyById(pid);
}
 
const productsService = new ProductsService();
export default productsService;