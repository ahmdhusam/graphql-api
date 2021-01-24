import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/products";

const productRoutes = Router();

productRoutes.get("/products", getAllProducts);
productRoutes.post("/products", createProduct);
productRoutes.delete("/products", deleteProduct);
productRoutes.patch("/products/:productId", updateProduct);

export default productRoutes;
