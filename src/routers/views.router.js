import { homeView, profileView, detailsView, cartsView, registerView, loginView, verifyView  } from "../controllers/view.controller.js";
import CustomRouter from "./custom.router.js";


class ViewsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["PUBLIC"], homeView);
    this.read("/profile/:users_id",["PUBLIC"],  profileView);
    this.read("/product/:product_id",["PUBLIC"],  detailsView);
    this.read("/cart/:user_id",["USER", "ADMIN"] ,cartsView);
    this.read("/register", ["PUBLIC"], registerView);
    this.read("/login", ["PUBLIC"], loginView);
    this.read("/verify", ["USER"], verifyView);
  }
}

export default new ViewsRouter().getRouter();
