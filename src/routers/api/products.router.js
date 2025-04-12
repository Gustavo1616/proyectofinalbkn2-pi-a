import CustomRouter from "../custom.router.js";
import { createOne, readAll, readById, updateById, destroyById, pidParam } from "../../controllers/product.controller.js";


class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/", ["PUBLIC"], readAll);
    this.read("/:pid", ["PUBLIC"], readById);
    this.update("/:pid", ["ADMIN"], updateById);
    this.destroy("/:pid", ["ADMIN"], destroyById);
    this.router.param("pid", pidParam);
  };
}

let productsRouter = new ProductsRouter();
productsRouter = productsRouter.getRouter();
export default productsRouter;