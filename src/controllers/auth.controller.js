import { createToken } from "../helpers/token.helper.js";
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

const online = async (req, res) => {
  if (!req.user.user_id) {
    return res.json401("User not authenticated");
  }
  res.json200({ user: req.user });
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
  console.log("Verificando usuario con:", email, code);
  const user = await usersManager.readBy({ email, verifyCode: code })
  if (!user){
     console.log("Usuario no encontrado o código inválido");
     return res.json401()
  }
  await usersManager.updateById(user._id, { isVerify: true })
  res.json200("VERIFICADO")
}

export { register, login, online, signout, badAuth, google, me, verifyAccount };
