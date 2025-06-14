import { Types } from "mongoose";
import productsService  from "../services/products.service.js";

const createOne = async (req, res) => {
  const data = req.body;
  const response = await productsService.createOne(data);
  res.json201(response)
};
const readAll = async (req, res) => {
  const filter = req.query;
  const response = await productsService.readAll(filter);
  if (response.length === 0) {
    res.json404()
  }
  res.json200(response)
};
const readById = async (req, res) => {
  const { pid } = req.params;
  const response = await productsService.readById(pid);
  if (!response) {
    res.json404()
  }
  res.json200(response)
};
const updateById = async (req, res) => {
  const { pid } = req.params;
  const data = req.body;
  const response = await productsService.updateById(pid, data);
  if (!response) {
    res.json404()
  }
  res.json200(response)
};
const destroyById = async (req, res) => {
  const { pid } = req.params;
  const response = await productsService.destroyById(pid);
  if (!response) {
    res.json404()
  }
  res.json200(response)
};
const pidParam = (req, res, next, pid) => {
  try {
    const isObjectId = Types.ObjectId.isValid(pid);
    if (isObjectId) return next();
    const error = new Error("Invalid ID");
    error.statusCode = 400;
    throw error;
  } catch (error) {
    next(error);
  }
};

export {
  createOne,
  readAll,
  readById,
  updateById,
  destroyById,
  pidParam
};