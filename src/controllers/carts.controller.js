import { cartsManager } from "../data/mongo/managers/carts.mongo.js";

const addProductToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user._id;
    const one = await cartsManager.addProductToCart(
      product_id,
      user_id,
      quantity
    );
    res.json201(one)
  };
  const readProductsFromUser = async (req, res) => {
    const user_id = req.user._id;
    const all = await cartsManager.readProductsFromUser(user_id);
    if (all.length === 0) {
      res.json404()
    }
    res.json200(all)
  };
  const updateQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const one = await cartsManager.updateQuantity(id, quantity);
    if (!one) {
      res.json404()
    }
    res.json200(one)
  };
  const updateState = async (req, res) => {
    const { id, state } = req.params;
    const states = ["reserved", "paid", "delivered"];
    if (states.includes(state)) {
      const one = await cartsManager.updateState(id, state);
      if (one) {
        return res.json200(one)
      }
      res.json404()
    }
    res.json400("Invalid state!")
  };
  const removeProductFromCart = async (req, res) => {
    const { id } = req.params;
    const one = await cartsManager.removeProductFromCart(id);
    if (!one) {
      res.json404()
    }
    res.json200(one)
  };

  export { addProductToCart, readProductsFromUser, updateQuantity, updateState, removeProductFromCart };