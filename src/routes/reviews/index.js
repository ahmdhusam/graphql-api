import { Router } from "express";
import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
} from "../../controllers/reviews";

const reviewRoutes = Router();

reviewRoutes.get("/reviews", getAllReviews);
reviewRoutes.post("/reviews", createReview);
reviewRoutes.delete("/reviews", deleteReview);
reviewRoutes.patch("/reviews/:reviewId", updateReview);

export default reviewRoutes;
