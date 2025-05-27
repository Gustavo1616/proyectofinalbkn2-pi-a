import cartsService from "../services/cart.service.js";

const addProductToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user.user_id;
    try {
        const updatedCart = await cartsService.addProductToCart(product_id, user_id, quantity);
        res.json201(updatedCart);
    } catch (error) {
        res.json500({ message: "Error al agregar producto al carrito.", error: error.message || error.name || JSON.stringify(error) });
    }
};

const readProductsFromUser = async (req, res) => {
    const user_id = req.user.user_id;
    try {
        const productsInCart = await cartsService.readProductsFromUser(user_id);
        if (productsInCart.length === 0) {
            return res.json404("No se encontraron productos en el carrito o el carrito está vacío.");
        }
        res.json200(productsInCart);
    } catch (error) {
        res.json500({ message: "Error al leer productos del carrito.", error: error.message });
    }
};

const updateQuantity = async (req, res) => {
    const { id: cartId } = req.params;
    const { product_id, quantity } = req.body;
    try {
        const updatedCart = await cartsService.updateQuantity(cartId, product_id, quantity);
        if (!updatedCart) {
            return res.json404("Carrito o producto no encontrado para actualizar cantidad.");
        }
        res.json200(updatedCart);
    } catch (error) {
        res.json500({ message: "Error al actualizar la cantidad del producto.", error: error.message });
    }
};

const removeProductFromCart = async (req, res) => {
    const { id: cartId } = req.params;
    const { product_id } = req.body;
    try {
        const updatedCart = await cartsService.removeProductFromCart(cartId, product_id);
        if (!updatedCart) {
            return res.json404("Carrito o producto no encontrado para eliminar.");
        }
        res.json200(updatedCart);
    } catch (error) {
        res.json500({ message: "Error al eliminar producto del carrito.", error: error.message });
    }
};

const updateState = async (req, res) => {
    const { id, state } = req.params;
    const states = ["reserved", "paid", "delivered"];
    if (states.includes(state)) {
        try {
            const one = await cartsService.updateState(id, state);
            if (one) {
                return res.json200(one);
            }
            res.json404("Carrito no encontrado.");
        } catch (error) {
            res.json500({ message: "Error al actualizar el estado del carrito.", error: error.message });
        }
    }
    res.json400("Invalid state!");
};

export { addProductToCart, readProductsFromUser, updateQuantity, updateState, removeProductFromCart };