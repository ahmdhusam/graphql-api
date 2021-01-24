import { Router } from "express";
import {
  getAllSellers,
  createSeller,
  updateSeller,
  deleteSeller,
  getProductsOfSeller,
} from "../../controllers/sellers";

const sellerRoutes = Router();

sellerRoutes.get("/sellers", getAllSellers);
sellerRoutes.post("/sellers", createSeller);
sellerRoutes.delete("/sellers", deleteSeller);
sellerRoutes.patch("/sellers/:sellerId", updateSeller);
sellerRoutes.get("/sellers/:sellerId/products", getProductsOfSeller);

export default sellerRoutes;
