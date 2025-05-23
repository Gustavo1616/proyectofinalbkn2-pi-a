import productsRepository from "../repositories/products.repository.js";

class ProductsService {
    createOne = async (data) => await productsRepository.createOne(data);
    readAll = async (filter) => await productsRepository.readAll(filter);
    readById = async (pid) => await productReproductsRepositoryr.readById(pid);
    updateById = async (pid, data) => await productsRepository.updateById(pid, data);
    destroyById = async (pid) => await productsRepository.destroyById(pid);
}
 
const productsService = new ProductsService();
export default productsService;