import { productsManager } from "../dao/index.factory.js";
class ProductsRepository {
    createOneService = async (data) => await productsManager.createOne(data);
    readAllService = async (filter) => await productsManager.readAll(filter);
    readByIdService = async (pid) => await productsManager.readById(pid);
    updateByIdService = async (pid, data) => await productsManager.updateById(pid, data);
    destroyByIdService = async (pid) => await productsManager.destroyById(pid);
}

const productsRepository = new ProductsRepository();
export default productsRepository;