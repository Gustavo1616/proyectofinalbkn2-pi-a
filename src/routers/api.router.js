import CustomRouter from "./custom.router.js";
import authRouter from "./api/auth.router.js";
import productRouter from "./api/products.router.js";
import cartRouter from "./api/carts.router.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.use("/auth", authRouter);
    this.use("/products", productRouter);
    this.use("/carts", cartRouter);
  };
}

let apiRouter = new ApiRouter();
apiRouter = apiRouter.getRouter();
export default apiRouter;
