import { Router } from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  reviewsOfUsers,
} from "../../controllers/users";

const userRoutes = Router();

userRoutes.get("/users", getAllUsers);
userRoutes.post("/users", createUser);
userRoutes.delete("/users", deleteUser);
userRoutes.patch("/users/:userId", updateUser);
userRoutes.get("/users/:userId/reviews", reviewsOfUsers);

export default userRoutes;
