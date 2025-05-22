const register = async (req, res) => {
  const response = req.user;
  const token = req.token;
  const opts = {
    httpOnly: true,
    secure: process.env.COOKIE_KEY === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  res.cookie("token", token, opts).json201(response, "Registered");
};

const login = async (req, res) => {
  const response = req.user;
  const token = req.token;
  const opts = {
    httpOnly: true,
    secure: process.env.COOKIE_KEY === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  res.cookie("token", token, opts).json200(response, "Logged in");
};

const me = (req,res) =>res.json200 ({
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

export { register, login, online, signout, badAuth, google, me };
