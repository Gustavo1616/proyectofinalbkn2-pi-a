import CustomRouter from "../custom.router.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, online, signout, badAuth, google, me, verifyAccount } from "../../controllers/auth.controller.js";

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register"),
      register
    );
    this.create(
      "/login",
      ["PUBLIC"],
      passportCb("login"),
      login
    );
    this.read("/online", ["PUBLIC"], online);
    this.read("/signout", ["USER", "ADMIN"], signout);
    this.read("/bad-auth", ["PUBLIC"], badAuth);
    this.read(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", {
        scope: ["email", "profile"],
        failureRedirect: "/api/auth/bad-auth",
      })
    );
    this.read(
      "/google/cb",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/auth/bad-auth",
      }),
      google
    );
    this.read("/me", ["USER", "ADMIN"], me);
    this.read("/email/:email/code/:code", ["PUBLIC"], verifyAccount);
  };
}
const authRouter = new AuthRouter();
export default authRouter.getRouter();
