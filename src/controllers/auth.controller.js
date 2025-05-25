import { createToken, verifyToken } from "../helpers/token.helper.js";
import { usersManager } from "../dao/index.factory.js";

const register = async (req, res) => {
  try {
    const user = req.user;
    const token = createToken({
      user_id: user._id,
      role: user.role,
    });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions).status(201).json({
      status: "success",
      payload: user,
      message: "Registered",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = req.user;
    const token = createToken({
      user_id: user._id,
      role: user.role,
    });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions).status(200).json({
      status: "success",
      payload: user,
      message: "Logged in",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message,
    });
  }
};

const me = (req, res) => res.json200({
  email: req.user.email,
  avatar: req.user.avatar,
});

const online = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json200({ user: null, online: false });
    }
    const user = verifyToken(token);
    if (user && user.user_id) {
      return res.json200({ user: { user_id: user.user_id }, online: true });
    } else {
      return res.json200({ user: null, online: false });
    }
  } catch (error) {
    console.error("Error verificando token en /online:", error);
    return res.json200({ user: null, online: false });
  }
};


const signout = async (req, res) => {
  res.clearCookie("token").json200(null, "Signed out");
};

const badAuth = async (req, res) => {
  res.json401("Bad auth from redirect");
};

const google = async (req, res) => {
  const response = req.user;
  res.json200(response);
};

const verifyAccount = async (req, res) => {
  const { email, code } = req.params
  const user = await usersManager.readBy({ email, verifyCode: code })
  if (!user) {
    console.log("Usuario no encontrado o código inválido");
    res.json401()
  }
  await usersManager.updateById(user._id, { isVerify: true })
  res.json200("VERIFICADO")
}

export { register, login, online, signout, badAuth, google, me, verifyAccount };
