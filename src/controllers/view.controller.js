import viewsService from "../services/views.service.js";

const homeView = async (req, res) => {
    const product = await viewsService.homeView();
    if (!product || product.length === 0) {
        return res.status(404).render("error", {
            title: "Error",
            message: "No hay productos para mostrar",
        });
    }
    res.status(200).render("index", { product, title: "HOME" });
};


const profileView = async (req, res) => {
    const { users_id } = req.params;
    const profile = await viewsService.profileView(users_id);
    if (!profile) {
        return res.status(404).render("error", {
            title: "Usuario no encontrado",
            message: `No se encontró el perfil con ID: ${users_id}`,
        });
    }
    res.status(200).render("profile", { title: "PROFILE", profile });
};

const detailsView = async (req, res) => {
    const { product_id } = req.params;
    const product = await viewsService.detailsView(product_id);
    if (!product) {
        return res.status(404).render("error", {
            title: "Producto no encontrado",
            message: `No se encontró el producto con ID: ${product_id}`,
        });
    }
    res.status(200).render("product", { title: product.title.toUpperCase(), product, });
};

const cartsView = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        let cartProducts = await viewsService.cartsView(user_id);
        if (cartProducts && cartProducts.length > 0) {
            cartProducts = cartProducts.map(item => {
                const subtotal = item.quantity * item.product_id.price;
                return { ...item, subtotal: subtotal };
            });
        }
        let total = 0;
        if (cartProducts && cartProducts.length > 0) {
            total = cartProducts.reduce((acc, item) => {
                return acc + item.subtotal;
            }, 0);
        }
        res.status(200).render("cart", { title: "CART", carts: cartProducts, total });
    } catch (error) {
        console.error("Error en cartsView:", error);
        next(error);
    }
};

const registerView = (req, res) => {
    res.status(200).render("register", { title: "REGISTER FORM" });
};

const loginView = (req, res) => {
    res.status(200).render("login", { title: "LOGIN FORM" });
};

const verifyView = (req, res) => {
    res.status(200).render("verify", { title: "VERIFY YOUR ACCOUNT" });
}

export { homeView, profileView, detailsView, cartsView, registerView, loginView, verifyView };