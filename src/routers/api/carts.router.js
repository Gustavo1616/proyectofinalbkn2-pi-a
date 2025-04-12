import CustomRouter from "../custom.router.js";
import { addProductToCart, readProductsFromUser,updateQuantity, updateState, removeProductFromCart } from "../../controllers/carts.controller.js";


class CartsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER"], addProductToCart);
    this.read("/", ["USER"], readProductsFromUser);
    this.update("/:id", ["USER"], updateQuantity);
    this.update("/:id/:state", ["USER"], updateState);
    this.destroy("/:id", ["USER"], removeProductFromCart);
    this.router.param("id", (req, res, next, id) => {
      try {
        if (!Types.ObjectId.isValid(id)) {
          const error = new Error("Invalid ID");
          error.statusCode = 400;
          throw error;
        }
        next();
      } catch (error) {
        next(error);
      }
    });
  };
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();