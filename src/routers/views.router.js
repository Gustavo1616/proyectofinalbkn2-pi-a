import { homeView, profileView, detailsView, cartsView, registerView, loginView  } from "../controllers/view.controller.js";
import CustomRouter from "./custom.router.js";


class ViewsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["PUBLIC"], homeView);
    this.read("/profile/:users_id",["PUBLIC"],  profileView);
    this.read("/products/:product_id",["PUBLIC"],  detailsView);
    this.read("/carts/:users_id",["PUBLIC"] ,cartsView);
    this.read("/register", ["PUBLIC"], registerView);
    this.read("/login", ["PUBLIC"], loginView);
  }
}

export default new ViewsRouter().getRouter();
